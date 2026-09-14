import React from 'react';
import { Shield, Globe, Award, ArrowDown, CheckCircle2 } from 'lucide-react';

interface MentoringHeroProps {
  onStartQualification: () => void;
}

export const MentoringHero: React.FC<MentoringHeroProps> = ({ onStartQualification }) => {
  const markets = [
    'Portugal',
    'Espanha',
    'Europa',
    'Brasil',
    'Global Remote',
  ];

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white overflow-hidden border-b border-slate-800">
      {/* Background Subtle Highlights */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Service Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider shadow-inner">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>International Job Hunting & Career Mentoring</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Sua experiência já está pronta para o mercado internacional?
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Programa personalizado de Job Hunting e posicionamento internacional para profissionais experientes que já possuem cidadania europeia, visto, residência ou autorização válida de trabalho no mercado-alvo, ou que estejam em fase avançada de obtenção da documentação.
            </p>

            {/* Markets in highlight */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Mercados em Destaque:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {markets.map((market) => (
                  <span
                    key={market}
                    className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-xs font-medium text-slate-200"
                  >
                    {market}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Condução estratégica direta de Ricardo Oliveira</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Foco em remuneração compatível (USD/EUR)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Filtragem rigorosa: vagas reais e bilaterais</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Acompanhamento ponta a ponta até a proposta</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onStartQualification}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-extrabold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all transform active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                id="btn-verificar-elegibilidade"
              >
                <span>VERIFICAR SE MEU PERFIL É ELEGÍVEL</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Análise de pré-qualificação sigilosa e sem compromisso</span>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Portrait & Trust Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-800">
                <img
                  src="/img.jpeg"
                  alt="Ricardo Oliveira - Headhunter & Career Mentor"
                  className="w-full h-[400px] sm:h-[460px] object-cover object-top block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                {/* Floating caption card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-lg text-left">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>Ricardo Oliveira</span>
                    <span className="text-[10px] text-blue-400 uppercase font-semibold">12+ Anos Global Search</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    Orientação executiva para profissionais que buscam reposicionamento nos mercados europeu e internacional.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
