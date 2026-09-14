import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  onOpenHireModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenHireModal }) => {
  const { t } = useLanguage();

  return (
    <section
      className="bg-white border-b border-slate-200 pt-28 pb-16 lg:pt-36 lg:pb-20"
      aria-label="Apresentação de Ricardo Oliveira"
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
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 text-sm font-bold text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-800 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>{t.hero.hireCta}</span>
                <ArrowRight className="w-4 h-4" />
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

          {/* Right Column: Clean Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-xl overflow-hidden border border-slate-300 shadow-md bg-slate-100">
              <img
                src="/img.jpeg"
                alt="Ricardo Oliveira"
                className="w-full h-[420px] object-cover object-top block"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
