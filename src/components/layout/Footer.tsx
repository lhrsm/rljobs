import React from 'react';
import { Mail, MapPin, Linkedin, ArrowUpRight, ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-12 text-xs" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-900">
          {/* Column 1: Executive Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-base font-bold text-white tracking-tight block">
                Ricardo Oliveira
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-wider uppercase block mt-0.5">
                International Headhunter & Career Mentor
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="text-[11px] text-slate-500 font-medium pt-1">
              Conformidade com LGPD (Brasil) & GDPR (União Europeia)
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#vagas" className="hover:text-white transition-colors">
                  {t.nav.jobs}
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  {t.nav.about}
                </a>
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
                <span>São Paulo (Brasil)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Miami (Estados Unidos)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Lisboa (Europa)</span>
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
                  href="https://wa.me/351926527934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-emerald-500 font-bold">WhatsApp:</span>
                  <span>+351 926 527 934</span>
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
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} RL Executive Search. {t.footer.allRights}
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-slate-300 transition-colors focus-ring rounded p-1"
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
