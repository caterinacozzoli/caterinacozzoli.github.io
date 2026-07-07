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
    folderBack: '/images/cartelle/parte dietro libraccio.png',
    folderFront: '/images/cartelle/partedavantilibraccio.png',
    tags: ['UX Research', 'Figma', 'Usabilità', 'Benchmark', 'Website'],
    files: [{ text: 'Libraccio.pdf' }],
    stickers: [
      { src: '/images/sticker/sticker tag.png', link: 'https://students.talentgarden.com/talents/recaSrSfzZxkuRi1X', style: { bottom: '15%', right: '18%', width: '30%', transform: 'rotate(8deg)' } },
    ],
    size: 'small',
    top: 160,
    left: 20,
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
    folderBack: '/images/cartelle/parte dietroabilicity.png',
    folderFront: '/images/cartelle/partedavantiabilicity.png',
    tags: ['UI', 'Figma', 'Lovable', 'Mobile App', 'Accessibilità'],
    files: [{ text: 'AbiliCity.pdf' }],
    stickers: [
      { src: '/images/sticker/sticker abilicity.png', link: 'https://www.abilicity.com/', style: { bottom: '14%', right: '16%', width: '30%', transform: 'rotate(6deg)' } },
      { src: '/images/sticker/sticker parlameneto.png', link: 'https://psicologia.unimib.it/it/news/abilicity-lapplicazione-tutti-nata-bicocca-e-sbarcata-al-parlamento-europeo', style: { bottom: '32%', left: '16%', width: '27%', transform: 'rotate(-5deg)' } },
    ],
    size: 'small',
    top: 312,
    left: 'calc(72% - 24px)',
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
    folderBack: '/images/cartelle/parte dietroqualia.png',
    folderFront: '/images/cartelle/partedavantiqualia.png',
    tags: ['XR', 'Figma', 'Antigravity', 'Claude Code', 'UX Research', 'Accessibilità'],
    files: [{ text: 'Qualia.pdf' }],
    stickers: [
      { src: '/images/sticker/sticker tag.png', link: 'https://students.talentgarden.com/talents/recaSrSfzZxkuRi1X', style: { bottom: '15%', right: '18%', width: '30%', transform: 'rotate(-7deg)' } },
    ],
    size: 'small',
    top: 704,
    left: 'calc(30% + 62px)',
    tilt: -1.5,
  },
  {
    id: 'sandbox',
    title: 'Sandbox',
    year: '—',
    description: {
      it: "Quattro file: workshop rapidi, ricerca pura e un mondo voxel, senza vetrina.",
      en: "Four files: rapid workshops, pure research and a voxel world, no showcase.",
      pt: "Quatro arquivos: workshops rápidos, pesquisa pura e um mundo voxel, sem vitrine.",
    },
    image: '/images/projects/progetto-3.svg',
    openImage: '/images/projects/progetto-3.svg',
    fallback: '/images/projects/progetto-3.svg',
    folderBack: '/images/cartelle/parte dietroricerche.png',
    folderFront: '/images/cartelle/partedavantiricerche.png',
    tags: ['UX Research', 'Workshop', 'Voxel'],
    files: [{ text: 'Hestia.pdf' }, { text: 'UNICEF.pdf' }, { text: 'Sefora.pdf' }, { text: 'MindTheCraft.mcworld' }],
    size: 'small',
    top: 800,
    left: 'calc(78% + 84px)',
    tilt: 1.5,
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

const SIGNATURE = {
  it: 'Non una galleria. Quattro storie, un perché diverso ogni volta.',
  en: 'Not a gallery. Four stories, a different why each time.',
  pt: 'Não uma galeria. Quatro histórias, um porquê diferente a cada vez.',
};

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
        <div className="works-header-left">
          <h2 id="works-title" className="works-title">
            {lang === 'it' ? 'I miei progetti' : lang === 'pt' ? 'Meus projetos' : 'My projects'}
          </h2>
        </div>
        <span className="works-count" aria-hidden="true">01</span>
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
                className={`project-item project-item--${p.size} project-item--${p.id}`}
                style={{
                  top: typeof p.top === 'number' ? `${p.top}px` : p.top,
                  left: typeof p.left === 'number' ? `${p.left}%` : p.left,
                  '--tilt': `${p.tilt}deg`,
                  '--i': i,
                }}
              >
                <article aria-labelledby={`pt-${p.id}`}>
                  <div className="project-frame-container">
                    <button
                      type="button"
                      className="project-frame"
                      aria-label={(OPEN_LABEL[lang] ?? OPEN_LABEL.en)(p.title)}
                      onClick={() => onOpenProject?.(p.id)}
                    >
                      <div className="folder-card">
                        <div className="folder-container">
                          <img className="folder-back" src={p.folderBack} alt="" />

                          {p.files?.map((f, fi) => (
                            <div key={f.text} className={`file file-${fi + 1}`}>
                              <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                              </svg>
                            </div>
                          ))}

                          <div className="folder-front-wrapper">
                            <img className="folder-front" src={p.folderFront} alt="" />

                            {/* Stickers incollati al flap frontale della cartella */}
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
                          </div>
                        </div>
                      </div>
                    {p.badge && (
                      <span className="project-badge">{p.badge}</span>
                    )}
                    </button>
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
