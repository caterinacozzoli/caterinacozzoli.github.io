import { createContext, useContext, useEffect, useState } from 'react';
import { t, LANG_CYCLE } from '../i18n/translations';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('it');
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  /* Ciclo IT → EN → PT → IT */
  const toggleLang = () => {
    const next = LANG_CYCLE[lang];
    setLang(next);
    setAnnouncement(t[next].langChanged);
  };

  const switchLang = (code) => {
    if (t[code]) {
      setLang(code);
      setAnnouncement(t[code].langChanged);
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang: switchLang, toggleLang, tr: t[lang], announcement }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
