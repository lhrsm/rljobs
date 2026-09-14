import React, { useState, useEffect } from 'react';
import { SkipLink } from './components/ui/SkipLink';
import { Navbar } from './components/layout/Navbar';
import { ProfessionalsPage } from './components/pages/ProfessionalsPage';
import { B2BPage } from './components/pages/B2BPage';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/ui/Toast';
import { LeadsExportModal } from './components/mentoring/LeadsExportModal';
import { useJobs } from './context/JobContext';

type ViewMode = 'b2b' | 'professionals';

export const App: React.FC = () => {
  const { toastMessage } = useJobs();
  const [currentView, setCurrentView] = useState<ViewMode>('b2b');
  const [isLeadsExportOpen, setIsLeadsExportOpen] = useState(false);

  // Determina a view inicial a partir da URL (pathname ou hash)
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.includes('/profissionais') || path.includes('/career-mentoring') || hash.includes('#profissionais') || hash.includes('#vagas')) {
        setCurrentView('professionals');
      } else {
        setCurrentView('b2b');
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const handleNavigate = (view: ViewMode, sectionId?: string) => {
    // O mural de vagas fica exclusivamente em Profissionais
    const effectiveView = sectionId === 'vagas' ? 'professionals' : view;
    setCurrentView(effectiveView);

    // Atualiza a URL sem recarregar a página
    const targetPath = effectiveView === 'professionals' ? '/profissionais' : '/empresas';
    window.history.pushState({}, '', targetPath);

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* WCAG Accessible skip link */}
      <SkipLink />

      {/* Header com botões link padronizados */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenLeadsExport={() => setIsLeadsExportOpen(true)}
      />

      {/* Main Body */}
      <main id="main-content" className="flex-grow flex flex-col">
        {currentView === 'professionals' ? (
          <ProfessionalsPage
            onNavigateToJobs={() => handleNavigate('professionals', 'vagas')}
          />
        ) : (
          <B2BPage />
        )}
      </main>

      {/* Footer corporativo */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLeadsExport={() => setIsLeadsExportOpen(true)}
      />

      {/* Toast notifications */}
      {toastMessage && (
        <Toast
          message={toastMessage.text}
          type={toastMessage.type}
        />
      )}

      {/* Painel Administrativo de Leads */}
      {isLeadsExportOpen && (
        <LeadsExportModal onClose={() => setIsLeadsExportOpen(false)} />
      )}
    </div>
  );
};
