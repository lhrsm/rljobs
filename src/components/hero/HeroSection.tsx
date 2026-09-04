import React from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="bg-white border-b border-slate-200 pt-28 pb-16 lg:pt-36 lg:pb-20"
      aria-label="Apresentação de Ricardo Oliveira"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Clean & Direct */}
          <div className="lg:col-span-7">
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

            {/* Clear CTA Hierarchy: Primary (Search Icon) + Secondary (WhatsApp) with identical height (h-12) */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              {/* Primary CTA with Search Icon */}
              <button
                onClick={() => scrollToSection('vagas')}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 text-sm font-bold text-white bg-blue-800 hover:bg-blue-900 active:bg-blue-950 border-2 border-blue-800 hover:border-blue-900 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 box-border"
              >
                <Search className="w-4 h-4" />
                <span>{t.hero.primaryCta}</span>
              </button>

              {/* Secondary CTA: Outline Green -> Solid Green on Hover */}
              <a
                href="https://wa.me/351926527934"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 h-12 px-6 text-sm font-bold text-[#075E54] hover:text-white bg-white hover:bg-[#075E54] active:bg-[#054c44] border-2 border-[#075E54] rounded-lg transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 box-border"
                aria-label="Falar no WhatsApp com Ricardo Oliveira (+351 926 527 934)"
              >
                <svg
                  className="w-5 h-5 fill-current text-[#075E54] group-hover:text-white transition-colors duration-200"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.16-3.03.79.81-2.95-.19-.3a8.216 8.216 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.5 11.66c-.19.53-1.08 1.04-1.5 1.07-.39.03-.89.15-2.87-.67-2.39-.99-3.9-3.44-4.02-3.6-.12-.16-.96-1.28-.96-2.44 0-1.16.61-1.73.83-1.96.22-.24.48-.3.64-.3.16 0 .32.01.46.02.15.01.35-.06.55.42.21.49.71 1.74.77 1.87.06.13.1.28.02.44-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.5.14.25.64 1.05 1.37 1.7.94.84 1.73 1.1 1.98 1.22.25.12.39.1.54-.07.15-.17.64-.74.81-.99.17-.25.34-.21.57-.12.23.08 1.46.69 1.71.81.25.13.42.19.48.29.06.11.06.63-.13 1.16z" />
                </svg>
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>

            {/* Metrics */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl font-extrabold text-slate-950">
                  +500
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Empresas Parceiras
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-950">
                  +15 Países
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  EUA, Europa e Brasil
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-950">
                  14 Dias
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Média para Shortlist
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
