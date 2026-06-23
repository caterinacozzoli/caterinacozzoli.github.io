---
name: Portfolio Caterina Cozzoli
description: Il taccuino digitale di una designer che ascolta prima di disegnare.
colors:
  carta-acquarello: "#f5f3ee"
  grigio-superficie: "#E6E8EC"
  carbone-nav: "#212529"
  inchiostro: "#212529"
  grafite: "#6b6f75"
  polvere: "#b0b4ba"
  viola-manifesto: "#7a35ee"
  lavanda: "#D4CDFF"
  viola-scuro: "#6d2bd6"
  giallo-segnale: "#FED728"
  giallo-pallido: "#FFEBA2"
typography:
  display:
    fontFamily: "'Chunko', sans-serif"
    fontSize: "clamp(44px, 13.5vw, 113px)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Chunko', sans-serif"
    fontSize: "clamp(56px, 9vw, 120px)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Onest', sans-serif"
    fontSize: "clamp(18px, 1.6vw, 24px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "'Onest', sans-serif"
    fontSize: "clamp(16px, 2.15vw, 18px)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "'Onest', sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.06em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  pill: "999px"
spacing:
  1: "8px"
  2: "16px"
  3: "24px"
  4: "32px"
  6: "48px"
  8: "64px"
  12: "96px"
  16: "128px"
components:
  button-primary:
    backgroundColor: "{colors.viola-manifesto}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.viola-scuro}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "#e1dcc6"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  nav-link-active:
    backgroundColor: "transparent"
    textColor: "{colors.giallo-segnale}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  chip:
    backgroundColor: "{colors.grigio-superficie}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  skip-link:
    backgroundColor: "{colors.viola-manifesto}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
---

# Design System: Portfolio Caterina Cozzoli

## 1. Overview

**Creative North Star: "Il Taccuino di Fortaleza"**

Immagina un quaderno rilegato con la copertina vissuta — pagine di carta acquarello, margini scarabocchiati, sticker incollati sopra appunti seri. Non è un archivio, è uno strumento da lavoro portato ovunque. Questo portfolio nasce da quella fisicità: ogni elemento — dal cursore a freccia gialla al nome in Chunko che occupa tutta la pagina — deve sembrare che *qualcuno lo abbia messo lì con intenzione*, non che un algoritmo lo abbia generato.

Il sistema vive su una tensione produttiva: Milanese nella struttura (griglia invisibile, tipografia incisa, palette di due colori), Brasiliano nel carattere (calore, sorpresa, l'avatar che ti parla prima di farti vedere il lavoro). Il viola è dichiarativo, il giallo è improvviso, la carta acquarello è il campo su cui tutto si deposita.

L'accessibilità non è uno strato aggiuntivo: è la dimostrazione pratica della filosofia del progetto. Un portfolio che predica human-centered design deve essere leggibile da chi usa uno screen reader, usabile da chi evita le animazioni, navigabile solo con la tastiera. Ogni scelta tecnica rispecchia un valore.

**Key Characteristics:**
- Fisicità prima della fluidità — elementi che sembrano avere peso, stickers che sembrano incollati, carta che sembra texturata
- Bilanciamento bipolare — viola strutturale + giallo accidentale; raramente insieme, sempre in tensione
- Accessibilità integrata, non applicata — widget a11y nativo, high-contrast mode, dyslexia override, reduced motion
- Animazioni a personaggio — l'intro avatar, il cursore blob, le immagini per lettera; motion che racconta qualcosa
- Zero template aesthetic — Chunko non è un font AI; le cartelle-progetto non sono card; la homepage non ha sezioni con eyebrow

## 2. Colors: Viola Manifesto + Giallo Segnale

Due colori di ruolo, uno sfondo tattile, un sistema di inchiostro a quattro livelli.

### Primary
- **Viola Manifesto** (`#7a35ee`): L'identità del brand. Usato sui titoli di sezione, tag interattivi, link attivi nella nav, focus ring, separatori di gerarchia. Contrasto verificato: 5.30:1 su Carta Acquarello (WCAG AA ✓). Non usare come sfondo su testo piccolo.
- **Lavanda** (`#D4CDFF`): Tinta chiara del primary. Usata nei blob acquarello di sfondo e nei tint decorativi. Mai su testo — solo come superficie.
- **Viola Scuro** (`#6d2bd6`): Stato pressed/hover dei pulsanti primary. Non appare a riposo — solo come risposta all'interazione.

### Secondary
- **Giallo Segnale** (`#FED728`): Il colore del cursore e dell'accento caldo. Appare come freccia del cursore custom, come highlight sulle lettere del nome in stato hover, come background del pensiero del bubble avatar. Non decorativo — sempre funzionale come segnale di stato o come punto di attenzione obbligatoria.
- **Giallo Pallido** (`#FFEBA2`): Tinta del giallo per zone di sfondo delicate (hero background wash).

### Neutral
- **Carta Acquarello** (`#f5f3ee`): Lo sfondo universale. Non è beige generico — è specificatamente il colore della carta da acquerello fisicamente usata da Caterina. Ha una texture JPG sovrapposta che lo rende tattile. Mai usarlo senza la texture su superfici principali.
- **Grigio Superficie** (`#E6E8EC`): Superfici secondarie, chip/tag a riposo, bordi. Uguale a `--border`.
- **Carbone Nav** (`#212529`): Il colore della pill di navigazione — scuro deciso, non nero puro. Anche il colore base dell'ink.
- **Inchiostro** (`#212529`): Testo primario. 13.4:1 su Carta Acquarello. Mai sostituirlo con grigi più chiari per "eleganza": il contrasto è il valore, non il costo.
- **Grafite** (`#6b6f75`): Testo secondario/muted. 4.58:1 su Carta Acquarello — supera WCAG AA di 0.08 punti. Non abbassare ulteriormente.
- **Polvere** (`#b0b4ba`): Solo decorativo — numeri di sfondo, watermark visivi. Vietato su testo reale.

### Named Rules
**La Regola dei Due Segnali.** Viola Manifesto e Giallo Segnale non compaiono mai sullo stesso elemento e raramente nella stessa zona visiva. Il viola è struttura; il giallo è sorpresa. Usarli insieme diluisce entrambi.

**La Regola del Contrasto Non Negoziabile.** Nessun testo su sfondo che non superi 4.5:1. Il Grafite e il Viola Manifesto sono già al limite — non introdurre varianti più chiare di questi senza calcolo preventivo.

## 3. Typography

**Display Font:** Chunko (700, Bold; fallback `sans-serif`)
**Body Font:** Onest (400–700; fallback `sans-serif`)

**Character:** Chunko è un display condensed bold — non è un font di sistema, non è sulla reflex-reject list, non lo trovi su ogni AI portfolio. Fa il lavoro di un'insegna: occupa, dichiara, non lascia spazio al dubbio. Onest è il suo contrario utile — leggibile, caldo, leggermente geometrico senza essere freddo. Insieme formano la tensione Chunko/Onest: struttura vs. umanità.

### Hierarchy
- **Display** (Chunko, 700, `clamp(44px, 13.5vw, 113px)`, line-height 0.92): Il nome CATERINA COZZOLI nella hero. Unico elemento che scala fino a occupare l'intera larghezza del viewport. Letter-spacing -0.025em. Non usare Chunko su body copy.
- **Headline** (Chunko, 700, `clamp(56px, 9vw, 120px)`, line-height 0.92): Titoli dei case study in ProjectPage (es. "LIBRACCIO"). Stessa regola del display.
- **Title** (Onest, 700, `clamp(18px, 1.6vw, 24px)`, line-height 1.2): Titoli di progetto nella sezione Works, titoli di sezione. Il peso 700 distingue dal body senza richiedere il font display.
- **Body** (Onest, 400, `clamp(16px, 2.15vw, 18px)`, line-height 1.55): Testo narrativo — hero description, copy delle sezioni, body dei case study. Max larghezza 65–75ch. `text-wrap: pretty` su prosa lunga.
- **Label** (Onest, 600, 11–12px, letter-spacing 0.06–0.14em, uppercase): Tag, chip, hero tagline, badge progetto. Tracking aperto compensa il lowercase percettivo delle uppercase piccole. Mai usare label size su prosa.

### Named Rules
**La Regola del Font Unico per Ruolo.** Chunko appare solo come display heading (hero name, project title). Tutto il resto è Onest. Nessun terzo font — nemmeno per i link, i tooltip, o le didascalie. L'identità sta nella coerenza.

**Il Soffitto del Display.** `clamp()` max per il display è 113px — la dimensione calcolata a 840px di viewport. Al di sopra, il nome griderebbe invece di dichiarare. Il soffitto non è un risparmio di spazio: è la scelta di restare a portata di occhio.

## 4. Elevation

Il sistema è piatto per default. La profondità è uno strumento di contesto, non di decorazione.

Le superfici sono flat a riposo — nessuna card ha ombra di default. Le ombre compaiono solo su elementi che devono fisicamente staccarsi dal piano: la pill di navigazione (sempre fissa in alto, deve emergere dal contenuto sotto), il layer di ProjectPage (una sheet che sale dalla parte inferiore), i tooltip e bubble del pensiero.

La texture Carta Acquarello sostituisce visivamente la profondità: la superficie non è liscia e quindi non ha bisogno di ombra per "sentirsi" distinta. Il layer visivo più importante è la texture, non lo shadow.

### Shadow Vocabulary
- **Nav Lift** (`0 4px 16px rgba(0,0,0,0.35)`): La pill di navigazione e la lang-nav. Ombra scura, decisa, perché il contesto è già scuro (pill su #212529). Unica ombra che appare sempre.
- **Sheet Rise** (`0 -8px 48px rgba(0,0,0,0.18)`): La project sheet che emerge dal basso. Ombra verso l'alto — direzione insolita che chiarisce il movimento.
- **Hover Lift** (`0 8px 24px rgba(0,0,0,0.15)`): Cartelle-progetto e elementi interattivi in hover. Non appare a riposo.

### Named Rules
**La Regola Flat-By-Default.** Nessuna superficie ottiene ombra perché "sembra più pulita". Le ombre sono risposta a tre condizioni: posizione sticky (nav), movimento verticale (sheet, modal), interazione hover. Null'altro.

## 5. Components

### Buttons
Pochi pulsanti, tutti convinti. Un portfolio non è un'app — i CTA principali sono due: email e LinkedIn. Non esiste una gerarchia elaborata di bottoni.

- **Shape:** Pillola completa (`border-radius: 999px`). Non arrotondato genericamente — pillola vera, che chiude il bordo.
- **Primary** (`#7a35ee` bg, bianco testo, `14px 28px` padding): Usato nei CTA di contatto e nelle azioni principali di ProjectPage.
- **Hover / Focus:** Background → `#6d2bd6`. Focus ring `2px solid var(--primary)` con `outline-offset: 3px`. Nessun box-shadow aggiuntivo in hover.
- **Ghost/Outline:** Non previsto nel sistema attuale. Se necessario in futuro: border 1.5px viola manifesto, sfondo trasparente, testo viola manifesto.

### Navigation (Nav Pill)
La navigazione principale è una pill scura centrata in alto — non è una barra full-width, non è una sidebar, non è un hamburger su desktop.

- **Container:** `background: #212529`, `border-radius: 999px`, `border: 1.5px solid rgba(255,255,255,0.12)`, `box-shadow: 0 4px 16px rgba(0,0,0,0.35)`. Fixed in alto.
- **Link default:** `color: #e1dcc6`, `font-size: 13px`, `font-weight: 500`, `padding: 8px 16px`.
- **Link active:** `color: #FED728` (Giallo Segnale — unico punto dove giallo e struttura si toccano, ma brevemente).
- **Mobile:** Hamburger dentro la lang-nav pill (sinistra). La nav pill principale scompare su ≤768px.

### Language + A11y Nav (Lang Nav)
Componente sinistro della topbar. Stessa pill della nav principale ma separata.

- **Container:** Identico alla nav pill (`#212529`, pill, shadow).
- **Flags:** Immagini 40×28px, `border-radius: 2px`. Solo le due lingue non attive sono visibili.
- **Separatore verticale:** `1px rgba(255,255,255,0.18)` tra widget a11y e flags — non è una border, è un divisore visivo contestuale.
- **A11y Trigger:** Icona SVG 38×38px, `border-radius: 6px`. Sempre visibile (desktop + mobile).

### Chips / Tag
Usate per le categorie di progetto (Works) e i tag dei case study (ProjectPage).

- **Style:** `background: #E6E8EC`, `color: #212529`, `border-radius: 999px`, `padding: 4px 12px`, `font-size: 11px`, `font-weight: 600`, `letter-spacing: 0.04em`, `text-transform: uppercase`.
- **Variante colorata (case study):** `background: [accent del progetto]`, `color: #fff`. Usata solo dentro ProjectPage con i colori specifici del case study (verde Libraccio, blu AbiliCity).

### Project Folder (Signature Component)
La cartella è l'elemento più distintivo del sistema. Non è una card. Non ha border-radius grande, non ha ombra di default, non ha badge in overlay — ha una foto di una cartella fisica, posizionata con tilt casuale, con sticker incollati sopra.

- **Struttura:** `<article>` con `<button class="project-frame">` che contiene un `<img>` della cartella. Il footer con titolo e tag è separato, sotto.
- **Posizionamento:** Top e left in pixel assoluti dentro una stage area — non è una grid CSS. Ogni cartella ha `--tilt: Xdeg` che la ruota leggermente.
- **Stickers:** Immagini PNG posizionate in `position: absolute` con `style` inline (bottom, right, width, transform rotate). Sembrano incollate. Sono `aria-hidden` o link con `aria-label`.
- **Hover:** `transform: scale(1.03) rotate(var(--tilt))` — la cartella si solleva leggermente. `box-shadow` appare.
- **Regola critica:** Le cartelle non sono uniformi. Dimensioni diverse, posizioni diverse, tilt diverso per ciascuna. L'uniformità rompe l'illusione fisica.

### Custom Cursor (Signature Component)
Il cursore è parte dell'identità visiva — non è un easter egg, è una firma.

- **Freccia gialla:** SVG inline `url(data:...)` — `fill: #FED728`, `stroke: #212529`, `1.5px round`. Globale su tutto il viewport.
- **Blob:** Cerchio viola con `filter: url(#cursor-goo)` che segue il cursore con lag (lerp 0.09). Cambia forma su hover di elementi interattivi e di lettere.
- **Mobile / touch:** Cursore custom disabilitato su `(pointer: coarse)`.

## 6. Do's and Don'ts

### Do:
- **Do** usare Chunko solo per display heading (hero name, case study title). Zero eccezioni — nemmeno per pull quote o titoli di sezione secondari.
- **Do** mantenere il Viola Manifesto a ≥5.30:1 su Carta Acquarello. Prima di modificare `--primary`, calcola il contrasto.
- **Do** preservare la fisicità: texture acquarello sul body, tilt sulle cartelle, sticker in posizione `absolute`. Se aggiungi un componente e sembra una card SaaS, non è il componente giusto.
- **Do** applicare `prefers-reduced-motion` su ogni animazione — il widget a11y ha un override aggiuntivo. Entrambi devono essere rispettati.
- **Do** usare `var(--primary)` ovunque, mai `#7a35ee` hardcoded nel CSS dei componenti. Il token centralizza le modifiche future.
- **Do** aggiungere `alt` text descrittivo sulle immagini dei case study — non "immagine progetto" ma "Schermata dell'app Libraccio: flusso acquisto scolastico su mobile".
- **Do** testare ogni nuovo componente con la tastiera (Tab, Enter, Escape) prima di considerarlo completo.

### Don't:
- **Don't** usare sfondi beige/sabbia/crema come "neutri caldi" — `--bg: #f5f3ee` è Carta Acquarello, non beige generico, e funziona solo con la texture sovrapposta. Senza texture sembra AI cream.
- **Don't** creare card grids uniformi — tutte le stesse dimensioni, stesso border-radius, stesso shadow. Le cartelle-progetto non sono card per una ragione precisa.
- **Don't** aggiungere eyebrow (`01 / ABOUT`, `02 / PROCESS`) su sezioni che non sono sequenze reali. Il workflow 01–05 è una sequenza vera; una sezione "Chi sono" con "01" sopra è AI scaffolding.
- **Don't** usare `border-left` > 1px come accento colorato su qualsiasi elemento. Mai.
- **Don't** applicare gradient text (`background-clip: text`). Il Viola Manifesto pieno è più forte di qualsiasi sfumatura.
- **Don't** introdurre un terzo font. Chunko + Onest è il sistema. Un terzo font — anche monospaciato "solo per i codici" — rompe la chiarezza dell'identità.
- **Don't** usare glassmorphism come default. L'unico blur esistente è il `backdrop-filter: blur(4px)` sull'overlay di ProjectPage — serve per separare layer, non per estetica.
- **Don't** alleggerire `--ink-muted (#6b6f75)` ulteriormente per "sembrare più sottile". È già al limite di WCAG AA (4.58:1). Sotto quella soglia è un'accessibility failure.
- **Don't** costruire un portfolio che sembri un template Webflow, un portfolio di un AI designer, o una landing page SaaS con statistiche in evidenza. Se qualcuno guarda e dice "AI ha fatto questo", è sbagliato.
- **Don't** aggiungere un CV non linkato. Un recruiting manager che arriva alla sezione Contact vuole un PDF scaricabile, non solo email e LinkedIn.
