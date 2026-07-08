import React, { useState, useRef, useEffect } from 'react';
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

function RecordPlayer({ onMusicPlaying }) {
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

  useEffect(() => {
    onMusicPlaying?.(isPlaying);
  }, [isPlaying, onMusicPlaying]);

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
      {/* Scaffale Sinistro */}
      <div className="rp-shelf-container shelf-left">
        <img src="/images/cane/scaffale.png" className="rp-shelf-bg" alt="" aria-hidden="true" />
        <div className="rp-shelf">
          {ALBUMS.slice(0, 3).map((album) => (
            <div key={album.id} className="rp-shelf-item">
              <motion.img
                ref={(el) => { cdRefs.current[album.id] = el; }}
                src={album.cd}
                alt=""
                className="rp-shelf-cd"
                style={{ opacity: activeAlbum?.id === album.id ? 0 : 1 }}
                drag={activeAlbum?.id !== album.id}
                dragMomentum={false}
                dragElastic={0.15}
                dragSnapToOrigin
                whileDrag={{ scale: 1.1, scaleX: -1.2, zIndex: 100 }}
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
              <img src={album.album} alt={album.artist} className="rp-shelf-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Tavolo in prospettiva — stessa meccanica di drag/dock/spin, solo inclinato */}
      <div className="rp-table">
        <img src="/images/cane/tavolo.png" alt="" className="rp-table-bg" />
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
        {/* Rettangolo azzurro frontale richiesto */}
        <div className="giradischi-frontale-azzurro"></div>
      </div>

      {/* Scaffale Destro */}
      <div className="rp-shelf-container shelf-right">
        <img src="/images/cane/scaffale.png" className="rp-shelf-bg" alt="" aria-hidden="true" />
        <div className="rp-shelf">
          {ALBUMS.slice(3, 6).map((album) => (
            <div key={album.id} className="rp-shelf-item">
              <motion.img
                ref={(el) => { cdRefs.current[album.id] = el; }}
                src={album.cd}
                alt=""
                className="rp-shelf-cd"
                style={{ opacity: activeAlbum?.id === album.id ? 0 : 1 }}
                drag={activeAlbum?.id !== album.id}
                dragMomentum={false}
                dragElastic={0.15}
                dragSnapToOrigin
                whileDrag={{ scale: 1.1, scaleX: -1.2, zIndex: 100 }}
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
              <img src={album.album} alt={album.artist} className="rp-shelf-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DogInteraction({ onDogActive }) {
  const { lang } = useLang();
  const [dogState, setDogState] = useState('idle'); // 'idle', 'hover', 'attention', 'begging'
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    onDogActive?.(dogState !== 'idle');
  }, [dogState, onDogActive]);

  const label = lang === 'it' ? 'Dai un premio al cane' : lang === 'pt' ? 'Dê um agrado ao cachorro' : 'Give the dog a treat';

  const handleDragStart = () => {
    setIsDragging(true);
    setDogState('attention');
  };

  const handleDrag = (e, info) => {
    if (!containerRef.current) return;
    const dogRect = containerRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    
    const isOverDog = 
      info.point.x >= (dogRect.left + scrollX - 50) && 
      info.point.x <= (dogRect.right + scrollX + 50) && 
      info.point.y >= (dogRect.top + scrollY - 50) && 
      info.point.y <= (dogRect.bottom + scrollY + 50);

    const velocityMag = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);

    if (isOverDog) {
      setDogState('begging');
    } else if (velocityMag > 400) {
      setDogState('excited');
    } else {
      setDogState('attention');
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDogState('idle');
  };

  const handleInteractionStart = () => {
    if (!isDragging && dogState === 'idle') setDogState('hover');
  };

  const handleInteractionEnd = () => {
    if (!isDragging && dogState === 'hover') setDogState('idle');
  };

  let dogSrc = "/images/cane/stato1cane.png";
  let showTail = true;
  let tailClass = 'cane-coda--base';

  if (dogState === 'hover') {
    dogSrc = "/images/cane/stato2cane.png";
    showTail = true;
    tailClass = 'cane-coda--veloce';
  } else if (dogState === 'attention') {
    dogSrc = "/images/cane/caneforntale.png";
    showTail = false;
  } else if (dogState === 'excited') {
    dogSrc = "/images/cane/stato2cane.png";
    showTail = true;
    tailClass = 'cane-coda--iperveloce';
  } else if (dogState === 'begging') {
    dogSrc = "/images/cane/canecane zampa.png";
    showTail = false;
  }

  return (
    <div className="cane-wrapper">
      <div
        className={`cane-container ${dogState === 'hover' ? 'hover' : ''}`}
        ref={containerRef}
        role="button"
        tabIndex={0}
        aria-label={label}
        style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onFocus={handleInteractionStart}
        onBlur={handleInteractionEnd}
        onClick={() => setDogState(v => v === 'idle' ? 'hover' : 'idle')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setDogState(v => v === 'idle' ? 'hover' : 'idle');
          }
        }}
      >
        <img src={dogSrc} alt="" className="cane-corpo cane-corpo-spalle" />
        {showTail && (
          <img
            src="/images/cane/coda.png"
            alt=""
            className={`cane-coda ${tailClass}`}
          />
        )}
      </div>

      <div className="premietto-container">
        <motion.img
          src="/images/cane/premietto cane.png"
          alt="Premietto"
          className="premietto"
          role="button"
          tabIndex={0}
          aria-label={label}
          drag
          dragSnapToOrigin
          dragElastic={0.2}
          whileDrag={{ scale: 1.2, scaleX: -1.2, rotate: 79 }}
          style={{ scaleX: -1, rotate: 79 }}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
}

const BANNER_LABEL = {
  it: <>Le mie compagne<br />di lavoro</>,
  en: <>My work<br />companions</>,
  pt: <>Minhas companheiras<br />de trabalho</>
};

export default function InteractiveWidgets({ onDogActive, onMusicPlaying }) {
  const { lang } = useLang();

  return (
    <section id="playful" className="interactive-widgets" aria-labelledby="playful-title">
      <h2 id="playful-title" className="sr-only">{TITLE[lang] ?? TITLE.it}</h2>

      <div className="playful-banner">
        <span className="playful-banner-label">{BANNER_LABEL[lang] ?? BANNER_LABEL.it}</span>
        <span className="playful-banner-num" aria-hidden="true">03.2</span>
      </div>
      <div className="interactive-widgets-section">
        <img src="/images/mappa.png" alt="" className="playful-map" aria-hidden="true" />
        <RecordPlayer onMusicPlaying={onMusicPlaying} />
        <DogInteraction onDogActive={onDogActive} />
      </div>
    </section>
  );
}
