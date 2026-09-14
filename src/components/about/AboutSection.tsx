import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface AboutSectionProps {
  variant?: 'white' | 'gray';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ variant = 'white' }) => {
  const { t } = useLanguage();
  const isGray = variant === 'gray';

  return (
    <section
      id="sobre"
      className={`py-20 border-b border-slate-200 transition-colors ${
        isGray ? 'bg-slate-50' : 'bg-white'
      }`}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 block mb-1">
            {t.about.badge}
          </span>
          <h2 id="about-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            {t.about.title}
          </h2>
        </div>

        {/* Narrative & Authority Portrait Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Portrait: Authority & Executive Presence */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className={`w-full max-w-md rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl ${
              isGray ? 'bg-white' : 'bg-slate-100'
            }`}>
              <img
                src="/img2.jpeg"
                alt="Ricardo Oliveira - International Headhunter"
                className="w-full h-[420px] sm:h-[480px] object-cover object-top block"
              />
            </div>
          </div>

          {/* Description Text */}
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed">
            <div className={`p-5 rounded-xl border-l-4 border-blue-600 border-y border-r border-slate-200 text-slate-900 font-medium italic text-base sm:text-lg leading-relaxed shadow-xs ${
              isGray ? 'bg-white' : 'bg-slate-50'
            }`}>
              "{t.about.p1}"
            </div>
            
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {t.about.p2}
            </p>
            
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {t.about.p3}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
