/**
 * Scroll lock via position:fixed — funziona su iOS Safari e con overflow-x:clip.
 * Counter-based: multipli chiamanti possono lock/unlock senza conflitti.
 */

let count = 0;
let savedY = 0;

export function lockScroll() {
  if (count === 0) {
    savedY = window.scrollY;
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top      = `-${savedY}px`;
    body.style.left     = '0';
    body.style.right    = '0';
    body.style.overflow = 'hidden';
  }
  count++;
}

export function unlockScroll() {
  count = Math.max(0, count - 1);
  if (count === 0) {
    const body = document.body;
    body.style.position = '';
    body.style.top      = '';
    body.style.left     = '';
    body.style.right    = '';
    body.style.overflow = '';
    window.scrollTo(0, savedY);
  }
}
