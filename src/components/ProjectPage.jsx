import { useEffect, useCallback, useRef, useState } from 'react';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectPage.css';

/* ─── PROJECT DATA ─────────────────────────────────────────────────────────── */

const PROJECTS = {
  libraccio: {
    id: 'libraccio',
    title: 'Libraccio',
    subtitle: "Ridisegnare l'acquisto dei libri scolastici partendo dal momento più frustrante: trovare e comprare l'intera lista in una sola sessione.",
    year: '2025–2026',
    role: "Desk Research (Reddit + articoli scientifici) · Progettazione flussi di esperienza · UI funzionalità",
    team: "Progetto di team · Talent Garden — [conferma: quante persone]",
    tags: ['E-commerce', 'User Research', 'Information Architecture', 'Accessibilità'],
    mockup: '/images/projects/mockup-libraccio.png',
    image: '/images/folders/folder-libraccio.png',
    stickers: [
      { src: '/images/sticker/sticker tag.png', link: 'https://students.talentgarden.com/talents/recaSrSfzZxkuRi1X', style: { bottom: '-5%', right: '4%', width: '200px', transform: 'rotate(8deg)' } },
    ],
    accent: '#1a7a3c',
    accentLight: '#d4f0df',
    qrUrl: 'https://www.figma.com/proto/72QyZ6zBlCHX6Hdlef9N6T/Libraccio-scolastica?page-id=2910%3A20566&node-id=4132-33231&viewport=-15048%2C37%2C0.44&t=ajf2YquIi7PveT8Q-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3698%3A44057',
    links: [
      { label: 'UI Figma', url: 'https://www.figma.com/design/72QyZ6zBlCHX6Hdlef9N6T/Libraccio-scolastica-UI' },
      { label: 'Prototipo interattivo', url: 'https://www.figma.com/proto/72QyZ6zBlCHX6Hdlef9N6T/Libraccio-scolastica?node-id=3698-44057&starting-point-node-id=3698%3A44057' }
    ],
    sections: [
      {
        type: 'opening-quote',
        quote: "«Il 31 agosto apri la lista della classe e devi ricostruirla a mano, tra codici ISBN che nessuno conosce ed edizioni quasi identiche. La sfida non era rifare un sito: era capire dove si rompe la fiducia.»",
        citation: "— Insight di ricerca, Libraccio redesign",
      },
      {
        type: 'context',
        label: '01 / Il problema',
        title: "Comprare libri scolastici: un compito ad alta posta e bassa tolleranza all'errore",
        body: "Libraccio domina il mercato fisico ma online perde: il 65% di chi lo conosce non l'ha mai usato per comprare. Il 76% non sa nemmeno che esiste la lista adozioni — la sua funzione più utile. Non mancano le funzionalità: manca la visibilità. La sfida non era \"rifare un sito\": era capire dove si rompe la fiducia e perché le funzionalità chiave restano invisibili.",
        highlight: "Ricerca: 100+ feedback · Il 76% non conosce la feature chiave · 65% sceglie Libraccio fisico, online si ferma al 15%",
        objectives: [
          "Migliorare la percezione dell'usato",
          "Rendere visibili le funzionalità del sito",
          "Dalla lista al checkout in una sola sessione (one-click buy)",
        ],
      },
      {
        type: 'process',
        label: '02 / La ricerca che diventa interfaccia',
        title: "Dal dato alla decisione: tracciabilità insight → schermata",
        steps: [
          { num: '01', name: 'Desk research', desc: "Analisi AS-IS del flusso attuale, analisi euristica (frizioni su homepage, ricerca scuola, selezione usato/nuovo), benchmark competitor diretti e indiretti, digital observation su Reddit, Trustpilot e Google Trends. Insight chiave: chi ha buoni prezzi non ha buona esperienza — Libraccio può occupare il vuoto." },
          { num: '02', name: 'User research', desc: "Survey quantitativo · 9 interviste semi-strutturate (5 donne, 3 uomini, età universitaria e genitoriale, 15–30 min) · 3 user test in Agile (6 task: ricerca, selezione usato/nuovo, checkout, data di consegna) · personas sul lifecycle scolastico. In totale 100+ feedback." },
          { num: '03', name: 'Sintesi', desc: "9 insight dalla triangolazione dei dati → 3 personas (Laura 45, organizzata; Marco 17, veloce; Giulia 30, precisa) → customer journey ridisegnata." },
          { num: '04', name: 'Design', desc: "Wireframe → UI → prototipo interattivo con 3 flussi. Ogni schermata ancorata a un insight di ricerca, non a una preferenza estetica." },
        ],
      },
      {
        type: 'decisions',
        label: '03 / Le decisioni di design',
        title: "AS-IS → TO-BE: la lente accessibilità su ogni scelta",
        items: [
          {
            icon: '🏠',
            name: 'Homepage: dal rumore alla gerarchia',
            asIs: "Densità alta, le azioni principali non emergono sul promozionale. Il sito travolge invece di accogliere.",
            toBe: "CTA primaria dominante, lista adozioni come punto d'ingresso, rumore ridotto.",
            why: "Una gerarchia visiva forte è la prima forma di accessibilità cognitiva.",
          },
          {
            icon: '🔍',
            name: 'Ricerca scuola: ridurre il carico cognitivo',
            asIs: "Testo non formattato, rosso usato male, nessun breadcrumb, orientamento impossibile da mobile.",
            toBe: "Gerarchia tipografica rigorosa, breadcrumb visibili, mobile come contesto primario. Lista adozioni via scuola→indirizzo→classe o QR code.",
            why: "Breadcrumb + tipografia = l'utente sa sempre dove si trova. Inclusione = riduzione di ansia.",
          },
          {
            icon: '🛒',
            name: 'Selezione usato/nuovo: feedback che si vedono',
            asIs: "Nessuna distinzione visiva tra stati, disponibilità solo testuale e a basso contrasto, CTA carrello non sticky su mobile.",
            toBe: "Distinzione visiva netta nuovo/usato, feedback immediato sulla selezione, CTA fissa in fondo su mobile. Il sistema propone la combinazione più conveniente, ma l'utente mantiene controllo e conferma.",
            why: "Contrasto e stati chiari sono WCAG applicato a una decisione d'acquisto reale.",
          },
        ],
      },
      {
        type: 'outcome',
        label: '04 / Outcome',
        title: "Flussi validati, decisioni tracciate",
        body: "Progetto formativo: l'esito è la qualità della validazione e la tracciabilità delle decisioni. Flussi validati con user test Agile; ogni schermata è ancorata a un insight di ricerca, non a una preferenza estetica.",
        callout: "[Aggiungi qui un esito dei test se disponibile: es. task completati senza esitazione, feedback dei tutor]",
      },
      {
        type: 'learning',
        label: '05 / Cosa ho imparato',
        quote: "\"In un acquisto ad alta posta la UI deve prevenire l'errore e mostrare la fiducia, non solo renderla reversibile. E una feature invisibile, per l'utente, semplicemente non esiste.\"",
      },
      {
        type: 'prototype',
        label: '06 / Prototipo',
        title: "Esplora il prototipo interattivo",
        url: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F72QyZ6zBlCHX6Hdlef9N6T%2FLibraccio-scolastica%3Fpage-id%3D2910%253A20566%26node-id%3D4132-33231%26viewport%3D-15048%252C37%252C0.44%26t%3Dajf2YquIi7PveT8Q-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D3698%253A44057",
        link: "https://www.figma.com/proto/72QyZ6zBlCHX6Hdlef9N6T/Libraccio-scolastica?node-id=3698-44057&starting-point-node-id=3698%3A44057",
        qrLink: "https://www.figma.com/proto/72QyZ6zBlCHX6Hdlef9N6T/Libraccio-scolastica?node-id=3698-44057&starting-point-node-id=3698%3A44057",
      },
    ],
  },

  'abili-city': {
    id: 'abili-city',
    title: 'AbiliCity',
    subtitle: "La città a misura di chi di solito resta fuori: mobilità, lavoro e tempo libero accessibili in un click.",
    year: '2023–',
    role: "Co-fondatrice · UX/UI Design · sistema illustrativo · brand",
    team: "Con Camilla Lurani Cernuschi — io: UX/UI, microcopy, testing, pitch, business plan, illustrazioni, brand · lei: social & marketing",
    tags: ['Accessibilità', 'Inclusione', 'Product Design', 'Illustrazione'],
    image: '/images/folders/folder-abilicity.png',
    stickers: [
      { src: '/images/sticker/sticker abilicity.png', link: 'https://www.abilicity.com/', style: { bottom: '-5%', right: '6%', width: '200px', transform: 'rotate(6deg)' } },
      { src: '/images/sticker/sticker parlameneto.png', link: 'https://psicologia.unimib.it/it/news/abilicity-lapplicazione-tutti-nata-bicocca-e-sbarcata-al-parlamento-europeo', style: { top: '10%', right: '2%', width: '180px', transform: 'rotate(-5deg)' } },
    ],
    accent: '#3f68ff',
    accentLight: '#e8eeff',
    qrUrl: 'https://www.abilicity.com/',
    links: [
      { label: 'abilicity.com', url: 'https://www.abilicity.com/' },
      { label: 'Prototipo Figma', url: 'https://www.figma.com/proto/jhC381DC6WyEdSeG070svr/AbiliCity?node-id=66-1881&starting-point-node-id=366%3A93' },
      { label: 'Scheda Fondazione Triulza', url: 'https://fondazionetriulza.org/prototipo/abilicity/' },
    ],
    sections: [
      {
        type: 'opening-quote',
        quote: "«Quel bar ha il gradino? L'ascensore funziona? Esiste un'associazione, un evento, un lavoro vicino a me?»",
        citation: "Dalla ricerca — il vuoto di informazioni che AbiliCity riempie",
      },
      {
        type: 'context',
        label: '01 / Il problema',
        title: "Un vuoto di informazioni, non un divieto",
        body: "Per una persona con disabilità, gli spazi di crescita fuori dalla famiglia e dai contesti terapeutici sono spesso preclusi non da un divieto, ma da un vuoto di informazioni. Dalla conferenza da cui è nato il primo prototipo è emerso un bisogno ancora più profondo: non un'app di servizi, ma un catalizzatore di relazioni. AbiliCity nasce per riempire quel vuoto su tre sfere della quotidianità: mobilità, lavoro, tempo libero.",
        highlight: "Presentato al Parlamento Europeo · Prototipo Fondazione Triulza (legacy Milano-Cortina 2026) · Co-fondatrice · UX, UI e illustrazioni",
      },
      {
        type: 'process',
        label: '02 / Il processo — l\'evoluzione come metodo',
        title: "Tre versioni, una curva di apprendimento",
        steps: [
          { num: 'v1', name: 'Il prototipo embrionale (app nativa)', desc: "Mappa con segnalazioni utente, associazioni filtrate per orario/categoria, eventi, annunci di lavoro. Grezzo, ma arrivato fino a Bruxelles. Lezione: l'idea regge, la forma no." },
          { num: 'v2', name: 'UI più curata, ma non ancora accessibile', desc: "Interfaccia esteticamente migliore, ma contrasti e font non conformi e zero label. Bella da vedere, inaccessibile con screen reader. Insight chiave: l'accessibilità non è un layer estetico ma strutturale — le label contano più della palette." },
          { num: 'v3', name: 'La web-app con community (attuale)', desc: "Ripensata come web-app accessibile, fruibile da browser senza installazioni. Scelta di scope onesta: niente mappa (troppo complessa da fare bene) in favore di una community che rende l'app un catalizzatore di relazioni. Tagliare la feature più difficile è stata una decisione di design, non una rinuncia." },
        ],
      },
      {
        type: 'design-decisions',
        label: '03 / Le decisioni di design',
        title: "Due scelte che raccontano chi sono",
        items: [
          { icon: '🤚', name: 'Un logo-mano al posto della carrozzina', what: "L'icona del progetto non è la sedia a rotelle ma una mano.", why: "La maggior parte delle disabilità è invisibile; il simbolo-carrozzina ne escluderebbe molte. Volevo un segno che accogliesse chiunque." },
          { icon: '🎨', name: 'Un sistema di illustrazioni originali anti-pietismo', what: "Illustrazioni disegnate da me, per rappresentare la disabilità senza pietismo né stereotipi.", why: "Persone, non \"casi\": un tono visivo dignitoso e riconoscibile, coerente col messaggio." },
          { icon: '📎', name: 'Oltre lo schermo — un touchpoint fisico', what: "Per il Parlamento Europeo: un opuscolo e un invito a forma di segnalibro riutilizzabile.", why: "Il mio unico touchpoint fisico, coerente con l'interesse per le esperienze omnichannel." },
        ],
      },
      {
        type: 'outcome',
        label: '04 / Impatto',
        title: "Da progetto d'aula a iniziativa reale",
        body: "Presentato al Parlamento Europeo (conferenza \"Integr-abilità\", Bruxelles, 9 nov 2023). Selezionato come prototipo da Fondazione Triulza (legacy Olimpiadi-Paralimpiadi Milano-Cortina 2026) e dall'acceleratore iBicocca. Onesto: resta in sviluppo, ma il percorso è la prova.",
      },
      {
        type: 'learning',
        label: '05 / Cosa ho imparato',
        quote: "\"Ho imparato che l'accessibilità si progetta dalla struttura, non si applica alla fine come una mano di vernice — e che un simbolo sbagliato può escludere prima ancora dell'interfaccia.\"",
      },
      {
        type: 'prototype',
        label: '06 / Prototipo',
        title: "Esplora il prototipo dell'applicazione",
        url: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FjhC381DC6WyEdSeG070svr%2FAbiliCity%3Fnode-id%3D66-1881%26starting-point-node-id%3D366%253A93",
        link: "https://www.figma.com/proto/jhC381DC6WyEdSeG070svr/AbiliCity?node-id=66-1881&starting-point-node-id=366%3A93",
        qrLink: "https://www.abilicity.com/",
      },
      {
        type: 'callout-quote',
        quote: "«Come co-fondatrice ho guidato UX e UI, microcopy, testing, il pitch e il business plan, insieme al sistema illustrativo e all'identità; Camilla ha curato social media e marketing.»",
        label: 'Il mio contributo',
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
    tags: ['XR', 'Figma', 'Antigravity', 'Claude Code', 'UX Research', 'Accessibilità'],
    mockup: '/images/projects/qualia/clothes-scanner-result.png',
    mockupClass: 'pp-hero-mockup--phone',
    image: '/images/folders/folder-qualia.png',
    stickers: [
      { src: '/images/sticker/sticker tag.png', link: 'https://students.talentgarden.com/talents/recaSrSfzZxkuRi1X', style: { bottom: '-5%', right: '4%', width: '200px', transform: 'rotate(-7deg)' } },
    ],
    accent: '#c2410c',
    accentLight: '#ffedd5',
    qrUrl: 'https://caterinacozzoli.github.io/qualia-preview/',
    links: [
      { label: 'GitHub', url: 'https://github.com/caterinacozzoli/qualia' }
    ],
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
        mockups: [
          { src: '/images/projects/qualia/dashboard.png', caption: 'Dashboard principale con cronologia e shortcut rapide' },
          { src: '/images/projects/qualia/clothes-scanner-result-expanded.png', caption: 'Scansione vestito - Dettagli e corrispondenza colore' },
          { src: '/images/projects/qualia/clothes-scanner-result-expanded-2.png', caption: 'Scansione vestito - Suggerimenti di abbinamento e contrasto' },
          { src: '/images/projects/qualia/scan-history.png', caption: 'Cronologia delle scansioni per consultazione futura' }
        ],
      },
      {
        type: 'design-decisions',
        label: '05 / Le decisioni di design',
        title: "Tre scelte, un solo principio: la decisione conta più del dato",
        items: [
          { icon: '👁️', name: "L'onboarding È un test di Ishihara", what: "Al primo avvio l'utente fa il test delle tavole di Ishihara: l'app rileva il suo tipo specifico di daltonismo.", why: "Non esiste \"il daltonico\" generico. L'esperienza si adatta alla vista dell'utente, non il contrario." },
          { icon: '🥑', name: 'Dallo scanner alla risposta azionabile', what: "La fotocamera non dice \"verde/rosso\": dice \"avocado maturo\", \"outfit abbinato\".", why: "L'utente non ha bisogno del nome del colore, ha bisogno della decisione che quel colore implica." },
          { icon: '🏷️', name: 'Omnichannel: AI + NFC sul capo fisico', what: "Tag NFC sui vestiti che collegano il capo reale alla sua scheda digitale.", why: "Il daltonismo è un problema del mondo fisico; la soluzione doveva uscire dallo schermo." },
        ],
      },
      {
        type: 'learning',
        label: '06 / Cosa ho imparato',
        quote: "\"Progettare per una vista diversa dalla mia mi ha costretta a non fidarmi mai del mio occhio: la soluzione giusta non era mostrare il colore, ma la decisione che il colore porta con sé.\"",
      },
      {
        type: 'prototype',
        label: '07 / Prototipo',
        title: "Esplora il prototipo interattivo",
        url: "https://caterinacozzoli.github.io/qualia-preview/",
        link: "https://caterinacozzoli.github.io/qualia-preview/",
        linkLabel: "Provalo ↗",
        qrLink: "https://caterinacozzoli.github.io/qualia-preview/",
        githubLink: "https://github.com/caterinacozzoli/qualia",
      },
      {
        type: 'callout-quote',
        quote: "«Aiutarti a decidere con fiducia — senza farti sentire una persona da correggere.»",
        label: 'Product vision Qualia',
      },
    ],
  },

  sandbox: {
    id: 'sandbox',
    title: 'Sandbox',
    subtitle: "Quattro file: workshop rapidi, ricerca pura e un mondo voxel. Uno spazio dove sperimento senza vetrina.",
    year: '—',
    role: "UX Research · Concept · Metodo",
    team: "Progetti individuali e di gruppo · Master UX/UI, Talent Garden",
    tags: ['UX Research', 'Workshop', 'Voxel'],
    accent: '#0b6ba8',
    accentLight: '#e3f1fa',
    links: [
      { label: 'Presentazione Hestia', url: 'https://caterinacozzoli.github.io/hestia-presentation/final_presentation.html' },
    ],
    sections: [
      {
        type: 'opening-quote',
        quote: "«Troppo controllo e l'automazione è inutile; troppa automazione e l'utente si sente espropriato di casa propria.»",
        citation: "Hestia — il problema riformulato dal brief Gewiss",
      },
      {
        type: 'context',
        label: '01 / Hestia — brief Gewiss, 4 giorni',
        title: "Il brief chiedeva un'app smart home. Abbiamo riformulato la domanda vera.",
        body: "Una casa intelligente promette autonomia, ma chiede una cosa difficile: fidarsi di un'AI che agisce al posto tuo. Il brief Gewiss chiedeva un'app smart home: noi abbiamo riformulato la domanda vera — come si costruisce (e si mantiene) la fiducia tra utente e AI? Squadra di 4, in 4 giorni, su ricerca evidence-based.",
        highlight: "Ricerca evidence-based (paper + field) · 4 giorni · Sistema a 3 gradi di fiducia",
      },
      {
        type: 'design-decisions',
        label: '',
        title: "Un'interfaccia che cresce con la fiducia",
        items: [
          { icon: '🎚️', name: 'Un sistema a 3 gradi di fiducia', what: "La stessa app in 3 configurazioni — Basic (UI canonica, AI in bottom bar), Medium (barra conversazionale + sezioni manuali), High (interfaccia puramente conversazionale con AI generativa).", why: "La fiducia non è uguale per tutti; l'interfaccia deve crescere con essa. Un solo prodotto, sistemico non estetico." },
          { icon: '🔕', name: 'Dal notification center alla checklist silenziosa', what: "Eliminate le notifiche informative in favore di una checklist di attività che Hestia svolge in background.", why: "Coerente con l'insight che la fiducia si costruisce nel silenzio, non con gli alert." },
          { icon: '💶', name: 'Value Centre', what: "L'app traduce i dati della gestione in benefici concreti (\"hai risparmiato 10€\", \"hai guadagnato 2 aperitivi lavando a pieno carico\").", why: "Rende visibile e motivante il valore dell'automazione, con un tono umano." },
        ],
      },
      {
        type: 'learning',
        label: '',
        quote: "\"Con 4 giorni, la ricerca non è un lusso: è ciò che ti fa prendere le decisioni giuste in fretta. E che progettare fiducia significa lasciare sempre l'ultima parola alla persona.\"",
      },
      {
        type: 'prototype',
        label: '',
        title: "Guarda la presentazione e prova i prototipi Hestia",
        url: "https://caterinacozzoli.github.io/hestia-presentation/final_presentation.html",
        link: "https://caterinacozzoli.github.io/hestia-presentation/final_presentation.html",
        linkLabel: "Apri presentazione ↗",
        extraLinks: [
          { label: 'Prototipo Medium trust ↗', url: 'https://alibart2000ab-lgtm.github.io/HESTIA/home.html' },
          { label: 'Prototipo High trust ↗', url: 'https://alibart2000ab-lgtm.github.io/Hestia-L3/wireframe/' },
        ],
      },
      {
        type: 'context',
        label: '02 / UNICEF — Usability Evaluation',
        title: "Quando il valore non è una UI nuova, ma un metodo rigoroso",
        body: "Analisi euristica e test con utenti reali (circa 15), con task analysis e metriche a supporto. Non c'è una mia interfaccia — e va bene così: questa scheda dimostra il lato più rigoroso del mio lavoro, la capacità di misurare un'esperienza e trasformare i problemi in raccomandazioni prioritizzate.",
      },
      {
        type: 'learning',
        label: '',
        quote: "\"Saper valutare un'esperienza in modo strutturato vale quanto saperla disegnare.\"",
      },
      {
        type: 'context',
        label: '03 / Sefora',
        title: "Due decisioni valgono più di dieci schermate",
        body: "Un progetto UX/UI su un tema delicato, che porto in portfolio per le scelte di design sensibili, non per la UI (che è datata).",
      },
      {
        type: 'design-decisions',
        label: '',
        title: "Due decisioni piccole nell'interfaccia, grandi nel significato",
        items: [
          { icon: '🚪', name: 'Exit button di sicurezza', what: "Un pulsante per permettere a donne vittime di violenza di abbandonare rapidamente lo schermo.", why: "La sicurezza immediata viene prima di qualsiasi altra funzionalità." },
          { icon: '🎨', name: 'Palette dalle fasi di guarigione di un livido', what: "I colori dell'interfaccia seguono la progressione cromatica della guarigione di un livido.", why: "Dare al percorso di uscita dalla violenza una progressione visiva di cura." },
        ],
      },
      {
        type: 'learning',
        label: '',
        quote: "\"Che il design, su certi temi, è prima di tutto responsabilità: una scelta di colore o un pulsante possono proteggere una persona.\"",
      },
      {
        type: 'context',
        label: '04 / Mind the Craft',
        title: "Un mondo voxel, in arrivo",
        body: "Non ho ancora caricato il materiale di questo progetto. Appena pronto, troverai qui cos'è, il problema, il processo e le decisioni — stessa struttura delle altre schede.",
      },
    ],
  },
};

/* ─── SECTION RENDERERS ─────────────────────────────────────────────────────── */

function SectionContext({ s, accent, accentLight }) {
  /* Extract stat chips from highlight string — parts separated by · */
  const stats = s.stats || (s.highlight ? s.highlight.split('·').map(p => p.trim()).filter(Boolean) : null);

  return (
    <section className="pp-section pp-section--context">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      <p className="pp-body">{s.body}</p>

      {/* Stat chips strip */}
      {stats && (
        <div className="pp-stat-chips">
          {stats.map((chip, i) => (
            <div key={i} className="pp-stat-chip" style={{ borderColor: accent }}>
              <span className="pp-stat-chip-text">{chip}</span>
            </div>
          ))}
        </div>
      )}

      {/* Optional context image / screenshot */}
      {s.image ? (
        <figure className="pp-section-figure">
          <img src={s.image} alt={s.imageAlt || ''} className="pp-section-img" />
          {s.imageCaption && <figcaption className="pp-section-caption">{s.imageCaption}</figcaption>}
        </figure>
      ) : (
        <div className="pp-img-placeholder" aria-hidden="true">
          <span>[ screenshot — es. heatmap / benchmark / dati ricerca ]</span>
        </div>
      )}

      {s.objectives && (
        <ul className="pp-objectives">
          {s.objectives.map((obj, i) => (
            <li key={i} className="pp-objective" style={{ borderLeftColor: accent }}>
              {obj}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function SectionProcess({ s, accent }) {
  return (
    <section className="pp-section pp-section--process">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>

      {/* Optional process diagram / journey map image */}
      {s.image ? (
        <figure className="pp-section-figure">
          <img src={s.image} alt={s.imageAlt || ''} className="pp-section-img" />
          {s.imageCaption && <figcaption className="pp-section-caption">{s.imageCaption}</figcaption>}
        </figure>
      ) : (
        <div className="pp-img-placeholder" aria-hidden="true">
          <span>[ screenshot — es. customer journey / affinity map / personas ]</span>
        </div>
      )}

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
      {s.mockups && (
        <div className="pp-solution-mockups">
          {s.mockups.map((m, i) => (
            <div key={i} className="pp-solution-mockup-card">
              <img src={m.src} alt={m.caption} className="pp-solution-mockup-img" />
              {m.caption && <span className="pp-solution-mockup-caption">{m.caption}</span>}
            </div>
          ))}
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

function SectionPrototype({ s, accent }) {
  if (s.url) {
    return (
      <section className="pp-section pp-section--prototype">
        <span className="pp-label">{s.label}</span>
        <h3 className="pp-section-title">{s.title}</h3>
        {s.body && <p className="pp-body">{s.body}</p>}

        <div className="pp-iframe-wrapper">
          <iframe
            className="pp-iframe"
            title={s.title}
            src={s.url}
            allowFullScreen
            loading="lazy"
          />
        </div>

        <div className="pp-prototype-footer">
          <div
            className="pp-prototype-actions"
            {...((s.extraLinks?.length ?? 0) + (s.githubLink ? 1 : 0) >= 2
              ? { role: 'group', 'aria-label': 'Link prototipo' }
              : {})}
          >
            {s.link && (
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-prototype-btn"
                style={{ '--btn-accent': accent }}
                aria-label={`${s.linkLabel || 'Apri prototipo su Figma'}, si apre in una nuova scheda`}
              >
                {s.linkLabel || 'Apri prototipo su Figma'} ↗
              </a>
            )}
            {s.extraLinks?.map((el, i) => (
              <a
                key={i}
                href={el.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-prototype-btn pp-prototype-btn--ghost"
                style={{ '--btn-accent': accent }}
                aria-label={`${el.label}, si apre in una nuova scheda`}
              >
                {el.label}
              </a>
            ))}
            {s.githubLink && (
              <a
                href={s.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-prototype-btn pp-prototype-btn--ghost"
                style={{ '--btn-accent': accent }}
                aria-label="Visualizza codice su GitHub, si apre in una nuova scheda"
              >
                GitHub ↗
              </a>
            )}
          </div>
          {s.qrLink && (
            <div className="pp-qr-block">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(s.qrLink)}&bgcolor=ffffff&color=000000`}
                alt=""
                aria-hidden="true"
                width="100"
                height="100"
                className="pp-qr-code"
              />
              <span className="pp-qr-label">Scansiona per aprire il prototipo su smartphone</span>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="pp-section pp-section--prototype">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      {s.body && <p className="pp-body">{s.body}</p>}

      <div className="pp-github-card" style={{ borderColor: `${accent}33` }}>
        <div className="pp-github-header">
          <div className="pp-github-icon" style={{ backgroundColor: `${accent}15`, color: accent }}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </div>
          <div className="pp-github-info">
            <h4 className="pp-github-repo-title">caterinacozzoli / qualia</h4>
            <p className="pp-github-repo-desc">Repository GitHub del codice sorgente e del prototipo funzionale di Qualia.</p>
          </div>
        </div>
        <a
          href={s.link}
          target="_blank"
          rel="noopener noreferrer"
          className="pp-prototype-btn"
          style={{ '--btn-accent': accent }}
          aria-label="Apri repository GitHub, si apre in una nuova scheda"
        >
          Apri repository GitHub ↗
        </a>
      </div>
    </section>
  );
}

function SectionDecisions({ s, accent, accentLight }) {
  return (
    <section className="pp-section pp-section--decisions">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      <div className="pp-decisions">
        {s.items.map((item, i) => (
          <div key={i} className="pp-decision-card" style={{ borderTopColor: accent }}>
            <div className="pp-decision-header">
              <span className="pp-decision-icon" aria-hidden="true">{item.icon}</span>
              <strong className="pp-decision-name" style={{ color: accent }}>{item.name}</strong>
            </div>

            {/* Optional per-decision screenshot — AS-IS or TO-BE detail */}
            {item.image ? (
              <figure className="pp-decision-figure">
                <img src={item.image} alt={item.imageAlt || ''} className="pp-decision-img" />
                {item.imageCaption && <figcaption className="pp-section-caption">{item.imageCaption}</figcaption>}
              </figure>
            ) : (
              <div className="pp-img-placeholder pp-img-placeholder--sm" aria-hidden="true">
                <span>[ screenshot AS-IS / TO-BE — {item.name} ]</span>
              </div>
            )}

            <div className="pp-decision-compare">
              <div className="pp-decision-col pp-decision-col--before">
                <span className="pp-decision-badge">AS-IS</span>
                <p>{item.asIs}</p>
              </div>
              <div className="pp-decision-col pp-decision-col--after">
                <span className="pp-decision-badge pp-decision-badge--after" style={{ background: accent }}>TO-BE</span>
                <p>{item.toBe}</p>
              </div>
            </div>
            <div className="pp-decision-why" style={{ background: accentLight, borderLeftColor: accent }}>
              <strong>Perché conta:</strong> {item.why}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Decisione singola: cosa + perché, senza confronto AS-IS/TO-BE (vedi SectionDecisions) */
function SectionDesignDecisions({ s, accent, accentLight }) {
  return (
    <section className="pp-section pp-section--design-decisions">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      <ul className="pp-design-decisions">
        {s.items.map((item, i) => (
          <li key={i} className="pp-design-decision-card" style={{ borderTopColor: accent }}>
            <div className="pp-decision-header">
              <span className="pp-decision-icon" aria-hidden="true">{item.icon}</span>
              <strong className="pp-decision-name" style={{ color: accent }}>{item.name}</strong>
            </div>
            <p className="pp-design-decision-what">{item.what}</p>
            <div className="pp-decision-why" style={{ background: accentLight, borderLeftColor: accent }}>
              <strong>Perché:</strong> {item.why}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionOutcome({ s, accent, accentLight }) {
  /* Hide callout if it's still a placeholder (starts with '[') */
  const showCallout = s.callout && !s.callout.trim().startsWith('[');
  return (
    <section className="pp-section pp-section--outcome">
      <span className="pp-label">{s.label}</span>
      <h3 className="pp-section-title">{s.title}</h3>
      <p className="pp-body">{s.body}</p>
      {showCallout && (
        <div className="pp-callout" style={{ background: accentLight, borderColor: accent }}>
          {s.callout}
        </div>
      )}
    </section>
  );
}

function SectionLearning({ s }) {
  return (
    <section className="pp-section pp-section--learning">
      <span className="pp-label">{s.label}</span>
      <blockquote className="pp-learning-quote">
        {s.quote}
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
    case 'decisions':     return <SectionDecisions key={s.label} s={s} accent={accent} accentLight={accentLight} />;
    case 'design-decisions': return <SectionDesignDecisions key={s.label} s={s} accent={accent} accentLight={accentLight} />;
    case 'outcome':       return <SectionOutcome key={s.label} s={s} accent={accent} accentLight={accentLight} />;
    case 'learning':      return <SectionLearning key={s.label} s={s} />;
    case 'callout-quote': return <SectionCalloutQuote key={s.label} s={s} />;
    case 'prototype':     return <SectionPrototype key={s.label} s={s} accent={accent} />;
    default:              return null;
  }
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────────── */

export default function ProjectPage({ projectId, onClose }) {
  const data = PROJECTS[projectId];
  const [collapsed, setCollapsed] = useState(false);
  const scrollRef      = useRef(null);
  const collapsibleRef = useRef(null);
  const qrRef          = useRef(null);

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

  /* Collapse hero su scroll dell'intera pagina prodotto */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const next = el.scrollTop > 80;
      setCollapsed(c => c === next ? c : next);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  /* inert sul wrapper collassabile e sul QR (visibile solo quando collassato) */
  useEffect(() => {
    const collapsible = collapsibleRef.current;
    const qr = qrRef.current;
    if (collapsible) {
      collapsed ? collapsible.setAttribute('inert', '') : collapsible.removeAttribute('inert');
    }
    if (qr) {
      collapsed ? qr.removeAttribute('inert') : qr.setAttribute('inert', '');
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

          {/* Unico scroll container — hero sticky + content */}
          <div ref={scrollRef} className="pp-sheet-scroll" tabIndex={0}>

          {/* Hero banner — tinta chiara accent, testo charcoal */}
          <header
            className={`pp-hero${collapsed ? ' pp-hero--collapsed' : ''}`}
            style={{
              '--folder-bg': data.image ? `url('${data.image.replace('.png', '.avif')}')` : 'none',
              backgroundColor: accentLight,
            }}
          >
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
                <div className="pp-hero-collapsible-inner">
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
                {data.links && (
                  <div className="pp-info-row" style={{ marginTop: '12px' }}>
                    <span className="pp-info-label">Link</span>
                    <div className="pp-info-links">
                      {data.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pp-info-link"
                          style={{ color: accent }}
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                </div>{/* /pp-hero-collapsible-inner */}
              </div>
            </div>
            {/* Stickers decorativi nel hero — cliccabili se hanno link */}
            {data.stickers?.map((s, i) => (
              s.link ? (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-hero-sticker-link"
                  style={s.style}
                  aria-label={`Apri link sticker ${i + 1}`}
                >
                  <img src={s.src} aria-hidden="true" className="pp-hero-sticker-img" />
                </a>
              ) : (
                <img
                  key={i}
                  src={s.src}
                  aria-hidden="true"
                  className="pp-hero-sticker"
                  style={s.style}
                />
              )
            ))}
            {/* pp-hero-mockup: NO focusable elements mai dentro (aria-hidden) */}
            <div className={`pp-hero-mockup${data.mockupClass ? ` ${data.mockupClass}` : ''}`} aria-hidden="true">
              {data.mockup && (
                <img 
                  src={data.mockup} 
                  alt="" 
                  className="pp-hero-mockup-img" 
                />
              )}
            </div>
            {/* QR code — visibile solo quando il banner è collassato */}
            {data.qrUrl && (
              <a
                ref={qrRef}
                href={data.qrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-hero-qr"
                aria-label={`Apri prototipo ${data.title} su smartphone, si apre in una nuova scheda`}
                inert=""
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(data.qrUrl)}&bgcolor=ffffff&color=000000`}
                  alt=""
                  width="80"
                  height="80"
                />
                <span className="pp-hero-qr-label">Apri su smartphone</span>
              </a>
            )}
          </header>

          {/* Content */}
          <div
            className="pp-content"
            style={{
              backgroundImage: "url('/images/textures/carta acquarello.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {data.sections.map(s => renderSection(s, accent, accentLight))}
          </div>

          </div>{/* /pp-sheet-scroll */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
