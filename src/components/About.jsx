import { useState, useRef, useEffect, useCallback } from 'react';
import { useLang } from '../contexts/LangContext';
import './About.css';

const HEADLINE = {
  it: ['recap ultime', '23 stagioni'],
  en: ['recap last', '23 seasons'],
  pt: ['recap últimas', '23 temporadas'],
};

const SKIP_LABEL = {
  it: 'Salta il recap',
  en: 'Skip the recap',
  pt: 'Pular o recap',
};

const CAROUSEL_LABEL = { it: 'Foto personali', en: 'Personal photos', pt: 'Fotos pessoais' };

const POLAROIDS = [
  {
    id: 1,
    src:   '/images/polaroid/polaroid-cate-piccola.png',
    retro: '/images/polaroid/polaroid-retro-cate-piccola.png',
    tilt: -2.2,
    caption: null, description: null,
    date: { it: 'Infanzia', en: 'Childhood', pt: 'Infância' },
  },
  {
    id: 2,
    src:   '/images/polaroid/polaroid-cate-brasile.png',
    retro: '/images/polaroid/polaroid-retro-cate-brasile.png',
    tilt: 1.6,
    caption: null, description: null,
    date: { it: 'Fortaleza, 2022', en: 'Fortaleza, 2022', pt: 'Fortaleza, 2022' },
  },
  {
    id: 3,
    src:   '/images/polaroid/polaroid-cate-banda.png',
    retro: '/images/polaroid/polaroid-retro-cate-banda.png',
    tilt: -1.0,
    caption: null, description: null,
    date: { it: 'Milano, 2023', en: 'Milan, 2023', pt: 'Milão, 2023' },
  },
  {
    id: 4,
    src:   '/images/polaroid/polaroid-cate-volontariato.png',
    retro: '/images/polaroid/polaroid-retro-cate-volontariato.png',
    tilt: 2.4,
    caption: null, description: null,
    date: { it: 'Estate, 2023', en: 'Summer, 2023', pt: 'Verão, 2023' },
  },
  {
    id: 5,
    src:   '/images/polaroid/polaroid-amore.png',
    retro: '/images/polaroid/polaroid-retro-amore.png',
    tilt: -1.8,
    caption: null, description: null,
    date: { it: 'Milano, 2024', en: 'Milan, 2024', pt: 'Milão, 2024' },
  },
  {
    id: 6,
    src:   '/images/polaroid/polaroid-parlamento.png',
    retro: '/images/polaroid/polaroid-retro-parlamento.png',
    tilt: 0.8,
    caption: null,
    description: {
      it: 'Bruxelles. In quelle sale enormi ho capito che il design non decora — decide.',
      en: 'Brussels. Walking those vast halls I understood: design doesn\'t decorate — it decides.',
      pt: 'Bruxelas. Naquelas salas imensas entendi que o design não decora — decide.',
    },
    date: { it: 'Bruxelles, 2023', en: 'Brussels, 2023', pt: 'Bruxelas, 2023' },
  },
  {
    id: 7,
    src:   '/images/polaroid/polaroid-laurea.png',
    retro: '/images/polaroid/polaroid-retro-laurea.png',
    tilt: -2.6,
    caption: null, description: null,
    date: { it: 'Primavera, 2024', en: 'Spring, 2024', pt: 'Primavera, 2024' },
  },
  {
    id: 8,
    src:   '/images/polaroid/polaroid-master.png',
    retro: '/images/polaroid/polaroid-retro-master.png',
    tilt: 1.2,
    caption: null, description: null,
    date: { it: 'Estate, 2024', en: 'Summer, 2024', pt: 'Verão, 2024' },
  },
];

const FLIP_LABEL = {
  it: (date, flipped, caption, description) => {
    const cap = caption ? `${caption}. ` : '';
    const desc = description ? `${description} ` : '';
    return flipped
      ? `${cap}${desc}${date}. Premi per tornare al fronte`
      : `Foto: ${cap}${date}. Premi per vedere il retro`;
  },
  en: (date, flipped, caption, description) => {
    const cap = caption ? `${caption}. ` : '';
    const desc = description ? `${description} ` : '';
    return flipped
      ? `${cap}${desc}${date}. Press to flip to front`
      : `Photo: ${cap}${date}. Press to flip to back`;
  },
  pt: (date, flipped, caption, description) => {
    const cap = caption ? `${caption}. ` : '';
    const desc = description ? `${description} ` : '';
    return flipped
      ? `${cap}${desc}${date}. Pressione para voltar à frente`
      : `Foto: ${cap}${date}. Pressione para ver o verso`;
  },
};

function PolaroidCard({ src, retro, caption, description, date, tilt, lang }) {
  const [flipped, setFlipped] = useState(false);
  const dateStr    = date[lang]        ?? date.it;
  const captionStr = caption?.[lang]   ?? caption?.it ?? null;
  const descStr    = description?.[lang] ?? description?.it ?? null;
  const labelFn    = FLIP_LABEL[lang]  ?? FLIP_LABEL.en;

  return (
    <button
      className={`polaroid-card${flipped ? ' polaroid-card--flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
      aria-label={labelFn(dateStr, flipped, captionStr, descStr)}
      type="button"
      style={{ '--tilt': `${tilt}deg` }}
    >
      <div className="polaroid-inner">
        <div className="polaroid-front" aria-hidden="true">
          {src && (
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="polaroid-photo"
            />
          )}
          {captionStr && (
            <span className="polaroid-caption" aria-hidden="true">{captionStr}</span>
          )}
        </div>
        <div className="polaroid-back" aria-hidden="true">
          {retro && (
            <img
              src={retro}
              alt=""
              aria-hidden="true"
              className="polaroid-frame"
            />
          )}
        </div>
      </div>
    </button>
  );
}

export default function About({ onCarouselScroll }) {
  const { lang } = useLang();
  const lines = HEADLINE[lang] ?? HEADLINE.it;
  const label = CAROUSEL_LABEL[lang] ?? CAROUSEL_LABEL.it;
  const bannerRef = useRef(null);
  const trackRef = useRef(null);
  const [activated, setActivated] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reducedMotion) setActivated(true);
        obs.disconnect();
      },
      { threshold: 0.4 }
    );
    obs.observe(banner);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        const canScrollLeft = track.scrollLeft > 0;
        const canScrollRight = track.scrollLeft < (track.scrollWidth - track.clientWidth - 1);
        if ((e.deltaY < 0 && canScrollLeft) || (e.deltaY > 0 && canScrollRight)) {
          e.preventDefault();
          track.scrollLeft += e.deltaY;
        }
      }
    };

    track.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      track.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const skipRecap = () => {
    document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Rileva lo scorrimento (sia drag che swipe nativo) per attivare l'avatar popcorn
  const onScroll = useCallback(() => {
    onCarouselScroll?.(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      onCarouselScroll?.(false);
    }, 150);
  }, [onCarouselScroll]);

  // Gestione del drag col mouse su desktop
  const dragRef = useRef({ startX: 0, startScrollLeft: 0, active: false, hasDragged: false });

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return; // solo click sinistro

    const track = trackRef.current;
    if (!track) return;

    const onMouseMove = (moveEvent) => {
      const drag = dragRef.current;
      if (!drag.active) return;

      const dx = moveEvent.clientX - drag.startX;
      if (Math.abs(dx) > 5) {
        drag.hasDragged = true;
      }

      track.scrollLeft = drag.startScrollLeft - dx;
    };

    const onMouseUp = () => {
      const drag = dragRef.current;
      drag.active = false;
      track.classList.remove('about-carousel--dragging');

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    dragRef.current = {
      startX: e.clientX,
      startScrollLeft: track.scrollLeft,
      active: true,
      hasDragged: false
    };

    track.classList.add('about-carousel--dragging');
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  const onClickCapture = useCallback((e) => {
    if (dragRef.current.hasDragged) {
      e.stopPropagation();
      e.preventDefault();
      dragRef.current.hasDragged = false;
    }
  }, []);

  return (
    <section
      id="chi-sono"
      className={`about${activated ? ' about--activated' : ''}`}
      aria-labelledby="about-title"
    >
      {/* Yellow strip — normal vertical scroll */}
      <div className="about-headline-strip" ref={bannerRef}>
        <h2 id="about-title" className="about-headline">
          {lines.map((line, i) => (
            <span key={i} className="about-headline-line">{line}</span>
          ))}
        </h2>
        <span className="about-count" aria-hidden="true">03</span>
        <button
          className="skip-recap-btn skip-recap-btn--banner"
          onClick={skipRecap}
          aria-label={SKIP_LABEL[lang]}
        >
          {SKIP_LABEL[lang]}
        </button>
      </div>

      {/* Carosello orizzontale a scorrimento libero */}
      <div className="about-carousel-container">
        <ul
          ref={trackRef}
          className="about-carousel"
          role="list"
          aria-label={label}
          onMouseDown={onMouseDown}
          onClickCapture={onClickCapture}
          onScroll={onScroll}
        >
          {[...POLAROIDS].reverse().map((p) => (
            <li key={p.id} className="about-carousel-item">
              <PolaroidCard
                src={p.src}
                retro={p.retro}
                caption={p.caption}
                description={p.description}
                date={p.date}
                tilt={p.tilt}
                lang={lang}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
