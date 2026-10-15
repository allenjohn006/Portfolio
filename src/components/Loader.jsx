import React, { useEffect, useRef } from 'react';
import { gsap, glitchChar } from '../motion/scroll';
import './GlitchName.css';
import './Loader.css';

const WORDS = [
  { text: 'Allen', variant: 'white' },
  { text: 'John', variant: 'white' },
  { text: 'Isac.', variant: 'red' },
];

/*
  Intro: the name types in while a counter climbs, the glitch effect rips
  through every character, then the screen splits open on the hero.
*/
export default function Loader({ onReveal, onDone }) {
  const root = useRef(null);
  const tlRef = useRef(null);
  const cb = useRef({ onReveal, onDone });
  useEffect(() => {
    cb.current = { onReveal, onDone };
  });

  useEffect(() => {
    document.documentElement.classList.add('is-loading');
    const el = root.current;
    const chars = el.querySelectorAll('.gn-char');
    const count = el.querySelector('.ld-count');
    const bar = el.querySelector('.ld-bar');
    const content = el.querySelector('.ld-content');
    const top = el.querySelector('.ld-top');
    const bottom = el.querySelector('.ld-bottom');
    const o = { v: 0 };
    let shown = 0;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(o, {
        v: 100,
        duration: 2.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          count.textContent = String(Math.round(o.v)).padStart(3, '0');
          bar.style.transform = `scaleX(${o.v / 100})`;
          const n = Math.floor((o.v / 100) * chars.length + 0.0001);
          while (shown < n) {
            chars[shown].style.opacity = 1;
            shown += 1;
          }
        },
      });

      tl.add(() => {
        chars.forEach((c, i) => {
          c.style.opacity = 1;
          gsap.delayedCall(i * 0.045, () => glitchChar(c));
        });
      });
      tl.to({}, { duration: chars.length * 0.045 + 0.45 });

      tl.addLabel('reveal');
      tl.add(() => cb.current.onReveal?.(), 'reveal+=0.1');
      tl.to(content, { opacity: 0, scale: 1.05, duration: 0.4, ease: 'power2.in' }, 'reveal');
      tl.to(top, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, 'reveal+=0.1');
      tl.to(bottom, { yPercent: 100, duration: 1, ease: 'expo.inOut' }, 'reveal+=0.1');
      tl.add(() => {
        document.documentElement.classList.remove('is-loading');
        cb.current.onDone?.();
      });
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove('is-loading');
    };
  }, []);

  return (
    <div
      className="loader"
      ref={root}
      onClick={() => tlRef.current?.timeScale(3)}
      aria-label="Loading"
      role="status"
    >
      <div className="ld-panel ld-top" />
      <div className="ld-panel ld-bottom" />
      <div className="ld-content">
        <div className="ld-meta">
          <span>Portfolio</span>
          <span className="ld-count">000</span>
        </div>
        <h1 className="gn ld-name" aria-label="Allen John Isac.">
          {WORDS.map(({ text, variant }) => (
            <span key={text} className={`gn-word gn-${variant}`}>
              {[...text].map((ch, i) => (
                <span
                  key={i}
                  className="gn-char"
                  data-char={ch}
                  style={{ opacity: 0 }}
                  onAnimationEnd={(e) => e.currentTarget.classList.remove('glitching')}
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <div className="ld-track">
          <div className="ld-bar" />
        </div>
      </div>
    </div>
  );
}
