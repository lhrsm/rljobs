import React from 'react';
import { ArrowDown } from 'lucide-react';

interface MentoringHeroProps {
  onStartQualification: () => void;
}

export const MentoringHero: React.FC<MentoringHeroProps> = ({ onStartQualification }) => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Service Label */}
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block">
              International Job Hunting & Career Mentoring
            </span>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Sua experiência já está pronta para o mercado internacional?
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Programa personalizado de Job Hunting e posicionamento internacional para profissionais experientes que já possuem cidadania europeia, visto, residência ou autorização válida de trabalho no mercado-alvo, ou que estejam em fase avançada de obtenção da documentação.
            </p>

            {/* Markets in highlight */}
            <div className="pt-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Mercados em Destaque:
              </div>
              <p className="text-sm font-medium text-slate-200">
                Portugal • Espanha • Europa • Brasil • Global Remote
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onStartQualification}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-sm"
              >
                <span>VERIFICAR SE MEU PERFIL É ELEGÍVEL</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <span className="text-xs text-slate-400">
                Avaliação confidencial de perfil e viabilidade
              </span>
            </div>
          </div>

          {/* Right Column: Executive Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              <img
                src="/img.jpeg"
                alt="Ricardo Oliveira"
                className="w-full h-[420px] object-cover object-top block"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
