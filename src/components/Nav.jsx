import { useEffect, useState } from 'react';
import { useLang } from '../contexts/LangContext';
import './Nav.css';

const NAV_SECTIONS = [
  { id: 'lavori',   key: 'work'     },
  { id: 'chi-sono', key: 'about'    },
  { id: 'workflow', key: 'workflow' },
  { id: 'contatti', key: 'contact'  },
];

export default function Nav({ onSectionChange, onChiSonoHover }) {
  const { lang, toggleLang, tr } = useLang();
  const [activeId, setActiveId] = useState('');
  const [chiSonoHovered, setChiSonoHovered] = useState(false);

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

    // Quando si torna in cima → reset a default
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

  const handleNavClick = (id) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChiSonoEnter = () => {
    setChiSonoHovered(true);
    onChiSonoHover?.(true);
  };

  const handleChiSonoLeave = () => {
    setChiSonoHovered(false);
    onChiSonoHover?.(false);
  };

  return (
    <header className="nav-header" role="banner">
      <nav
        className="nav-pill"
        aria-label={
          lang === 'it' ? 'Navigazione principale'
          : lang === 'pt' ? 'Navegação principal'
          : 'Main navigation'
        }
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
              aria-current={isActive ? 'true' : undefined}
              onClick={(e) => { e.preventDefault(); handleNavClick(id); }}
              onMouseEnter={isAbout ? handleChiSonoEnter : undefined}
              onMouseLeave={isAbout ? handleChiSonoLeave : undefined}
            >
              {tr.nav[key]}{showQuestion ? '?' : ''}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
