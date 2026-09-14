import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MentoringFitSectionProps {
  onStartQualification?: () => void;
}

export const MentoringFitSection: React.FC<MentoringFitSectionProps> = ({ onStartQualification }) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  return (
    <section className="py-20 lg:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 block mb-2">
            {t.mentoring.fit.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            {t.mentoring.fit.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.mentoring.fit.subtitle}
          </p>
        </div>

        {/* 2-Column Clean Executive Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* Panel 1: Senioridade & Trajetória Profissional */}
          <div className="p-8 sm:p-10 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
                  {t.mentoring.fit.col1Title}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200/80">
                  {isEn ? "Preferably 5+ Years" : "Preferencial 5+ Anos"}
                </span>
              </div>

              <ul className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                {t.mentoring.fit.col1Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-2.5 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Seniority Summary */}
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-500 font-medium">
              <span className="font-semibold text-slate-700">
                {isEn ? "Target Seniority Levels: " : "Perfis prioritários: "}
              </span>
              {isEn 
                ? "Senior Engineers, Staff / Principal, Tech Leads, Engineering Managers, and Tech Directors."
                : "Engenheiros Sênior, Staff / Principal, Tech Leads, Engineering Managers e Diretores de Tecnologia."}
            </div>
          </div>

          {/* Panel 2: Elegibilidade Migratória & Mercados */}
          <div className="p-8 sm:p-10 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
                  {t.mentoring.fit.col2Title}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                  {isEn ? "Legal Compliance" : "Compliance Migratório"}
                </span>
              </div>

              <ul className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                {t.mentoring.fit.col2Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2.5 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Markets Summary */}
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-500 font-medium">
              <span className="font-semibold text-slate-700">
                {isEn ? "Primary Jurisdictions: " : "Jurisdições com alta demanda: "}
              </span>
              {isEn
                ? "European Union (Portugal, Spain, Germany, Netherlands), United Kingdom, and US USD Remote Contracts."
                : "União Europeia (Portugal, Espanha, Alemanha, Holanda), Reino Unido e Contratos Remotos EUA em Dólar."}
            </div>
          </div>

        </div>

        {/* Action Callout Panel */}
        {onStartQualification && (
          <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-950">
                  {isEn ? "Does your profile meet the criteria above?" : "Seu perfil atende aos critérios acima?"}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {isEn 
                    ? "Start your confidential pre-qualification for individualized review by Ricardo Oliveira."
                    : "Inicie a pré-qualificação confidencial para análise direta de Ricardo Oliveira."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onStartQualification}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm shrink-0"
            >
              <span>{t.mentoring.fit.ctaButton}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
