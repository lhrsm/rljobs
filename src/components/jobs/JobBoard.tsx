import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  X, 
  ArrowUpDown, 
  SearchX, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useJobs } from '../../context/JobContext';
import { JobCard } from './JobCard';
import { JobDetailModal } from './JobDetailModal';
import { QuickApplyModal } from './QuickApplyModal';
import { Button } from '../ui/Button';

const ITEMS_PER_PAGE = 6;

export const JobBoard: React.FC = () => {
  const { t } = useLanguage();
  const { filteredJobs, isLoading, filters, updateFilter, resetFilters } = useJobs();

  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.keyword, filters.sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE) || 1;

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const element = document.getElementById('vagas');
    if (element) {
      const navOffset = 80;
      const pos = element.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  return (
    <section id="vagas" className="py-20 bg-slate-50 border-b border-slate-200" aria-labelledby="jobs-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
            {t.jobs.globalMuralBadge}
          </span>
          <h2 id="jobs-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            {t.jobs.title}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {t.jobs.subtitle}
          </p>
        </div>

        {/* Clean Single Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-blue-600" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => updateFilter('keyword', e.target.value)}
              placeholder={t.jobs.searchBarPlaceholder}
              className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-slate-900 text-sm sm:text-base rounded-xl pl-12 pr-10 py-3.5 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all placeholder:text-slate-400 font-medium"
              aria-label={t.jobs.searchButton}
            />
            {filters.keyword && (
              <button
                onClick={() => updateFilter('keyword', '')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Total Jobs Available Counter & Sorting Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2.5 text-slate-900" aria-live="polite">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold text-slate-600">
              <span className="text-slate-950 font-extrabold text-base mr-1">
                {filteredJobs.length}
              </span>
              {t.jobs.availableCount}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-jobs" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              {t.jobs.sortBy}
            </label>
            <select
              id="sort-jobs"
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 py-1.5 px-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none cursor-pointer shadow-2xs"
            >
              <option value="recent">{t.jobs.sortRecent}</option>
              <option value="salary_high">{t.jobs.sortSalary}</option>
              <option value="featured">{t.jobs.sortFeatured}</option>
            </select>
          </div>
        </div>

        {/* Jobs List */}
        <div>
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t.common.loading}</p>
            </div>
          ) : paginatedJobs.length > 0 ? (
            <div className="space-y-8">
              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {/* Numbered Pagination Toolbar */}
              {totalPages > 1 && (
                <nav
                  className="flex items-center justify-center gap-2 pt-6 border-t border-slate-200"
                  aria-label="Paginação de vagas"
                >
                  {/* Previous Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
                    aria-label={t.jobs.paginationPrev}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.jobs.paginationPrev}</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1.5">
                    {(() => {
                      const pages: (number | string)[] = [];
                      if (totalPages <= 7) {
                        for (let i = 1; i <= totalPages; i++) pages.push(i);
                      } else if (currentPage <= 4) {
                        pages.push(1, 2, 3, 4, 5, '...', totalPages);
                      } else if (currentPage >= totalPages - 3) {
                        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                      } else {
                        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                      }

                      return pages.map((item, idx) => {
                        if (item === '...') {
                          return (
                            <span key={`dots-${idx}`} className="w-8 text-center text-slate-400 font-bold text-xs">
                              ...
                            </span>
                          );
                        }
                        const pageNum = Number(item);
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            aria-current={currentPage === pageNum ? 'page' : undefined}
                            className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                              currentPage === pageNum
                                ? 'bg-blue-800 text-white shadow-xs'
                                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      });
                    })()}
                  </div>

                  {/* Next Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
                    aria-label={t.jobs.paginationNext}
                  >
                    <span className="hidden sm:inline">{t.jobs.paginationNext}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <SearchX className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t.jobs.noResultsTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                {t.jobs.noResultsSub}
              </p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  {t.jobs.emptyResetBtn}
                </Button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Accessible Modals */}
      <JobDetailModal />
      <QuickApplyModal />
    </section>
  );
};
