import { useRef, useEffect, useState } from 'react';
import { useLang } from '../contexts/LangContext';
import './Workflow.css';

const STEPS = {
  it: [
    { num: '01', title: 'Ricerca',      desc: 'Ascolto, osservo, documento. Interviste, desk research, mappe empatiche.' },
    { num: '02', title: 'Definizione',  desc: 'Dati in insight. Problem statement, personas, user journey.' },
    { num: '03', title: 'Wireframe',    desc: 'Strutture veloci, flussi testati. Schizzo prima di costruire.' },
    { num: '04', title: 'Prototipo',    desc: 'Alta fedeltà, micro-interazioni, sistema di design coerente.' },
    { num: '05', title: 'Test & Itera', desc: 'Osservo persone reali. Correggo, miglioro, ripeto.' },
  ],
  en: [
    { num: '01', title: 'Research',       desc: 'Listen, observe, document. Interviews, desk research, empathy maps.' },
    { num: '02', title: 'Define',         desc: 'Data into insights. Problem statement, personas, user journey.' },
    { num: '03', title: 'Wireframe',      desc: 'Fast structures, tested flows. Sketch before building.' },
    { num: '04', title: 'Prototype',      desc: 'High fidelity, micro-interactions, coherent design system.' },
    { num: '05', title: 'Test & Iterate', desc: 'Watch real people. Fix, improve, repeat.' },
  ],
  pt: [
    { num: '01', title: 'Pesquisa',        desc: 'Ouço, observo, documento. Entrevistas, desk research, mapas de empatia.' },
    { num: '02', title: 'Definição',       desc: 'Dados em insights. Declaração do problema, personas, jornada.' },
    { num: '03', title: 'Wireframe',       desc: 'Estruturas rápidas, fluxos testados. Esboço antes de construir.' },
    { num: '04', title: 'Protótipo',       desc: 'Alta fidelidade, micro-interações, sistema de design coerente.' },
    { num: '05', title: 'Testar & Iterar', desc: 'Observo pessoas reais. Corrijo, melhoro, repito.' },
  ],
};

const TITLE = { it: 'workflow', en: 'workflow', pt: 'workflow' };

/* One-shot IntersectionObserver reveal hook */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, revealed];
}

export default function Workflow() {
  const { lang } = useLang();
  const steps = STEPS[lang] ?? STEPS.it;
  const [stepsRef, revealed] = useReveal(0.12);

  return (
    <section id="workflow" className="workflow" aria-labelledby="workflow-title">
      <div className="workflow-header">
        <h2 id="workflow-title" className="workflow-title">{TITLE[lang]}</h2>
        <div className="workflow-header-right">
          <span className="workflow-count" aria-hidden="true">04</span>
          <span className="workflow-steps-label" aria-hidden="true">05 step</span>
        </div>
      </div>

      <ol
        ref={stepsRef}
        className={`workflow-steps${revealed ? ' workflow-steps--revealed' : ''}`}
        aria-label={TITLE[lang]}
      >
        {steps.map((step, i) => (
          <li
            key={step.num}
            className="workflow-step"
            style={{ '--i': i }}
          >
            <span className="step-num" aria-hidden="true">{step.num}</span>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </li>
        ))}
      </ol>

      {/* Sezione Strumenti (sotto alla sezione viola) */}
      <div className="workflow-tools-section">
        <h3 className="workflow-tools-title">{TOOLS_TITLE[lang]}</h3>
        <div className="workflow-tools-list">
          {TOOLS.map((tool) => (
            <ToolIcon key={tool.key} name={tool.name} imgKey={tool.key} label={tool.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
