import React, { useState } from 'react';
import { MentoringHero } from '../mentoring/MentoringHero';
import { MentoringFitSection } from '../mentoring/MentoringFitSection';
import { MentoringDeliverables } from '../mentoring/MentoringDeliverables';
import { QualificationForm } from '../mentoring/QualificationForm';
import { SubmissionResultModal } from '../mentoring/SubmissionResultModal';
import { JobBoard } from '../jobs/JobBoard';
import { AboutSection } from '../about/AboutSection';
import { TestimonialsSection } from '../testimonials/TestimonialsSection';
import { MentoringLeadSubmission } from '../../types/mentoring';

interface ProfessionalsPageProps {
  onNavigateToJobs: () => void;
}

export const ProfessionalsPage: React.FC<ProfessionalsPageProps> = () => {
  const [submissionResult, setSubmissionResult] = useState<MentoringLeadSubmission | null>(null);

  const handleScrollToQualification = () => {
    const el = document.getElementById('pre-qualificacao');
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
      {/* 1. Hero: International Job Hunting & Career Mentoring */}
      <MentoringHero onStartQualification={handleScrollToQualification} />

      {/* 2. Bloco: Este programa é para você? (8 critérios objetivos) */}
      <MentoringFitSection />

      {/* 3. Bloco: O que o programa entrega (9 pilares + aviso legal) */}
      <MentoringDeliverables />

      {/* 4. Formulário de Pré-Qualificação (24 campos com triagem A/B/C) */}
      <QualificationForm onSuccess={(submission) => setSubmissionResult(submission)} />

      {/* 5. Mural de Vagas em Destaque (exclusivo para profissionais) */}
      <JobBoard />

      {/* 6. Sobre Ricardo Oliveira */}
      <AboutSection />

      {/* 7. Depoimentos e Resultados de Candidatos */}
      <TestimonialsSection />

      {/* Modal de resultado pós-envio */}
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
