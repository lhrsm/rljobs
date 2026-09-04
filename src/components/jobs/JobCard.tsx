import React from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Send 
} from 'lucide-react';
import { Job } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useJobs } from '../../context/JobContext';
import { localizeJob } from '../../utils/localizeJob';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { language, t } = useLanguage();
  const { setSelectedJobForDetails, openApplyModal } = useJobs();

  const localized = localizeJob(job, language);

  const formatSalary = () => {
    if (job.salary.isConfidential || (!job.salary.min && !job.salary.max)) {
      return t.jobs.confidentialSalary;
    }

    const currencySymbol = {
      USD: 'US$',
      EUR: '€',
      BRL: 'R$',
    }[job.salary.currency];

    const periodText = job.salary.period === 'yearly' ? t.jobs.perYear : t.jobs.perMonth;

    if (job.salary.min && job.salary.max) {
      return `${currencySymbol} ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} ${periodText}`;
    }

    if (job.salary.min) {
      return `${currencySymbol} ${job.salary.min.toLocaleString()} ${periodText}`;
    }

    return `${currencySymbol} ${job.salary.max?.toLocaleString()} ${periodText}`;
  };

  return (
    <article
      className="bg-white rounded-2xl border border-slate-200 hover:border-blue-500 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
      aria-labelledby={`job-title-${job.id}`}
    >
      <div>
        {/* Job Title */}
        <h3
          id={`job-title-${job.id}`}
          className="text-lg sm:text-xl font-extrabold text-slate-900 hover:text-blue-600 transition-colors mb-2.5"
        >
          {localized.displayTitle}
        </h3>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 mb-3 font-medium">
          <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            {localized.companyType}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {localized.displayLocation}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {localized.displayTimezone}
          </span>
        </div>

        {/* Short Summary */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {localized.summary}
        </p>

        {/* Skills Tag Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Salary + Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
            {t.jobs.targetComp}
          </span>
          <span className="text-base font-extrabold text-emerald-600">
            {formatSalary()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedJobForDetails(job)}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {t.jobs.viewDetails}
          </button>

          <button
            onClick={() => openApplyModal(job)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-xs"
          >
            <span>{t.jobs.applyBtn}</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
};
