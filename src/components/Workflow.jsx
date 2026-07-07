import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from '../contexts/LangContext';
import { Reorder } from 'framer-motion';
import './Workflow.css';

const BASE_ORDER = ['ascolto', 'definisco', 'esploro', 'wireframe', 'interfaccia', 'test'];

const PIECES = {
  it: {
    ascolto:     { num: '01', title: 'Ascolto',        desc: 'Bombardo di "perché?". Interviste, osservazione, dati reali — anche le conversazioni vive su Reddit. Prima capisco, poi progetto.' },
    definisco:   { num: '02', title: 'Definisco',      desc: 'Trasformo il rumore in insight: HMW, priorità, la domanda giusta. Se non so cosa sto risolvendo, non disegno.' },
    esploro:     { num: '03', title: 'Esploro',        desc: 'Genero, scarto, combino. Moodboard, architettura, tante direzioni prima di sceglierne una.' },
    wireframe:   { num: '04', title: 'Wireframe',      desc: 'Do struttura alle idee: flussi e scheletro, dove ogni schermata guadagna il suo posto.' },
    interfaccia: { num: '05', title: 'Interfaccia',    desc: 'Metto la pelle: UI, microcopy, accessibilità. Qui il testo è design quanto il pixel.' },
    test:        { num: '06', title: 'Testo & Itero',  desc: 'Osservo persone reali. Correggo, miglioro, ripeto. (È il mio judo: cadere, correggere, rialzarsi.)' },
  },
  en: {
    ascolto:     { num: '01', title: 'Listen',          desc: 'I ask "why?" over and over. Interviews, observation, real data — even live conversations on Reddit. Understand first, design second.' },
    definisco:   { num: '02', title: 'Define',          desc: 'I turn noise into insight: HMW, priorities, the right question. If I don\'t know what I\'m solving, I don\'t draw.' },
    esploro:     { num: '03', title: 'Explore',         desc: 'Generate, discard, combine. Moodboards, architecture, many directions before choosing one.' },
    wireframe:   { num: '04', title: 'Wireframe',       desc: 'Give ideas structure: flows and skeleton, where every screen earns its place.' },
    interfaccia: { num: '05', title: 'Interface',       desc: 'Add the skin: UI, microcopy, accessibility. Here text is design as much as pixels.' },
    test:        { num: '06', title: 'Test & Iterate',  desc: 'Watch real people. Fix, improve, repeat. (This is my judo: fall, correct, rise.)' },
  },
  pt: {
    ascolto:     { num: '01', title: 'Escuto',         desc: 'Bombardeio de "porquês". Entrevistas, observação, dados reais — inclusive conversas reais no Reddit. Primeiro entendo, depois projeto.' },
    definisco:   { num: '02', title: 'Defino',         desc: 'Transformo ruído em insight: HMW, prioridades, a pergunta certa. Se não sei o que estou resolvendo, não desenho.' },
    esploro:     { num: '03', title: 'Exploro',        desc: 'Gero, descarto, combino. Moodboards, arquitetura, várias direções antes de escolher uma.' },
    wireframe:   { num: '04', title: 'Wireframe',      desc: 'Dou estrutura às ideias: fluxos e esqueleto, onde cada tela ganha seu lugar.' },
    interfaccia: { num: '05', title: 'Interface',      desc: 'Coloco a pele: UI, microcopy, acessibilidade. Aqui o texto é design tanto quanto o pixel.' },
    test:        { num: '06', title: 'Testo & Itero',  desc: 'Observo pessoas reais. Corrijo, melhoro, repito. (É o meu judô: cair, corrigir, levantar.)' },
  },
};

const PRESETS = {
  abilicity: {
    order: ['ascolto', 'definisco', 'interfaccia', 'test', 'esploro', 'wireframe'],
    label: { it: 'AbiliCity', en: 'AbiliCity', pt: 'AbiliCity' },
    caption: {
      it: 'AbiliCity → tre versioni: ogni giro di test ha cambiato l\'ordine e riaperto l\'ascolto.',
      en: 'AbiliCity → three versions: every test round changed the order and reopened listening.',
      pt: 'AbiliCity → três versões: cada rodada de teste mudou a ordem e reabriu a escuta.',
    },
  },
  hestia: {
    order: ['ascolto', 'definisco', 'wireframe', 'interfaccia', 'esploro', 'test'],
    label: { it: 'Hestia · 4 giorni', en: 'Hestia · 4 days', pt: 'Hestia · 4 dias' },
    caption: {
      it: 'Hestia → 4 giorni: niente tempo per esplorare a lungo, la ricerca ha compresso tutto il resto.',
      en: 'Hestia → 4 days: no time to explore for long, research compressed everything else.',
      pt: 'Hestia → 4 dias: sem tempo para explorar muito, a pesquisa comprimiu todo o resto.',
    },
  },
  qualia: {
    order: ['esploro', 'ascolto', 'wireframe', 'interfaccia', 'test', 'definisco'],
    label: { it: 'Qualia', en: 'Qualia', pt: 'Qualia' },
    caption: {
      it: 'Qualia → sono partita dallo strumento (AI) e ho lasciato che la ricerca lo mettesse a fuoco.',
      en: 'Qualia → I started from the tool (AI) and let research bring it into focus.',
      pt: 'Qualia → parti da ferramenta (IA) e deixei a pesquisa focá-la.',
    },
  },
};

const TITLE = {
  it: 'Il mio metodo non\nè una linea retta.',
  en: 'My process is not\na straight line.',
  pt: 'Meu processo não é\numa linha reta.',
};

const INTRO = {
  it: 'Non credo nel processo unico che risolve tutto. Parto sempre dal perché prima dello strumento: ogni progetto ha il suo problema, quindi il suo ordine. Queste sono le mie tessere — le ricompongo di volta in volta.',
  en: 'I don\'t believe in a one-size-fits-all process. I start from the "why" before the tool: every project has its own problem, so its own order. These are my pieces — I recombine them each time.',
  pt: 'Não acredito em um processo único que resolve tudo. Parto sempre do porquê antes da ferramenta: cada projeto tem seu problema, logo sua ordem. Estas são minhas peças — eu as recomponho a cada vez.',
};

const HINT = {
  it: 'Sposta le tessere con le frecce ◀ ▶ (o trascinale col mouse) → non esiste una sequenza giusta, esiste quella giusta per questo progetto.',
  en: 'Move the pieces with the ◀ ▶ arrows (or drag them) → there\'s no single right order, only the right one for this project.',
  pt: 'Mova as peças com as setas ◀ ▶ (ou arraste) → não existe uma sequência certa, existe a certa para este projeto.',
};

const PRESETS_LABEL = { it: 'Guarda un progetto reale:', en: 'See a real project:', pt: 'Veja um projeto real:' };
const RESET_LABEL = { it: '↺ Ordine base', en: '↺ Base order', pt: '↺ Ordem base' };
const RESET_CAPTION = {
  it: 'Ordine base — ma è solo uno dei tanti possibili.',
  en: 'Base order — but it\'s only one of many possible.',
  pt: 'Ordem base — mas é só uma das muitas possíveis.',
};
const DEFAULT_CAPTION = {
  it: '',
  en: '',
  pt: '',
};
const MOVED_ANNOUNCE = {
  it: (title, pos, total) => `${title} spostata in posizione ${pos} di ${total}.`,
  en: (title, pos, total) => `${title} moved to position ${pos} of ${total}.`,
  pt: (title, pos, total) => `${title} movida para a posição ${pos} de ${total}.`,
};
const PRESET_ANNOUNCE = {
  it: (label, names) => `Ordine impostato su ${label}: ${names.join(', ')}.`,
  en: (label, names) => `Order set to ${label}: ${names.join(', ')}.`,
  pt: (label, names) => `Ordem definida para ${label}: ${names.join(', ')}.`,
};

const TOOLS_TITLE = { it: 'strumenti', en: 'tools', pt: 'ferramentas' };
const TOOLS_ROW1 = [
  { name: 'Figma',        key: 'figma',        label: 'Fi', hasAvif: true },
  { name: 'GitHub',       key: 'github',       label: 'Gh', hasAvif: false },
  { name: 'Claude',       key: 'claude',       label: 'Cl', hasAvif: true },
  { name: 'Miro',         key: 'miro',         label: 'Mi', hasAvif: false },
  { name: 'Canva',        key: 'canva',        label: 'Ca', hasAvif: true },
  { name: 'Framer',       key: 'framer',       label: 'Fr', hasAvif: false },
];

const TOOLS_ROW2 = [
  { name: 'Notion',       key: 'notion',       label: 'No', hasAvif: false },
  { name: 'Antigravity',  key: 'antigravity',  label: 'An', hasAvif: true },
  { name: 'Adobe CC',     key: 'adobe',        label: 'Ad', hasAvif: true },
  { name: 'Claude Code',  key: 'claudecode',   label: 'CC', hasAvif: false },
  { name: 'WordPress',    key: 'wordpress',    label: 'Wp', hasAvif: true },
  { name: 'Gemini',       key: 'gemini',       label: 'Ge', hasAvif: true },
];

function ToolIcon({ name, imgKey, label, hasAvif }) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = `/images/logos/logo-${imgKey}.png`;
  const avifSrc = `/images/logos/logo-${imgKey}.avif`;

  return (
    <div className="workflow-tool-card" title={name}>
      <div className="workflow-tool-card-inner">
        {!imgFailed ? (
          <picture style={{ display: 'contents' }}>
            {hasAvif && <source srcSet={avifSrc} type="image/avif" />}
            <img
              src={src}
              alt={name}
              className="workflow-tool-icon-img"
              onError={() => setImgFailed(true)}
            />
          </picture>
        ) : (
          <div className="workflow-tool-icon-fallback" aria-hidden="true">
            <span>{label}</span>
          </div>
        )}
      </div>
      <span className="workflow-tool-name">{name}</span>
    </div>
  );
}

/* Il drag-and-drop nativo non ha equivalente ARIA (aria-grabbed/dropeffect deprecati):
   è un potenziamento solo-mouse. L'unica interfaccia riconosciuta da tastiera/AT
   sono i due bottoni ◀ ▶ per tessera — vedi review accessibilità di progetto. */
function usePointerReorderEnabled() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const check = () => {
      const html = document.documentElement;
      const motionReduced = mq.matches || html.dataset.a11yMotion === 'reduced';
      const simplified = html.dataset.a11yLayout === 'simplified';
      setEnabled(!motionReduced && !simplified);
    };
    check();
    mq.addEventListener('change', check);
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-a11y-motion', 'data-a11y-layout'] });
    return () => { mq.removeEventListener('change', check); observer.disconnect(); };
  }, []);

  return enabled;
}

export default function Workflow() {
  const { lang } = useLang();
  const pieces = PIECES[lang] ?? PIECES.it;
  const dragEnabled = usePointerReorderEnabled();

  const [order, setOrder] = useState(BASE_ORDER);
  const [rovingId, setRovingId] = useState(BASE_ORDER[0]);
  const [caption, setCaption] = useState(DEFAULT_CAPTION[lang] ?? DEFAULT_CAPTION.it);
  const [liveMessage, setLiveMessage] = useState('');

  const tileRefs = useRef({});
  const btnRefs = useRef({});
  const liveTimer = useRef(null);
  const dragFrom = useRef(null);

  const setTileRef = (id) => (node) => { tileRefs.current[id] = node; };
  const setBtnRef = (id, dir) => (node) => {
    if (!btnRefs.current[id]) btnRefs.current[id] = {};
    btnRefs.current[id][dir] = node;
  };

  const announce = useCallback((text) => {
    if (liveTimer.current) clearTimeout(liveTimer.current);
    liveTimer.current = setTimeout(() => setLiveMessage(text), 350);
  }, []);

  useEffect(() => {
    setCaption(DEFAULT_CAPTION[lang] ?? DEFAULT_CAPTION.it);
  }, [lang]);

  useEffect(() => () => { if (liveTimer.current) clearTimeout(liveTimer.current); }, []);

  const move = useCallback((id, dir) => {
    setOrder((prev) => {
      const i = prev.indexOf(id);
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = prev.slice();
      [next[i], next[j]] = [next[j], next[i]];
      const title = pieces[id]?.title ?? id;
      announce((MOVED_ANNOUNCE[lang] ?? MOVED_ANNOUNCE.it)(title, j + 1, next.length));
      setCaption((MOVED_ANNOUNCE[lang] ?? MOVED_ANNOUNCE.it)(title, j + 1, next.length));
      return next;
    });
    requestAnimationFrame(() => {
      btnRefs.current[id]?.[dir === -1 ? 'left' : 'right']?.focus();
    });
  }, [announce, lang, pieces]);

  const applyPreset = useCallback((key) => {
    const preset = PRESETS[key];
    const nextOrder = preset ? preset.order.slice() : BASE_ORDER.slice();
    setOrder(nextOrder);
    const names = nextOrder.map((id) => pieces[id]?.title ?? id);
    const label = preset ? (preset.label[lang] ?? preset.label.it) : (RESET_LABEL[lang] ?? RESET_LABEL.it);
    const capText = preset
      ? (preset.caption[lang] ?? preset.caption.it)
      : (RESET_CAPTION[lang] ?? RESET_CAPTION.it);
    setCaption(capText);
    announce(preset
      ? (PRESET_ANNOUNCE[lang] ?? PRESET_ANNOUNCE.it)(label, names)
      : (RESET_CAPTION[lang] ?? RESET_CAPTION.it));
  }, [announce, lang, pieces]);

  const focusTile = (id) => {
    setRovingId(id);
    tileRefs.current[id]?.focus();
  };

  const handleTileKeyDown = (id) => (e) => {
    const i = order.indexOf(id);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = order[Math.min(i + 1, order.length - 1)];
      focusTile(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = order[Math.max(i - 1, 0)];
      focusTile(prev);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusTile(order[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusTile(order[order.length - 1]);
    }
  };



  return (
    <section id="workflow" className="workflow" aria-labelledby="workflow-title">
      <div className="workflow-header">
        <h2 id="workflow-title" className="workflow-title">{TITLE[lang] ?? TITLE.it}</h2>
        <div className="workflow-header-right">
          <span className="workflow-count" aria-hidden="true">03</span>
        </div>
      </div>

      <Reorder.Group 
        axis="x"
        values={order} 
        onReorder={setOrder} 
        as="ol" 
        className="workflow-steps workflow-steps--puzzle" 
        aria-label={TITLE[lang] ?? TITLE.it}
      >
        {order.map((id, i) => {
          const step = pieces[id];
          return (
            <Reorder.Item
              value={id}
              key={id}
              as="li"
              ref={setTileRef(id)}
              className="workflow-step workflow-step--puzzle"
              tabIndex={rovingId === id ? 0 : -1}
              drag={dragEnabled ? "x" : false}
              dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
              dragElastic={0.2}
              whileDrag={{
                scale: 1.1,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                cursor: "grabbing"
              }}
              onFocus={() => setRovingId(id)}
              onKeyDown={handleTileKeyDown(id)}
              aria-label={`${step.title} — posizione ${i + 1} di ${order.length}`}
            >
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              <div className="sr-only">
                <button
                  type="button"
                  ref={setBtnRef(id, 'left')}
                  onClick={() => move(id, -1)}
                  disabled={i === 0}
                  aria-label={lang === 'it' ? `Sposta ${step.title} a sinistra (posizione ${i + 1} di ${order.length})` : lang === 'pt' ? `Mover ${step.title} para a esquerda (posição ${i + 1} de ${order.length})` : `Move ${step.title} left (position ${i + 1} of ${order.length})`}
                >
                  ◀
                </button>
                <button
                  type="button"
                  ref={setBtnRef(id, 'right')}
                  onClick={() => move(id, 1)}
                  disabled={i === order.length - 1}
                  aria-label={lang === 'it' ? `Sposta ${step.title} a destra (posizione ${i + 1} di ${order.length})` : lang === 'pt' ? `Mover ${step.title} para a direita (posição ${i + 1} de ${order.length})` : `Move ${step.title} right (position ${i + 1} of ${order.length})`}
                >
                  ▶
                </button>
              </div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      <p className="workflow-caption" aria-hidden="true">{caption}</p>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{liveMessage}</p>

      {/* Sezione Strumenti (sotto alla sezione viola) */}
      <div className="workflow-tools-section">
        <div className="workflow-tools-banner">
          <span className="workflow-tools-banner-label">{TOOLS_TITLE[lang]}</span>
          <span className="workflow-tools-banner-num" aria-hidden="true">03.1</span>
        </div>
        <div className="workflow-marquee-container">
          <div className="workflow-marquee-track">
            {[...TOOLS_ROW1, ...TOOLS_ROW1, ...TOOLS_ROW1].map((tool, i) => (
              <ToolIcon key={`r1-${tool.key}-${i}`} name={tool.name} imgKey={tool.key} label={tool.label} hasAvif={tool.hasAvif} />
            ))}
          </div>
          <div className="workflow-marquee-track reverse">
            {[...TOOLS_ROW2, ...TOOLS_ROW2, ...TOOLS_ROW2].map((tool, i) => (
              <ToolIcon key={`r2-${tool.key}-${i}`} name={tool.name} imgKey={tool.key} label={tool.label} hasAvif={tool.hasAvif} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
