import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Share2, 
  Check, 
  ShieldCheck, 
  Send, 
  Award,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useJobs } from '../../context/JobContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { localizeJob } from '../../utils/localizeJob';

export const JobDetailModal: React.FC = () => {
  const { language, t } = useLanguage();
  const { selectedJobForDetails, setSelectedJobForDetails, openApplyModal, showToast } = useJobs();
  const [isCopied, setIsCopied] = useState(false);

  if (!selectedJobForDetails) return null;

  const job = selectedJobForDetails;
  const localized = localizeJob(job, language);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    showToast(t.jobs.drawer.copied, 'info');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleApplyClick = () => {
    setSelectedJobForDetails(null);
    openApplyModal(job);
  };

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
    return `${currencySymbol} ${(job.salary.max || job.salary.min)?.toLocaleString()} ${periodText}`;
  };

  return (
    <Modal
      isOpen={!!selectedJobForDetails}
      onClose={() => setSelectedJobForDetails(null)}
      maxWidth="3xl"
      ariaLabel={localized.displayTitle}
    >
      <div className="space-y-6">
        {/* Title & Organization */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {localized.displayTitle}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600">
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <Building2 className="w-4 h-4 text-blue-600" />
              {localized.companyType}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {localized.displayLocation}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              {t.jobs.drawer.timezoneNote} {localized.displayTimezone}
            </span>
          </div>
        </div>

        {/* Salary Banner */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              {t.jobs.targetComp}
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-emerald-400">
              {formatSalary()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
              leftIcon={isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            >
              {isCopied ? (language === 'pt' ? 'Copiado!' : 'Copied!') : t.jobs.drawer.shareJob}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApplyClick}
              rightIcon={<Send className="w-3.5 h-3.5" />}
            >
              {t.jobs.drawer.applyNow}
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
            {t.jobs.drawer.aboutRole}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {localized.summary}
          </p>
        </div>

        {/* Required Tech Skills */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5">
            {t.jobs.techStack}
          </h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs font-semibold bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg border border-blue-200/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5">
            {t.jobs.drawer.responsibilities}
          </h3>
          <ul className="space-y-2">
            {localized.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5">
            {t.jobs.drawer.requirements}
          </h3>
          <ul className="space-y-2">
            {localized.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5">
            {t.jobs.drawer.benefits}
          </h3>
          <ul className="space-y-2">
            {localized.benefits.map((ben, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <Award className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>{ben}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cross-border structuring note */}
        {localized.crossBorderNotes && (
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-slate-800 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-bold text-blue-900 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>{t.jobs.drawer.crossBorderInfo}</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {localized.crossBorderNotes}
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium">
            {t.jobs.drawer.postedOn} {new Date(job.postedAt).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')} • Ref: #{job.id}
          </span>
          <Button
            variant="primary"
            size="md"
            onClick={handleApplyClick}
            className="w-full sm:w-auto px-8"
            rightIcon={<Send className="w-4 h-4" />}
          >
            {t.jobs.drawer.applyNow}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
