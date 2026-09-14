import React, { useState } from 'react';
import { HeroSection } from '../hero/HeroSection';
import { AboutSection } from '../about/AboutSection';
import { TestimonialsSection } from '../testimonials/TestimonialsSection';
import { HireTechTalentModal } from '../b2b/HireTechTalentModal';

export const B2BPage: React.FC = () => {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  return (
    <div className="flex-grow">
      {/* 1. Hero Principal com Apresentação Executiva para Empresas */}
      <HeroSection onOpenHireModal={() => setIsHireModalOpen(true)} />

      {/* 2. Sobre Ricardo Oliveira & Framework 360° */}
      <AboutSection />

      {/* 3. Depoimentos Verificados & Empresas Parceiras */}
      <TestimonialsSection />

      {/* Modal B2B: Contrate os Melhores Talentos Tech */}
      <HireTechTalentModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
      />
    </div>
  );
};
