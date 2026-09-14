import React from 'react';
import { HeroSection } from '../hero/HeroSection';
import { B2BSection } from '../b2b/B2BSection';
import { AboutSection } from '../about/AboutSection';
import { TestimonialsSection } from '../testimonials/TestimonialsSection';

export const B2BPage: React.FC = () => {
  return (
    <div className="flex-grow">
      {/* 1. Hero Principal com Apresentação Executiva para Empresas */}
      <HeroSection />

      {/* 2. Seção B2B de Recrutamento para Empresas & Formulário de Briefing Corporativo */}
      <B2BSection />

      {/* 3. Sobre Ricardo Oliveira & Framework 360° */}
      <AboutSection />

      {/* 4. Depoimentos Verificados & Empresas Parceiras */}
      <TestimonialsSection />
    </div>
  );
};
