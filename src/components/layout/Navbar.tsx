import React, { useState } from 'react';
import { Menu, X, Sparkles, Building2 } from 'lucide-react';
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
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (view: 'b2b' | 'professionals', sectionId?: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-md"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <button
            onClick={() => handleNav('b2b')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg p-1 text-left cursor-pointer"
            aria-label="RL Headhunter - Início"
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
          </button>

          {/* Desktop Links (Empresas | Profissionais | Vagas | Sobre | Contato) */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação Principal">
            
            {/* 1. Empresas */}
            <button
              onClick={() => handleNav('b2b')}
              className={`text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 py-1.5 px-3 rounded-lg cursor-pointer ${
                currentView === 'b2b'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Empresas</span>
            </button>

            {/* 2. Profissionais (Highlighted for B2C Mentoring) */}
            <button
              onClick={() => handleNav('professionals')}
              className={`text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 py-1.5 px-3 rounded-lg cursor-pointer ${
                currentView === 'professionals'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-blue-400 hover:text-blue-300 bg-blue-950/40 border border-blue-500/30 hover:bg-blue-900/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Profissionais</span>
            </button>

            {/* 3. Vagas */}
            <button
              onClick={() => handleNav(currentView, 'vagas')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Vagas
            </button>

            {/* 4. Sobre */}
            <button
              onClick={() => handleNav(currentView, 'sobre')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Sobre
            </button>

            {/* 5. Contato */}
            <button
              onClick={() => handleNav(currentView, 'contato')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Contato
            </button>
          </nav>

          {/* Right Controls: Language & Actions */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
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
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-2 animate-fadeIn">
          <button
            onClick={() => handleNav('b2b')}
            className={`w-full text-left font-bold py-2.5 px-3 rounded-lg flex items-center justify-between text-sm ${
              currentView === 'b2b' ? 'bg-slate-800 text-blue-400' : 'text-slate-200 hover:text-white'
            }`}
          >
            <span>Empresas (Recrutamento B2B)</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </button>

          <button
            onClick={() => handleNav('professionals')}
            className={`w-full text-left font-bold py-2.5 px-3 rounded-lg flex items-center justify-between text-sm ${
              currentView === 'professionals'
                ? 'bg-blue-600 text-white'
                : 'text-blue-400 bg-blue-950/40 border border-blue-500/30'
            }`}
          >
            <span>Profissionais (Mentoria & Job Hunting)</span>
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleNav(currentView, 'vagas')}
            className="w-full text-left font-semibold text-slate-300 py-2 px-3 hover:text-blue-400 text-sm"
          >
            Vagas Internacionais
          </button>

          <button
            onClick={() => handleNav(currentView, 'sobre')}
            className="w-full text-left font-semibold text-slate-300 py-2 px-3 hover:text-blue-400 text-sm"
          >
            Sobre Ricardo Oliveira
          </button>

          <button
            onClick={() => handleNav(currentView, 'contato')}
            className="w-full text-left font-semibold text-slate-300 py-2 px-3 hover:text-blue-400 text-sm"
          >
            Contato
          </button>

          {onOpenLeadsExport && (
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLeadsExport();
                }}
                className="w-full text-left text-xs text-slate-500 hover:text-slate-300 py-1 px-3"
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
