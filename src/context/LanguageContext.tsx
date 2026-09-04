import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.pt;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('rl_language');
    return (saved === 'en' || saved === 'pt') ? saved : 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rl_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';

    // Dynamic Title & Meta Description on Language Switch
    if (language === 'en') {
      document.title = "RL Executive Search | Global Tech & Executive Headhunting | Ricardo Oliveira";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'International Executive Search and Headhunting led by Ricardo Oliveira. 540+ global remote tech positions in the US, Europe, and Brazil with USD and EUR compensation.');
      }
    } else {
      document.title = "RL Executive Search | Tech & Executive Headhunting Internacional | Ricardo Oliveira";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Executive Search e Headhunting Internacional liderado por Ricardo Oliveira. Mais de 540 vagas remotas em tecnologia para os EUA, Europa e Brasil com remuneração em Dólar e Euro (USD/EUR). Shortlist em 14 dias para empresas.');
      }
    }
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
