import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang, LangProvider } from './contexts/LangContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Works from './components/Works';
import About from './components/About';
import Workflow from './components/Workflow';
import Experience from './components/Experience';
import Contact from './components/Contact';
import CursorBlob from './components/CursorBlob';
import LangNav from './components/LangNav';
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

const INTRO_SEQUENCE = [
  AVATAR.default,
  AVATAR.frontale,
  AVATAR.latoSinistra,
  AVATAR.sottoCentro,
  AVATAR.inBassoADestra,
  AVATAR.altoDestra,
];

const INTRO_SIZE  = 240;   // avatar durante loading (grande)
const FINAL_SIZE  = 140;   // avatar in corner (leggermente più grande)
const FINAL_TOP   = 16;
const FINAL_RIGHT = 24;
const STEP_MS     = 1000;  // ms per stato → 6×1s = 6s + volo ≈ 7s totali
const XFADE_MS    = 700;   // crossfade quasi uguale a STEP → sempre sovrapposti, zero gap

function AvatarIntro({ onComplete }) {
  const [step, setStep]     = useState(0);
  const [flying, setFlying] = useState(false);

  const cx  = typeof window !== 'undefined' ? window.innerWidth  / 2 - INTRO_SIZE / 2 : 0;
  const cy  = typeof window !== 'undefined' ? window.innerHeight / 2 - INTRO_SIZE / 2 : 0;
  const fx  = typeof window !== 'undefined' ? window.innerWidth  - FINAL_SIZE - FINAL_RIGHT : 0;
  const fy  = FINAL_TOP;
  useEffect(() => {
    if (flying) return;
    const t = setTimeout(() => {
      if (step < INTRO_SEQUENCE.length - 1) setStep(s => s + 1);
      else setFlying(true);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [step, flying]);

  return (
    <>
      {/* Cover carta acquarello — opacity+scale dissolve */}
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

      {/* Avatar — volo ad arco curvo da centro a corner */}
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
        {/* Scale storytelling: entra dal basso (scale-up), esce verso l'alto (scale-up+fade) */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'visible' }}>
          <AnimatePresence>
            <motion.img
              key={step}
              src={INTRO_SEQUENCE[step]}
              alt=""
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'contain',
                transformOrigin: 'center bottom',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              transition={{ duration: XFADE_MS / 1000, ease: 'linear' }}
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

function FloatingAvatar({ mode, onGoHome }) {
  const src = AVATAR[mode] ?? AVATAR.default;

  return (
    <a
      href="#"
      className="floating-avatar-wrap"
      aria-label="Torna alla home"
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
  );
}

function AppInner() {
  const { announcement } = useLang();
  const [activeSection, setActiveSection] = useState('');
  const [chiSonoHovered, setChiSonoHovered] = useState(false);
  const [homeLock, setHomeLock] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [carouselScrolling, setCarouselScrolling] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);
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
      <LangNav />
      <a href="#main-content" className="skip-link">
        {announcement ? announcement : 'Vai al contenuto principale'}
      </a>

      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
        {announcement}
      </div>

      <Nav
        onSectionChange={handleSectionChange}
        onChiSonoHover={handleChiSonoHover}
      />
      {!introComplete && <AvatarIntro onComplete={handleIntroComplete} />}
      {introComplete && <FloatingAvatar mode={avatarMode} onGoHome={handleGoHome} />}

      <main id="main-content">
        <Hero />
        <Works />
        <About onCarouselScroll={handleCarouselScroll} />
        <Workflow />
        <Experience />
        <Contact />
      </main>
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
