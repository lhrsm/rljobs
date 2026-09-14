import React from 'react';
import { UserCheck, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  onOpenHireModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenHireModal }) => {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  return (
    <section
      className="bg-white border-b border-slate-200 pt-28 pb-16 lg:pt-36 lg:pb-20"
      aria-label={isEn ? "Hire Top Tech Talents" : "Contrate os Melhores Talentos Tech"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Clean & Direct */}
          <div className="lg:col-span-7">
            {/* Service Label */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-700" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Name */}
            <div className="mb-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {t.hero.name}
              </h1>
            </div>

            {/* Value Proposition */}
            <p className="text-lg sm:text-xl text-slate-800 font-semibold leading-snug mb-3">
              {t.hero.headline}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-xl">
              {t.hero.subheadline}
            </p>

            {/* Single CTA Button: Contratar os Melhores Talentos Tech */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onOpenHireModal}
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 text-sm font-bold text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-800 rounded-lg shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer group"
              >
                <UserCheck className="w-4.5 h-4.5 text-blue-100 group-hover:text-white transition-colors" />
                <span>{t.hero.hireCta}</span>
              </button>
            </div>

            {/* Metrics */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl font-extrabold text-slate-950">
                  {t.hero.metrics.partners}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {t.hero.metrics.partnersSub}
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-950">
                  {t.hero.metrics.countries}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {t.hero.metrics.countriesSub}
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-950">
                  {t.hero.metrics.timeToHire}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {t.hero.metrics.timeToHireSub}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hired Tech Talents Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Image */}
              <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
                <img
                  src="/hired-tech-team.jpg"
                  alt={isEn ? "Tech talents hired and integrated in global teams" : "Talentos tech contratados e integrados em times globais"}
                  className="w-full h-[420px] object-cover object-center block"
                />
              </div>

              {/* Floating Badge / Card 1 - Success Metric */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-white border border-slate-200 rounded-xl p-3.5 shadow-xl flex items-center gap-3 animate-fadeIn">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    {isEn ? "Shortlist Delivered" : "Shortlist Entregue"}
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {isEn ? "Senior Tech Hired in 14 Days" : "Tech Sênior Contratado em 14 Dias"}
                  </div>
                </div>
              </div>

              {/* Floating Badge / Card 2 - Top Tag */}
              <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg px-3 py-1.5 shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-800">
                  {isEn ? "Top 3% Pre-Vetted Talent" : "Top 3% Talentos Pré-Avaliados"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
