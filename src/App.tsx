import React from 'react';
import { SkipLink } from './components/ui/SkipLink';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { JobBoard } from './components/jobs/JobBoard';
import { AboutSection } from './components/about/AboutSection';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/ui/Toast';
import { useJobs } from './context/JobContext';

export const App: React.FC = () => {
  const { toastMessage } = useJobs();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* WCAG Accessible skip link */}
      <SkipLink />

      {/* Distinct Dark Executive Header */}
      <Navbar />

      {/* Main Body */}
      <main id="main-content" className="flex-grow">
        {/* 1. Hero Section (Clean Photo, Direct CTAs: Vagas + WhatsApp) */}
        <HeroSection />

        {/* 2. Interactive Job Board */}
        <JobBoard />

        {/* 3. About Ricardo Oliveira & Process */}
        <AboutSection />

        {/* 4. Verified Testimonials & Partners */}
        <TestimonialsSection />
      </main>

      {/* Distinct Dark Footer */}
      <Footer />

      {/* Toast notifications */}
      {toastMessage && (
        <Toast
          message={toastMessage.text}
          type={toastMessage.type}
        />
      )}
    </div>
  );
};
