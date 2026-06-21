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
/* Canvas pixel-sample y=520: Brazil x=551-677, Italy x=728-851, UK x=902-1034
   Display: 36×39px → scale = 36/126 = 0.286
   BG_SIZE: 1584×0.286=453px, 672×0.286=192px
   bgPos-x: PT=551×0.286=158→-158, IT=728×0.286=208→-208, EN=902×0.286=258→-258
   bgPos-y: y_start≈455×0.286=130→-130 */
const BG_SIZE = '453px 192px';
const FLAGS = {
  it: { bgPos: '-208px -130px', label: 'Italiano' },
  en: { bgPos: '-258px -130px', label: 'English' },
  pt: { bgPos: '-158px -130px', label: 'Português' },
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
