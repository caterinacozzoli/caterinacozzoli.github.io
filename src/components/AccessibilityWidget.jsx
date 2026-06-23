import { useState, useEffect, useCallback, useRef } from 'react';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { createPortal } from 'react-dom';
import { useLang } from '../contexts/LangContext';
import './AccessibilityWidget.css';

const STORAGE_KEY = 'portfolio-a11y-prefs';

const DEFAULTS = {
  fontSize:  'normal',  // normal | large | xl
  contrast:  'normal',  // normal | high
  motion:    'auto',    // auto | reduced
  fontStyle: 'normal',  // normal | dyslexia
  layout:    'normal',  // normal | simplified
};

function loadPrefs() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) return { ...DEFAULTS, ...JSON.parse(s) };
  } catch {
    // ignore
  }
  return { ...DEFAULTS };
}

function applyPrefs(prefs) {
  const el = document.documentElement;
  el.setAttribute('data-a11y-fontsize',  prefs.fontSize);
  el.setAttribute('data-a11y-contrast',  prefs.contrast);
  el.setAttribute('data-a11y-motion',    prefs.motion);
  el.setAttribute('data-a11y-fontstyle', prefs.fontStyle);
  el.setAttribute('data-a11y-layout',    prefs.layout);
}

const TR = {
  it: {
    open:    'Opzioni di accessibilità',
    title:   'Accessibilità',
    close:   'Chiudi pannello accessibilità',
    reset:   'Ripristina tutto',
    fontSize: 'Dimensione testo',
    contrast: 'Contrasto',
    motion:   'Animazioni',
    fontStyle:'Font leggibilità',
    layout:   'Layout',
    opts: {
      fontSize: [
        { val: 'normal',  label: 'A',   aria: 'Dimensione testo: normale' },
        { val: 'large',   label: 'A+',  aria: 'Dimensione testo: grande' },
        { val: 'xl',      label: 'A++', aria: 'Dimensione testo: molto grande' },
      ],
      contrast: [
        { val: 'normal', label: 'Standard',      aria: 'Contrasto: standard' },
        { val: 'high',   label: 'Alto contrasto', aria: 'Contrasto: alto' },
      ],
      motion: [
        { val: 'auto',    label: 'Normale', aria: 'Animazioni: normali' },
        { val: 'reduced', label: 'Ridotte', aria: 'Animazioni: ridotte' },
      ],
      fontStyle: [
        { val: 'normal',   label: 'Standard',  aria: 'Font standard Onest' },
        { val: 'dyslexia', label: 'Dislessia', aria: 'Font per dislessia (Arial spaziato)' },
      ],
      layout: [
        { val: 'normal',     label: 'Completo',     aria: 'Layout completo con animazioni' },
        { val: 'simplified', label: 'Semplificato', aria: 'Layout semplificato senza elementi decorativi' },
      ],
    },
  },
  en: {
    open:    'Accessibility options',
    title:   'Accessibility',
    close:   'Close accessibility panel',
    reset:   'Reset all',
    fontSize: 'Text size',
    contrast: 'Contrast',
    motion:   'Animations',
    fontStyle:'Readable font',
    layout:   'Layout',
    opts: {
      fontSize: [
        { val: 'normal', label: 'A',   aria: 'Text size: normal' },
        { val: 'large',  label: 'A+',  aria: 'Text size: large' },
        { val: 'xl',     label: 'A++', aria: 'Text size: extra large' },
      ],
      contrast: [
        { val: 'normal', label: 'Standard',     aria: 'Contrast: standard' },
        { val: 'high',   label: 'High contrast', aria: 'Contrast: high' },
      ],
      motion: [
        { val: 'auto',    label: 'Normal',  aria: 'Animations: normal' },
        { val: 'reduced', label: 'Reduced', aria: 'Animations: reduced' },
      ],
      fontStyle: [
        { val: 'normal',   label: 'Standard',       aria: 'Standard Onest font' },
        { val: 'dyslexia', label: 'Dyslexia-friendly', aria: 'Dyslexia-friendly font (Arial spaced)' },
      ],
      layout: [
        { val: 'normal',     label: 'Full',       aria: 'Full layout with animations' },
        { val: 'simplified', label: 'Simplified', aria: 'Simplified layout without decorative elements' },
      ],
    },
  },
  pt: {
    open:    'Opções de acessibilidade',
    title:   'Acessibilidade',
    close:   'Fechar painel de acessibilidade',
    reset:   'Restaurar tudo',
    fontSize: 'Tamanho do texto',
    contrast: 'Contraste',
    motion:   'Animações',
    fontStyle:'Fonte legível',
    layout:   'Layout',
    opts: {
      fontSize: [
        { val: 'normal', label: 'A',   aria: 'Tamanho do texto: normal' },
        { val: 'large',  label: 'A+',  aria: 'Tamanho do texto: grande' },
        { val: 'xl',     label: 'A++', aria: 'Tamanho do texto: muito grande' },
      ],
      contrast: [
        { val: 'normal', label: 'Padrão',        aria: 'Contraste: padrão' },
        { val: 'high',   label: 'Alto contraste', aria: 'Contraste: alto' },
      ],
      motion: [
        { val: 'auto',    label: 'Normal',    aria: 'Animações: normais' },
        { val: 'reduced', label: 'Reduzidas', aria: 'Animações: reduzidas' },
      ],
      fontStyle: [
        { val: 'normal',   label: 'Padrão',   aria: 'Fonte padrão Onest' },
        { val: 'dyslexia', label: 'Dislexia', aria: 'Fonte para dislexia (Arial espaçada)' },
      ],
      layout: [
        { val: 'normal',     label: 'Completo',     aria: 'Layout completo com animações' },
        { val: 'simplified', label: 'Simplificado', aria: 'Layout simplificado sem elementos decorativos' },
      ],
    },
  },
};

/* Radio group for mutually exclusive options (a11y-lead recommendation) */
function RadioGroup({ legend, legendId, options, current, onSelect }) {
  const handleKey = (e, index) => {
    const len = options.length;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      onSelect(options[(index + 1) % len].val);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      onSelect(options[(index - 1 + len) % len].val);
    }
  };

  return (
    <fieldset className="a11y-group">
      <legend id={legendId} className="a11y-group__label">{legend}</legend>
      <div className="a11y-btn-row" role="radiogroup" aria-labelledby={legendId}>
        {options.map((opt, i) => (
          <button
            key={opt.val}
            role="radio"
            aria-checked={current === opt.val}
            aria-label={opt.aria}
            className={`a11y-opt-btn${current === opt.val ? ' a11y-opt-btn--active' : ''}`}
            onClick={() => onSelect(opt.val)}
            onKeyDown={(e) => handleKey(e, i)}
            tabIndex={current === opt.val ? 0 : -1}
            type="button"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function AccessibilityWidget() {
  const { lang } = useLang();
  const [open, setOpen]     = useState(false);
  const [prefs, setPrefs]   = useState(loadPrefs);
  const [liveMsg, setLiveMsg] = useState('');
  const liveTimer = useRef(null);
  const panelRef   = useRef(null);
  const triggerRef = useRef(null);
  const l = TR[lang] ?? TR.en;

  useEffect(() => {
    applyPrefs(prefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // ignore
    }
  }, [prefs]);

  /* Blocca scroll quando il pannello è aperto */
  useEffect(() => {
    if (open) lockScroll();
    else unlockScroll();
    return () => { if (open) unlockScroll(); };
  }, [open]);

  /* Keyboard: Escape closes, focus returns to trigger */
  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (e.key === 'Escape') { setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener('keydown', handle);
    setTimeout(() => {
      const first = panelRef.current?.querySelector('[role="radio"][tabindex="0"], button');
      first?.focus();
    }, 50);
    return () => document.removeEventListener('keydown', handle);
  }, [open]);

  /* Debounced live announcements — announce only after 250ms of inactivity */
  const announce = useCallback((msg) => {
    clearTimeout(liveTimer.current);
    liveTimer.current = setTimeout(() => setLiveMsg(msg), 250);
  }, []);

  const set = useCallback((key, value, msg) => {
    setPrefs(p => ({ ...p, [key]: value }));
    if (msg) announce(msg);
  }, [announce]);

  const reset = useCallback(() => {
    setPrefs({ ...DEFAULTS });
    announce(l.reset);
  }, [l, announce]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const panel = open && createPortal(
    <>
      <div
        className="a11y-backdrop"
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="a11y-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-panel-heading"
      >
        <div className="a11y-panel__header">
          <h2 id="a11y-panel-heading" className="a11y-panel__title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
              <circle cx="12" cy="4" r="2.2" />
              <path d="M9.5 8.5C9.5 7.67 10.17 7 11 7h2c.83 0 1.5.67 1.5 1.5v1H17a1 1 0 1 1 0 2h-.65L15.5 19H8.5L7.65 11.5H7a1 1 0 1 1 0-2h2.5v-1z" />
            </svg>
            {l.title}
          </h2>
          <button
            className="a11y-panel__close"
            aria-label={l.close}
            onClick={close}
            type="button"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" focusable="false">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <RadioGroup
          legend={l.fontSize}
          legendId="a11y-legend-fontsize"
          options={l.opts.fontSize}
          current={prefs.fontSize}
          onSelect={(v) => set('fontSize', v, l.opts.fontSize.find(o => o.val === v)?.aria)}
        />
        <RadioGroup
          legend={l.contrast}
          legendId="a11y-legend-contrast"
          options={l.opts.contrast}
          current={prefs.contrast}
          onSelect={(v) => set('contrast', v, l.opts.contrast.find(o => o.val === v)?.aria)}
        />
        <RadioGroup
          legend={l.motion}
          legendId="a11y-legend-motion"
          options={l.opts.motion}
          current={prefs.motion}
          onSelect={(v) => set('motion', v, l.opts.motion.find(o => o.val === v)?.aria)}
        />
        <RadioGroup
          legend={l.fontStyle}
          legendId="a11y-legend-fontstyle"
          options={l.opts.fontStyle}
          current={prefs.fontStyle}
          onSelect={(v) => set('fontStyle', v, l.opts.fontStyle.find(o => o.val === v)?.aria)}
        />
        <RadioGroup
          legend={l.layout}
          legendId="a11y-legend-layout"
          options={l.opts.layout}
          current={prefs.layout}
          onSelect={(v) => set('layout', v, l.opts.layout.find(o => o.val === v)?.aria)}
        />

        <button className="a11y-reset-btn" onClick={reset} type="button">
          ↺ {l.reset}
        </button>
      </div>
    </>,
    document.body
  );

  return (
    <>
      {/* Debounced live region — announces settings changes to screen readers */}
      <div
        aria-live="polite"
        aria-atomic="true"
        role="status"
        className="a11y-live-region"
      >
        {liveMsg}
      </div>

      {/* Trigger button — ♿ icon next to language flags */}
      <button
        ref={triggerRef}
        className={`a11y-trigger${open ? ' a11y-trigger--open' : ''}`}
        aria-label={l.open}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        <picture style={{ display: 'contents' }}>
          <source srcSet="/images/accessibility-icon.avif" type="image/avif" />
          <img
            src="/images/accessibility-icon.png"
            width="48"
            height="48"
            alt=""
            aria-hidden="true"
            className="a11y-trigger__svg"
          />
        </picture>
      </button>

      {panel}
    </>
  );
}
