import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimation, animate } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import './Hero.css';


/* Per-letter hover images — /public/images/hover-letters/hover letterNN.png
   CATERINA: 01-08
   COZZOLI:  09(C) skip10(O) 11(Z) 12(Z) 13(O) 14(L) 15(I)   */

const LETTER_IMAGES = [
  { src: '/images/hover-letters/hover letter15.png', rotate: -14, scale: 1.3 }, // C (H)
  { src: '/images/hover-letters/hover letter08.png', rotate:   8 },             // A (V)
  { src: '/images/hover-letters/hover letter04.png', rotate: -10, scale: 1.2 },  // T (H)
  { src: '/images/hover-letters/hover letter03.png', rotate:  12 },             // E (V)
  { src: '/images/hover-letters/hover letter11.png', rotate:  -8, scale: 1.2 },  // R (H)
  { src: '/images/hover-letters/hover letter12.png', rotate:  11 },             // I (V)
  { src: '/images/hover-letters/hover letter01.png', rotate: -13, scale: 1.4 },  // N (H)
  { src: '/images/hover-letters/hover letter06.png', rotate:   7 },             // A (V)
];

const LETTER_IMAGES_2 = [
  { src: '/images/hover-letters/hover letter13.png', rotate:  -9, scale: 1.15 }, // C (H)
  { src: '/images/hover-letters/hover letter09.png', rotate:   6 },             // O (V)
  { src: '/images/hover-letters/hover letter14.png', rotate:  -7, scale: 1.2 },  // Z (H)
  { src: '/images/hover-letters/hover letter02.png', rotate:  10 },             // Z (V)
  { src: '/images/hover-letters/hover letter15.png', rotate:  -5, scale: 1.3 },  // O (H) - repeat of 15
  { src: '/images/hover-letters/hover letter07.png', rotate: -12 },             // L (V)
  { src: '/images/hover-letters/hover letter05.png', rotate:   9, scale: 1.15 }, // I (H)
];

/* Shared easing — Premium Motion Profile */
const EASE_ENTRANCE = [0.33, 1, 0.68, 1];
const EASE_HOVER = [0.2, 0, 0, 1];

// Testi nuvola per hover lettere (15 lettere: C-A-T-E-R-I-N-A + C-O-Z-Z-O-L-I)
const HOVER_GREETINGS = {
  //            C        A                  T      E      R              I         N       A               C       O       Z       Z               O        L                      I
  it: ['ciao!', 'buona giornata!', 'hi!', 'hey!', 'buon lavoro!', 'hola!', 'salve!', 'grazie 🙏', 'olá!', 'ahoy!', 'oi!', 'buenas!', 'alô!', 'hei!', 'hai bevuto acqua oggi?'],
  en: ['hi!',   'have a great day!', 'ciao!', 'hey!', 'good work!', 'ola!', 'greetings!', 'thank you 🙏', 'olá!', 'hola!', 'oi!', 'ahoy!', 'hey there!', 'hei!', 'drink some water today?'],
  pt: ['oi!',   'bom dia!', 'olá!', 'hi!', 'bom trabalho!', 'hola!', 'ehi!', 'obrigada 🙏', 'hey!', 'alô!', 'tcho!', 'salve!', 'salut!', 'hei!', 'bebeu água hoje?'],
};

function NameLetter({ char, imgData, isFirst, greetingText }) {
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  const show = useCallback(() => {
    clearTimeout(timer.current);
    setVisible(true);
    if (greetingText) window.dispatchEvent(new CustomEvent('letterHover', { detail: greetingText }));
  }, [greetingText]);
  const hide = useCallback(() => {
    timer.current = setTimeout(() => {
      setVisible(false);
      window.dispatchEvent(new CustomEvent('letterHover', { detail: null }));
    }, 80);
  }, []);

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
              animate={{ opacity: 1, scale: imgData.scale ?? 1, y: 0, rotate: imgData.rotate }}
              exit={{    opacity: 0, scale: 0.75,  y: 8 }}
              transition={{ duration: 0.15, ease: EASE_HOVER }}
            />
          )}
        </AnimatePresence>
      )}
    </span>
  );
}

export default function Hero() {
  const { tr, lang } = useLang();
  const [resetKey, setResetKey] = useState(0);
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setResetKey(k => k + 1);
  }, []);

  // --- Punchline interactive logic ---
  const [pinDetached, setPinDetached] = useState(false);
  const rotateValue = useMotionValue(15);
  const paperControls = useAnimation();
  const pinControls = useAnimation();

  const handlePaperPan = useCallback((e, info) => {
    if (pinDetached) return;
    rotateValue.set(rotateValue.get() + info.delta.x * 0.15);
  }, [pinDetached, rotateValue]);

  const handlePaperPanEnd = useCallback((e, info) => {
    if (pinDetached) return;
    const velocity = info.velocity.x * 0.05;
    animate(rotateValue, 15, { 
      type: 'spring', 
      stiffness: 120, 
      damping: 6, 
      velocity: velocity 
    });
  }, [pinDetached, rotateValue]);

  const detachPin = useCallback((direction = 1) => {
    if (pinDetached) return;
    setPinDetached(true);
    pinControls.start({ 
      y: typeof window !== 'undefined' ? window.innerHeight : 800, 
      opacity: 0, 
      transition: { duration: 1, ease: 'easeIn' } 
    });
    paperControls.start({ 
      y: typeof window !== 'undefined' ? window.innerHeight + 500 : 1300, 
      rotate: rotateValue.get() + (direction > 0 ? 45 : -45), 
      opacity: 0, 
      transition: { duration: 1.5, ease: 'easeIn', delay: 0.1 } 
    });
  }, [pinDetached, pinControls, paperControls, rotateValue]);

  const handlePinDragEnd = useCallback((e, info) => {
    if (pinDetached) return;
    if (Math.abs(info.offset.x) > 30 || Math.abs(info.offset.y) > 30) {
      detachPin(info.offset.x);
    } else {
      pinControls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  }, [pinDetached, detachPin, pinControls]);

  const scrollToWorks = useCallback((e) => {
    e.preventDefault();
    document.getElementById('lavori')?.scrollIntoView({ behavior: 'smooth' });
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
          transition={{ duration: 1.2, ease: EASE_ENTRANCE, delay: 0.05 }}
        />
        <motion.div
          className="wc-blob wc-blob--gold"
          initial={{ scale: 0.55, opacity: 0 }}
          animate={{ scale: 1,    opacity: 1 }}
          transition={{ duration: 1.0, ease: EASE_ENTRANCE, delay: 0.15 }}
        />
        <motion.div
          className="wc-blob wc-blob--lavender-sm"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_ENTRANCE, delay: 0.35 }}
        />
      </div>

      {/* Description — manifesto in alto */}
      <motion.div
        className="hero-top"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.6, ease: EASE_ENTRANCE, delay: 0.2 }}
      >
        <motion.div 
          className="hero-punchline-wrapper"
        >
          <motion.img 
            drag
            onDragEnd={handlePinDragEnd}
            onTap={() => detachPin(1)}
            animate={pinControls}
            src="/images/pin.png" 
            alt="Puntina" 
            className="hero-punchline-pin framer-motion-drag" 
            draggable="false"
          />
          <motion.img 
            onPan={handlePaperPan}
            onPanEnd={handlePaperPanEnd}
            animate={paperControls}
            src="/images/punchline.png" 
            alt={tr.hero.description.replace(/\n/g, ' ')}
            className="hero-punchline-img framer-motion-drag" 
            draggable="false"
            style={{ rotate: rotateValue, transformOrigin: 'calc(50% + 6px) -18px' }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom group — nome */}
      <div className="hero-bottom">
        <div className="hero-name-container">
          <h1
            id="hero-name"
            className="hero-name"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Caterina M. Cozzoli"
          >
            {/* CATERINA — riga 1 */}
            <motion.div
              className="name-line"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.7, ease: EASE_ENTRANCE, delay: 0.35 }}
            >
              {'CATERINA'.split('').map((char, i) => (
                <NameLetter
                  key={`fn-${i}-${resetKey}`}
                  char={char}
                  imgData={LETTER_IMAGES[i]}
                  isFirst={i === 0}
                  greetingText={HOVER_GREETINGS[lang]?.[i]}
                />
              ))}
              <span className="letter-space" aria-hidden="true" />
              <NameLetter
                char="M."
                imgData={{ src: '/images/hover-letters/hover letter16.svg', rotate: -6, scale: 1.2 }}
                isFirst={false}
              />
            </motion.div>

            {/* COZZOLI — riga 2 */}
            <motion.div
              className="name-line"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.7, ease: EASE_ENTRANCE, delay: 0.45 }}
            >
              {'COZZOLI'.split('').map((char, i) => (
                <NameLetter
                  key={`ln-${i}-${resetKey}`}
                  char={char}
                  imgData={LETTER_IMAGES_2[i]}
                  isFirst={false}
                  greetingText={HOVER_GREETINGS[lang]?.[8 + i]}
                />
              ))}
            </motion.div>
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <a
          href="#lavori"
          className="hero-scroll-link"
          onClick={scrollToWorks}
          aria-label="Vai ai miei progetti"
        >
          <img
            src="/images/freccia-giu.png"
            className="hero-scroll-img"
            alt=""
          />
        </a>
      </motion.div>
    </section>
  );
}
