import React from 'react';

export const MentoringFitSection: React.FC = () => {
  const criteria = [
    "5+ anos de experiência profissional (preferencial).",
    "Profissionais Pleno, Sênior, Especialista, Manager ou Executive.",
    "Cidadania europeia, visto, residência ou autorização válida de trabalho no mercado-alvo.",
    "Também podem ser avaliados profissionais com documentação/cidadania em fase avançada.",
    "Inglês ou idioma compatível com o mercado desejado.",
    "Objetivo profissional e salarial compatível com experiência, senioridade e mercado.",
    "Disponibilidade real para Portugal, Espanha, Europa, Brasil ou oportunidades internacionais.",
    "Disponibilidade para investir em um serviço profissional e personalizado de recolocação."
  ];

  return (
    <section className="py-16 lg:py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
            Critérios de Elegibilidade
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Este programa é para você?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            O programa é direcionado a profissionais que atendem aos seguintes requisitos:
          </p>
        </div>

        {/* 2-Column Minimalist Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-left">
          {criteria.map((item, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 py-3 border-b border-slate-800/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {item}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
