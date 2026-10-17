import React, { useEffect, useRef, useState } from 'react';
import { gsap, reduced } from '../motion/scroll';
import { SKILLS } from '../data/content';
import './SkillsExplorer.css';

/* category rail on the left, tiles on the right; every tile says where the skill was actually used */
export default function SkillsExplorer() {
  const [active, setActive] = useState(0);
  const panel = useRef(null);
  const first = useRef(true);
  const cat = SKILLS[active];

  useEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    if (reduced()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo('.sk-head > *', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.06 });
      gsap.fromTo('.sk-tile', { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.05, clearProps: 'transform,opacity' });
    }, panel);
    return () => ctx.revert();
  }, [active]);

  const onKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); setActive((a) => (a + 1) % SKILLS.length); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); setActive((a) => (a - 1 + SKILLS.length) % SKILLS.length); }
  };

  return (
    <section id="skills" className="skills-x">
      <div className="section-container">
        <div className="section-header">
          <span className="label" data-reveal>Expertise</span>
          <h2 className="chrome-text" data-split>Technical Skills</h2>
          <p data-reveal data-delay="0.15">Pick a category &mdash; every skill shows where I actually used it</p>
        </div>

        <div className="sk-layout" data-reveal>
          <div className="sk-rail" role="tablist" aria-orientation="vertical" onKeyDown={onKey}>
            <span className="sk-indicator" style={{ '--i': active }} />
            {SKILLS.map((c, i) => (
              <button
                key={c.title}
                role="tab"
                aria-selected={i === active}
                tabIndex={i === active ? 0 : -1}
                className={`sk-tab ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="sk-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="sk-name">{c.title}</span>
                <span className="sk-count">{c.items.length}</span>
              </button>
            ))}
          </div>

          <div className="sk-panel" ref={panel} role="tabpanel">
            <div className="sk-head">
              <i className={`fas ${cat.icon}`} />
              <h3>{cat.title}</h3>
              <p>{cat.blurb}</p>
            </div>
            <div className="sk-grid">
              {cat.items.map(([name, icon, used]) => (
                <div className="sk-tile fx-card" key={name}>
                  <i className={`${icon} sk-icon`} />
                  <h4>{name}</h4>
                  <p><span>Used in</span>{used}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
