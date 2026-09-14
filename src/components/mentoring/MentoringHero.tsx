import React from 'react';
import { ArrowDown, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MentoringHeroProps {
  onStartQualification: () => void;
  onViewJobs: () => void;
}

export const MentoringHero: React.FC<MentoringHeroProps> = ({
  onStartQualification,
  onViewJobs,
}) => {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

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

          {/* Right Column: Hired International Professional Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Image */}
              <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
                <img
                  src="/hired-dev-male.jpg"
                  alt={isEn ? "International Tech Professional Hired" : "Profissional Tech Contratado no Exterior"}
                  className="w-full h-[420px] object-cover object-top block"
                />
              </div>

              {/* Floating Badge / Card 1 - Outcome badge */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-white border border-slate-200 rounded-xl p-3.5 shadow-xl flex items-center gap-3 animate-fadeIn">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    {isEn ? "International Offer Accepted" : "Oferta Internacional Aceita"}
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {isEn ? "Senior Engineer • Europe Target" : "Senior Software Engineer • Mercado Europa"}
                  </div>
                </div>
              </div>

              {/* Floating Badge / Card 2 - Top Tag */}
              <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg px-3 py-1.5 shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-800">
                  {isEn ? "Global Placement" : "Contratação Global"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
