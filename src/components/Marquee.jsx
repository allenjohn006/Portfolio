import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, reduced } from '../motion/scroll';

const ITEMS = ['React', 'FastAPI', 'Python', 'Machine Learning', 'Docker', 'Node.js', 'Spring Boot', 'AWS', 'Prompt Engineering'];

/* infinite strip; scrolling speeds it up and flips its direction */
export default function Marquee() {
  const track = useRef(null);

  useEffect(() => {
    if (reduced()) return undefined;
    const ctx = gsap.context(() => {
      const tween = gsap.to(track.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        trigger: track.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const dir = self.direction || 1;
          const boost = Math.min(6, 1 + Math.abs(self.getVelocity()) / 400);
          tween.timeScale(dir * boost);
          gsap.to(tween, { timeScale: dir, duration: 1, ease: 'power2.out', overwrite: true });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const row = ITEMS.map((t) => (
    <span className="mq-item" key={t}>
      {t}
      <i className="mq-sep">✦</i>
    </span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="mq-track" ref={track}>
        <div className="mq-row">{row}</div>
        <div className="mq-row">{row}</div>
      </div>
    </div>
  );
}
