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
  { id: 1, date: 'Fortaleza, 2022' },
  { id: 2, date: 'Milano, 2023' },
  { id: 3, date: 'Estate, 2023' },
  { id: 4, date: 'Milano, 2024' },
  { id: 5, date: 'Fortaleza, 2024' },
  { id: 6, date: 'Primavera, 2024' },
  { id: 7, date: 'Estate, 2024' },
  { id: 8, date: 'Inverno, 2023' },
];

function PolaroidCard({ date, index }) {
  const [flipped, setFlipped] = useState(false);
  const side = index % 2 === 0 ? 'left' : 'right';

  return (
    <button
      className={`polaroid-card polaroid-card--${side}${flipped ? ' polaroid-card--flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
      aria-pressed={flipped}
      aria-label={`Foto: ${date}. Clicca per ${flipped ? 'tornare al fronte' : 'vedere il retro'}.`}
      type="button"
    >
      <div className="polaroid-inner">
        <div className="polaroid-front" aria-hidden={flipped ? 'true' : undefined}>
          <img
            src="/images/cornice-polaroid.png"
            alt=""
            aria-hidden="true"
            className="polaroid-frame"
          />
        </div>
        <div className="polaroid-back" aria-hidden={!flipped ? 'true' : undefined}>
          <time className="polaroid-date">{date}</time>
        </div>
      </div>
    </button>
  );
}

function HorizontalCarousel({ carouselLabel, onCarouselScroll }) {
  const sectionRef   = useRef(null);
  const trackRef     = useRef(null);
  const isMobileRef  = useRef(false);
  const maxSlideRef  = useRef(0);

  /* Compute how many px the track must shift so the LAST polaroid's
     right edge lands at (viewport - 56px padding).
     Uses offsetLeft/offsetWidth — stable regardless of scrollWidth padding. */
  const computeMaxSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const items = track.querySelectorAll('.about-carousel-item');
    if (!items.length) return 0;
    const last = items[items.length - 1];
    const lastRight = last.offsetLeft + last.offsetWidth;   // from track left edge
    const targetRight = window.innerWidth - 56;             // 56px right padding
    return Math.max(0, lastRight - targetRight);
  }, []);

  const updateHeight = useCallback(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    isMobileRef.current = window.innerWidth < 900;

    if (isMobileRef.current) {
      section.style.height = '';
      track.style.transform = '';
      maxSlideRef.current = 0;
      return;
    }

    const ms = computeMaxSlide();
    maxSlideRef.current = ms;
    if (ms > 0) section.style.height = `calc(100svh + ${ms}px)`;
  }, [computeMaxSlide]);

  const onScroll = useCallback(() => {
    if (isMobileRef.current) return;
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const sectionH = section.offsetHeight;
    const vh       = window.innerHeight;
    const top      = section.getBoundingClientRect().top;
    const progress = Math.max(0, Math.min(1, -top / (sectionH - vh)));
    const ms       = maxSlideRef.current;
    if (ms <= 0) return;

    track.style.transform = `translateX(-${progress * ms}px)`;
    // Notifica App quando l'utente sta scrollando le polaroid (progress > 0 e < 1)
    onCarouselScroll?.(progress > 0 && progress < 1);
  }, []);

  useEffect(() => {
    updateHeight();
    onScroll();

    // Re-measure after full layout paint and all assets
    const onLoad = () => { updateHeight(); onScroll(); };
    window.addEventListener('load', onLoad);

    // ResizeObserver: catches CSS-driven dimension changes after mount
    let ro;
    if (window.ResizeObserver && trackRef.current) {
      ro = new ResizeObserver(() => { updateHeight(); onScroll(); });
      ro.observe(trackRef.current);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('load', onLoad);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateHeight);
      ro?.disconnect();
    };
  }, [updateHeight, onScroll]);

  return (
    /* Tall outer container captures vertical scroll budget */
    <div ref={sectionRef} className="about-carousel-section">
      {/* Sticky inner: stays fixed in viewport while user scrolls the outer */}
      <div className="about-carousel-sticky">
        <ul
          ref={trackRef}
          className="about-carousel"
          role="list"
          aria-label={carouselLabel}
        >
          {POLAROIDS.map((p, i) => (
            <li key={p.id} className="about-carousel-item">
              <PolaroidCard date={p.date} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function About({ onCarouselScroll }) {
  const { lang } = useLang();
  const lines = HEADLINE[lang] ?? HEADLINE.it;
  const label = CAROUSEL_LABEL[lang] ?? CAROUSEL_LABEL.it;

  const skipRecap = () => {
    document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="chi-sono" className="about" aria-labelledby="about-title">
      {/* Yellow strip — normal vertical scroll */}
      <div className="about-headline-strip">
        <h2 id="about-title" className="about-headline">
          {lines.map((line, i) => (
            <span key={i} className="about-headline-line">{line}</span>
          ))}
        </h2>
        <div className="about-header-right">
          <span className="about-count" aria-hidden="true">03</span>
          <button
            className="skip-recap-btn"
            onClick={skipRecap}
            aria-label={SKIP_LABEL[lang]}
          >
            {SKIP_LABEL[lang]}
          </button>
        </div>
      </div>

      {/* Horizontal scroll-hijack section */}
      <HorizontalCarousel carouselLabel={label} onCarouselScroll={onCarouselScroll} />
    </section>
  );
}
