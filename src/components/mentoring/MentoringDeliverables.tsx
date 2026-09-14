import React from 'react';
import { Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const MentoringDeliverables: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const phases = [
    {
      stepNumber: "01",
      phase: isEn ? "Phase 01" : "Fase 01",
      title: t.mentoring.deliverables.phase1Title,
      desc: t.mentoring.deliverables.phase1Desc,
      items: t.mentoring.deliverables.phase1Items,
    },
    {
      stepNumber: "02",
      phase: isEn ? "Phase 02" : "Fase 02",
      title: t.mentoring.deliverables.phase2Title,
      desc: t.mentoring.deliverables.phase2Desc,
      items: t.mentoring.deliverables.phase2Items,
    },
    {
      stepNumber: "03",
      phase: isEn ? "Phase 03" : "Fase 03",
      title: t.mentoring.deliverables.phase3Title,
      desc: t.mentoring.deliverables.phase3Desc,
      items: t.mentoring.deliverables.phase3Items,
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 block mb-2">
            {t.mentoring.deliverables.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            {t.mentoring.deliverables.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.mentoring.deliverables.subtitle}
          </p>
        </div>

        {/* 3-Phase Editorial Framework */}
        <div className="space-y-6 mb-12">
          {phases.map((phase, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-8 sm:p-10 text-left transition-colors hover:border-slate-300"
            >
              {/* Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 pb-4 mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200/70">
                    {phase.phase}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                    {phase.title}
                  </h3>
                </div>

                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {idx === 0 && (isEn ? "Strategic Foundation" : "Fundação Estratégica")}
                  {idx === 1 && (isEn ? "Market Engine" : "Motor de Mercado")}
                  {idx === 2 && (isEn ? "Deal Closing" : "Fechamento de Oferta")}
                </span>
              </div>

              {/* Phase Strategic Focus */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-4xl">
                {phase.desc}
              </p>

              {/* Tangible Outcomes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {phase.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200/80 rounded-lg p-5 shadow-2xs flex flex-col justify-start"
                  >
                    <div className="w-6 h-0.5 bg-blue-600 mb-3" aria-hidden="true" />
                    <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-6 sm:p-7 rounded-xl bg-slate-50 border border-slate-200 text-left">
          <div className="flex items-start gap-4">
            <Shield className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {isEn ? "Mandatory Transparency Notice" : "Aviso Obrigatório de Transparência"}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? "The program is a professional advisory service providing positioning strategy, Job Hunting, networking, preparation, and follow-up. There is no guarantee of employment, job offer, or placement timeline, as final decisions rest exclusively with the hiring organizations."
                  : "O programa é um serviço profissional de estratégia, posicionamento, Job Hunting, networking, preparação e acompanhamento. Não existe garantia de contratação, aprovação em processo seletivo, prazo de contratação ou oferta de emprego, pois a decisão final depende exclusivamente das empresas contratantes."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
