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
        <div className="max-w-3xl mb-12 text-left">
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

        {/* Stepper Overview Bar (Horizontal Timeline on Desktop) */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mb-14 border-b border-slate-200 pb-8 text-left">
          {phases.map((p, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                {p.stepNumber}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                  {p.phase}
                </span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">
                  {p.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Steps Progression with Connecting Line */}
        <div className="relative mb-14 text-left">
          {/* Vertical Connecting Spine Line */}
          <div 
            className="hidden md:block absolute top-8 bottom-8 left-6 w-0.5 bg-slate-200 -translate-x-1/2" 
            aria-hidden="true" 
          />

          <div className="space-y-10">
            {phases.map((phase, idx) => (
              <div key={idx} className="relative flex flex-col md:flex-row items-start gap-6 lg:gap-8">
                {/* Step Node Indicator */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-blue-700 text-white font-extrabold text-sm shrink-0 shadow-md">
                  {phase.stepNumber}
                </div>

                {/* Step Content Card */}
                <div className="flex-1 w-full bg-slate-50/80 border border-slate-200/90 rounded-xl p-6 sm:p-8 shadow-xs hover:border-slate-300 transition-colors">
                  {/* Step Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-4 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                        {phase.phase}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                        {phase.title}
                      </h3>
                    </div>

                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {idx === 0 && (isEn ? "Step 1 • Strategic Alignment" : "Passo 1 • Alinhamento Estratégico")}
                      {idx === 1 && (isEn ? "Step 2 • Active Pipeline" : "Passo 2 • Pipeline Ativo")}
                      {idx === 2 && (isEn ? "Step 3 • Offer Closing" : "Passo 3 • Fechamento de Oferta")}
                    </span>
                  </div>

                  {/* Step Focus / Objective */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                    {phase.desc}
                  </p>

                  {/* Step Deliverables Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {phase.items.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-200/90 rounded-lg p-5 shadow-2xs flex flex-col justify-start"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-700" />
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            {isEn ? `Deliverable ${idx + 1}.${i + 1}` : `Entrega ${idx + 1}.${i + 1}`}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Step Milestone */}
                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">
                      {isEn ? "Step Milestone: " : "Marco da Fase: "}
                    </span>
                    <span className="text-slate-600 font-medium">
                      {idx === 0 && (isEn ? "Positioning audit completed & International CV ready" : "Diagnóstico concluído e CV Internacional validado para ATS")}
                      {idx === 1 && (isEn ? "Active market presence with direct hiring manager access" : "Visibilidade ativa e contatos com decisores internacionais")}
                      {idx === 2 && (isEn ? "Executive interview mastery & hard currency contract closing" : "Domínio em entrevistas e assinatura de propostas em USD/EUR")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
