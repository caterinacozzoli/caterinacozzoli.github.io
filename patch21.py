with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

reps = {
    '"Italiano&nbsp;—&nbsp;madrelingua"': '"Italian&nbsp;—&nbsp;Native"',
    '"Portoghese&nbsp;—&nbsp;madrelingua"': '"Portuguese&nbsp;—&nbsp;Native"',
    '"Inglese&nbsp;—&nbsp;C1"': '"English&nbsp;—&nbsp;C1"',
    '"Spagnolo&nbsp;—&nbsp;B1"': '"Spanish&nbsp;—&nbsp;B1"',
    '"Master FT UX/UI"': '"FT Master in UX/UI"',
    '"Feb 2026<br>- Lug 2026"': '"Feb 2026<br>- Jul 2026"',
    '''"Percorso intensivo e pratico su user research, prototipazione, accessibilità e UI design per clienti reali. Selezionata come tutor d'aula grazie a borsa di studio vinta tramite design challenge."''': '''"Intensive, hands-on program covering user research, prototyping, accessibility, and UI design for real clients. Selected as class tutor after winning a scholarship through a design challenge."''',
    '"Magistrale in TTC"': '"Master\'s in TTC"',
    '"Università Bicocca"': '"Bicocca University"',
    '"2025<br>- in corso"': '"2025<br>- Present"',
    '"Focus su interazione uomo-macchina, progettazione di sistemi AI, low code, ergonomia cognitiva e percezione visiva."': '"Focus on human-computer interaction, AI systems design, low-code, cognitive ergonomics, and visual perception."',
    '"Triennale in SPC"': '"Bachelor\'s in SPC"',
    '"2022<br>- 2025"': '"2022<br>- 2025"',
    '"Basi di psicologia cognitiva, sociologia della comunicazione, con approfondimenti mirati su marketing e media digitali."': '"Foundations of cognitive psychology and sociology of communication, with a specific focus on marketing and digital media."',
    '"Mediatrice culturale"': '"Cultural Mediator"',
    '"Cooperativa Crinali"': '"Crinali Cooperative"',
    '"2025 — oggi"': '"2025 — Present"',
    '''"Fornisco supporto tramite ascolto attivo e mediazione in contesti delicati e multiculturali. Un'esperienza che allena la mia capacità di tradurre bisogni complessi e gestire l'empatia."''': '''"Providing support through active listening and mediation in sensitive and multicultural contexts. An experience that hones my ability to translate complex needs and manage empathy."''',
    '"Volontaria"': '"Volunteer"',
    '"2017 — oggi"': '"2017 — Present"',
    '"Quasi 10 anni di impegno diretto a supporto di persone con disabilità. Un ambiente dove flessibilità e design di soluzioni inclusive sono la base della pratica quotidiana."': '"Almost 10 years of direct commitment to supporting people with disabilities. An environment where flexibility and the design of inclusive solutions form the foundation of daily practice."'
}

for k, v in reps.items():
    content = content.replace(k, v)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
