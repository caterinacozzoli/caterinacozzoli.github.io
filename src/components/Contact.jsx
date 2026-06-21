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
    cta: 'Get in touch',
    copy: '© 2026 Caterina Maria Cozzoli',
  },
};

export default function Contact() {
  const { lang } = useLang();
  const c = CONTENT[lang];

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
          <span aria-label="love" role="img">♥</span>
          {' '}in Milano · Fortaleza
        </p>
      </div>
    </footer>
  );
}
