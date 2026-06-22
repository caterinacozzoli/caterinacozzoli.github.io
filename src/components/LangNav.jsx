import { useRef, useEffect } from 'react';
import { useLang } from '../contexts/LangContext';
import { t } from '../i18n/translations';
import AccessibilityWidget from './AccessibilityWidget';
import './LangNav.css';

export const FLAGS = {
  it: { bgPos: '-208px -130px', label: 'Italiano' },
  en: { bgPos: '-258px -130px', label: 'English' },
  pt: { bgPos: '-158px -130px', label: 'Português' },
};

export function FlagBtn({ code, config, onClick }) {
  const src = `/images/flags/flag-${code === 'en' ? 'uk' : code}.png`;
  return (
    <button
      className="lang-flag-btn"
      onClick={onClick}
      aria-label={config.label}
      type="button"
    >
      <img
        src={src}
        className="lang-flag"
        alt=""
        aria-hidden="true"
      />
    </button>
  );
}

export default function LangNav({ menuOpen, onMenuToggle }) {
  const { lang, setLang } = useLang();
  const visible = Object.entries(FLAGS).filter(([code]) => code !== lang);
  const burgerRef = useRef(null);
  const wasOpen = useRef(false);

  /* Ritorna focus al burger quando il menu si chiude */
  useEffect(() => {
    if (wasOpen.current && !menuOpen) {
      setTimeout(() => burgerRef.current?.focus(), 0);
    }
    wasOpen.current = menuOpen;
  }, [menuOpen]);

  const burgerLabel = menuOpen
    ? (lang === 'it' ? 'Chiudi menu' : lang === 'pt' ? 'Fechar menu' : 'Close menu')
    : (lang === 'it' ? 'Apri menu' : lang === 'pt' ? 'Abrir menu' : 'Open menu');

  return (
    <nav className="lang-nav" aria-label={t[lang].langNav}>
      {/* Hamburger — visibile solo su mobile (≤768px via CSS) */}
      <button
        ref={burgerRef}
        className={`lang-burger${menuOpen ? ' lang-burger--open' : ''}`}
        aria-label={burgerLabel}
        aria-expanded={menuOpen}
        onClick={onMenuToggle}
        type="button"
      >
        <span className="lang-burger__bar" />
        <span className="lang-burger__bar" />
        <span className="lang-burger__bar" />
      </button>

      {/* Flags — visibili solo su desktop (>768px via CSS) */}
      <div className="lang-flags">
        {visible.map(([code, config]) => (
          <FlagBtn
            key={code}
            code={code}
            config={config}
            onClick={() => setLang(code)}
          />
        ))}
      </div>

      {/* ♿ Accessibilità — sempre visibile (desktop + mobile) */}
      <div className="lang-a11y-wrap">
        <AccessibilityWidget />
      </div>
    </nav>
  );
}
