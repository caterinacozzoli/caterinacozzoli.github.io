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
    caption: { it: 'Parlamento europeo', en: 'European Parliament', pt: 'Parlamento europeu' },
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

function PolaroidCard({ src, retro, caption, description, date, tilt, index, lang }) {
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
          <img
            src="/images/polaroid/cornice-polaroid.png"
            alt=""
            aria-hidden="true"
            className="polaroid-frame"
          />
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

const BANNER_H = 180; // same as min-height on about-headline-strip

function HorizontalCarousel({ carouselLabel, onCarouselScroll, aboutRef, lang }) {
  const sectionRef     = useRef(null);
  const trackRef       = useRef(null);
  const isMobileRef    = useRef(false);
  const maxSlideRef    = useRef(0);
  const currentSlideRef = useRef(0); // tracks current translateX for focusin handler

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
    // Extra BANNER_H so horizontal scroll budget starts when banner is in view
    if (ms > 0) section.style.height = `calc(100svh + ${ms + BANNER_H}px)`;
  }, [computeMaxSlide]);

  const onScroll = useCallback(() => {
    if (isMobileRef.current) return;
    const track  = trackRef.current;
    const parent = aboutRef?.current;
    if (!track || !parent) return;

    const ms  = maxSlideRef.current;
    if (ms <= 0) return;

    // Use about section rect so horizontal scroll starts while banner is visible
    const top      = parent.getBoundingClientRect().top;
    const parentH  = parent.offsetHeight;
    const vh       = window.innerHeight;
    const progress = Math.max(0, Math.min(1, -top / (parentH - vh)));

    const tx = progress * ms;
    currentSlideRef.current = tx;
    track.style.transform = `translateX(-${tx}px)`;
    onCarouselScroll?.(progress > 0 && progress < 1);
  }, [aboutRef]);

  /* Bring keyboard-focused polaroid into the horizontal view window */
  const onFocusIn = useCallback((e) => {
    if (isMobileRef.current) return;
    const item  = e.target.closest('.about-carousel-item');
    const track = trackRef.current;
    if (!item || !track) return;

    const PAD       = 56;
    const current   = currentSlideRef.current;
    const cardLeft  = item.offsetLeft;
    const cardRight = cardLeft + item.offsetWidth;
    const viewStart = current + PAD;
    const viewEnd   = current + window.innerWidth - PAD;

    let next = current;
    if (cardLeft < viewStart)   next = cardLeft - PAD;
    else if (cardRight > viewEnd) next = cardRight - (window.innerWidth - PAD);
    next = Math.max(0, Math.min(maxSlideRef.current, next));

    if (Math.abs(next - current) > 1) {
      currentSlideRef.current = next;
      track.style.transform = `translateX(-${next}px)`;
    }
  }, []);

  useEffect(() => {
    updateHeight();
    onScroll();

    const onLoad = () => { updateHeight(); onScroll(); };
    window.addEventListener('load', onLoad);

    let ro;
    if (window.ResizeObserver && trackRef.current) {
      ro = new ResizeObserver(() => { updateHeight(); onScroll(); });
      ro.observe(trackRef.current);
    }

    const track = trackRef.current;
    track?.addEventListener('focusin', onFocusIn);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('load', onLoad);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateHeight);
      track?.removeEventListener('focusin', onFocusIn);
      ro?.disconnect();
    };
  }, [updateHeight, onScroll, onFocusIn]);

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
              <PolaroidCard src={p.src} retro={p.retro} caption={p.caption} description={p.description} date={p.date} tilt={p.tilt} index={i} lang={lang} />
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
  const aboutRef  = useRef(null);
  const bannerRef = useRef(null);
  const [activated, setActivated] = useState(false);

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

  const skipRecap = () => {
    document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="chi-sono"
      className={`about${activated ? ' about--activated' : ''}`}
      aria-labelledby="about-title"
      ref={aboutRef}
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

      {/* Horizontal scroll-hijack section */}
      <HorizontalCarousel carouselLabel={label} onCarouselScroll={onCarouselScroll} aboutRef={aboutRef} lang={lang} />
    </section>
  );
}
