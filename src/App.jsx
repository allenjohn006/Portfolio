import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ModernSkillsSection from './components/ModernSkillsSection';
import Connect from './pages/Connect';
import Resume from './pages/Resume';
import { DoodleBulb, DoodleArrow, DoodleStar, DoodleSwirl, DoodleSpeechBubble, DoodleWave } from './components/Doodles';
import educationIcon from './assets/icons/Education-removebg-preview.png';
import focusIcon from './assets/icons/Focus-removebg-preview.png';
import beyondCodeIcon from './assets/icons/Beyond_code-removebg-preview.png';
import GlitchName from './components/GlitchName';



export default function App() {
  const base = import.meta.env.BASE_URL;
  const [scrollPos, setScrollPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuExiting, setMenuExiting] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [showConnect, setShowConnect] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (let section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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

  const scrollToSection = useCallback((id) => {
    setMenuExiting(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuExiting(false);
      setActiveSection(id);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }, []);

  const openConnect = useCallback(() => {
    setMenuExiting(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuExiting(false);
      setShowConnect(true);
    }, 500);
  }, []);

  const openResume = useCallback(() => {
    setMenuExiting(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuExiting(false);
      setShowResume(true);
    }, 500);
  }, []);

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
    <div className="app">

      {/* ── FLOATING MENU TRIGGER (always accessible, symmetrical) ── */}
      <button
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
                      <span className="nav-label">{item.label}</span>
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
        <Resume onBack={() => setShowResume(false)} />
      ) : showConnect ? (
        <Connect onBack={() => setShowConnect(false)} />
      ) : (
        <>
          {/* Hero Section */}
          <section id="home" className="hero">
            <DoodleBulb />
            <DoodleStar />
            <DoodleArrow />
            <div className="hero-content">
              <div className="hero-text">
                <div className="hero-eyebrow">
                  <span className="eyebrow-line" />
                  <span className="eyebrow-text">Portfolio</span>
                </div>
                <GlitchName />
                <div className="hero-subtitle typewriter">
                  <span className="typed">{typedText}</span>
                  <span className="cursor" aria-hidden="true">|</span>
                </div>
                <p className="hero-description">
                  Passionate about predictive analytics, data-driven decision making, and building end-to-end applications.
                  <br />
                  Currently pursuing my B.Tech degree with AI &amp; DS Specialization.
                </p>
                <div className="hero-buttons">
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
              <div className="hero-right">
                <div className="image-container photo-frame">
                  <div className="photo-glow" aria-hidden="true" />
                  <img src={`${base}pic 1.jpeg`} alt="Allen John Isac" className="profile-photo" />
                  <div className="orbit-dots" aria-hidden="true">
                    <span className="dot d1" />
                    <span className="dot d2" />
                    <span className="dot d3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="scroll-indicator">
              <div className="scroll-text">Scroll to explore</div>
              <div className="scroll-icon"><span /></div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="about">
            <DoodleStar />
            <DoodleSwirl />
            <div className="section-container">
              <div className="section-header">
                <span className="label">About Me</span>
                <h2>Who I Am</h2>
                <p>Discover my journey and what drives me</p>
              </div>
              <div className="about-content">
                <div className="about-text">
                  <h3>Hi! I'm Allen John Isac</h3>
                  <p>
                    I'm a passionate developer, AI &amp; ML enthusiast currently in my 2nd year of B.Tech. I believe in the power of technology to solve complex problems and create meaningful experiences for users.
                  </p>
                  <p>
                    My journey has been about continuous learning and pushing boundaries. Whether it's building intuitive web applications, diving into machine learning, or exploring IoT solutions, I'm always excited to tackle new challenges.
                  </p>
                  <div className="about-highlight">
                    <div className="highlight-item">
                      <div className="highlight-number">2nd</div>
                      <div className="highlight-text">Years B-tech</div>
                    </div>
                    <div className="highlight-item">
                      <div className="highlight-number">5+</div>
                      <div className="highlight-text">Completed Projects</div>
                    </div>
                    <div className="highlight-item">
                      <div className="highlight-number">10+</div>
                      <div className="highlight-text">Technical Skills</div>
                    </div>
                  </div>
                  <div className="about-buttons">
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
                <div className="about-info-cards-section">
                  {/* Card 1: Education */}
                  <div className="about-info-card">
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
                  <div className="about-info-card">
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
                  <div className="about-info-card">
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
            <DoodleSpeechBubble />
            <DoodleBulb />
            <div className="section-container">
              <div className="section-header">
                <span className="label">Work</span>
                <h2>Featured Projects</h2>
                <p>Showcasing my best work and contributions</p>
              </div>
              <div className="projects-grid">
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
                  <div key={idx} className="project-card">
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
            <DoodleWave />
            <DoodleStar />
            <div className="section-container">
              <div className="section-header">
                <span className="label">Contact</span>
                <h2>Get In Touch</h2>
                <p>Let's connect and create something amazing together</p>
                <button className="btn-connect-now" onClick={openConnect}>Connect Now</button>
              </div>
              <div className="contact-wrapper">
                <div className="social-section">
                  <h3>Connect With Me</h3>
                  <div className="social-links">
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