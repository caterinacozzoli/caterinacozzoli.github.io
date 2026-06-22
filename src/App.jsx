import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang, LangProvider } from './contexts/LangContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Works from './components/Works';
import About from './components/About';
import Workflow from './components/Workflow';
import Contact from './components/Contact';
import CursorBlob from './components/CursorBlob';
import LangNav from './components/LangNav';
import ProjectPage from './components/ProjectPage';
import './App.css';

const AVATAR = {
  default:       '/images/avatar-caterina-default.png',
  fischia:       '/images/avatar-caterina-fischia.png',
  sbatti:        '/images/avatar-caterina-sbatti.png',
  frontale:      '/images/avatar-caterina-frontale.png',
  altoDestra:    '/images/avatar-caterina-alto-destra.png',
  latoSinistra:  '/images/avatar-caterina-lato-sinistra.png',
  sottoCentro:   '/images/avatar-caterina-sotto-centro.png',
  inBassoADestra:'/images/avatar-caterina-in-basso-a-destra.png',
  pop:           '/images/avatar-caterina-popcorn.png',
};

/* === LOADING: 3 fasi, avatar stop-motion === */
const INTRO_BUBBLES = [
  {
    text: 'ci sono quasi...',
    frames: [AVATAR.default, AVATAR.sottoCentro, AVATAR.latoSinistra, AVATAR.altoDestra],
  },
  {
    text: 'dove ho lasciato il cellulare',
    frames: [AVATAR.frontale, AVATAR.inBassoADestra, AVATAR.sottoCentro, AVATAR.altoDestra],
  },
  {
    text: 'eccomi! 👋',
    frames: [AVATAR.frontale, AVATAR.default, AVATAR.latoSinistra, AVATAR.frontale],
  },
];

const INTRO_SIZE  = 240;
const FINAL_SIZE  = 140;
const FINAL_TOP   = 16;
const FINAL_RIGHT = 24;
const BUBBLE_MS   = 2000;  // durata di ciascuna nuvola (leggermente più lungo per vedere i frame)
const FRAME_MS    = 150;   // ~6fps — vero stop-motion

/* === THOUGHT BUBBLE === */
let _nuvolettaFailed = false;

function ThoughtBubble({ text, visible }) {
  const [imgFailed, setImgFailed] = useState(_nuvolettaFailed);
  const handleError = useCallback(() => { _nuvolettaFailed = true; setImgFailed(true); }, []);

  return (
    <AnimatePresence>
      {visible && text && (
        <motion.div
          className="thought-bubble"
          initial={{ opacity: 0, scale: 0.75, y: 8 }}
          animate={{ opacity: 1, scale: 1,    y: 0 }}
          exit={{    opacity: 0, scale: 0.75,  y: 8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {!imgFailed && (
            <img src="/images/nuvola.png" className="thought-bubble__img" alt="" aria-hidden="true"
              onError={handleError} />
          )}
          <span className={`thought-bubble__text${imgFailed ? ' thought-bubble__text--fallback' : ''}`}>
            {text}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AvatarIntro({ onComplete }) {
  const [bubbleIdx, setBubbleIdx] = useState(0);
  const [frameIdx,  setFrameIdx]  = useState(0);
  const [flying,    setFlying]    = useState(false);

  const cx = typeof window !== 'undefined' ? window.innerWidth  / 2 - INTRO_SIZE / 2 : 0;
  const cy = typeof window !== 'undefined' ? window.innerHeight / 2 - INTRO_SIZE / 2 : 0;
  const fx = typeof window !== 'undefined' ? window.innerWidth  - FINAL_SIZE - FINAL_RIGHT : 0;
  const fy = FINAL_TOP;

  /* Timer nuvole — avanza ogni BUBBLE_MS, poi lancia il volo */
  useEffect(() => {
    if (flying) return;
    const t = setTimeout(() => {
      if (bubbleIdx < INTRO_BUBBLES.length - 1) {
        setBubbleIdx(i => i + 1);
        setFrameIdx(0);
      } else {
        setFlying(true);
      }
    }, BUBBLE_MS);
    return () => clearTimeout(t);
  }, [bubbleIdx, flying]);

  /* Timer frame stop-motion — cicla i frame della bolla corrente */
  useEffect(() => {
    if (flying) return;
    const frames = INTRO_BUBBLES[bubbleIdx].frames;
    const t = setInterval(() => {
      setFrameIdx(i => (i + 1) % frames.length);
    }, FRAME_MS);
    return () => clearInterval(t);
  }, [bubbleIdx, flying]);

  const currentSrc = INTRO_BUBBLES[bubbleIdx].frames[frameIdx];
  const currentText = INTRO_BUBBLES[bubbleIdx].text;

  return (
    <>
      {/* Cover carta acquarello */}
      <motion.div
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          backgroundImage: "url('/images/carta acquarello.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: flying ? 'none' : 'all',
          transformOrigin: 'center center',
        }}
        animate={flying ? { opacity: 0, scale: 0.98 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Avatar — vola da centro a corner */}
      <motion.div
        style={{ position: 'fixed', zIndex: 9999, top: 0, left: 0, pointerEvents: 'none' }}
        initial={{ x: cx, y: cy, width: INTRO_SIZE }}
        animate={flying
          ? { x: fx, y: fy, width: FINAL_SIZE }
          : { x: cx, y: cy, width: INTRO_SIZE }}
        transition={flying
          ? {
              x:     { type: 'spring', stiffness: 65, damping: 18, mass: 1.1 },
              y:     { type: 'spring', stiffness: 65, damping: 18, mass: 1.1 },
              width: { duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
            }
          : { duration: 0 }}
        onAnimationComplete={() => { if (flying) onComplete(); }}
      >
        {/* Nuvola — più piccola, spostata a sinistra e in alto */}
        <div style={{ position: 'absolute', left: '-28%', top: '44%', width: '56%', zIndex: 1 }}>
          <ThoughtBubble text={!flying ? currentText : ''} visible={!flying} />
        </div>

        {/* Avatar — stop motion: src swap diretto, nessun crossfade */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'visible' }}>
          <img
            src={currentSrc}
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'contain',
              transformOrigin: 'center bottom',
              /* nessuna transition — effetto stop-motion */
              transition: 'none',
            }}
          />
        </div>
      </motion.div>
    </>
  );
}

function FloatingAvatar({ mode, onGoHome }) {
  const src = AVATAR[mode] ?? AVATAR.default;
  const [hovered, setHovered] = useState(false);

  return (
    <div className="floating-avatar-wrap">
      {hovered && (
        <div className="floating-avatar-bubble-anchor" aria-hidden="true">
          <ThoughtBubble text="Ciao! 👋" visible={true} />
        </div>
      )}
      <a
        href="#"
        className="floating-avatar-link"
        aria-label="Torna alla home"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          onGoHome?.();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <img
          src={src}
          alt="Caterina Cozzoli — torna in cima"
          className="floating-avatar"
          onError={(e) => { e.target.src = AVATAR.default; }}
        />
      </a>
    </div>
  );
}

function AppInner() {
  const { announcement, tr } = useLang();
  const [activeSection, setActiveSection] = useState('');
  const [chiSonoHovered, setChiSonoHovered] = useState(false);
  const [homeLock, setHomeLock] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [carouselScrolling, setCarouselScrolling] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = useCallback(() => setMenuOpen(o => !o), []);
  const handleMenuClose  = useCallback(() => setMenuOpen(false), []);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);
  const handleOpenProject = useCallback((id) => setOpenProject(id), []);
  const handleCloseProject = useCallback(() => setOpenProject(null), []);
  const handleCarouselScroll = useCallback((active) => setCarouselScrolling(active), []);

  // Rilascia homeLock appena scrollY < 50
  useEffect(() => {
    if (!homeLock) return;
    const check = () => { if (window.scrollY < 50) setHomeLock(false); };
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [homeLock]);

  const handleSectionChange = useCallback((id) => {
    if (!homeLock) setActiveSection(id);
  }, [homeLock]);
  const handleChiSonoHover = useCallback((val) => setChiSonoHovered(val), []);
  const handleGoHome = useCallback(() => {
    setHomeLock(true);
    setActiveSection('');
    setChiSonoHovered(false);
  }, []);

  const avatarMode = homeLock || (!activeSection && !chiSonoHovered)
    ? 'default'
    : chiSonoHovered
      ? 'sbatti'
      : carouselScrolling
        ? 'pop'
        : activeSection === 'chi-sono'
          ? 'sbatti'
          : activeSection === 'lavori'
            ? 'fischia'
            : activeSection === 'workflow'
              ? 'frontale'
              : 'default';

  return (
    <>
      <CursorBlob />
      <LangNav menuOpen={menuOpen} onMenuToggle={handleMenuToggle} />
      <a href="#main-content" className="skip-link">
        {tr.skipLink}
      </a>

      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
        {announcement}
      </div>

      <Nav
        onSectionChange={handleSectionChange}
        onChiSonoHover={handleChiSonoHover}
        menuOpen={menuOpen}
        onMenuClose={handleMenuClose}
      />
      {!introComplete && <AvatarIntro onComplete={handleIntroComplete} />}
      {introComplete && (
        <FloatingAvatar mode={avatarMode} onGoHome={handleGoHome} />
      )}

      <main id="main-content">
        <Hero />
        <Works onOpenProject={handleOpenProject} />
        <About onCarouselScroll={handleCarouselScroll} />
        <Workflow />
        <Contact />
      </main>

      <AnimatePresence>
        {openProject && (
          <ProjectPage
            key={openProject}
            projectId={openProject}
            onClose={handleCloseProject}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
