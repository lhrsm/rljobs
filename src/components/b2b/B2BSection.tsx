import React from 'react';
import { 
  Target, 
  ShieldCheck, 
  Zap, 
  RefreshCw 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CompanyBriefingForm } from './CompanyBriefingForm';

export const B2BSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="empresas"
      className="py-16 lg:py-20 bg-slate-900 text-white border-b border-slate-800"
      aria-labelledby="b2b-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
                {t.b2b.badge}
              </span>
              <h2 id="b2b-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {t.b2b.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                {t.b2b.subtitle}
              </p>
            </div>

            {/* 4 Pillars in a structured 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                <Target className="w-5 h-5 text-blue-400 mb-2" />
                <h3 className="text-sm font-semibold text-white mb-1">
                  {t.b2b.pillar1Title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.b2b.pillar1Desc}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                <h3 className="text-sm font-semibold text-white mb-1">
                  {t.b2b.pillar2Title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.b2b.pillar2Desc}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                <Zap className="w-5 h-5 text-amber-400 mb-2" />
                <h3 className="text-sm font-semibold text-white mb-1">
                  {t.b2b.pillar3Title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.b2b.pillar3Desc}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                <RefreshCw className="w-5 h-5 text-purple-400 mb-2" />
                <h3 className="text-sm font-semibold text-white mb-1">
                  {t.b2b.pillar4Title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.b2b.pillar4Desc}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/90 border border-slate-700 text-xs text-slate-300 leading-relaxed">
              <strong className="text-white block mb-1">Atendimento Direto & Sigiloso</strong>
              Processos conduzidos pessoalmente por <strong>Ricardo Oliveira</strong>, com contratos internacionais estruturados sem passivos trabalhistas.
            </div>
          </div>

          {/* Right Column: Corporate Briefing Form */}
          <div className="lg:col-span-7">
            <CompanyBriefingForm />
          </div>
        </div>
      </div>
    </section>
  );
};
