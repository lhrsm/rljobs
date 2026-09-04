import React from 'react';
import { Filter, RotateCcw, MapPin, Award, Laptop, Banknote, Briefcase } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useJobs } from '../../context/JobContext';
import { Button } from '../ui/Button';

export const JobFilters: React.FC = () => {
  const { t } = useLanguage();
  const { filters, updateFilter, resetFilters, filteredJobs, jobs } = useJobs();

  const isFiltered =
    filters.keyword !== '' ||
    filters.region !== 'all' ||
    filters.seniority !== 'all' ||
    filters.workModel !== 'all' ||
    filters.contractType !== 'all' ||
    filters.currency !== 'all' ||
    filters.department !== 'all';

  return (
    <aside
      className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card sticky top-24"
      aria-label={t.jobs.filtersTitle}
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" aria-hidden="true" />
          <h3 className="font-bold text-slate-900 text-base">{t.jobs.filtersTitle}</h3>
        </div>
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors focus-ring rounded p-1"
          >
            <RotateCcw className="w-3 h-3" />
            {t.jobs.clearFilters}
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Region */}
        <div>
          <label htmlFor="filter-region" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            {t.jobs.region}
          </label>
          <select
            id="filter-region"
            value={filters.region}
            onChange={(e) => updateFilter('region', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
          >
            <option value="all">{t.jobs.allRegions}</option>
            <option value="USA">EUA (United States)</option>
            <option value="Europe">Europa (UK / EU)</option>
            <option value="Brazil">Brasil (Nacional)</option>
            <option value="Global Remote">Remoto Global</option>
          </select>
        </div>

        {/* Seniority */}
        <div>
          <label htmlFor="filter-seniority" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            {t.jobs.seniority}
          </label>
          <select
            id="filter-seniority"
            value={filters.seniority}
            onChange={(e) => updateFilter('seniority', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
          >
            <option value="all">{t.jobs.allSeniorities}</option>
            <option value="Senior">Senior</option>
            <option value="Staff">Staff</option>
            <option value="Lead">Lead / Principal</option>
            <option value="Head/Director">Head / Director</option>
            <option value="C-Level/VP">C-Level / VP</option>
          </select>
        </div>

        {/* Work Model */}
        <div>
          <label htmlFor="filter-workModel" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Laptop className="w-3.5 h-3.5 text-purple-600" />
            {t.jobs.workModel}
          </label>
          <select
            id="filter-workModel"
            value={filters.workModel}
            onChange={(e) => updateFilter('workModel', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
          >
            <option value="all">{t.jobs.allModels}</option>
            <option value="Remote">100% Remoto</option>
            <option value="Hybrid">Híbrido</option>
            <option value="Relocation">Com Relocation</option>
          </select>
        </div>

        {/* Currency / Currency Filter */}
        <div>
          <label htmlFor="filter-currency" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Banknote className="w-3.5 h-3.5 text-amber-600" />
            {t.jobs.currency}
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: 'all', label: 'Todas' },
              { val: 'USD', label: 'USD ($)' },
              { val: 'EUR', label: 'EUR (€)' },
              { val: 'BRL', label: 'BRL (R$)' },
            ].map((c) => (
              <button
                key={c.val}
                type="button"
                onClick={() => updateFilter('currency', c.val)}
                className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                  filters.currency === c.val
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Department */}
        <div>
          <label htmlFor="filter-dept" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-600" />
            {t.jobs.department}
          </label>
          <select
            id="filter-dept"
            value={filters.department}
            onChange={(e) => updateFilter('department', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 p-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
          >
            <option value="all">Todas as Áreas</option>
            <option value="Engineering">Engenharia de Software</option>
            <option value="Leadership">Liderança Executiva & Gestão</option>
            <option value="Data & AI">Dados & Inteligência Artificial</option>
            <option value="DevOps & Cloud">DevOps, Cloud & SRE</option>
            <option value="Product">Produto & Growth</option>
          </select>
        </div>
      </div>

      {/* Summary Box */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>{filteredJobs.length} de {jobs.length} vagas</span>
        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-red-600 hover:text-red-700 p-0 h-auto">
            Limpar tudo
          </Button>
        )}
      </div>
    </aside>
  );
};
