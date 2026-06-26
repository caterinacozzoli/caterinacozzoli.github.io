import { useRef, useEffect, useState } from 'react';
import { useLang } from '../contexts/LangContext';
import './Works.css';


const PROJECTS = [
  {
    id: 'libraccio',
    title: 'Libraccio',
    year: '2026',
    description: {
      it: "UX Research e redesign del flusso d'acquisto scolastico su libraccio.it.",
      en: "UX Research and redesign of the school book shopping flow on libraccio.it.",
      pt: "UX Research e redesign do fluxo de compra de livros escolares no libraccio.it.",
    },
    image: '/images/folders/folder-libraccio.png',
    openImage: '/images/folders/folder-libraccio-open.png',
    fallback: '/images/projects/libraccio.svg',
    tags: ['UX Research', 'Figma', 'Usabilità', 'Benchmark', 'Website'],
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
    description: {
      it: "App mobile co-fondata per trovare eventi, associazioni e lavoro inclusivo.",
      en: "Co-founded mobile app for inclusive events, associations and job listings.",
      pt: "App mobile co-fundada para eventos, associações e trabalho inclusivo.",
    },
    image: '/images/folders/folder-abilicity.png',
    openImage: '/images/folders/folder-abilicity-open.png',
    fallback: '/images/projects/abili-city.svg',
    tags: ['UI', 'Figma', 'Lovable', 'Mobile App', 'Accessibilità'],
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
    description: {
      it: "App mobile per persone daltoniche: scanner di colori e ricerca UX sul daltonismo.",
      en: "Mobile app for colorblind people: real-time color scanner backed by UX research.",
      pt: "App mobile para daltônicos: scanner de cores em tempo real e pesquisa UX.",
    },
    image: '/images/folders/folder-qualia.png',
    openImage: '/images/folders/folder-qualia-open.png',
    fallback: '/images/projects/progetto-3.svg',
    tags: ['XR', 'Figma', 'Antigravity', 'Claude Code', 'UX Research', 'Accessibilità'],
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
                      <picture className="project-folder-closed">
                        <source srcSet={p.image.replace('.png', '.avif')} type="image/avif" />
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
                      </picture>
                      <picture className="project-folder-open">
                        <source srcSet={p.openImage.replace('.png', '.avif')} type="image/avif" />
                        <img
                          src={p.openImage}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                        />
                      </picture>
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
                        <div
                          key={si}
                          className="project-sticker-static"
                          style={s.style}
                        >
                          <img src={s.src} aria-hidden="true" className="project-sticker-img" />
                        </div>
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
                    {p.description && (
                      <p className="project-desc">
                        {p.description[lang] ?? p.description.it}
                      </p>
                    )}
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
