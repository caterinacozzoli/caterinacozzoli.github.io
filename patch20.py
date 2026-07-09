with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

reps = {
    "Curiosa per vocazione, designer per scelta. Diffido delle soluzioni pre-confezionate perché l'esperienza pratica mi ha dimostrato che <strong>ogni utente ha bisogni unici</strong>. Prima indago le ragioni di un problema attraverso <strong>l'ascolto attivo</strong>, poi progetto <strong>interfacce inclusive e su misura</strong>. Dalla user research alla UI, sfrutto l'AI come <strong>alleata strategica di sintesi</strong> per spingermi sempre un passo più in là. Curiosa di dove design e tecnologia si intrecciano <strong>oltre lo schermo</strong>, progettando per <strong>abbattere le barriere</strong>.": "Curious by vocation, designer by choice. I distrust one-size-fits-all solutions because practical experience has taught me that <strong>every user has unique needs</strong>. First, I investigate the root of a problem through <strong>active listening</strong>, then I design <strong>inclusive, tailor-made interfaces</strong>. From user research to UI, I leverage AI as a <strong>strategic ally for synthesis</strong> to push boundaries even further. Curious about where design and technology intersect <strong>beyond the screen</strong>, designing to <strong>break down barriers</strong>.",
    '"Empatia"': '"Empathy"',
    '"Ascolto Attivo"': '"Active Listening"',
    '"Lavoro di Squadra"': '"Teamwork"',
    '"Gestione Conflitti"': '"Conflict Resolution"',
    '"Capacità Relazionali"': '"Interpersonal Skills"',
    '"Apprendimento Rapido"': '"Fast Learner"',
    "Agenzia di Marketing": "Marketing Agency",
    "Feb 2024 - Oggi": "Feb 2024 - Present",
    "Progetto soluzioni cross-platform B2B e B2C. Gestisco la <strong>migrazione ad un nuovo Design System</strong> in Figma, ottimizzando i tempi di sviluppo. Conduco test di usabilità per validare le scelte architetturali.": "Designing B2B and B2C cross-platform solutions. Managing the <strong>migration to a new Design System</strong> in Figma, optimizing development time. Conducting usability tests to validate architectural choices.",
    "Gen 2023 - Gen 2024": "Jan 2023 - Jan 2024",
    "Design di identità visive, materiale promozionale e siti vetrina in WordPress per piccole imprese.": "Designed visual identities, promotional materials, and WordPress landing pages for small businesses.",
    "Varie (Non Profit, E-commerce)": "Various (Non-Profit, E-commerce)",
    "Creazione contenuti social, <strong>gestione crisi</strong> e interazione con l'utenza per favorire l'engagement.": "Created social media content, managed <strong>crisis communication</strong>, and interacted with users to foster engagement.",
    "Corso Magistrale in UX Design": "Master in UX Design",
    "Giu 2024<br>Set 2024": "Jun 2024<br>Sep 2024",
    "Design Process, User Research e UI (Figma). Votazione 100/100.": "Design Process, User Research and UI (Figma). Grade: 100/100.",
    "Laurea in Comunicazione e Psicologia": "Bachelor's in Communication & Psychology",
    "Università degli Studi di Milano-Bicocca": "University of Milano-Bicocca",
    "Set 2018<br>Ott 2022": "Sep 2018<br>Oct 2022",
    "Focus su interazione umana, ergonomia cognitiva e analisi dei dati.": "Focus on human interaction, cognitive ergonomics, and data analysis.",
    "Giu 2026": "Jun 2026",
    "App AI-driven progettata per supportare persone con <strong>daltonismo</strong>. Il processo ha incluso l'analisi di <strong>10 paper scientifici</strong> sul CVD, un onboarding inclusivo basato sul <strong>test di Ishihara</strong> e un prototipo per lo <strong>scanner live</strong>.": "AI-driven app designed to support people with <strong>color blindness</strong>. The process included analyzing <strong>10 scientific papers</strong> on CVD, an inclusive onboarding based on the <strong>Ishihara test</strong>, and a prototype for a <strong>live scanner</strong>.",
    '"lavoro di gruppo"': '"group project"',
    "Redesign UX/UI dell'e-commerce per <strong>azzerare le frizioni</strong> d'acquisto.<br>Mi sono occupata di <strong>ricerca</strong>, definizione di <strong>feature e flusso</strong>, <strong>generazione idee</strong> e <strong>copy</strong>. <strong>Abbiamo</strong> validato la soluzione su <strong>oltre 100 utenti reali</strong>.": "UX/UI redesign of the e-commerce to <strong>eliminate purchase friction</strong>.<br>I was responsible for <strong>research</strong>, defining <strong>features and user flows</strong>, <strong>ideation</strong>, and <strong>copywriting</strong>. <strong>We</strong> validated the solution with <strong>over 100 real users</strong>.",
    "Web-app accessibile per l'autonomia delle persone con <strong>disabilità</strong>. Ho curato <strong>UX/UI, microcopy e illustrazioni</strong>.<br>Progetto presentato al <a href='#' target='_blank' style='color:var(--ink);text-decoration:underline;'><strong>Parlamento Europeo</strong></a> (Nov 2023), inserito nella <a href='#' target='_blank' style='color:var(--ink);text-decoration:underline;'>legacy <strong>Milano-Cortina 2026</strong></a> e oggetto di un <a href='#' target='_blank' style='color:var(--ink);text-decoration:underline;'>articolo accademico <strong>Unimib</strong></a>.": "Accessible web-app fostering autonomy for people with <strong>disabilities</strong>. I handled <strong>UX/UI, microcopy, and illustrations</strong>.<br>Project presented at the <a href='#' target='_blank' style='color:var(--ink);text-decoration:underline;'><strong>European Parliament</strong></a> (Nov 2023), included in the <a href='#' target='_blank' style='color:var(--ink);text-decoration:underline;'><strong>Milano-Cortina 2026 legacy</strong></a>, and subject of an <a href='#' target='_blank' style='color:var(--ink);text-decoration:underline;'><strong>academic article by Unimib</strong></a>.",
    '"Italiano (Madrelingua)"': '"Italian (Native)"',
    '"Inglese (B2)"': '"English (B2)"',
    '"Teatro"': '"Theater"',
    '"Danza Polinesiana"': '"Polynesian Dance"',
    '>Contatti<': '>Contacts<',
    '>Formazione<': '>Education<',
    '>Lingue<': '>Languages<',
    '>Hobby<': '>Hobbies<',
    '>Strumenti<': '>Tools<',
    '>Profilo<': '>Profile<',
    '>Progetti In Evidenza<': '>Featured Projects<',
    '>Esperienza<': '>Experience<',
    '>Competenze<': '>Skills<'
}

for k, v in reps.items():
    content = content.replace(k, v)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
