import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  Briefcase, 
  FileCheck, 
  FileSearch, 
  Languages, 
  TrendingUp, 
  Compass, 
  CreditCard 
} from 'lucide-react';

export const MentoringFitSection: React.FC = () => {
  const criteria = [
    {
      icon: Clock,
      title: "Experiência Comprovada",
      desc: "5+ anos de experiência profissional sólida no seu setor de atuação (preferencial)."
    },
    {
      icon: Briefcase,
      title: "Senioridade Estratégica",
      desc: "Profissionais de nível Pleno, Sênior, Especialista, Tech Lead, Manager, Director ou Executive."
    },
    {
      icon: FileCheck,
      title: "Elegibilidade Migratória",
      desc: "Cidadania europeia, visto válido, residência permanente ou autorização formal de trabalho no mercado-alvo."
    },
    {
      icon: FileSearch,
      title: "Processos em Fase Avançada",
      desc: "Também podem ser avaliados profissionais com processo de cidadania ou visto em fase final de homologação."
    },
    {
      icon: Languages,
      title: "Proficiência em Idiomas",
      desc: "Inglês intermediário/avançado (B2/C1/C2) ou idioma compatível com as exigências do mercado desejado."
    },
    {
      icon: TrendingUp,
      title: "Metas Realistas e Alinhadas",
      desc: "Objetivo profissional e pretensão salarial compatíveis com seu nível de senioridade e o benchmark do país de destino."
    },
    {
      icon: Compass,
      title: "Disponibilidade Geográfica",
      desc: "Disponibilidade real para transição em Portugal, Espanha, Europa, Brasil ou modelos Global Remote."
    },
    {
      icon: CreditCard,
      title: "Prontidão para Investimento",
      desc: "Disponibilidade para investir em um serviço profissional, altamente personalizado e individualizado de recolocação."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
            Critérios de Elegibilidade
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Este programa é para você?
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            O International Job Hunting & Career Mentoring é um programa seletivo e com vagas limitadas por trimestre. Verifique se o seu perfil atende aos critérios fundamentais:
          </p>
        </div>

        {/* 8 Criteria Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {criteria.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Critério Relevante</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
