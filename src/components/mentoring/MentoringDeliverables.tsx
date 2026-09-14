import React from 'react';
import { Shield, Check } from 'lucide-react';
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
    <section className="py-20 lg:py-28 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-3">
            {t.mentoring.deliverables.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t.mentoring.deliverables.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {t.mentoring.deliverables.subtitle}
          </p>
        </div>

        {/* Vertical Steps Progression (De Cima para Baixo) */}
        <div className="relative mb-16">
          {/* Connecting Vertical Line */}
          <div 
            className="hidden sm:block absolute top-6 bottom-6 left-6 w-0.5 bg-slate-800 -translate-x-1/2" 
            aria-hidden="true" 
          />

          <div className="space-y-8">
            {phases.map((phase, idx) => (
              <div key={idx} className="relative flex flex-col sm:flex-row items-start gap-5 sm:gap-8 text-left">
                {/* Step Indicator Node */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 text-blue-400 font-mono font-bold text-sm shrink-0 shadow-md">
                  {phase.stepNumber}
                </div>

                {/* Step Content Card */}
                <div className="flex-1 w-full bg-slate-900/90 border border-slate-800 rounded-lg p-6 sm:p-8 shadow-sm hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-widest">
                      {phase.phase}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {idx === 0 && (isEn ? "Pillar 1 • Foundation" : "Etapa 1 • Fundação")}
                      {idx === 1 && (isEn ? "Pillar 2 • Market Engine" : "Etapa 2 • Motor de Mercado")}
                      {idx === 2 && (isEn ? "Pillar 3 • Offer Closing" : "Etapa 3 • Fechamento de Oferta")}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                    {phase.title}
                  </h3>

                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    {phase.desc}
                  </p>

                  {/* Structured Deliverables Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {phase.items.map((item, i) => (
                      <div 
                        key={i} 
                        className="bg-slate-950/70 border border-slate-800/80 rounded-md p-4 flex flex-col justify-start"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                            {isEn ? `Deliverable 0${i + 1}` : `Entrega 0${i + 1}`}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-6 rounded-lg bg-slate-900/60 border border-slate-800 text-left">
          <div className="flex items-start gap-3.5">
            <Shield className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {isEn ? "Mandatory Transparency Notice" : "Aviso Obrigatório de Transparência"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
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
