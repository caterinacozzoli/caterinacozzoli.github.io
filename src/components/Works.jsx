import { useRef, useEffect, useState } from 'react';
import { useLang } from '../contexts/LangContext';
import './Works.css';


const PROJECTS = [
  {
    id: 'libraccio',
    title: 'Libraccio',
    year: '2026',
    image: '/images/folders/folder-libraccio.png',
    fallback: '/images/projects/libraccio.svg',
    tags: ['UX Research', 'Wireframing', 'Figma', 'Benchmark'],
    stickers: [
      { src: '/images/sticker/sticker tag.png', link: 'https://students.talentgarden.com/talents/recaSrSfzZxkuRi1X', style: { bottom: '15%', right: '18%', width: '22%', transform: 'rotate(8deg)' } },
    ],
    size: 'small',
    top: 30,
    left: 28,
    tilt: -2.5,
  },
  {
    id: 'abili-city',
    title: 'AbiliCity',
    year: '2023–',
    image: '/images/folders/folder-abilicity.png',
    fallback: '/images/projects/abili-city.svg',
    tags: ['UX/UI', 'Mobile App', 'Accessibility', 'Web App'],
    stickers: [
      { src: '/images/sticker/sticker abilicity.png', link: 'https://www.abilicity.com/', style: { bottom: '14%', right: '16%', width: '22%', transform: 'rotate(6deg)' } },
      { src: '/images/sticker/sticker parlameneto.png', link: 'https://psicologia.unimib.it/it/news/abilicity-lapplicazione-tutti-nata-bicocca-e-sbarcata-al-parlamento-europeo', style: { bottom: '32%', left: '16%', width: '20%', transform: 'rotate(-5deg)' } },
    ],
    size: 'small',
    top: 300,
    left: 72,
    tilt: 2,
  },
  {
    id: 'qualia',
    title: 'Qualia',
    year: '—',
    image: '/images/folders/folder-qualia.png',
    fallback: '/images/projects/progetto-3.svg',
    tags: ['UX/UI', 'Figma'],
    stickers: [
      { src: '/images/sticker/sticker tag.png', link: 'https://students.talentgarden.com/talents/recaSrSfzZxkuRi1X', style: { bottom: '15%', right: '18%', width: '22%', transform: 'rotate(-7deg)' } },
    ],
    size: 'small',
    top: 570,
    left: 28,
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

const OPEN_LABEL = {
  it: (title) => `Apri case study: ${title}`,
  en: (title) => `Open case study: ${title}`,
  pt: (title) => `Abrir case study: ${title}`,
};
const FOLDER_ALT = {
  it: (title) => `Cartella progetto ${title}`,
  en: (title) => `Project folder for ${title}`,
  pt: (title) => `Pasta do projeto ${title}`,
};

export default function Works({ onOpenProject }) {
  const { lang } = useLang();
  const [gridRef, revealed] = useReveal(0.08);

  return (
    <section id="lavori" className="works" aria-labelledby="works-title">
      <div className="works-header">
        <h2 id="works-title" className="works-title">
          {lang === 'it' ? 'I miei progetti' : lang === 'pt' ? 'Meus projetos' : 'My projects'}
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
                  <div className="project-frame-container">
                    <button
                      className="project-frame"
                      onClick={() => onOpenProject?.(p.id)}
                      aria-label={(OPEN_LABEL[lang] ?? OPEN_LABEL.en)(p.title)}
                    >
                      <img
                        src={p.image}
                        alt={(FOLDER_ALT[lang] ?? FOLDER_ALT.en)(p.title)}
                        loading="lazy"
                        onError={(e) => {
                          if (p.fallback && e.target.src !== p.fallback) {
                            e.target.src = p.fallback;
                          }
                        }}
                      />
                    </button>
                    {/* Stickers sovrapposti alla cartella */}
                    {p.stickers?.map((s, si) => (
                      s.link ? (
                        <a
                          key={si}
                          href={s.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-sticker-link"
                          style={s.style}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Apri link sticker ${si + 1}`}
                        >
                          <img src={s.src} aria-hidden="true" className="project-sticker-img" />
                        </a>
                      ) : (
                        <img
                          key={si}
                          src={s.src}
                          aria-hidden="true"
                          className="project-sticker"
                          style={s.style}
                        />
                      )
                    ))}
                    {p.badge && (
                      <span className="project-badge">{p.badge}</span>
                    )}
                  </div>
                  <footer className="project-footer" onClick={() => onOpenProject?.(p.id)}>
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
