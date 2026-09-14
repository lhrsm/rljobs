import React from 'react';
import { Mail, MapPin, Linkedin, ArrowUpRight, ArrowUp, ShieldCheck, Database } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onNavigate?: (view: 'b2b' | 'professionals', sectionId?: string) => void;
  onOpenLeadsExport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLeadsExport }) => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contato" className="bg-slate-950 text-slate-400 pt-20 pb-12 text-xs scroll-mt-20" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-900">
          
          {/* Column 1: Executive Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-base font-bold text-white tracking-tight block">
                Ricardo Oliveira
              </span>
              <span className="text-xs text-blue-400 font-semibold tracking-wider uppercase block mt-0.5">
                RL Headhunter • International Tech Headhunting & Career Strategy
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="text-[11px] text-slate-500 font-medium pt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Conformidade com LGPD (Brasil) & GDPR (União Europeia)</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-4">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('b2b')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Empresas (Recrutamento B2B)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('professionals')}
                  className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Profissionais (Mentoria & Job Hunting)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('b2b', 'vagas')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mural de Vagas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('b2b', 'sobre')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sobre Ricardo Oliveira
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Global Hubs */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-4">
              Presença
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Lisboa / Porto (Portugal)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Madrid / Barcelona (Espanha)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>São Paulo (Brasil)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Miami (Estados Unidos)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contacts */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-4">
              {t.footer.contact}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="mailto:contato@licenciadorh.com.br"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">contato@licenciadorh.com.br</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ricardosoaresoliveira/?locale=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                  <span>LinkedIn Oficial</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              {onOpenLeadsExport && (
                <li className="pt-2">
                  <button
                    onClick={onOpenLeadsExport}
                    className="text-[11px] text-slate-500 hover:text-blue-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Database className="w-3 h-3" />
                    <span>Painel Interno de Leads</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} RL Headhunter & Executive Search. {t.footer.allRights}
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-slate-300 transition-colors focus-ring rounded p-1 cursor-pointer"
            >
              <span>{t.common.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
