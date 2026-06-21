import { useRef, useEffect, useState } from 'react';
import './CursorBlob.css';

export default function CursorBlob() {
  const blobRef = useRef(null);
  const dotRef  = useRef(null);
  const rAF     = useRef(null);
  const mouse   = useRef({ x: -300, y: -300 });
  const pos     = useRef({ x: -300, y: -300 });
  const [state, setState] = useState('default'); // 'default' | 'hover' | 'letter'

  useEffect(() => {
    /* Only on fine-pointer devices (mouse/trackpad) */
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      /* Dot follows exactly — no lag */
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      }
    };

    const onOver = (e) => {
      const letter = e.target.closest('.letter-wrap');
      const action = e.target.closest(
        'a, button, [role="button"], .project-frame, .polaroid-card, .nav-link'
      );
      if (letter)        setState('letter');
      else if (action)   setState('hover');
      else               setState('default');
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      /* Blob lags behind — feel of liquid catching up */
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.09);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.09);
      if (blobRef.current) {
        blobRef.current.style.transform =
          `translate(calc(${pos.current.x}px - 50%), calc(${pos.current.y}px - 50%))`;
      }
      rAF.current = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover',  onOver);
    rAF.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover',  onOver);
      cancelAnimationFrame(rAF.current);
    };
  }, []);

  return (
    <>
      {/* Goo filter — makes blob edges organic when transitioning */}
      <svg
        width="0" height="0"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="cursor-goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -8"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      {/* Precise dot — tracks exactly */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />

      {/* Organic blob — lags behind */}
      <div
        ref={blobRef}
        className={`cursor-blob cursor-blob--${state}`}
        aria-hidden="true"
      />
    </>
  );
}
