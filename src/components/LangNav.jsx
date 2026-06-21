import { useLang } from '../contexts/LangContext';
import { t } from '../i18n/translations';
import './LangNav.css';

const SPRITE = '/images/flag-uk.png';
const BG_SIZE = '453px 192px';
export const FLAGS = {
  it: { bgPos: '-208px -130px', label: 'Italiano' },
  en: { bgPos: '-258px -130px', label: 'English' },
  pt: { bgPos: '-158px -130px', label: 'Português' },
};

export function FlagBtn({ code, config, onClick }) {
  return (
    <button
      className="lang-flag-btn"
      onClick={onClick}
      aria-label={config.label}
      type="button"
    >
      <span
        className="lang-flag"
        aria-hidden="true"
        style={{
          backgroundImage: `url('${SPRITE}')`,
          backgroundSize: BG_SIZE,
          backgroundPosition: config.bgPos,
          backgroundRepeat: 'no-repeat',
        }}
      />
    </button>
  );
}

export default function LangNav({ menuOpen, onMenuToggle }) {
  const { lang, setLang } = useLang();
  const visible = Object.entries(FLAGS).filter(([code]) => code !== lang);

  const burgerLabel = menuOpen
    ? (lang === 'it' ? 'Chiudi menu' : lang === 'pt' ? 'Fechar menu' : 'Close menu')
    : (lang === 'it' ? 'Apri menu' : lang === 'pt' ? 'Abrir menu' : 'Open menu');

  return (
    <nav className="lang-nav" aria-label={t[lang].langNav}>
      {/* Hamburger — visibile solo su mobile (≤768px via CSS) */}
      <button
        className={`lang-burger${menuOpen ? ' lang-burger--open' : ''}`}
        aria-label={burgerLabel}
        aria-expanded={menuOpen}
        aria-controls="nav-mobile-menu"
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
    </nav>
  );
}
