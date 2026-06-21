import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import './Hero.css';

/* Per-letter hover images — /public/images/hover letterNN.png
   CATERINA: 01-08
   COZZOLI:  09(C) skip10(O) 11(Z) 12(Z) 13(O) 14(L) 15(I)   */

const LETTER_IMAGES = [
  { src: '/images/hover letter01.png', rotate: -14 }, // C
  { src: '/images/hover letter02.png', rotate:   8 }, // A
  { src: '/images/hover letter03.png', rotate: -10 }, // T
  { src: '/images/hover letter04.png', rotate:  12 }, // E
  { src: '/images/hover letter05.png', rotate:  -8 }, // R
  { src: '/images/hover letter06.png', rotate:  11 }, // I
  { src: '/images/hover letter07.png', rotate: -13 }, // N
  { src: '/images/hover letter08.png', rotate:   7 }, // A
];

const LETTER_IMAGES_2 = [
  { src: '/images/hover letter09.png', rotate:  -9 }, // C
  { src: null,                          rotate:   0 }, // O — no image
  { src: '/images/hover letter11.png', rotate:  13 }, // Z
  { src: '/images/hover letter12.png', rotate:  -7 }, // Z
  { src: '/images/hover letter13.png', rotate:  10 }, // O
  { src: '/images/hover letter14.png', rotate: -12 }, // L
  { src: '/images/hover letter15.png', rotate:   9 }, // I
];

/* Shared easing — decisive, no bounce */
const EXPO = [0.16, 1, 0.3, 1];
const QUINT = [0.22, 1, 0.36, 1];

function NameLetter({ char, imgData, isFirst }) {
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  const show = useCallback(() => { clearTimeout(timer.current); setVisible(true);  }, []);
  const hide = useCallback(() => { timer.current = setTimeout(() => setVisible(false), 80); }, []);

  const hasImage = imgData?.src != null;

  return (
    <span
      className={`letter-wrap${isFirst ? ' letter-first' : ''}`}
      onMouseEnter={hasImage ? show : undefined}
      onMouseLeave={hasImage ? hide : undefined}
    >
      {char}
      {hasImage && (
        <AnimatePresence>
          {visible && (
            <motion.img
              src={imgData.src}
              alt=""
              aria-hidden="true"
              className="letter-magnet"
              onMouseEnter={show}
              onMouseLeave={hide}
              initial={{ opacity: 0, scale: 0.65, y: 16 }}
              animate={{ opacity: 1, scale: 1,    y: 0, rotate: imgData.rotate }}
              exit={{    opacity: 0, scale: 0.75,  y: 8 }}
              transition={{ duration: 0.28, ease: QUINT }}
            />
          )}
        </AnimatePresence>
      )}
    </span>
  );
}

export default function Hero() {
  const { tr } = useLang();
  const [resetKey, setResetKey] = useState(0);
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setResetKey(k => k + 1);
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-name">
      {/* SVG watercolor filters */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="watercolor" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="6" seed="8" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="18" result="blurred" />
          </filter>
          <filter id="watercolor-sm" x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="5" seed="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" result="disp" />
            <feGaussianBlur in="disp" stdDeviation="14" />
          </filter>
        </defs>
      </svg>

      {/* Watercolor blobs — spread like wet ink on load */}
      <div className="hero-bg" aria-hidden="true">
        <motion.div
          className="wc-blob wc-blob--lavender"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          transition={{ duration: 1.8, ease: EXPO, delay: 0.05 }}
        />
        <motion.div
          className="wc-blob wc-blob--gold"
          initial={{ scale: 0.55, opacity: 0 }}
          animate={{ scale: 1,    opacity: 1 }}
          transition={{ duration: 1.6, ease: EXPO, delay: 0.15 }}
        />
        <motion.div
          className="wc-blob wc-blob--lavender-sm"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          transition={{ duration: 1.4, ease: EXPO, delay: 0.35 }}
        />
      </div>

      {/* Description — manifesto in alto */}
      <motion.div
        className="hero-top"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.7, ease: QUINT, delay: 0.2 }}
      >
        <p className="hero-description">
          {(() => {
            const [first, mid, last] = tr.hero.description.split('\n');
            const roleMatch = first.match(/^(UX\/UI designer|Designer UX\/UI)/i);
            const firstPart = roleMatch
              ? <><strong className="desc-role">{roleMatch[0]}</strong>{first.slice(roleMatch[0].length)}</>
              : first;
            return <>{firstPart}<br />{mid}{last ? <><br />{last}</> : null}</>;
          })()}
        </p>
      </motion.div>

      {/* Bottom group — nome */}
      <div className="hero-bottom">
        <div className="hero-name-container">
          <h1
            id="hero-name"
            className="hero-name"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            {/* CATERINA — riga 1 */}
            <motion.div
              className="name-line"
              initial={{ opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.8, ease: EXPO, delay: 0.35 }}
            >
              {'Caterina'.split('').map((char, i) => (
                <NameLetter
                  key={`fn-${i}-${resetKey}`}
                  char={char}
                  imgData={LETTER_IMAGES[i]}
                  isFirst={i === 0}
                />
              ))}
            </motion.div>

            {/* COZZOLI — riga 2 */}
            <motion.div
              className="name-line"
              initial={{ opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.8, ease: EXPO, delay: 0.52 }}
            >
              {'Cozzoli'.split('').map((char, i) => (
                <NameLetter
                  key={`ln-${i}-${resetKey}`}
                  char={char}
                  imgData={LETTER_IMAGES_2[i]}
                  isFirst={false}
                />
              ))}
            </motion.div>
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <span className="scroll-label">{tr.hero.scrollHint}</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
