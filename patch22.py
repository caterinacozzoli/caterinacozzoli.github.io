with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'r') as f:
    content = f.read()

reps = {
    '"Curious by vocation, designer by choice. I distrust one-size-fits-all solutions because practical experience has taught me that <strong>every user has unique needs</strong>. First, I investigate the root of a problem through <strong>active listening</strong>, then I design <strong>inclusive, tailor-made interfaces</strong>. From user research to UI, I leverage AI as a <strong>strategic ally for synthesis</strong> to push boundaries even further. Curious about where design and technology intersect <strong>beyond the screen</strong>, designing to <strong>break down barriers</strong>."': '"Curiosa por vocação, designer por escolha. Desconfio de soluções prontas porque a experiência prática me ensinou que <strong>cada usuário tem necessidades únicas</strong>. Primeiro, investigo a raiz de um problema por meio da <strong>escuta ativa</strong>, depois projeto <strong>interfaces inclusivas e sob medida</strong>. Da pesquisa de usuários à UI, utilizo a IA como uma <strong>aliada estratégica de síntese</strong> para ir sempre além. Curiosa sobre onde o design e a tecnologia se cruzam <strong>além da tela</strong>, projetando para <strong>quebrar barreiras</strong>."',
    '"Empathy"': '"Empatia"',
    '"Active Listening"': '"Escuta Ativa"',
    '"Teamwork"': '"Trabalho em Equipe"',
    '"Conflict Resolution"': '"Resolução de Conflitos"',
    '"Interpersonal Skills"': '"Habilidades Relacionais"',
    '"Fast Learner"': '"Aprendizado Rápido"',
    '"FT Master in UX/UI"': '"Master FT em UX/UI"',
    '"Feb 2026<br>- Jul 2026"': '"Fev 2026<br>- Jul 2026"',
    '''"Intensive, hands-on program covering user research, prototyping, accessibility, and UI design for real clients. Selected as class tutor after winning a scholarship through a design challenge."''': '''"Programa intensivo e prático abordando pesquisa de usuários, prototipagem, acessibilidade e design de UI para clientes reais. Selecionada como tutora da turma após ganhar uma bolsa de estudos através de um desafio de design."''',
    '"Master\'s in TTC"': '"Mestrado em TTC"',
    '"Bicocca University"': '"Universidade Bicocca"',
    '"2025<br>- Present"': '"2025<br>- Atual"',
    '"Focus on human-computer interaction, AI systems design, low-code, cognitive ergonomics, and visual perception."': '"Foco em interação humano-computador, design de sistemas de IA, low-code, ergonomia cognitiva e percepção visual."',
    '"Bachelor\'s in SPC"': '"Bacharelado em SPC"',
    '"Foundations of cognitive psychology and sociology of communication, with a specific focus on marketing and digital media."': '"Fundamentos da psicologia cognitiva e sociologia da comunicação, com foco específico em marketing e mídias digitais."',
    '"Cultural Mediator"': '"Mediadora Cultural"',
    '"Crinali Cooperative"': '"Cooperativa Crinali"',
    '"2025 — Present"': '"2025 — Atual"',
    '''"Providing support through active listening and mediation in sensitive and multicultural contexts. An experience that hones my ability to translate complex needs and manage empathy."''': '''"Oferecendo suporte através da escuta ativa e mediação em contextos delicados e multiculturais. Uma experiência que aprimora minha capacidade de traduzir necessidades complexas e gerenciar a empatia."''',
    '"Volunteer"': '"Voluntária"',
    '"2017 — Present"': '"2017 — Atual"',
    '"Almost 10 years of direct commitment to supporting people with disabilities. An environment where flexibility and the design of inclusive solutions form the foundation of daily practice."': '"Quase 10 anos de compromisso direto no apoio a pessoas com deficiência. Um ambiente onde a flexibilidade e o design de soluções inclusivas formam a base da prática diária."',
    '"Jun 2026"': '"Jun 2026"',
    '"project work"': '"projeto prático"',
    '"AI-driven app designed to support people with <strong>color blindness</strong>. The process included analyzing <strong>10 scientific papers</strong> on CVD, an inclusive onboarding based on the <strong>Ishihara test</strong>, and a prototype for a <strong>live scanner</strong>."': '"App impulsionado por IA projetado para apoiar pessoas com <strong>daltonismo</strong>. O processo incluiu a análise de <strong>10 artigos científicos</strong> sobre CVD, um onboarding inclusivo baseado no <strong>teste de Ishihara</strong> e um protótipo para um <strong>scanner ao vivo</strong>."',
    '"group project"': '"projeto em grupo"',
    '"UX/UI redesign of the e-commerce to <strong>eliminate purchase friction</strong>.<br>I was responsible for <strong>research</strong>, defining <strong>features and user flows</strong>, <strong>ideation</strong>, and <strong>copywriting</strong>. <strong>We</strong> validated the solution with <strong>over 100 real users</strong>."': '"Redesign de UX/UI do e-commerce para <strong>eliminar o atrito de compra</strong>.<br>Fui responsável pela <strong>pesquisa</strong>, definição de <strong>features e fluxos de usuário</strong>, <strong>ideação</strong> e <strong>copywriting</strong>. <strong>Nós</strong> validamos a solução com <strong>mais de 100 usuários reais</strong>."',
    '"Accessible web-app fostering autonomy for people with <strong>disabilities</strong>. I handled <strong>UX/UI, microcopy, and illustrations</strong>.<br>Project presented at the <a href=\'#\' target=\'_blank\' style=\'color:var(--ink);text-decoration:underline;\'><strong>European Parliament</strong></a> (Nov 2023), included in the <a href=\'#\' target=\'_blank\' style=\'color:var(--ink);text-decoration:underline;\'><strong>Milano-Cortina 2026 legacy</strong></a>, and subject of an <a href=\'#\' target=\'_blank\' style=\'color:var(--ink);text-decoration:underline;\'><strong>academic article by Unimib</strong></a>."': '"Web-app acessível para promover a autonomia de pessoas com <strong>deficiência</strong>. Fiquei responsável por <strong>UX/UI, microcopy e ilustrações</strong>.<br>Projeto apresentado no <a href=\'#\' target=\'_blank\' style=\'color:var(--ink);text-decoration:underline;\'><strong>Parlamento Europeu</strong></a> (Nov 2023), incluído no <a href=\'#\' target=\'_blank\' style=\'color:var(--ink);text-decoration:underline;\'><strong>legado Milão-Cortina 2026</strong></a>, e tema de um <a href=\'#\' target=\'_blank\' style=\'color:var(--ink);text-decoration:underline;\'><strong>artigo acadêmico da Unimib</strong></a>."',
    '"Italian&nbsp;—&nbsp;Native"': '"Italiano&nbsp;—&nbsp;Nativo"',
    '"Portuguese&nbsp;—&nbsp;Native"': '"Português&nbsp;—&nbsp;Nativo"',
    '"English&nbsp;—&nbsp;C1"': '"Inglês&nbsp;—&nbsp;C1"',
    '"Spanish&nbsp;—&nbsp;B1"': '"Espanhol&nbsp;—&nbsp;B1"',
    '"Theater"': '"Teatro"',
    '"Polynesian Dance"': '"Dança Polinésia"',
    '>Contacts<': '>Contatos<',
    '>Education<': '>Formação<',
    '>Languages<': '>Idiomas<',
    '>Hobbies<': '>Hobbies<',
    '>Tools<': '>Ferramentas<',
    '>Profile<': '>Perfil<',
    '>Featured Projects<': '>Projetos em Destaque<',
    '>Experience<': '>Experiência<',
    '>Skills<': '>Competências<'
}

for k, v in reps.items():
    content = content.replace(k, v)

with open('/Users/cate/Desktop/portfolio-caterina/export-cv/cv-anonimo.html', 'w') as f:
    f.write(content)
