import React from 'react';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="py-20 bg-white border-b border-slate-200" aria-labelledby="about-heading">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12">
          
          {/* Portrait: Authority & Executive Presence */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-md rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100">
              <img
                src="/img2.jpeg"
                alt="Ricardo Oliveira - International Headhunter"
                className="w-full h-[420px] sm:h-[480px] object-cover object-top block"
              />
            </div>
          </div>

          {/* Description Text */}
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed">
            <div className="p-5 rounded-xl bg-slate-50 border-l-4 border-blue-600 border-y border-r border-slate-200 text-slate-900 font-medium italic text-base sm:text-lg leading-relaxed shadow-2xs">
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

        {/* Closing Action Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl font-medium">
            {t.about.closing}
          </p>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* LinkedIn CTA */}
            <a
              href="https://www.linkedin.com/in/ricardosoaresoliveira/?locale=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#0077B5] hover:bg-[#006097] text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              <Linkedin className="w-4 h-4" />
              <span>{t.about.contactDirect}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/351926527934"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#075E54] hover:bg-[#054c44] text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              <span>{t.about.contactWhatsapp}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
