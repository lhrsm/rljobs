import React from 'react';
import { Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const MentoringDeliverables: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const phases = [
    {
      phase: isEn ? "Phase 01" : "Fase 01",
      title: t.mentoring.deliverables.phase1Title,
      desc: t.mentoring.deliverables.phase1Desc,
      items: t.mentoring.deliverables.phase1Items,
    },
    {
      phase: isEn ? "Phase 02" : "Fase 02",
      title: t.mentoring.deliverables.phase2Title,
      desc: t.mentoring.deliverables.phase2Desc,
      items: t.mentoring.deliverables.phase2Items,
    },
    {
      phase: isEn ? "Phase 03" : "Fase 03",
      title: t.mentoring.deliverables.phase3Title,
      desc: t.mentoring.deliverables.phase3Desc,
      items: t.mentoring.deliverables.phase3Items,
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        {/* 3-Phase Interactive Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 text-left">
          {phases.map((phase, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                    {phase.phase}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                  {phase.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  {phase.desc}
                </p>

                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
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
