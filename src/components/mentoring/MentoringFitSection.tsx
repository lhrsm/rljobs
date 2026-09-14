import React from 'react';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';

interface MentoringFitSectionProps {
  onStartQualification?: () => void;
}

export const MentoringFitSection: React.FC<MentoringFitSectionProps> = ({ onStartQualification }) => {
  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-3">
            Perfil do Participante
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Este programa é para você?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            O International Job Hunting & Career Mentoring opera sob vagas restritas e seleção prévia. Os critérios abaixo garantem a eficácia da estratégia para os mercados internacionais atendidos.
          </p>
        </div>

        {/* 2-Column Structured Comparison / Fit Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Senioridade & Trajetória Profissional */}
          <div className="p-8 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  1. Maturidade & Senioridade
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-950 text-blue-400 border border-blue-800/60">
                  Preferencial 5+ Anos
                </span>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-white">Experiência comprovada:</strong> Mínimo de 5 anos de atuação sólida em tecnologia, engenharia de software, dados, produto ou liderança executiva.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-white">Níveis atendidos:</strong> Pleno sênior, Especialistas, Tech Leads, Gerentes de Engenharia, Diretores e C-Levels.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-white">Expectativa salarial alinhada:</strong> Objetivos de remuneração compatíveis com a senioridade real e o mercado internacional de destino.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-white">Investimento no serviço:</strong> Disponibilidade financeira para contratar um acompanhamento de recolocação profissional e individualizado.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual Tags */}
            <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs font-medium text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Pleno</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Sênior</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Especialista / Staff</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Tech Lead / Manager</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Director / Executive</span>
            </div>
          </div>

          {/* Card 2: Elegibilidade Migratória & Mercados */}
          <div className="p-8 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  2. Documentação & Idiomas
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  Compliance Migratório
                </span>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-white">Direito de trabalho:</strong> Cidadania europeia, visto válido, residência ou autorização de trabalho homologada no mercado de destino.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-white">Processos avançados:</strong> Também são avaliados profissionais em fase final de homologação documental ou obtenção de visto.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-white">Proficiência em idioma:</strong> Inglês profissional independente (B2/C1/C2) ou idioma exigido pela localidade de atuação.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-white">Mobilidade geográfica:</strong> Disponibilidade real para transição em Portugal, Espanha, Europa, Brasil ou regime Global Remote.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual Markets Tags */}
            <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs font-medium text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Portugal</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Espanha</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Europa Geral</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Brasil</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Global Remote</span>
            </div>
          </div>

        </div>

        {/* Action callout banner */}
        {onStartQualification && (
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">
                  Seu perfil atende aos critérios acima?
                </h4>
                <p className="text-xs text-slate-400">
                  Inicie a pré-qualificação confidencial para análise direta da equipe técnica.
                </p>
              </div>
            </div>

            <button
              onClick={onStartQualification}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm shrink-0"
            >
              <span>Verificar Meu Perfil</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
