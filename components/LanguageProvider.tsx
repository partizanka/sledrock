'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { languages, TranslationSchema } from '@/lib/languages';

type LangCode = 'ru' | 'by' | 'en';

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sled_band_lang') as LangCode;
      if (saved && (saved === 'ru' || saved === 'by' || saved === 'en')) {
        return saved;
      }
    }
    return 'ru';
  });
  const [mounted] = useState(true);

  const setLang = (newLang: LangCode) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sled_band_lang', newLang);
      document.documentElement.lang = newLang;
    }
  };

  // Graceful fallback during server-side rendering or before mounting
  const activeTranslation = languages[lang] || languages['ru'];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: activeTranslation }}>
      {/* Wrap children inside a span or container to avoid shifting while mounted is false */}
      <div className={`transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-90'}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
