import React from 'react';
import { Search, MapPin, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useJobs } from '../../context/JobContext';
import { Button } from '../ui/Button';

export const QuickSearchFilter: React.FC = () => {
  const { t } = useLanguage();
  const { filters, updateFilter } = useJobs();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const jobBoardElement = document.getElementById('vagas');
    if (jobBoardElement) {
      jobBoardElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="bg-white/95 backdrop-blur-md rounded-2xl shadow-elevated border border-slate-200/90 p-3 sm:p-4 lg:p-5 text-slate-900"
      role="search"
      aria-label="Busca de vagas internacionais"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Keyword Search */}
        <div className="lg:col-span-4 relative">
          <label htmlFor="quick-keyword" className="sr-only">
            {t.jobs.searchPlaceholder}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="quick-keyword"
              type="text"
              value={filters.keyword}
              onChange={(e) => updateFilter('keyword', e.target.value)}
              placeholder={t.jobs.searchPlaceholder}
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 text-sm rounded-xl pl-10 pr-3.5 py-3 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Region Filter */}
        <div className="lg:col-span-3 relative">
          <label htmlFor="quick-region" className="sr-only">
            {t.jobs.region}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600">
              <MapPin className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="quick-region"
              value={filters.region}
              onChange={(e) => updateFilter('region', e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 text-sm rounded-xl pl-10 pr-8 py-3 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="all">{t.jobs.allRegions}</option>
              <option value="USA">EUA (United States)</option>
              <option value="Europe">Europa (UK / UE)</option>
              <option value="Brazil">Brasil (Nacional)</option>
              <option value="Global Remote">Remoto Global</option>
            </select>
          </div>
        </div>

        {/* Seniority Filter */}
        <div className="lg:col-span-3 relative">
          <label htmlFor="quick-seniority" className="sr-only">
            {t.jobs.seniority}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
              <Award className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="quick-seniority"
              value={filters.seniority}
              onChange={(e) => updateFilter('seniority', e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 text-sm rounded-xl pl-10 pr-8 py-3 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="all">{t.jobs.allSeniorities}</option>
              <option value="Senior">Senior</option>
              <option value="Staff">Staff Engineer</option>
              <option value="Lead">Lead / Principal</option>
              <option value="Head/Director">Head / Director</option>
              <option value="C-Level/VP">C-Level / VP</option>
            </select>
          </div>
        </div>

        {/* Search CTA */}
        <div className="lg:col-span-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full py-3 rounded-xl shadow-md font-semibold text-sm justify-center"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {t.jobs.searchButton}
          </Button>
        </div>
      </div>
    </form>
  );
};
