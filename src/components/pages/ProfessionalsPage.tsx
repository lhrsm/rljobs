import React, { useState } from 'react';
import { MentoringHero } from '../mentoring/MentoringHero';
import { MentoringFitSection } from '../mentoring/MentoringFitSection';
import { MentoringDeliverables } from '../mentoring/MentoringDeliverables';
import { QualificationModal } from '../mentoring/QualificationModal';
import { SubmissionResultModal } from '../mentoring/SubmissionResultModal';
import { JobBoard } from '../jobs/JobBoard';
import { AboutSection } from '../about/AboutSection';
import { TestimonialsSection } from '../testimonials/TestimonialsSection';
import { MentoringLeadSubmission } from '../../types/mentoring';

interface ProfessionalsPageProps {
  onNavigateToJobs?: () => void;
}

export const ProfessionalsPage: React.FC<ProfessionalsPageProps> = () => {
  const [isQualificationModalOpen, setIsQualificationModalOpen] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<MentoringLeadSubmission | null>(null);

  const handleOpenModal = () => {
    setIsQualificationModalOpen(true);
  };

  const handleScrollToJobs = () => {
    const el = document.getElementById('vagas');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex-grow">
      {/* 1. Hero: International Job Hunting & Career Mentoring (Dois botões: Abrir Modal + Ver Vagas) */}
      <MentoringHero
        onStartQualification={handleOpenModal}
        onViewJobs={handleScrollToJobs}
      />

      {/* 2. Bloco: Este programa é para você? (Arquitetura editorial moderna) */}
      <MentoringFitSection onStartQualification={handleOpenModal} />

      {/* 3. Bloco: O que o programa entrega (Metodologia estruturada em 3 fases) */}
      <MentoringDeliverables />

      {/* 4. Mural de Vagas em Destaque (exclusivo para profissionais) */}
      <JobBoard />

      {/* 5. Sobre Ricardo Oliveira */}
      <AboutSection />

      {/* 6. Depoimentos e Resultados */}
      <TestimonialsSection />

      {/* Modal de Pré-Qualificação de 24 Campos */}
      <QualificationModal
        isOpen={isQualificationModalOpen}
        onClose={() => setIsQualificationModalOpen(false)}
        onSuccess={(submission) => setSubmissionResult(submission)}
      />

      {/* Modal de resultado pós-envio com triagem de leads A, B e C */}
      {submissionResult && (
        <SubmissionResultModal
          submission={submissionResult}
          onClose={() => setSubmissionResult(null)}
          onViewJobs={handleScrollToJobs}
        />
      )}
    </div>
  );
};
