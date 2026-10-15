import React, { useEffect, useRef } from 'react';
import { gsap, isTouch, reduced } from '../motion/scroll';

/* dot + trailing ring + soft ambient glow; ring swells over interactive things */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const glow = useRef(null);

  useEffect(() => {
    if (isTouch() || reduced()) return undefined;
    const html = document.documentElement;
    html.classList.add('has-cursor');

    gsap.set([dot.current, ring.current, glow.current], { xPercent: -50, yPercent: -50 });
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.1, ease: 'power3' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.1, ease: 'power3' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3' });
    const gx = gsap.quickTo(glow.current, 'x', { duration: 1.2, ease: 'power3' });
    const gy = gsap.quickTo(glow.current, 'y', { duration: 1.2, ease: 'power3' });

    let seen = false;
    const move = (e) => {
      if (!seen) {
        seen = true;
        gsap.set([dot.current, ring.current, glow.current], { x: e.clientX, y: e.clientY });
        html.classList.add('cursor-live');
      }
      dx(e.clientX); dy(e.clientY);
      rx(e.clientX); ry(e.clientY);
      gx(e.clientX); gy(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      html.classList.toggle('cursor-text', !!t.closest?.('input,textarea'));
      html.classList.toggle('cursor-link', !!t.closest?.('a,button,[data-cursor],.gn-char'));
    };
    const down = () => html.classList.add('cursor-down');
    const up = () => html.classList.remove('cursor-down');
    const leave = () => html.classList.remove('cursor-live');
    const enter = () => seen && html.classList.add('cursor-live');

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerleave', leave);
    document.addEventListener('pointerenter', enter);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerenter', enter);
      html.classList.remove('has-cursor', 'cursor-live', 'cursor-text', 'cursor-link', 'cursor-down');
    };
  }, []);

  return (
    <>
      <div className="cursor-glow" ref={glow} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
