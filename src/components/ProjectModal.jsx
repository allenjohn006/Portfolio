import React, { useEffect, useRef } from 'react';
import { gsap, reduced, stopScroll, startScroll } from '../motion/scroll';

/* case-study sheet: slides up over the page, content staggers in */
export default function ProjectModal({ project, onClose }) {
  const root = useRef(null);
  const closing = useRef(false);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    if (reduced()) { onClose(); return; }
    const el = root.current;
    gsap.timeline({ onComplete: onClose })
      .to(el.querySelector('.pm-panel'), { yPercent: 8, opacity: 0, duration: 0.45, ease: 'expo.in' })
      .to(el, { opacity: 0, duration: 0.3, ease: 'power2.out' }, '-=0.25');
  };

  useEffect(() => {
    stopScroll();
    const el = root.current;
    el.querySelector('.pm-close')?.focus();
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);

    let ctx;
    if (!reduced()) {
      ctx = gsap.context(() => {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        gsap.fromTo(el.querySelector('.pm-panel'),
          { yPercent: 12, opacity: 0, clipPath: 'inset(8% 0% 0% 0% round 18px)' },
          { yPercent: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 18px)', duration: 0.9, ease: 'expo.out' });
        gsap.from(el.querySelectorAll('[data-pm]'),
          { y: 28, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06, delay: 0.25 });
      }, root);
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      ctx?.revert();
      startScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="pm-overlay"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="pm-panel" data-lenis-prevent>
        <button className="pm-close" onClick={close} aria-label="Close case study">
          <span /><span />
        </button>

        <header className="pm-head" data-pm>
          <span className="label">{project.kind}</span>
          <h3>{project.title}</h3>
          <p className="pm-role">{project.role} <i>·</i> {project.status}</p>
        </header>

        <p className="pm-lead" data-pm>{project.short}</p>

        <div className="pm-metrics" data-pm>
          {project.metrics.map(([v, l]) => (
            <div key={l}><strong>{v}</strong><span>{l}</span></div>
          ))}
        </div>

        <div className="pm-cols">
          <div data-pm>
            <h4>How it works</h4>
            <ul className="pm-list">
              {project.how.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </div>
          <div data-pm>
            <h4>The story</h4>
            <p className="pm-story">{project.story}</p>
            <h4>Stack</h4>
            <div className="project-tags">
              {project.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
            </div>
          </div>
        </div>

        <div className="pm-actions" data-pm>
          <a className="btn btn-primary" href={project.link} target="_blank" rel="noopener noreferrer">
            <span>View on GitHub</span><i className="fab fa-github" />
          </a>
          <button className="btn btn-outline" onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
}
