import { useRef, useEffect, useState } from 'react';
import { useLang } from '../contexts/LangContext';
import './Works.css';

const PROJECTS = [
  {
    id: 'libraccio',
    title: 'Libraccio',
    year: '2026',
    image: '/images/folder-libraccio.png',
    fallback: '/images/projects/libraccio.svg',
    tags: ['UX Research', 'Wireframing', 'Figma', 'Benchmark'],
    size: 'large',
    top: 60,
    left: 28,
    tilt: -2,
  },
  {
    id: 'abili-city',
    title: 'AbiliCity',
    year: '2023–',
    image: '/images/folder-abilicity.png',
    fallback: '/images/projects/abili-city.svg',
    tags: ['UX/UI', 'Mobile App', 'Accessibility', 'Web App'],
    size: 'small',
    top: 320,
    left: 76,
    tilt: 1.5,
    badge: '🏛 Parlamento Europeo',
  },
  {
    id: 'qualia',
    title: 'Qualia',
    year: '—',
    image: '/images/folder-qualia.png',
    fallback: '/images/projects/progetto-3.svg',
    tags: ['UX/UI', 'Figma'],
    size: 'small',
    top: 900,
    left: 22,
    tilt: -1.5,
  },
];

/* One-shot IntersectionObserver reveal hook */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, revealed];
}

export default function Works() {
  const { lang } = useLang();
  const [gridRef, revealed] = useReveal(0.08);

  return (
    <section id="lavori" className="works" aria-labelledby="works-title">
      <div className="works-header">
        <h2 id="works-title" className="works-title">
          {lang === 'it' ? 'I miei lavori' : lang === 'pt' ? 'Meu trabalho' : 'My work'}
        </h2>
        <span className="works-count" aria-hidden="true">02</span>
      </div>

      <div className="works-board">
        <div className="works-stage">
          <ul
            ref={gridRef}
            className={`works-grid${revealed ? ' works-grid--revealed' : ''}`}
            role="list"
          >
            {PROJECTS.map((p, i) => (
              <li
                key={p.id}
                className={`project-item project-item--${p.size}`}
                style={{
                  top: `${p.top}px`,
                  left: `${p.left}%`,
                  '--tilt': `${p.tilt}deg`,
                  '--i': i,
                }}
              >
                <article aria-labelledby={`pt-${p.id}`}>
                  <div className="project-frame">
                    <img
                      src={p.image}
                      alt={`Anteprima ${p.title}`}
                      loading="lazy"
                      onError={(e) => {
                        if (p.fallback && e.target.src !== p.fallback) {
                          e.target.src = p.fallback;
                        }
                      }}
                    />
                    {p.badge && (
                      <span className="project-badge">{p.badge}</span>
                    )}
                  </div>
                  <footer className="project-footer">
                    <h3 id={`pt-${p.id}`} className="project-name">
                      {p.title}
                      <span aria-hidden="true"> →</span>
                    </h3>
                    <ul className="project-chips" aria-label="Categorie">
                      {p.tags.map(tag => (
                        <li key={tag} className="chip">{tag}</li>
                      ))}
                    </ul>
                  </footer>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
