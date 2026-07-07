import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import './InteractiveWidgets.css';

const TITLE = {
  it: 'Come mi tengo compagnia 8 ore al pc',
  en: 'How I keep myself company 8 hours a day at the computer',
  pt: 'Como me faço companhia 8 horas por dia no computador',
};
const INTRO = {
  it: 'Un giradischi che gira, un cane che aspetta le coccole.',
  en: 'A turntable spinning, a dog waiting for pets.',
  pt: 'Um toca-discos girando, um cachorro esperando carinho.',
};

/* Vinile placeholder da trascinare sul base — al "dock" parte lo spin.
   Drag è solo un potenziamento mouse: Enter/Spazio sul vinile fa lo stesso. */
const ALBUMS = [
  { id: 'claranunes', artist: 'Clara Nunes', album: '/images/vinili/Album/claranunes.png', cd: '/images/vinili/CD/claranunes 1.png', spotify: '3hetMzMBJCMPMKshNdLsfH' },
  { id: 'ettajames', artist: 'Etta James', album: '/images/vinili/Album/ettajames.png', cd: '/images/vinili/CD/ettajames 1.png', spotify: '0iC994dXGDsFIlFMljzhMY' },
  { id: 'lavoglialapazzia', artist: 'La Voglia La Pazzia', album: '/images/vinili/Album/lavoglialapazzia.png', cd: '/images/vinili/CD/lavoglia la pazzia 1.png', spotify: '1HlFhkKGVJOGyaxW3Hb7Vv' },
  { id: 'marisamonte', artist: 'Marisa Monte', album: '/images/vinili/Album/marisamonte.png', cd: '/images/vinili/CD/marisamonte 1.png', spotify: '1DFr97A9HnbV3SKp7iqclR' },
  { id: 'redhot', artist: 'Red Hot Chili Peppers', album: '/images/vinili/Album/redhot.png', cd: '/images/vinili/CD/redhot 1.png', spotify: '0L8ExT028jH3ddEcZwqJJ5' },
  { id: 'steviewonder', artist: 'Stevie Wonder', album: '/images/vinili/Album/stevie wonder.png', cd: '/images/vinili/CD/steviewonder 1.png', spotify: '7guDJrEfX3qb6FEbdPA5qi' },
];

function RecordPlayer() {
  const { lang } = useLang();
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
  const baseRef = useRef(null);
  // Store refs for each CD
  const cdRefs = useRef({});

  const toggleLabel = isPlaying
    ? (lang === 'it' ? 'Metti in pausa il giradischi' : lang === 'pt' ? 'Pausar o toca-discos' : 'Pause the record player')
    : (lang === 'it' ? 'Avvia il giradischi' : lang === 'pt' ? 'Tocar o toca-discos' : 'Play the record player');

  const dockAlbum = (album) => {
    setActiveAlbum(album);
    setIsPlaying(true);
  };

  const handleDragEnd = (album) => () => {
    setDraggingId(null);
    const base = baseRef.current?.getBoundingClientRect();
    const cd = cdRefs.current[album.id]?.getBoundingClientRect();
    if (!base || !cd) return;
    
    const baseCenter = { x: base.left + base.width / 2, y: base.top + base.height / 2 };
    const cdCenter = { x: cd.left + cd.width / 2, y: cd.top + cd.height / 2 };
    const dist = Math.hypot(baseCenter.x - cdCenter.x, baseCenter.y - cdCenter.y);
    
    // If dropped close enough to the center of the base
    if (dist < base.width * 0.45) {
      dockAlbum(album);
    }
  };

  return (
    <div className="record-player-container">
      {/* Albums Grid (Crates) — a sinistra del giradischi */}
      <div className="rp-crates">
        {ALBUMS.map((album) => (
          <div key={album.id} className="rp-crate-item">
            {/* The draggable CD. If it's the active one, hide it from the crate (it's on the player) */}
            <motion.img
              ref={(el) => { cdRefs.current[album.id] = el; }}
              src={album.cd}
              alt=""
              className="rp-crate-cd"
              style={{ opacity: activeAlbum?.id === album.id ? 0 : 1 }}
              drag={activeAlbum?.id !== album.id}
              dragMomentum={false}
              dragElastic={0.15}
              dragSnapToOrigin
              whileDrag={{ scale: 1.1, zIndex: 100 }}
              onDragStart={() => setDraggingId(album.id)}
              onDragEnd={handleDragEnd(album)}
              onClick={() => dockAlbum(album)}
              role="button"
              tabIndex={activeAlbum?.id === album.id ? -1 : 0}
              aria-label={lang === 'it' ? `Suona ${album.artist}` : lang === 'pt' ? `Tocar ${album.artist}` : `Play ${album.artist}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dockAlbum(album); }
              }}
            />
            {/* The Album Cover */}
            <img src={album.album} alt={album.artist} className="rp-crate-cover" />
          </div>
        ))}
      </div>

      <div className="record-player">
        <img 
          ref={baseRef} 
          src="/images/giradischi/base.png" 
          alt="" 
          className="rp-layer rp-base" 
          onClick={() => {
            if (activeAlbum) setIsPlaying(v => !v);
          }}
          style={{ cursor: activeAlbum ? 'pointer' : 'default', pointerEvents: 'auto' }}
        />

        {/* If an album is docked, show it spinning on the base */}
        {activeAlbum && (
          <img
            src={activeAlbum.cd}
            alt=""
            className={`rp-layer rp-vinile${isPlaying ? ' rp-vinile--spinning' : ''}`}
            aria-hidden="true"
          />
        )}

        <motion.img
          src="/images/giradischi/braccio.png"
          alt=""
          className={`rp-layer rp-braccio ${activeAlbum ? 'rp-braccio-interactive' : ''}`}
          initial={{ rotate: -25 }}
          animate={{ rotate: isPlaying ? 0 : -25 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          drag={!!activeAlbum}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0}
          onDragEnd={(e, info) => {
            if (!activeAlbum) return;
            if (info.offset.x < -10) setIsPlaying(true); // Dragged towards center
            else if (info.offset.x > 10) setIsPlaying(false); // Dragged away from center
            else setIsPlaying(v => !v); // Just a small click/tap
          }}
          onClick={() => {
            if (activeAlbum) setIsPlaying(v => !v);
          }}
          role={activeAlbum ? "button" : undefined}
          aria-label={toggleLabel}
          aria-pressed={isPlaying}
          tabIndex={activeAlbum ? 0 : -1}
          onKeyDown={(e) => {
            if (!activeAlbum) return;
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsPlaying(v => !v); }
          }}
        />
      </div>
    </div>
  );
}

function DogInteraction() {
  const { lang } = useLang();
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);

  const label = lang === 'it' ? 'Dai un premio al cane' : lang === 'pt' ? 'Dê um agrado ao cachorro' : 'Give the dog a treat';

  return (
    <div className="cane-wrapper">
      <div
        className={`cane-container ${isActive ? 'attivo' : ''}`}
        ref={containerRef}
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        aria-label={label}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onClick={() => setIsActive(v => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsActive(v => !v);
          }
        }}
      >
        <img src="/images/cane/stato1cane.png" alt="" className="cane-corpo cane-corpo-spalle" />
        <img src="/images/cane/stato2cane.png" alt="" className="cane-corpo cane-corpo-girato" />
        <img
          src="/images/cane/coda.png"
          alt=""
          className={`cane-coda${isActive ? ' cane-coda--veloce' : ' cane-coda--base'}`}
        />
      </div>

      <div className="premietto-container">
        <motion.div
          className="premietto"
          role="button"
          tabIndex={0}
          aria-label={label}
          drag
          dragConstraints={{ top: -100, left: -250, right: 100, bottom: 250 }}
          dragElastic={0.2}
          whileDrag={{ scale: 1.2 }}
          onDragStart={() => setIsActive(true)}
          onDragEnd={() => setIsActive(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsActive(v => !v);
            }
          }}
        />
        <span className="premietto-hint" aria-hidden="true">
          {lang === 'it' ? 'Trascina!' : lang === 'pt' ? 'Arraste!' : 'Drag me!'}
        </span>
      </div>
    </div>
  );
}

const BANNER_LABEL = {
  it: <>Le mie compagne<br />di lavoro</>,
  en: <>My work<br />companions</>,
  pt: <>Minhas companheiras<br />de trabalho</>
};

export default function InteractiveWidgets() {
  const { lang } = useLang();

  return (
    <section id="playful" className="interactive-widgets" aria-labelledby="playful-title">
      <h2 id="playful-title" className="sr-only">{TITLE[lang] ?? TITLE.it}</h2>

      <div className="playful-banner">
        <span className="playful-banner-label">{BANNER_LABEL[lang] ?? BANNER_LABEL.it}</span>
        <span className="playful-banner-num" aria-hidden="true">03.2</span>
      </div>
      <div className="interactive-widgets-section">
        <RecordPlayer />
        <DogInteraction />
      </div>
    </section>
  );
}
