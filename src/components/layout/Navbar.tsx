import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg p-1"
            aria-label="Ricardo Oliveira - Início"
          >
            <div className="w-9 h-9 bg-white rounded-xl p-1 flex items-center justify-center shadow-sm">
              <img src="/RL Jobs.png" alt="RL Logo" className="w-7 h-7 object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-extrabold text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                Ricardo Oliveira
              </span>
              <span className="text-[10px] font-semibold text-blue-400 tracking-wider uppercase">
                International Headhunter
              </span>
            </div>
          </a>

          {/* Desktop Links (Clean & Direct: Vagas & Sobre) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação Principal">
            <button
              onClick={() => scrollToSection('vagas')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
            >
              {t.nav.jobs}
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
            >
              {t.nav.about}
            </button>
          </nav>

          {/* Right: Language Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5">
              <button
                onClick={() => setLanguage('pt')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  language === 'pt'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Português"
              >
                PT
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
                aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-2">
          <button
            onClick={() => scrollToSection('vagas')}
            className="w-full text-left font-semibold text-slate-200 py-2 hover:text-blue-400"
          >
            {t.nav.jobs}
          </button>
          <button
            onClick={() => scrollToSection('sobre')}
            className="w-full text-left font-semibold text-slate-200 py-2 hover:text-blue-400"
          >
            {t.nav.about}
          </button>
        </div>
      )}
    </header>
  );
};
