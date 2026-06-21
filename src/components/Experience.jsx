import { useLang } from '../contexts/LangContext';
import './Experience.css';

/* Logos — use public/images/logos/ folder. SVG or PNG.
   alt="" because name is shown below (a11y review 2026-06-19) */
const EXPERIENCES = [
  {
    id: 'talent-garden',
    name: 'Talent Garden',
    logo: '/images/logos/talent-garden.svg',
    role: { it: 'Master UX/UI Design', en: 'Master UX/UI Design' },
    year: '2026',
    type: 'education',
  },
  {
    id: 'bicocca',
    name: 'Università di Milano-Bicocca',
    logo: '/images/logos/bicocca.svg',
    role: { it: 'Scienze della Comunicazione', en: 'Communication Sciences' },
    year: '2023–',
    type: 'education',
  },
  {
    id: 'crinali',
    name: 'Cooperativa Crinali',
    logo: '/images/logos/crinali.svg',
    role: { it: 'Mediatrice Culturale', en: 'Cultural Mediator' },
    year: '2025–',
    type: 'work',
  },
  {
    id: 'abili-city-exp',
    name: 'AbiliCity',
    logo: '/images/logos/abili-city.svg',
    role: { it: 'UX/UI Designer · Lead', en: 'UX/UI Designer · Lead' },
    year: '2023–',
    type: 'project',
  },
  {
    id: 'su-la-testa',
    name: "Associazione Su la testa!",
    logo: '/images/logos/su-la-testa.svg',
    role: { it: 'Volontaria', en: 'Volunteer' },
    year: '2017–',
    type: 'volunteer',
  },
];

const HANDWRITTEN = {
  it: 'ogni esperienza conta e ha insegnato qualcosa',
  en: 'every experience matters and has taught me something',
};

export default function Experience() {
  const { lang } = useLang();

  return (
    <section id="esperienza" className="experience" aria-labelledby="exp-title">
      {/* Handwritten note — danielsun style */}
      <p className="exp-handwritten" aria-hidden="true">
        {HANDWRITTEN[lang]}
      </p>

      <h2 id="exp-title" className="sr-only">
        {lang === 'it' ? 'Esperienza e formazione' : 'Experience & education'}
      </h2>

      <div className="exp-strip" role="list">
        {EXPERIENCES.map((e) => (
          <div key={e.id} className={`exp-item exp-item--${e.type}`} role="listitem">
            <div className="exp-logo-wrap">
              <img
                src={e.logo}
                alt=""
                className="exp-logo"
                aria-hidden="true"
                onError={(el) => { el.target.style.display = 'none'; }}
              />
              <div className="exp-logo-fallback" aria-hidden="true">
                {e.name.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <p className="exp-name">{e.name}</p>
            <p className="exp-role">{e.role[lang]}</p>
            <p className="exp-year">{e.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
