import React from 'react';
import { 
  UserCheck, 
  Target, 
  FileText, 
  Linkedin, 
  Search, 
  Users2, 
  Video, 
  GitPullRequest, 
  Coins, 
  AlertTriangle 
} from 'lucide-react';

export const MentoringDeliverables: React.FC = () => {
  const deliverables = [
    {
      icon: UserCheck,
      number: "01",
      title: "Diagnóstico de Carreira & Posicionamento",
      desc: "Avaliação profunda da sua trajetória, pontos fortes, diferenciais competitivos e narrativa para o mercado global."
    },
    {
      icon: Target,
      number: "02",
      title: "Definição de Alvos Estratégicos",
      desc: "Mapeamento minucioso de cargos compatíveis, mercados, países prioritários e lista de empresas-alvo com alto fit cultural e técnico."
    },
    {
      icon: FileText,
      number: "03",
      title: "CV Internacional Otimizado para ATS",
      desc: "Reestruturação completa do currículo no padrão executivo internacional, com palavras-chave estratégicas para aprovação em sistemas ATS."
    },
    {
      icon: Linkedin,
      number: "04",
      title: "Posicionamento & Otimização do LinkedIn",
      desc: "Transformação do seu perfil em um ímã de oportunidades internacionais, com headline, summary e experiência orientados a decisores."
    },
    {
      icon: Search,
      number: "05",
      title: "Estratégia Ativa de Job Hunting",
      desc: "Metodologia proativa de busca e prospecção de vagas ocultas, antes mesmo de serem divulgadas massivamente."
    },
    {
      icon: Users2,
      number: "06",
      title: "Networking & Abordagem a Recrutadores",
      desc: "Treinamento e templates de contato direto com Headhunters, Hiring Managers e líderes C-Level nos mercados-alvo."
    },
    {
      icon: Video,
      number: "07",
      title: "Preparação & Simulação de Entrevistas",
      desc: "Mock interviews personalizadas em inglês, estruturação de respostas comportamentais (STAR) e segurança para negociações técnicas."
    },
    {
      icon: GitPullRequest,
      number: "08",
      title: "Acompanhamento de Processos & Follow-ups",
      desc: "Orientação contínua fase a fase de cada processo seletivo, com estratégias de comunicação, follow-ups e resolução de dúvidas."
    },
    {
      icon: Coins,
      number: "09",
      title: "Orientação Salarial & Negociação de Ofertas",
      desc: "Benchmark real de salários em USD e EUR, tributação internacional, benefícios e táticas de negociação para maximizar sua remuneração."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
            Escopo de Atuação
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            O que o programa entrega
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Uma esteira metodológica completa, orientada por quem atua diariamente no recrutamento executivo internacional:
          </p>
        </div>

        {/* 9 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {deliverables.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 hover:border-blue-500/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-900/50 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-blue-400 transition-colors">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mandatory Legal & Ethical Notice */}
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/90 border-l-4 border-amber-500 border-y border-r border-slate-800 text-left shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Aviso Legal & Transparência do Programa
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                O programa é um serviço profissional de estratégia, posicionamento, Job Hunting, networking, preparação e acompanhamento. Não existe garantia de contratação, aprovação em processo seletivo, prazo de contratação ou oferta de emprego, pois a decisão final depende exclusivamente das empresas contratantes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
