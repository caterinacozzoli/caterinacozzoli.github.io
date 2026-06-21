import { useLang } from '../contexts/LangContext';
import './LangNav.css';

/*
  Sprite sheet: flag-uk.png (1584×672)
  Contiene: nav bar + 3 bandierine illustrate in basso al centro
  Ordine: Brasile | Italia | UK

  Coordinate approssimative a 1× (1584×672):
  - PT (Brasile):  x≈375, y≈430, w≈140, h≈145
  - IT (Italia):   x≈540, y≈430, w≈140, h≈145
  - EN (UK):       x≈705, y≈430, w≈145, h≈145

  Display: 64×66px → scale = 64/140 ≈ 0.457
  background-size: 1584×0.457 = 724px  ×  672×0.457 = 307px
*/

const SPRITE = '/images/flag-uk.png';
/* Flag ~135px wide in 1584px sprite → display 52px → scale=52/135=0.385
   BG_SIZE: 1584×0.385=610px, 672×0.385=259px
   bgPos-x: PT=548×0.385=211, IT=730×0.385=281, EN=900×0.385=347
   bgPos-y: flag top 420×0.385=162 */
/* Canvas pixel-sample: Brazil x=555-680, Italy x=730-855, UK x=900-1035, y_start≈455
   Display: 36×32px → scale = 36/125 = 0.288
   BG_SIZE: 1584×0.288=456px, 672×0.288=194px
   bgPos-x: PT=555×0.288=160→-160, IT=730×0.288=210→-210, EN=900×0.288=259→-259
   bgPos-y: 455×0.288=131→-131 */
const BG_SIZE = '456px 194px';
const FLAGS = {
  it: { bgPos: '-210px -131px', label: 'Italiano' },
  en: { bgPos: '-259px -131px', label: 'English' },
  pt: { bgPos: '-160px -131px', label: 'Português' },
};

function FlagBtn({ code, config, onClick }) {
  return (
    <button
      className="lang-flag-btn"
      onClick={onClick}
      aria-label={config.label}
      type="button"
    >
      <span
        className="lang-flag"
        role="img"
        aria-hidden="true"
        style={{
          backgroundImage: `url('${SPRITE}')`,
          backgroundSize: BG_SIZE,
          backgroundPosition: config.bgPos,
          backgroundRepeat: 'no-repeat',
        }}
      />
    </button>
  );
}

export default function LangNav() {
  const { lang, setLang } = useLang();
  const visible = Object.entries(FLAGS).filter(([code]) => code !== lang);

  return (
    <nav className="lang-nav" aria-label="Seleziona lingua">
      {visible.map(([code, config]) => (
        <FlagBtn
          key={code}
          code={code}
          config={config}
          onClick={() => setLang(code)}
        />
      ))}
    </nav>
  );
}
