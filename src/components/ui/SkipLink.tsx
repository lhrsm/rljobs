import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const SkipLink: React.FC = () => {
  const { language } = useLanguage();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
    >
      {language === 'pt' ? 'Pular para o conteúdo principal' : 'Skip to main content'}
    </a>
  );
};
