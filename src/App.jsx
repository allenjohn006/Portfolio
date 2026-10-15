import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import './App.css';
import './motion.css';
import ModernSkillsSection from './components/ModernSkillsSection';
import Connect from './pages/Connect';
import Resume from './pages/Resume';
import educationIcon from './assets/icons/Education-removebg-preview.png';
import focusIcon from './assets/icons/Focus-removebg-preview.png';
import beyondCodeIcon from './assets/icons/Beyond_code-removebg-preview.png';
import GlitchName from './components/GlitchName';
import heroCutout from './assets/allen-cutout.png';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Marquee from './components/Marquee';
import { useReveals } from './motion/useReveals';
import {
  gsap, ScrollTrigger, initScroll, destroyScroll, getLenis, scrollToTarget,
  stopScroll, startScroll, reduced, isTouch, glitchChar,
} from './motion/scroll';

const SECTION_LABELS = {
  home: ['01', 'Home'], about: ['02', 'About'], skills: ['03', 'Skills'],
  projects: ['04', 'Projects'], contact: ['06', 'Contact'],
};



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
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
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
    const words = ['Web Developer', 'ML & AI Enthusiast', 'Prompt Engineer'];
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

  const barLabel = showResume ? ['05', 'Resume'] : showConnect ? ['06', 'Connect'] : SECTION_LABELS[activeSection];

  const navItems = [
    { id: '01', label: 'Home',     action: () => scrollToSection('home') },
    { id: '02', label: 'About',    action: () => scrollToSection('about') },
    { id: '03', label: 'Skills',   action: () => scrollToSection('skills') },
    { id: '04', label: 'Projects', action: () => scrollToSection('projects') },
    { id: '05', label: 'Resume',   action: openResume },
    { id: '06', label: 'Contact',  action: openConnect },
  ];

  const exploreLinks = [
    { label: 'GitHub Profile',  href: 'https://github.com/allenjohn006', external: true },
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
      <Cursor />
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
                  Passionate about predictive analytics, data-driven decision making, and building end-to-end applications.
                  <br />
                  Currently pursuing my B.Tech degree with AI &amp; DS Specialization.
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
                <p data-reveal data-delay="0.15">Discover my journey and what drives me</p>
              </div>
              <div className="about-content">
                <div className="about-text">
                  <h3 className="chrome-text" data-split>Hi! I'm Allen John Isac</h3>
                  <p data-words>
                    I'm a passionate developer, AI &amp; ML enthusiast currently in my 2nd year of B.Tech. I believe in the power of technology to solve complex problems and create meaningful experiences for users.
                  </p>
                  <p data-words>
                    My journey has been about continuous learning and pushing boundaries. Whether it's building intuitive web applications, diving into machine learning, or exploring IoT solutions, I'm always excited to tackle new challenges.
                  </p>
                  <div className="about-highlight" data-stagger>
                    <div className="highlight-item fx-card">
                      <div className="highlight-number" data-count="2" data-suffix="nd">2nd</div>
                      <div className="highlight-text">Years B-tech</div>
                    </div>
                    <div className="highlight-item fx-card">
                      <div className="highlight-number" data-count="5" data-suffix="+">5+</div>
                      <div className="highlight-text">Completed Projects</div>
                    </div>
                    <div className="highlight-item fx-card">
                      <div className="highlight-number" data-count="10" data-suffix="+">10+</div>
                      <div className="highlight-text">Technical Skills</div>
                    </div>
                  </div>
                  <div className="about-buttons" data-reveal>
                    <a href="https://github.com/allenjohn006" target="_blank" rel="noopener noreferrer" className="about-btn">
                      <i className="fab fa-github" /> GitHub Profile
                    </a>
                    <a href="https://www.linkedin.com/in/allen-john-isac-7b6730363/" target="_blank" rel="noopener noreferrer" className="about-btn">
                      <i className="fab fa-linkedin" /> LinkedIn
                    </a>
                    <button onClick={openResume} className="about-btn">
                      <i className="fas fa-file-pdf" /> Resume
                    </button>
                  </div>
                </div>
                <div className="about-info-cards-section" data-stagger="right">
                  {/* Card 1: Education */}
                  <div className="about-info-card fx-card">
                    <div className="card-label">EDUCATION</div>
                    <div className="about-info-card-icon">
                      <img src={educationIcon} alt="Education" className="about-info-card-icon-img" />
                    </div>
                    <h4>Education &amp; Leadership</h4>
                    <div className="about-card-expandable">
                      <p className="about-card-desc">
                        Currently pursuing my B.Tech in Artificial Intelligence and Data Science at Karunya Institute of Technology and Sciences (2024–2028). Academic journey spanning India and Nepal, complemented by active student leadership.
                      </p>
                      <ul className="about-card-bullets">
                        <li><strong>Undergraduate:</strong> B.Tech in AI &amp; Data Science (2024–2028)</li>
                        <li><strong>DotDev, ATOM:</strong> Full-Stack Development Club Coordinator</li>
                        <li><strong>TEDxKarunyaUniversity:</strong> Core Student Member</li>
                        <li><strong>Schooling:</strong> M.G.M. Higher Secondary (Jharkhand) &amp; Modern Indian School (Kathmandu)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Card 2: Focus */}
                  <div className="about-info-card fx-card">
                    <div className="card-label">FOCUS</div>
                    <div className="about-info-card-icon">
                      <img src={focusIcon} alt="Technical Focus" className="about-info-card-icon-img" />
                    </div>
                    <h4>Technical Focus</h4>
                    <div className="about-card-expandable">
                      <p className="about-card-desc">
                        Exploring the intersection of software engineering and applied AI through practical systems, experimenting with emerging tech, and turning ideas into functional applications.
                      </p>
                      <ul className="about-card-bullets">
                        <li><strong>Web Development:</strong> Building responsive, user-focused applications &amp; full-stack solutions</li>
                        <li><strong>Artificial Intelligence &amp; ML:</strong> Intelligent systems, LLM pipelines &amp; predictive models</li>
                        <li><strong>Data Science:</strong> Exploratory analytics, FAISS embeddings &amp; insight extraction</li>
                      </ul>
                      <p className="about-card-quote">"Learn continuously. Build practically. Improve iteratively."</p>
                    </div>
                  </div>

                  {/* Card 3: Beyond Code */}
                  <div className="about-info-card fx-card">
                    <div className="card-label">BEYOND CODE</div>
                    <div className="about-info-card-icon">
                      <img src={beyondCodeIcon} alt="Leadership & Community" className="about-info-card-icon-img" />
                    </div>
                    <h4>Leadership &amp; Community</h4>
                    <div className="about-card-expandable">
                      <p className="about-card-desc">
                        Beyond technology, I enjoy taking responsibility, working with teams, and contributing to community initiatives. My involvement in NSS has helped develop discipline, coordination, and team leadership.
                      </p>
                      <ul className="about-card-bullets">
                        <li><strong>NSS Karunya — Parade Team Head:</strong> Leading drill coordination, discipline &amp; teamwork</li>
                        <li><strong>NSS Karunya — MC Team:</strong> Event hosting, stage coordination &amp; institutional communication</li>
                        <li>Institutional &amp; community outreach initiatives and social service drives</li>
                      </ul>
                      <p className="about-card-quote">"Leadership is not just about taking charge; it's about bringing people together."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <ModernSkillsSection />

          {/* Projects Section */}
          <section id="projects" className="projects">
            <div className="section-container">
              <div className="section-header">
                <span className="label" data-reveal>Work</span>
                <h2 className="chrome-text" data-split>Featured Projects</h2>
                <p data-reveal data-delay="0.15">Showcasing my best work and contributions</p>
              </div>
              <div className="projects-grid" data-stagger>
                {[
                  {
                    title: 'Vox',
                    desc: 'AI-driven accessibility-focused examination platform with 100% hands-free voice-controlled workflow. Enables voice-based navigation, biometric authentication, and supports hybrid question formats with real-time speech recognition.',
                    image: `${base}vox-demo.jpeg`,
                    tags: ['React', 'FastAPI', 'Web Speech API', 'JWT Auth', 'MongoDB', 'Docker'],
                    link: 'https://github.com/allenjohn006/VOX-'
                  },
                  {
                    title: 'OmniFlow Sales AI',
                    desc: 'Production-grade MLOps platform for large-scale sales forecasting with XGBoost, automated retraining, and intelligent drift detection using statistical hypothesis testing.',
                    image: `${base}omniflow-demo.jpeg`,
                    tags: ['Pandas', 'XGBoost', 'FastAPI', 'Django', 'Python', 'Scikit-learn', 'Docker'],
                    link: 'https://github.com/allenjohn006/OmniFlow'
                  },
                  {
                    title: 'CVScope',
                    desc: 'AI-powered resume evaluation system using semantic embeddings, FAISS vector search, and RAG pipeline to analyze resume-job compatibility with actionable recommendations.',
                    image: `${base}cvscope-demo.jpeg`,
                    tags: ['RAG', 'Openrouter', 'FAISS', 'FastAPI', 'Streamlit', 'OCR', 'Python'],
                    link: 'https://github.com/allenjohn006/CVScope'
                  },
                ].map((project, idx) => (
                  <div key={idx} className="project-card fx-card">
                    <div className="project-image-container">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>{project.desc}</p>
                      <div className="project-tags">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="project-tag">{tag}</span>
                        ))}
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        Learn More →
                      </a>
                    </div>
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
                <h2 className="chrome-text" data-split>Get In Touch</h2>
                <p data-reveal data-delay="0.15">Let's connect and create something amazing together</p>
                <button className="btn-connect-now" data-reveal data-delay="0.25" onClick={openConnect}>Connect Now</button>
              </div>
              <div className="contact-wrapper">
                <div className="social-section" data-reveal>
                  <h3>Connect With Me</h3>
                  <div className="social-links" data-stagger="pop">
                    <a className="social-link" href="https://github.com/allenjohn006" target="_blank" rel="noreferrer" aria-label="GitHub">
                      <i className="fab fa-github" />
                    </a>
                    <a className="social-link" href="https://www.linkedin.com/in/allen-john-isac-7b6730363/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in" />
                    </a>
                    <a className="social-link" href="mailto:allen15022006@gmail.com" aria-label="Email">
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
              <p>&copy; 2025 Allen John Isac. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}