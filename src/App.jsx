import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import './App.css';
import './motion.css';
import './sections.css';
import ModernSkillsSection from './components/ModernSkillsSection';
import Connect from './pages/Connect';
import Resume from './pages/Resume';
import educationIcon from './assets/icons/Education-removebg-preview.png';
import focusIcon from './assets/icons/Focus-removebg-preview.png';
import beyondCodeIcon from './assets/icons/Beyond_code-removebg-preview.png';
import GlitchName from './components/GlitchName';
import heroCutout from './assets/allen-cutout.png';
import Loader from './components/Loader';
import ProjectModal from './components/ProjectModal';
import {
  PROFILE, TYPED_WORDS, STATS, FEATURED, MORE_BUILDS, INTERNSHIPS, LEADERSHIP, ACHIEVEMENTS, CERTS,
} from './data/content';
import Marquee from './components/Marquee';
import { useReveals } from './motion/useReveals';
import {
  gsap, ScrollTrigger, initScroll, destroyScroll, getLenis, scrollToTarget,
  stopScroll, startScroll, reduced, isTouch, glitchChar,
} from './motion/scroll';

const SECTION_LABELS = {
  home: ['01', 'Home'], about: ['02', 'About'], experience: ['03', 'Experience'],
  projects: ['04', 'Work'], skills: ['05', 'Skills'], achievements: ['06', 'Recognition'],
  contact: ['08', 'Contact'],
};



function Timeline({ items }) {
  return (
    <div className="timeline">
      <span className="tl-line" data-draw />
      <div className="tl-items" data-stagger>
        {items.map((it) => (
          <article className="tl-item fx-card" key={it.role + it.org}>
            <span className="tl-dot" />
            <div className="tl-period">{it.period}</div>
            <h4>{it.role}</h4>
            <div className="tl-org">{it.org} <i>&middot;</i> {it.meta}</div>
            <ul>{it.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            <div className="project-tags">
              {it.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const base = import.meta.env.BASE_URL;
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuExiting, setMenuExiting] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [showConnect, setShowConnect] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [loading, setLoading] = useState(() => !reduced());
  const [heroReady, setHeroReady] = useState(() => reduced());
  const [barHidden, setBarHidden] = useState(false);
  const [barSolid, setBarSolid] = useState(false);
  const [project, setProject] = useState(null);
  const [copied, setCopied] = useState(false);

  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const progressRef = useRef(null);
  const curtainRef = useRef(null);
  const curtainLabelRef = useRef(null);
  const busyRef = useRef(false);
  const pageRef = useRef(false);
  const menuOpenRef = useRef(false);
  useEffect(() => {
    pageRef.current = showResume || showConnect;
    menuOpenRef.current = menuOpen;
  });

  // scroll-driven reveals (re-bound whenever the visible page changes)
  useReveals([showResume, showConnect]);

  // smooth scroll
  useEffect(() => {
    initScroll();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      destroyScroll();
    };
  }, []);

  // hide hero content until the loader splits open
  useLayoutEffect(() => {
    if (!loading) return;
    gsap.set('.hero [data-hero], .hero .gn-char', { autoAlpha: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // hero entrance
  useEffect(() => {
    if (!heroReady || reduced()) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo('.hero [data-hero="eyebrow"]', { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 1 })
        .fromTo('.hero .gn-char',
          { autoAlpha: 0, y: 70, skewX: -8 },
          { autoAlpha: 1, y: 0, skewX: 0, duration: 1.1, stagger: 0.035, clearProps: 'transform' }, '-=0.7')
        .add(() => {
          gsap.utils.toArray('.hero .gn-char').forEach((c, i) =>
            gsap.delayedCall(i * 0.03, () => glitchChar(c)));
        }, '-=0.5')
        .fromTo('.hero [data-hero="sub"]', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 }, '-=0.6')
        .fromTo('.hero [data-hero="desc"]', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 }, '-=0.8')
        .fromTo('.hero [data-hero="cta"]', { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1, clearProps: 'transform' }, '-=0.8')
        .fromTo('.hero [data-hero="photo"]',
          { autoAlpha: 0, y: 80, clipPath: 'inset(18% 0% 0% 0%)' },
          { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, clearProps: 'clipPath,transform' }, 0.1)
        .fromTo('.hero [data-hero="scroll"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, '-=0.6');
    }, rootRef);
    return () => ctx.revert();
  }, [heroReady]);

  // scroll state: active section, topbar behaviour, progress line
  useEffect(() => {
    let last = window.scrollY;
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'contact'];
    const handleScroll = () => {
      const y = window.scrollY;
      setBarSolid(y > 40);
      setBarHidden(y > 160 && y > last);
      if (y < last || y <= 160) setBarHidden(false);
      last = y;
      if (progressRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) setActiveSection(id);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen) stopScroll(); else startScroll();
    return () => { document.body.style.overflow = ''; startScroll(); };
  }, [menuOpen]);

  // magnetic menu trigger
  useEffect(() => {
    const el = triggerRef.current;
    if (!el || reduced() || isTouch()) return undefined;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) < 90) { xTo(dx * 0.35); yTo(dy * 0.35); } else { xTo(0); yTo(0); }
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  // card spotlight + image drift (one delegated listener)
  useEffect(() => {
    if (isTouch()) return undefined;
    let current = null;
    const reset = (c) => { c?.style.setProperty('--px', 0); c?.style.setProperty('--py', 0); };
    const move = (e) => {
      const card = e.target.closest?.('.fx-card') || null;
      if (card !== current) { reset(current); current = card; }
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
      card.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5) * 2);
      card.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const words = TYPED_WORDS;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;
    function tick() {
      const current = words[wordIndex];
      if (!isDeleting) {
        charIndex++;
        setTypedText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 1100);
          return;
        }
      } else {
        charIndex--;
        setTypedText(current.slice(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      timeoutId = setTimeout(tick, isDeleting ? 60 : 110);
    }
    tick();
    return () => clearTimeout(timeoutId);
  }, []);

  const openMenu = () => {
    setMenuExiting(false);
    setMenuOpen(true);
  };

  const closeMenu = useCallback(() => {
    setMenuExiting(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuExiting(false);
    }, 500);
  }, []);

  // run fn after the menu (if open) has closed
  const closeThen = useCallback((fn) => {
    if (!menuOpenRef.current) { fn(); return; }
    setMenuExiting(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuExiting(false);
      document.body.style.overflow = '';
      startScroll();
      fn();
    }, 500);
  }, []);

  // curtain wipe between pages; `mid` swaps the content while the screen is covered
  const transition = useCallback((label, mid) => {
    if (reduced()) { mid(); return; }
    if (busyRef.current) return;
    busyRef.current = true;
    const curtain = curtainRef.current;
    const text = curtainLabelRef.current;
    text.textContent = label;
    gsap.timeline({ onComplete: () => { busyRef.current = false; } })
      .set(curtain, { display: 'flex', yPercent: 100 })
      .to(curtain, { yPercent: 0, duration: 0.75, ease: 'expo.inOut' })
      .fromTo(text, { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: 'expo.out' }, '-=0.35')
      .add(() => {
        mid();
        const l = getLenis();
        if (l) l.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
      }, '+=0.1')
      .to(text, { yPercent: -110, duration: 0.45, ease: 'expo.in' }, '+=0.3')
      .to(curtain, { yPercent: -100, duration: 0.75, ease: 'expo.inOut' }, '-=0.25')
      .set(curtain, { display: 'none' });
  }, []);

  const goSection = useCallback((id) => {
    if (pageRef.current) {
      transition(SECTION_LABELS[id]?.[1] || 'Home', () => {
        setShowResume(false);
        setShowConnect(false);
        setTimeout(() => scrollToTarget(`#${id}`, { immediate: true, force: true }), 80);
      });
    } else {
      scrollToTarget(`#${id}`);
    }
    setActiveSection(id);
  }, [transition]);

  const scrollToSection = useCallback((id) => closeThen(() => goSection(id)), [closeThen, goSection]);

  const openConnect = useCallback(
    () => closeThen(() => transition('Connect', () => { setShowResume(false); setShowConnect(true); })),
    [closeThen, transition]
  );

  const openResume = useCallback(
    () => closeThen(() => transition('Resume', () => { setShowConnect(false); setShowResume(true); })),
    [closeThen, transition]
  );

  const goHome = useCallback(
    () => transition('Home', () => { setShowResume(false); setShowConnect(false); setActiveSection('home'); }),
    [transition]
  );

  const barLabel = showResume ? ['07', 'Resume'] : showConnect ? ['08', 'Connect'] : SECTION_LABELS[activeSection];

  const copyEmail = useCallback(() => {
    navigator.clipboard?.writeText(PROFILE.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, []);

  const navItems = [
    { id: '01', label: 'Home',        action: () => scrollToSection('home') },
    { id: '02', label: 'About',       action: () => scrollToSection('about') },
    { id: '03', label: 'Experience',  action: () => scrollToSection('experience') },
    { id: '04', label: 'Work',        action: () => scrollToSection('projects') },
    { id: '05', label: 'Skills',      action: () => scrollToSection('skills') },
    { id: '06', label: 'Recognition', action: () => scrollToSection('achievements') },
    { id: '07', label: 'Resume',      action: openResume },
    { id: '08', label: 'Contact',     action: openConnect },
  ];

  const exploreLinks = [
    { label: 'GitHub Profile',  href: PROFILE.github, external: true },
    { label: 'LinkedIn',        href: 'https://www.linkedin.com/in/allen-john-isac-7b6730363/', external: true },
    { label: 'Direct Mail',     href: 'mailto:allen15022006@gmail.com', external: false },
    { label: "Let's Connect",   action: openConnect },
    { label: 'View Resume',     action: openResume },
  ];

  return (
    <div className="app" ref={rootRef}>

      {loading && (
        <Loader
          onReveal={() => setHeroReady(true)}
          onDone={() => { setLoading(false); ScrollTrigger.refresh(); }}
        />
      )}
      <div className="page-curtain" ref={curtainRef} aria-hidden="true">
        <div className="curtain-label"><span ref={curtainLabelRef} /></div>
      </div>

      {/* ── TOP BAR ── */}
      <header className={`topbar ${barSolid ? 'is-scrolled' : ''} ${barHidden && !menuOpen ? 'is-hidden' : ''}`}>
        <button
          className="topbar-logo"
          aria-label="Back to top"
          onClick={() => (pageRef.current ? goHome() : scrollToTarget(0))}
        >
          {['A', 'J'].map((ch) => (
            <span
              key={ch}
              className="gn-char"
              data-char={ch}
              onPointerEnter={(e) => glitchChar(e.currentTarget)}
              onAnimationEnd={(e) => e.currentTarget.classList.remove('glitching')}
            >{ch}</span>
          ))}
          <span className="dot">.</span>
        </button>
        <div className="topbar-section" key={barLabel?.[1]} aria-hidden="true">
          <span className="ts-num">{barLabel?.[0]}</span>
          <span className="ts-label">{barLabel?.[1]}</span>
        </div>
        <div className="topbar-progress" ref={progressRef} />
      </header>

      {/* ── FLOATING MENU TRIGGER (always accessible, symmetrical) ── */}
      <button
        ref={triggerRef}
        className={`menu-trigger ${menuOpen ? 'is-open' : ''}`}
        onClick={menuOpen ? closeMenu : openMenu}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className="trigger-bar bar1" />
        <span className="trigger-bar bar2" />
        <span className="trigger-bar bar3" />
      </button>

      {/* ── FULLSCREEN NAVIGATION OVERLAY ── */}
      {menuOpen && (
        <div className={`nav-overlay ${menuExiting ? 'exiting' : 'entering'}`}>
          {/* Close button top-right */}
          <button
            className={`overlay-close ${menuExiting ? 'exiting' : ''}`}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span />
            <span />
          </button>

          <div className="overlay-inner">
            {/* LEFT — Main nav items */}
            <nav className="overlay-nav" aria-label="Main navigation">
              <ul className="overlay-nav-list">
                {navItems.map((item, i) => (
                  <li
                    key={item.id}
                    className={`overlay-nav-item ${menuExiting ? 'item-exit' : 'item-enter'}`}
                    style={{
                      animationDelay: menuExiting
                        ? `${i * 35}ms`
                        : `${i * 70 + 100}ms`,
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      className={`overlay-nav-btn ${
                        hoveredItem && hoveredItem !== item.id ? 'dimmed' : ''
                      } ${hoveredItem === item.id ? 'highlighted' : ''}`}
                      onClick={item.action}
                    >
                      <span className="nav-num">{item.id}</span>
                      <span className="nav-label"><span className="roll" data-text={item.label}>{item.label}</span></span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Vertical divider */}
            <div className={`overlay-divider ${menuExiting ? 'div-exit' : 'div-enter'}`} />

            {/* RIGHT — Explore links */}
            <aside className={`overlay-explore ${menuExiting ? 'explore-exit' : 'explore-enter'}`}>
              <p className="explore-heading">EXPLORE & CONNECT</p>
              <ul className="explore-list">
                {exploreLinks.map((link, i) => (
                  <li key={i} style={{ animationDelay: `${i * 60 + 250}ms` }}>
                    {link.action ? (
                      <button className="explore-link" onClick={link.action}>
                        {link.label}
                      </button>
                    ) : (
                      <a
                        className="explore-link"
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              {/* Social footer */}
              <div className="overlay-socials">
                <a href="https://github.com/allenjohn006" target="_blank" rel="noopener noreferrer" className="overlay-social-link">GitHub</a>
                <a href="https://www.linkedin.com/in/allen-john-isac-7b6730363/" target="_blank" rel="noopener noreferrer" className="overlay-social-link">LinkedIn</a>
                <a href="mailto:allen15022006@gmail.com" className="overlay-social-link">Mail</a>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* ── PAGE CONTENT ── */}
      {showResume ? (
        <Resume onBack={goHome} />
      ) : showConnect ? (
        <Connect onBack={goHome} />
      ) : (
        <>
          {/* Hero Section */}
          <section id="home" className="hero">
            <div className="hero-content">
              <div className="hero-text" data-parallax="-4">
                <div className="hero-eyebrow" data-hero="eyebrow">
                  <span className="eyebrow-line" />
                  <span className="eyebrow-text">Portfolio</span>
                </div>
                <GlitchName />
                <div className="hero-subtitle typewriter" data-hero="sub">
                  <span className="typed">{typedText}</span>
                  <span className="cursor" aria-hidden="true">|</span>
                </div>
                <p className="hero-description" data-hero="desc">
                  I build end-to-end AI systems &mdash; MLOps pipelines, voice-first platforms and full-stack products &mdash; not just notebooks.
                  <br />
                  3rd-year B.Tech in AI &amp; Data Science at Karunya Institute.
                </p>
                <div className="hero-buttons" data-hero="cta">
                  <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                    <span>View My Work</span>
                    <i className="fas fa-arrow-right" />
                  </button>
                  <button className="btn btn-outline" onClick={openConnect}>
                    <span>Let's Connect</span>
                    <i className="fas fa-arrow-down" />
                  </button>
                  <button className="btn btn-outline" onClick={openResume}>
                    <i className="fas fa-file-pdf" /> Resume
                  </button>
                </div>
              </div>
              <div className="hero-right" data-hero="photo">
                <div className="hero-photo-wrapper" data-parallax="-7">
                  <img
                    src={heroCutout}
                    alt="Allen John Isac"
                    className="hero-photo-clean"
                  />
                </div>
              </div>
            </div>
            <div className="scroll-indicator" data-hero="scroll">
              <div className="scroll-text">Scroll to explore</div>
              <div className="scroll-icon"><span /></div>
            </div>
          </section>

          <Marquee />

          {/* About Section */}
          <section id="about" className="about">
            <div className="section-container">
              <div className="section-header">
                <span className="label" data-reveal>About Me</span>
                <h2 className="chrome-text" data-split>Who I Am</h2>
                <p data-reveal data-delay="0.15">An engineer who ships &mdash; and cares who it&rsquo;s for</p>
              </div>
              <div className="about-content">
                <div className="about-text">
                  <h3 className="chrome-text" data-split>Hi! I'm Allen John Isac</h3>
                  <p data-words>
                    I&rsquo;m a 3rd-year B.Tech student in AI &amp; Data Science at Karunya Institute of Technology and Sciences, Coimbatore. I build production-grade systems end to end &mdash; MLOps pipelines with drift detection, RAG-based evaluators, voice-first platforms and mobile apps.
                  </p>
                  <p data-words>
                    I grew up between Kathmandu and Bokaro Steel City, and I care about technology that solves real accessibility and social problems &mdash; from replacing the scribe system for students with disabilities to bringing offline banking to rural branches.
                  </p>
                  <div className="about-highlight" data-stagger>
                    {STATS.map((st) => (
                      <div className="highlight-item fx-card" key={st.label}>
                        <div className="highlight-number" data-count={st.n} data-suffix={st.suffix}>{st.n}{st.suffix}</div>
                        <div className="highlight-text">{st.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="about-buttons" data-reveal>
                    <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="about-btn">
                      <i className="fab fa-github" /> GitHub Profile
                    </a>
                    <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="about-btn">
                      <i className="fab fa-linkedin" /> LinkedIn
                    </a>
                    <button onClick={openResume} className="about-btn">
                      <i className="fas fa-file-pdf" /> Resume
                    </button>
                  </div>
                </div>
                <div className="about-info-cards-section" data-stagger="right">
                  <div className="about-info-card fx-card">
                    <div className="card-label">EDUCATION</div>
                    <div className="about-info-card-icon">
                      <img src={educationIcon} alt="Education" className="about-info-card-icon-img" />
                    </div>
                    <h4>Education &amp; Languages</h4>
                    <div className="about-card-expandable">
                      <p className="about-card-desc">
                        B.Tech in Artificial Intelligence &amp; Data Science (2024&ndash;2028) at Karunya. Schooling across India and Nepal.
                      </p>
                      <ul className="about-card-bullets">
                        <li><strong>College:</strong> Karunya Institute of Technology &amp; Sciences, Coimbatore</li>
                        <li><strong>Schooling:</strong> M.G.M. Higher Secondary (Jharkhand) &amp; Modern Indian School (Kathmandu)</li>
                        <li><strong>Languages:</strong> Malayalam, English, Hindi, Tamil</li>
                      </ul>
                    </div>
                  </div>
                  <div className="about-info-card fx-card">
                    <div className="card-label">FOCUS</div>
                    <div className="about-info-card-icon">
                      <img src={focusIcon} alt="Technical Focus" className="about-info-card-icon-img" />
                    </div>
                    <h4>Technical Focus</h4>
                    <div className="about-card-expandable">
                      <p className="about-card-desc">
                        Taking ideas from notebook to production &mdash; models, APIs, dashboards and the infrastructure that keeps them honest.
                      </p>
                      <ul className="about-card-bullets">
                        <li><strong>MLOps:</strong> drift detection, champion&ndash;challenger retraining, MLflow</li>
                        <li><strong>GenAI &amp; NLP:</strong> RAG, FAISS embeddings, voice AI</li>
                        <li><strong>Full Stack:</strong> FastAPI, React, React Native, Docker</li>
                      </ul>
                      <p className="about-card-quote">"Ship fast. Learn faster."</p>
                    </div>
                  </div>
                  <div className="about-info-card fx-card">
                    <div className="card-label">BEYOND CODE</div>
                    <div className="about-info-card-icon">
                      <img src={beyondCodeIcon} alt="Leadership & Community" className="about-info-card-icon-img" />
                    </div>
                    <h4>Leadership &amp; Community</h4>
                    <div className="about-card-expandable">
                      <p className="about-card-desc">
                        I lead because I like building teams as much as systems.
                      </p>
                      <ul className="about-card-bullets">
                        <li><strong>DotDev Coordinator, ATOM:</strong> full-stack club at Karunya</li>
                        <li><strong>Head, NSS Parade Team:</strong> drill, discipline &amp; teamwork</li>
                        <li><strong>NSS MC Team &amp; IEEE TEMS:</strong> hosting and professional community</li>
                      </ul>
                      <p className="about-card-quote">"Leadership is bringing people together."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="experience">
            <div className="section-container">
              <div className="section-header">
                <span className="label" data-reveal>Experience</span>
                <h2 className="chrome-text" data-split>Internships &amp; Leadership</h2>
                <p data-reveal data-delay="0.15">Three internships, a club to run and a parade team to lead</p>
              </div>
              <div className="exp-grid">
                <div>
                  <h3 className="subhead" data-reveal>Internships</h3>
                  <Timeline items={INTERNSHIPS} />
                </div>
                <div>
                  <h3 className="subhead" data-reveal>Leadership</h3>
                  <Timeline items={LEADERSHIP} />
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="projects">
            <div className="section-container">
              <div className="section-header">
                <span className="label" data-reveal>Work</span>
                <h2 className="chrome-text" data-split>Selected Projects</h2>
                <p data-reveal data-delay="0.15">Systems built end to end &mdash; open any card for the case study</p>
              </div>
              <div className="projects-grid" data-stagger>
                {FEATURED.map((p) => (
                  <article
                    key={p.id}
                    className="project-card fx-card"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${p.title} case study`}
                    onClick={() => setProject(p)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setProject(p); } }}
                  >
                    <div className="project-image-container">
                      {p.image ? (
                        <img src={`${base}${p.image}`} alt={p.title} />
                      ) : (
                        <div className="arch" aria-hidden="true">
                          {p.arch.map((n) => <span key={n}>{n}</span>)}
                        </div>
                      )}
                      <span className="project-kind">{p.kind}</span>
                    </div>
                    <div className="project-info">
                      <div className="project-role">{p.role}</div>
                      <h3>{p.title}</h3>
                      <p>{p.short}</p>
                      <div className="project-metrics">
                        {p.metrics.map(([v, l]) => (
                          <div key={l}><strong>{v}</strong><span>{l}</span></div>
                        ))}
                      </div>
                      <span className="project-link">Read case study <i className="fas fa-arrow-right" /></span>
                    </div>
                  </article>
                ))}
              </div>

              <h3 className="subhead more-title" data-reveal>More Builds</h3>
              <div className="mini-grid" data-stagger>
                {MORE_BUILDS.map((m, i) => (
                  <a key={m.title} className="mini-card fx-card" href={m.link} target="_blank" rel="noopener noreferrer">
                    <div className="mini-top">
                      <span className="mini-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="mini-tag">{m.tag}</span>
                    </div>
                    <h4>{m.title}</h4>
                    <p>{m.note}</p>
                    <div className="mini-bottom">
                      <span className="mini-stack">{m.tags.join(' · ')}</span>
                      <i className="fas fa-arrow-up-right-from-square" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <ModernSkillsSection />

          {/* Achievements Section */}
          <section id="achievements" className="achievements">
            <div className="section-container">
              <div className="section-header">
                <span className="label" data-reveal>Recognition</span>
                <h2 className="chrome-text" data-split>Achievements &amp; Certifications</h2>
                <p data-reveal data-delay="0.15">Hackathons, awards and the courses behind the work</p>
              </div>
              <div className="ach-grid" data-stagger>
                {ACHIEVEMENTS.map((a) => (
                  <div className="ach-card fx-card" key={a.title}>
                    <i className={`fas ${a.icon} ach-icon`} />
                    <h4>{a.title}</h4>
                    <div className="ach-org">{a.org}</div>
                    <p>{a.note}</p>
                  </div>
                ))}
              </div>
              <h3 className="subhead more-title" data-reveal>Certifications</h3>
              <div className="cert-list" data-stagger>
                {CERTS.map(([name, issuer, year]) => (
                  <div className="cert-row fx-card" key={name}>
                    <span className="cert-name">{name}</span>
                    <span className="cert-issuer">{issuer}</span>
                    <span className="cert-year">{year}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact">
            <div className="section-container">
              <div className="section-header">
                <span className="label" data-reveal>Contact</span>
                <h2 className="chrome-text" data-split>Let&rsquo;s Build Something</h2>
                <p data-reveal data-delay="0.15">Open to AI/ML and full-stack internships, 2026&ndash;27</p>
                <div className="contact-status" data-reveal data-delay="0.2">
                  <span className="pulse" /> Available for internships
                </div>
                <a className="contact-mail" href={`mailto:${PROFILE.email}`} data-reveal data-delay="0.25">
                  <span className="roll" data-text={PROFILE.email}>{PROFILE.email}</span>
                  <i className="fas fa-arrow-up-right-from-square" />
                </a>
                <div className="contact-actions" data-reveal data-delay="0.3">
                  <button className="btn-connect-now" onClick={openConnect}>Connect Now</button>
                  <button className="btn btn-outline" onClick={copyEmail}><i className="far fa-copy" /> Copy email</button>
                </div>
              </div>
              <div className="contact-wrapper">
                <div className="social-section" data-reveal>
                  <h3>Connect With Me</h3>
                  <div className="social-links" data-stagger="pop">
                    <a className="social-link" href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                      <i className="fab fa-github" />
                    </a>
                    <a className="social-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in" />
                    </a>
                    <a className="social-link" href={`mailto:${PROFILE.email}`} aria-label="Email">
                      <i className="fas fa-envelope" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-content">
              <p>&copy; 2026 Allen John Isac &middot; Coimbatore, India</p>
            </div>
          </footer>
        </>
      )}

      {project && <ProjectModal project={project} onClose={() => setProject(null)} />}
      <div className={`toast ${copied ? 'show' : ''}`} role="status" aria-live="polite">Email copied to clipboard</div>
    </div>
  );
}