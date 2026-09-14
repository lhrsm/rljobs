import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  currentView: 'b2b' | 'professionals';
  onNavigate: (view: 'b2b' | 'professionals', sectionId?: string) => void;
  onOpenLeadsExport?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenLeadsExport,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (view: 'b2b' | 'professionals', sectionId?: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <button
            onClick={() => handleNav('b2b')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg p-1 text-left cursor-pointer"
            aria-label="Ricardo Oliveira - Início"
          >
            <img 
              src="/RL Jobs.png" 
              alt="RL Logo" 
              className="w-8 h-8 object-contain transition-transform group-hover:scale-105" 
            />
            <div className="flex flex-col text-left">
              <span className="text-base font-extrabold text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                Ricardo Oliveira
              </span>
              <span className="text-[10px] font-semibold text-blue-400 tracking-wider uppercase">
                International Headhunter
              </span>
            </div>
          </button>

          {/* Desktop Links: Empresas | Profissionais | Vagas | Sobre | Contato */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação Principal">
            {/* 1. Empresas */}
            <button
              onClick={() => handleNav('b2b')}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                currentView === 'b2b'
                  ? 'text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.nav.companies}
            </button>

            {/* 2. Profissionais */}
            <button
              onClick={() => handleNav('professionals')}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                currentView === 'professionals'
                  ? 'text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.nav.professionals}
            </button>

            {/* 3. Vagas */}
            <button
              onClick={() => handleNav('professionals', 'vagas')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.jobs}
            </button>

            {/* 4. Sobre */}
            <button
              onClick={() => handleNav(currentView, 'sobre')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.about}
            </button>

            {/* 5. Contato */}
            <button
              onClick={() => handleNav(currentView, 'contato')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Right Controls: Language Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5">
              <button
                onClick={() => setLanguage('pt')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
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
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
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
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-3 animate-fadeIn text-left">
          <button
            onClick={() => handleNav('b2b')}
            className={`w-full text-left text-sm font-semibold transition-colors py-1 ${
              currentView === 'b2b' ? 'text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.nav.companies}
          </button>

          <button
            onClick={() => handleNav('professionals')}
            className={`w-full text-left text-sm font-semibold transition-colors py-1 ${
              currentView === 'professionals' ? 'text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.nav.professionals}
          </button>

          <button
            onClick={() => handleNav('professionals', 'vagas')}
            className="w-full text-left text-sm font-semibold text-slate-300 hover:text-white transition-colors py-1"
          >
            {t.nav.jobs}
          </button>

          <button
            onClick={() => handleNav(currentView, 'sobre')}
            className="w-full text-left text-sm font-semibold text-slate-300 hover:text-white transition-colors py-1"
          >
            {t.nav.about}
          </button>

          <button
            onClick={() => handleNav(currentView, 'contato')}
            className="w-full text-left text-sm font-semibold text-slate-300 hover:text-white transition-colors py-1"
          >
            {t.nav.contact}
          </button>

          {onOpenLeadsExport && (
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLeadsExport();
                }}
                className="w-full text-left text-xs text-slate-500 hover:text-slate-300 py-1"
              >
                Painel Interno de Leads (CSV)
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
