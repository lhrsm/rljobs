import React from 'react';
import { ArrowDown, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MentoringHeroProps {
  onStartQualification: () => void;
  onViewJobs: () => void;
}

export const MentoringHero: React.FC<MentoringHeroProps> = ({
  onStartQualification,
  onViewJobs,
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Service Label */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-700" />
              <span>{t.mentoring.hero.serviceBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              {t.mentoring.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t.mentoring.hero.subheadline}
            </p>

            {/* Markets in highlight */}
            <div className="pt-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t.mentoring.hero.marketsLabel}
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {t.mentoring.hero.marketsList}
              </p>
            </div>

            {/* 2 CTAs: Verificar Elegibilidade (Abre Modal) + Ver Vagas (Scroll) */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary CTA: Opens Qualification Modal */}
              <button
                type="button"
                onClick={onStartQualification}
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg text-sm font-bold text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-800 transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span>{t.mentoring.hero.primaryCta}</span>
              </button>

              {/* Secondary CTA: Scrolls to Job Board (Outline Style) */}
              <button
                type="button"
                onClick={onViewJobs}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg text-sm font-semibold text-slate-800 hover:text-blue-700 bg-transparent hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{t.mentoring.hero.secondaryCta}</span>
                <ArrowDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{t.mentoring.hero.footnote}</span>
            </div>
          </div>

          {/* Right Column: Executive Portrait */}
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
