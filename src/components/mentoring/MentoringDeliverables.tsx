import React from 'react';

export const MentoringDeliverables: React.FC = () => {
  const deliverables = [
    {
      title: "Diagnóstico de carreira e posicionamento",
      desc: "Análise aprofundada da trajetória e definição clara de narrativa para o mercado internacional."
    },
    {
      title: "Cargos, mercados e empresas-alvo",
      desc: "Mapeamento estratégico de posições, países prioritários e empresas com fit técnico e cultural."
    },
    {
      title: "CV internacional e otimização para ATS",
      desc: "Reestruturação do currículo no padrão executivo internacional e adequação a algoritmos de triagem."
    },
    {
      title: "Posicionamento e otimização do LinkedIn",
      desc: "Ajuste completo do perfil para atrair abordagens de recrutadores e decisores internacionais."
    },
    {
      title: "Estratégia de Job Hunting e busca ativa",
      desc: "Método proativo de mapeamento e abordagem a vagas estratégicas e oportunidades no mercado oculto."
    },
    {
      title: "Networking com recrutadores e decisores",
      desc: "Estratégia e templates de aproximação profissional com Headhunters e Hiring Managers."
    },
    {
      title: "Preparação e simulação de entrevistas",
      desc: "Simulações em inglês, refinamento de respostas comportamentais e preparação para perguntas difíceis."
    },
    {
      title: "Acompanhamento de processos e follow-ups",
      desc: "Orientação individual em cada etapa seletiva, negociação e estratégias de follow-up."
    },
    {
      title: "Orientação salarial e proposta",
      desc: "Benchmarking de remuneração em USD/EUR, aspectos de contratação internacional e negociação final."
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
            Escopo de Atuação
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            O que o programa entrega
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Metodologia prática conduzida por quem atua no recrutamento executivo:
          </p>
        </div>

        {/* 3-Column Clean Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          {deliverables.map((item, index) => (
            <div 
              key={index}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800"
            >
              <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mandatory Disclaimer Box - Clean & Sober */}
        <div className="p-5 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Aviso de Transparência
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            O programa é um serviço profissional de estratégia, posicionamento, Job Hunting, networking, preparação e acompanhamento. Não existe garantia de contratação, aprovação em processo seletivo, prazo de contratação ou oferta de emprego, pois a decisão final depende das empresas contratantes.
          </p>
        </div>

      </div>
    </section>
  );
};
