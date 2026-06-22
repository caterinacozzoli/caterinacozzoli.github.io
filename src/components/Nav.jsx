import { useEffect, useState, useRef } from 'react';
import { useLang } from '../contexts/LangContext';
import { FLAGS, FlagBtn } from './LangNav';
import './Nav.css';

const NAV_SECTIONS = [
  { id: 'lavori',   key: 'work'     },
  { id: 'chi-sono', key: 'about'    },
  { id: 'workflow', key: 'workflow' },
  { id: 'contatti', key: 'contact'  },
];

export default function Nav({ onSectionChange, onChiSonoHover, menuOpen, onMenuClose }) {
  const { lang, setLang, tr } = useLang();
  const [activeId, setActiveId] = useState('');
  const [chiSonoHovered, setChiSonoHovered] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const observers = [];
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
            onSectionChange?.(id);
          }
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const onScroll = () => {
      if (window.scrollY < 50) {
        setActiveId('');
        onSectionChange?.('');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observers.forEach(o => o.disconnect());
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* Escape chiude menu + focus trap dentro l'overlay */
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;

    const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const els = Array.from(menuRef.current.querySelectorAll(FOCUSABLE));
    if (els.length) els[0].focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') { onMenuClose?.(); return; }
      if (e.key !== 'Tab') return;
      const first = els[0];
      const last  = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen, onMenuClose]);

  /* Blocca scroll body quando menu aperto */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setActiveId(id);
    onMenuClose?.();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChiSonoEnter = () => { setChiSonoHovered(true); onChiSonoHover?.(true); };
  const handleChiSonoLeave = () => { setChiSonoHovered(false); onChiSonoHover?.(false); };

  const ariaLabel = lang === 'it' ? 'Navigazione principale'
    : lang === 'pt' ? 'Navegação principal'
    : 'Main navigation';

  const visibleFlags = Object.entries(FLAGS).filter(([code]) => code !== lang);

  return (
    <header className="nav-header">
      {/* Desktop pill nav — nascosta su mobile (≤768px) */}
      <nav className="nav-pill" aria-label={ariaLabel}>
        {NAV_SECTIONS.map(({ id, key }) => {
          const isActive = activeId === id;
          const isAbout = id === 'chi-sono';
          const showQuestion = isAbout && (chiSonoHovered || isActive);
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link${isActive ? ' nav-link--active' : ''}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={(e) => { e.preventDefault(); handleNavClick(id); }}
              onMouseEnter={isAbout ? handleChiSonoEnter : undefined}
              onMouseLeave={isAbout ? handleChiSonoLeave : undefined}
            >
              {tr.nav[key]}{showQuestion ? '?' : ''}
            </a>
          );
        })}
      </nav>

      {/* Mobile overlay menu — controllato da LangNav hamburger */}
      {menuOpen && (
        <div
          className="nav-mobile-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          id="nav-mobile-menu"
          ref={menuRef}
        >
          <nav className="nav-mobile-links" aria-label={ariaLabel}>
            {NAV_SECTIONS.map(({ id, key }, i) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`nav-mobile-link${isActive ? ' nav-mobile-link--active' : ''}`}
                  aria-current={isActive ? 'location' : undefined}
                  style={{ '--i': i }}
                  onClick={(e) => { e.preventDefault(); handleNavClick(id); }}
                >
                  {tr.nav[key]}
                </a>
              );
            })}
          </nav>

          {/* Flags in fondo al menu */}
          <div className="nav-mobile-flags" aria-label={lang === 'it' ? 'Seleziona lingua' : lang === 'pt' ? 'Selecionar idioma' : 'Select language'}>
            {visibleFlags.map(([code, config]) => (
              <FlagBtn
                key={code}
                code={code}
                config={config}
                onClick={() => { setLang(code); onMenuClose?.(); }}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
