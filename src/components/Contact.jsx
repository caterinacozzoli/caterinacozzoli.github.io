import { useLang } from '../contexts/LangContext';
import './Contact.css';

const CONTENT = {
  it: {
    headline: ['Parliamo.'],
    sub: 'Sempre aperta a nuovi progetti, collaborazioni e caffè virtuali.',
    email: 'cate.cozzoli@gmail.com',
    emailLabel: 'Scrivi una email a Caterina Cozzoli',
    linkedin: 'linkedin.com/in/caterina-cozzoli',
    linkedinLabel: 'Profilo LinkedIn di Caterina Cozzoli',
    cvLabel: 'Scarica il curriculum di Caterina Cozzoli',
    cvText: 'Scarica CV ↗',
    cta: 'Scrivimi',
    copy: '© 2026 Caterina Maria Cozzoli',
  },
  en: {
    headline: ["Let's talk."],
    sub: 'Always open to new projects, collaborations and virtual coffees.',
    email: 'cate.cozzoli@gmail.com',
    emailLabel: 'Send an email to Caterina Cozzoli',
    linkedin: 'linkedin.com/in/caterina-cozzoli',
    linkedinLabel: "Caterina Cozzoli's LinkedIn profile",
    cvLabel: "Download Caterina Cozzoli's CV",
    cvText: 'Download CV ↗',
    cta: 'Get in touch',
    copy: '© 2026 Caterina Maria Cozzoli',
  },
  pt: {
    headline: ['Vamos conversar.'],
    sub: 'Sempre aberta a novos projetos, colaborações e cafés virtuais.',
    email: 'cate.cozzoli@gmail.com',
    emailLabel: 'Enviar email para Caterina Cozzoli',
    linkedin: 'linkedin.com/in/caterina-cozzoli',
    linkedinLabel: 'Perfil do LinkedIn de Caterina Cozzoli',
    cvLabel: 'Baixar o curriculum de Caterina Cozzoli',
    cvText: 'Baixar CV ↗',
    cta: 'Fale comigo',
    copy: '© 2026 Caterina Maria Cozzoli',
  },
};

export default function Contact() {
  const { lang } = useLang();
  const c = CONTENT[lang] ?? CONTENT.en;

  return (
    <footer id="contatti" className="contact" role="contentinfo" aria-labelledby="contact-title">
      <div className="contact-inner">
        <h2 id="contact-title" className="contact-headline">
          {c.headline[0]}
        </h2>

        <p className="contact-sub">{c.sub}</p>

        <div className="contact-links">
          <a
            href={`mailto:${c.email}`}
            className="contact-email"
            aria-label={c.emailLabel}
          >
            {c.email}
          </a>

          <a
            href="https://www.linkedin.com/in/caterina-cozzoli"
            className="contact-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.linkedinLabel}
          >
            LinkedIn ↗
          </a>

          <a
            href="/cv-caterina-cozzoli.pdf"
            className="contact-cv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.cvLabel}
          >
            {c.cvText}
          </a>
        </div>

        <a
          href={`mailto:${c.email}`}
          className="contact-cta"
          aria-label={c.emailLabel}
        >
          {c.cta}
        </a>
      </div>

      <div className="contact-footer">
        <p className="contact-copy">{c.copy}</p>
        <p className="contact-made">
          Designed with{' '}
          <span aria-label="zampa di Maya" role="img">🐾</span>
          {' '}Maya in Milano · Fortaleza
        </p>
      </div>
    </footer>
  );
}
