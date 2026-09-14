import React from 'react';
import { Shield } from 'lucide-react';

export const MentoringDeliverables: React.FC = () => {
  const phases = [
    {
      phase: "Fase 01",
      title: "Diagnóstico & Posicionamento",
      desc: "Estruturação dos pilares da sua narrativa executiva internacional antes de qualquer abordagem ao mercado.",
      items: [
        "Diagnóstico detalhado de carreira e definição de proposta de valor internacional.",
        "Mapeamento de cargos estratégicos, mercados, países e lista de empresas-alvo prioritárias.",
        "Reestruturação completa do CV no formato internacional aceito por ATS e decisores globais."
      ]
    },
    {
      phase: "Fase 02",
      title: "Ativos & Busca Ativa (Job Hunting)",
      desc: "Implementação das ferramentas e táticas para identificação de vagas abertas e oportunidades no mercado oculto.",
      items: [
        "Otimização do LinkedIn para atrair abordagens espontâneas de recrutadores internacionais.",
        "Estratégia proativa de Job Hunting com filtros e métodos de busca direcionada.",
        "Networking e templates de abordagem profissional para contato com Headhunters e Hiring Managers."
      ]
    },
    {
      phase: "Fase 03",
      title: "Entrevistas, Processos & Oferta",
      desc: "Acompanhamento prático da fase decisiva de conversação com empresas contratantes.",
      items: [
        "Simulação de entrevistas executivas em inglês com respostas no formato STAR.",
        "Acompanhamento individual de cada etapa seletiva, com alinhamento de follow-ups.",
        "Benchmarking salarial real (USD/EUR), análise de benefícios e suporte na negociação da proposta."
      ]
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-3">
            Metodologia Executiva
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            O que o programa entrega
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Uma esteira estruturada em três fases consecutivas, orientada diretamente pelas práticas de recrutamento executivo transfronteiriço.
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
                Aviso Obrigatório de Transparência
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                O programa é um serviço profissional de estratégia, posicionamento, Job Hunting, networking, preparação e acompanhamento. Não existe garantia de contratação, aprovação em processo seletivo, prazo de contratação ou oferta de emprego, pois a decisão final depende exclusivamente das empresas contratantes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
