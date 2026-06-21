import { useEffect, useState, useRef } from 'react';
import { useLang } from '../contexts/LangContext';
import './Nav.css';

const NAV_SECTIONS = [
  { id: 'lavori',   key: 'work'     },
  { id: 'chi-sono', key: 'about'    },
  { id: 'workflow', key: 'workflow' },
  { id: 'contatti', key: 'contact'  },
];

export default function Nav({ onSectionChange, onChiSonoHover }) {
  const { lang, tr } = useLang();
  const [activeId, setActiveId] = useState('');
  const [chiSonoHovered, setChiSonoHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

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

  /* Chiudi menu su Escape, gestisci focus trap */
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  /* Blocca scroll body quando menu aperto */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setActiveId(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChiSonoEnter = () => { setChiSonoHovered(true); onChiSonoHover?.(true); };
  const handleChiSonoLeave = () => { setChiSonoHovered(false); onChiSonoHover?.(false); };

  const ariaLabel = lang === 'it' ? 'Navigazione principale'
    : lang === 'pt' ? 'Navegação principal'
    : 'Main navigation';

  const burgerLabel = menuOpen
    ? (lang === 'it' ? 'Chiudi menu' : lang === 'pt' ? 'Fechar menu' : 'Close menu')
    : (lang === 'it' ? 'Apri menu' : lang === 'pt' ? 'Abrir menu' : 'Open menu');

  return (
    <header className="nav-header">
      {/* Desktop pill nav */}
      <nav
        className="nav-pill"
        aria-label={ariaLabel}
        aria-hidden={menuOpen ? undefined : undefined}
      >
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

      {/* Mobile hamburger button */}
      <button
        ref={burgerRef}
        className={`nav-burger${menuOpen ? ' nav-burger--open' : ''}`}
        aria-label={burgerLabel}
        aria-expanded={menuOpen}
        aria-controls="nav-mobile-menu"
        onClick={() => setMenuOpen(o => !o)}
        type="button"
      >
        <span className="nav-burger__bar" />
        <span className="nav-burger__bar" />
        <span className="nav-burger__bar" />
      </button>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          className="nav-mobile-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          id="nav-mobile-menu"
          ref={menuRef}
        >
          <nav aria-label={ariaLabel}>
            {NAV_SECTIONS.map(({ id, key }) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`nav-mobile-link${isActive ? ' nav-mobile-link--active' : ''}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => { e.preventDefault(); handleNavClick(id); }}
                >
                  {tr.nav[key]}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
