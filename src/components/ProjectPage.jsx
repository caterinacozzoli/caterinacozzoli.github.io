import { useEffect, useCallback, useRef, useState } from 'react';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectPage.css';

/* ─── PROJECT DATA ─────────────────────────────────────────────────────────── */

const PROJECTS = {
  libraccio: {
    id: 'libraccio',
    title: 'Libraccio',
    subtitle: "Settembre. Stessa lista. Stesso caos. Ogni anno.",
    year: '2025',
    role: "UX Research · Wireframing · Prototipazione",
    team: "Caterina Cozzoli, Simone Ragnoli, Erica Marchetti",
    tags: ['UX Research', 'Benchmark', 'Wireframing', 'Figma'],
    accent: '#1a7a3c',
    accentLight: '#d4f0df',
    sections: [
      {
        type: 'opening-quote',
        quote: "«Ogni settembre uguale. La lista in mano, un'ora persa, e alla fine vado in libreria.»",
        citation: "Genitore, Milano",
      },
      {
        type: 'context',
        label: '01 / Il problema',
        title: "Il genitore con la lista in mano che non riesce a comprare i libri",
        body: "Libraccio.it è uno dei principali canali per l'acquisto dei libri scolastici in Italia. Ma ogni settembre, milioni di famiglie si scontrano con la stessa frustrazione: una ricerca che non capisce le liste delle scuole, un confronto nuovo/usato che non funziona, un carrello pensato per un libro alla volta quando ne servono dodici.",
        highlight: "Come si fa a comprare 12 libri in mezz'ora — nuovo o usato, qualsiasi condizione — senza impazzire?",
      },
      {
        type: 'process',
        label: '02 / Processo',
        title: "Come siamo arrivati alla soluzione",
        steps: [
          { num: '01', name: 'Brief', desc: "Scope definito: redesign del flusso di acquisto scolastico su libraccio.it, desktop e mobile." },
          { num: '02', name: 'Empathize', desc: "Analisi euristica del sito attuale, benchmark competitor (IBS, Mondadori, Amazon), interviste a genitori e studenti durante il periodo scolastico." },
          { num: '03', name: 'Define', desc: "Personas, user journey map dell'acquisto scolastico, pain prioritizzati: ricerca, confronto prezzi, checkout multiplo." },
          { num: '04', name: 'Ideate', desc: "Crazy 8s, sketching collettivo, matrice effort/impact per selezionare le soluzioni da prototipare." },
          { num: '05', name: 'Prototype', desc: "Wireframes low-fi → prototipo Figma mid-fi. Test di usabilità con 5 utenti reali." },
        ],
      },
      {
        type: 'insights',
        label: '03 / Insight che hanno guidato le scelte',
        title: "Cosa abbiamo scoperto",
        items: [
          { icon: '📋', text: "Chi compra arriva con una lista già in mano: cerca titoli precisi, non naviga per materia. Il motore di ricerca deve capire il formato delle liste scolastiche." },
          { icon: '📚', text: "Il punto di abbandono più alto è il confronto nuovo/usato: condizioni poco chiare, prezzi non comparabili a colpo d'occhio." },
          { icon: '🛒', text: "Un acquisto scolastico è in media 6-12 libri: il carrello standard non è pensato per comprare in blocco, libro per libro, con condizioni diverse." },
          { icon: '📱', text: "Il 61% inizia da mobile ma completa su desktop — spesso costretto. Un flusso mobile-first salverebbe metà degli abbandoni." },
        ],
      },
      {
        type: 'solution',
        label: '04 / La soluzione',
        title: "Un flusso scolastico dedicato, non un carrello generico",
        body: "Abbiamo riprogettato l'acquisto scolastico come un percorso a sé: carica o cerca l'elenco testi, seleziona nuovo o usato libro per libro, checkout unificato. Una lista scolastica salvata permette di riprendere da qualsiasi dispositivo. Niente più tab aperte, niente più appunti su carta.",
        callout: "Nei test di usabilità, il tempo medio di completamento è sceso da 12 a 4 minuti.",
      },
    ],
  },

  'abili-city': {
    id: 'abili-city',
    title: 'AbiliCity',
    subtitle: "Il luogo digitale che le persone con disabilità non avevano mai avuto.",
    year: '2023–',
    role: "Co-founder · UX/UI Design · Product Strategy",
    team: "Caterina Cozzoli, Camilla Lurani Cernuschi",
    tags: ['UX/UI', 'Mobile App', 'Web App', 'Accessibility'],
    badge: '🏛 Parlamento Europeo',
    accent: '#3f68ff',
    accentLight: '#e8eeff',
    sections: [
      {
        type: 'opening-quote',
        quote: "«Cerchi eventi accessibili. Il sito non funziona sul telefono. Cerchi associazioni. Il numero non risponde.»",
        citation: "Persona con disabilità motoria, Roma",
      },
      {
        type: 'context',
        label: '01 / Il problema',
        title: "Informazioni sparse ovunque, accessibilità garantita da nessuna parte",
        body: "Se sei una persona con disabilità — o ne hai una vicino — sai cosa significa cercare. Cerchi eventi accessibili su siti istituzionali che non funzionano su smartphone. Cerchi associazioni di supporto tra gruppi Facebook e passaparola. Cerchi lavoro in un mercato che finge che tu non esista. AbiliCity nasce da una semplice domanda: perché non c'è un posto dove trovare tutto?",
        highlight: "L'accessibilità non è un'opzione. È un diritto. E noi vogliamo costruire la città digitale dove tutti possano entrare.",
      },
      {
        type: 'features',
        label: '02 / Il prodotto',
        title: "Cosa fa AbiliCity",
        items: [
          { icon: '📍', name: 'Eventi vicino a te', desc: "Scopri eventi accessibili nella tua città. Filtri per tipo di disabilità, categoria, distanza." },
          { icon: '🤝', name: 'Associazioni', desc: "Directory di associazioni e servizi con informazioni sull'accessibilità fisica e digitale di ciascuno." },
          { icon: '💼', name: 'Lavoro inclusivo', desc: "Job board dedicata con annunci da aziende impegnate nell'inclusione lavorativa reale." },
          { icon: '💬', name: 'Community', desc: "Spazio di confronto tra persone, famiglie e professionisti: domande, storie, risorse condivise." },
        ],
      },
      {
        type: 'process',
        label: '03 / La storia',
        title: "Da un compito universitario al Parlamento Europeo",
        steps: [
          { num: '01', name: '2023, Bicocca', desc: "AbiliCity nasce durante il corso di Teoria e tecnica dei nuovi media. Il progetto era un compito. Per noi era un'opportunità reale — Cate aveva quasi dieci anni di volontariato con persone con disabilità in Su la Testa." },
          { num: '02', name: 'La svolta', desc: "Durante la presentazione in aula, Marcos Cappato — assistente parlamentare — si appassiona all'idea e propone di portarla a Bruxelles." },
          { num: '03', name: 'Novembre 2023, Parlamento Europeo', desc: "Presentiamo AbiliCity durante una conferenza sulla disabilità. La risposta ci conferma: il progetto ha una risonanza che va oltre l'aula universitaria." },
          { num: '04', name: 'Oggi', desc: "MVP web e mobile in sviluppo. Rete di associazioni, esperti di innovazione sociale e disability advocates sempre più ampia." },
        ],
      },
      {
        type: 'callout-quote',
        quote: "«Crediamo in una comunità in cui ogni voce conta, ogni barriera può essere superata, e ogni incontro può generare cambiamento.»",
        label: 'Mission AbiliCity',
      },
    ],
  },

  qualia: {
    id: 'qualia',
    title: 'Qualia',
    subtitle: "Non è non vedere i colori. È non potersi fidare di ciò che si vede.",
    year: '2026',
    role: "UX Research · Concept Design · Prototipazione",
    team: "Caterina Cozzoli + team",
    tags: ['UX Research', 'UX/UI', 'Mobile', 'Figma'],
    accent: '#c2410c',
    accentLight: '#ffedd5',
    sections: [
      {
        type: 'opening-quote',
        quote: "«I've learned not to trust myself with successfully identifying colors all the time.»",
        citation: "Jadraptor, r/ColorBlind",
      },
      {
        type: 'context',
        label: '01 / Il problema',
        title: "L'8% degli uomini non vede male i colori. Non si fida di vederli.",
        body: "Il daltonismo colpisce circa l'8% degli uomini e lo 0,5% delle donne. Ma il problema reale non è il deficit — è la paranoia quotidiana: l'81% delle persone daltoniche chiede aiuto a qualcun altro per verificare un colore almeno una volta al giorno. Vestiti al mattino. Carne sul fuoco. LED che non sai se è verde o rosso. Grafici al lavoro che non riesci a leggere.",
      },
      {
        type: 'research',
        label: '02 / La ricerca',
        title: "Un anno di ascolto, su più fronti",
        items: [
          { icon: '📄', name: '10 articoli scientifici', desc: "Corpus accademico su CVD (Color Vision Deficiency): impatto quotidiano, limiti delle soluzioni esistenti, fallimenti tecnologici documentati." },
          { icon: '🎙️', name: '5 interviste in profondità', desc: "Giuseppe, Moreno, Marco, Paolo, Italo — daltonici dai 23 ai 74 anni. Esperienze radicalmente diverse, stesso pain di fondo: la sfiducia." },
          { icon: '📊', name: 'Survey · 22 risposte', desc: "Chi chiede aiuto, quando, a chi. Quali strumenti usa (e perché li abbandona). In quali momenti il colore blocca davvero una decisione." },
          { icon: '💬', name: '~280 commenti Reddit', desc: "15 thread di r/ColorBlind dal 2012 al 2025. La comunità che da anni documenta pain, workaround creativi e bisogni inascoltati." },
        ],
      },
      {
        type: 'insights',
        label: '03 / I 4 insight che hanno cambiato direzione',
        title: "Non è un problema di visione. È un problema di fiducia.",
        items: [
          { icon: '🎯', text: "La sfiducia è il pain centrale. Lo strumento non deve 'correggere la visione' — deve dare una conferma veloce, discreta, affidabile." },
          { icon: '👁️', text: "Cecità sulla propria cecità: ci sono informazioni cromatiche che i daltonici non sanno di non vedere. Il LED del microonde che lampeggia in rosso per due anni. Il badge del lavoro che cambia colore." },
          { icon: '🔕', text: "Costo sociale: tirar fuori il telefono in un negozio per controllare un colore dà nell'occhio. Lo strumento deve funzionare senza renderti visibile." },
          { icon: '🤲', text: "I daltonici hanno già strategie proprie: tatto, odore, consistenza, forma. L'app non le sostituisce — le cataloga, le diffonde, le amplifica." },
        ],
      },
      {
        type: 'solution',
        label: '04 / Il prodotto',
        title: "Qualia: decide with confidence",
        body: "Qualia è un'app mobile con due modalità: uno scanner live che mostra i colori in real-time sull'inquadratura (come Google Lens, ma per i colori), e una modalità approfondimento che genera una scheda decisionale — non solo HEX, ma contesto pratico per quella categoria e strategie multi-sensoriali alternative.",
        features: [
          { name: 'Scanner live', desc: "Inquadri, le etichette galleggianti appaiono. Nessuno scatto, massima discrezione." },
          { name: 'Scheda decisionale', desc: "HEX + contesto categoria + almeno una verifica non-cromatica alternativa." },
          { name: '4 categorie MVP', desc: "Vestiario · Cibo e cucina · Casa ed elettronica · Lavoro e dati" },
          { name: 'Confidence dichiarata', desc: "L'app non finge certezza. Tre stati: alta / media / bassa — con suggerimento di rifare in luce migliore." },
        ],
      },
      {
        type: 'callout-quote',
        quote: "«Aiutarti a decidere con fiducia — senza farti sentire una persona da correggere.»",
        label: 'Product vision Qualia',
      },
    ],
  },
};

/* ─── SECTION RENDERERS ─────────────────────────────────────────────────────── */

function SectionContext({ s, accent }) {
  return (
    <section className="pp-section pp-section--context">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      <p className="pp-body">{s.body}</p>
      {s.highlight && (
        <blockquote className="pp-highlight" style={{ borderColor: accent }}>
          {s.highlight}
        </blockquote>
      )}
    </section>
  );
}

function SectionProcess({ s, accent }) {
  return (
    <section className="pp-section pp-section--process">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      <ol className="pp-steps">
        {s.steps.map(step => (
          <li key={step.num} className="pp-step">
            <span className="pp-step-num" style={{ color: accent }}>{step.num}</span>
            <div>
              <strong className="pp-step-name">{step.name}</strong>
              <p className="pp-step-desc">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SectionInsights({ s }) {
  return (
    <section className="pp-section pp-section--insights">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      <ul className="pp-insights">
        {s.items.map((item, i) => (
          <li key={i} className="pp-insight-item">
            <span className="pp-insight-icon">{item.icon}</span>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionFeatures({ s, accent, accentLight }) {
  return (
    <section className="pp-section pp-section--features">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      <ul className="pp-features-grid">
        {s.items.map((item, i) => (
          <li key={i} className="pp-feature-card" style={{ background: accentLight }}>
            <span className="pp-feature-icon">{item.icon}</span>
            <strong className="pp-feature-name" style={{ color: accent }}>{item.name}</strong>
            <p className="pp-feature-desc">{item.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionResearch({ s, accent }) {
  return (
    <section className="pp-section pp-section--research">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      <ul className="pp-research-grid">
        {s.items.map((item, i) => (
          <li key={i} className="pp-research-item">
            <span className="pp-research-icon">{item.icon}</span>
            <div>
              <strong className="pp-research-name" style={{ color: accent }}>{item.name}</strong>
              <p className="pp-research-desc">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionSolution({ s, accent, accentLight }) {
  return (
    <section className="pp-section pp-section--solution">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      <p className="pp-body">{s.body}</p>
      {s.features && (
        <ul className="pp-solution-features">
          {s.features.map((f, i) => (
            <li key={i} className="pp-solution-feature">
              <strong style={{ color: accent }}>{f.name}</strong>
              <span>{f.desc}</span>
            </li>
          ))}
        </ul>
      )}
      {s.callout && (
        <div className="pp-callout" style={{ background: accentLight, borderColor: accent }}>
          {s.callout}
        </div>
      )}
    </section>
  );
}

function SectionImpact({ s, accent, accentLight }) {
  return (
    <section className="pp-section pp-section--impact">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      <p className="pp-body">{s.body}</p>
      {s.callout && (
        <div className="pp-callout" style={{ background: accentLight, borderColor: accent }}>
          {s.callout}
        </div>
      )}
    </section>
  );
}

/* citazione + attribution in <cite> dentro <blockquote> */
function SectionOpeningQuote({ s }) {
  return (
    <section className="pp-section pp-section--opening-quote">
      <blockquote className="pp-opening-quote">
        {s.quote}
        {s.citation && <cite className="pp-opening-cite">{s.citation}</cite>}
      </blockquote>
    </section>
  );
}

function SectionCalloutQuote({ s }) {
  return (
    <section className="pp-section pp-section--quote">
      <blockquote className="pp-big-quote">
        {s.quote}
        {/* attribution inside blockquote per semantics HTML spec */}
        {s.label && <cite className="pp-callout-cite">{s.label}</cite>}
      </blockquote>
    </section>
  );
}

function renderSection(s, accent, accentLight) {
  switch (s.type) {
    case 'opening-quote': return <SectionOpeningQuote key={s.quote} s={s} />;
    case 'context':       return <SectionContext key={s.label} s={s} accent={accent} accentLight={accentLight} />;
    case 'process':       return <SectionProcess key={s.label} s={s} accent={accent} />;
    case 'insights':      return <SectionInsights key={s.label} s={s} />;
    case 'features':      return <SectionFeatures key={s.label} s={s} accent={accent} accentLight={accentLight} />;
    case 'research':      return <SectionResearch key={s.label} s={s} accent={accent} accentLight={accentLight} />;
    case 'solution':      return <SectionSolution key={s.label} s={s} accent={accent} accentLight={accentLight} />;
    case 'impact':        return <SectionImpact key={s.label} s={s} accent={accent} accentLight={accentLight} />;
    case 'callout-quote': return <SectionCalloutQuote key={s.label} s={s} />;
    default:              return null;
  }
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────────── */

export default function ProjectPage({ projectId, onClose }) {
  const data = PROJECTS[projectId];
  const [collapsed, setCollapsed] = useState(false);
  const contentRef    = useRef(null);
  const collapsibleRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    lockScroll();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
    };
  }, [handleKeyDown]);

  /* Collapse hero quando si scorre nel contenuto */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      const next = el.scrollTop > 80;
      setCollapsed(c => c === next ? c : next);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  /* inert sul wrapper collassabile — sicuro contro future aggiunte interattive */
  useEffect(() => {
    const el = collapsibleRef.current;
    if (!el) return;
    if (collapsed) {
      el.setAttribute('inert', '');
    } else {
      el.removeAttribute('inert');
    }
  }, [collapsed]);

  if (!data) return null;

  const { accent, accentLight } = data;

  return (
    <AnimatePresence>
      <motion.div
        className="pp-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          className="pp-sheet"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 32, mass: 0.9 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Progetto: ${data.title}`}
        >
          {/* Close */}
          <button className="pp-close" onClick={onClose} aria-label="Chiudi progetto">
            <span aria-hidden="true">✕</span>
            <span className="pp-close-label">chiudi</span>
          </button>

          {/* Hero banner — tinta chiara accent, testo charcoal */}
          <header className={`pp-hero${collapsed ? ' pp-hero--collapsed' : ''}`} style={{ background: accentLight }}>
            {/* pp-hero-mockup: NO focusable elements mai dentro (aria-hidden) */}
            <div className="pp-hero-mockup" aria-hidden="true" />
            <div className="pp-hero-inner">
              {/* Titolo + Sub — sempre visibili */}
              <h2 className="pp-title">{data.title}</h2>
              <p className="pp-subtitle">{data.subtitle}</p>

              {/* Collapsible — anno, badge, pills, ruolo, team */}
              <div
                ref={collapsibleRef}
                className="pp-hero-collapsible"
                aria-label="Dettagli progetto"
              >
                <div className="pp-hero-meta">
                  <span className="pp-year">{data.year}</span>
                  {data.badge && (
                    <span className="pp-badge" style={{ background: accent, color: '#fff' }}>
                      {data.badge}
                    </span>
                  )}
                </div>
                <ul className="pp-tags" aria-label="Categorie" style={{ marginBottom: '24px' }}>
                  {data.tags.map(t => (
                    <li key={t} className="pp-tag" style={{ background: accent, color: '#fff' }}>{t}</li>
                  ))}
                </ul>
                <div className="pp-info-row">
                  <span className="pp-info-label">Ruolo</span>
                  <span className="pp-info-value">{data.role}</span>
                </div>
                <div className="pp-info-row" style={{ marginTop: '12px' }}>
                  <span className="pp-info-label">Team</span>
                  <span className="pp-info-value">{data.team}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div
            ref={contentRef}
            className="pp-content"
            style={{
              backgroundImage: "url('/images/textures/carta acquarello.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {data.sections.map(s => renderSection(s, accent, accentLight))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
