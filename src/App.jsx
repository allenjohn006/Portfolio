import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ModernSkillsSection from './components/ModernSkillsSection';
import Connect from './pages/Connect';
export default function App() {
  const base = import.meta.env.BASE_URL;
  const [scrollPos, setScrollPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [showConnect, setShowConnect] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
      
      // Update active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect for hero subtitle
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
      const speed = isDeleting ? 60 : 110;
      timeoutId = setTimeout(tick, speed);
    }

    tick();
    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const openConnect = () => {
    setShowConnect(true);
    setMenuOpen(false);
  };
  const closeConnect = () => setShowConnect(false);

  useEffect(() => {
    if (showConnect) return; // Don't render canvas on Connect page

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.5 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showConnect]);

  return (
    <div className="app">
      {!showConnect && <canvas ref={canvasRef} className="neural-network-canvas"></canvas>}
      {/* Global animated background (grid + floating blobs) */}
      <div className="global-bg" aria-hidden="true">
        <div className="bg-grid"></div>
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </div>
      {/* Navigation */}
      <nav className={`navbar ${scrollPos > 50 ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo-container">
            <img src={`${base}Logo-removebg.png`} alt="Logo" className="logo" />
           
          </div>
          
          <button 
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li><button onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</button></li>
            <li><button onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</button></li>
            <li><button onClick={() => scrollToSection('skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</button></li>
            <li><button onClick={() => scrollToSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</button></li>
            <li><button onClick={openConnect} className={showConnect ? 'active' : ''}>Connect</button></li>
          </ul>
        </div>
      </nav>
      {showConnect ? (
        <Connect onBack={closeConnect} />
      ) : (
        <>
          {/* Hero Section */}
          <section id="home" className="hero">
            <div className="hero-bg"></div>
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  <span className="title-word gradient">Hi I'm</span>
                  <br />
                  <span className="title-word">Allen</span>
                  <span className="title-word">John</span>
                  <span className="title-word gradient">Isac</span>
                </h1>
                <div className="hero-subtitle typewriter">
                  <span className="typed">{typedText}</span>
                  <span className="cursor" aria-hidden="true">|</span>
                </div>
                {/* Fix: no nested <p> inside <p> */}
                <p className="hero-description">
                  Passionate about predictive analytics, data-driven decision making, and building end-to-end applications.
                  <br />
                  Currently pursuing my B.Tech degree with AI &amp; DS Specialization.
                </p>
                <div className="hero-buttons">
                  <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                    <span>View My Work</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                  <button className="btn btn-outline" onClick={openConnect}>
                    <span>Let's Connect</span>
                    <i className="fas fa-arrow-down"></i>
                  </button>
                </div>
              </div>
              <div className="hero-image">
                <div className="image-container photo-frame">
                  <div className="photo-glow" aria-hidden="true"></div>
                  <img src={`${base}photo1.jpg`} alt="Allen John Isac" className="profile-photo"/>
                  <div className="orbit-dots" aria-hidden="true">
                    <span className="dot d1"></span>
                    <span className="dot d2"></span>
                    <span className="dot d3"></span>
                    <span className="dot d4"></span>
                    <span className="dot d5"></span>
                    <span className="dot d6"></span>
                    <span className="dot d7"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="scroll-indicator">
              <div className="scroll-text">Scroll to explore</div>
              <div className="scroll-icon">
                <span></span>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="about">
            <div className="section-container">
              <div className="section-header">
                <h2>About Me</h2>
                <p>Discover my journey and what drives me</p>
              </div>
              
              <div className="about-content">
                <div className="about-image">
                  <img src={`${base}photo1.jpg`} alt="About" />
                  <div className="image-frame"></div>
                </div>
                
                <div className="about-text">
                  <h3>Hi! I'm Allen John Isac</h3>
                  <p>
                    I'm a passionate developer, AI & ML enthusiast currently in my 2nd year of B.Tech. I believe in the power of technology to solve complex problems and create meaningful experiences for users.
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
                      <i className="fab fa-github"></i> GitHub Profile
                    </a>
                    <a href="https://www.linkedin.com/in/allen-john-isac-7b6730363/" target="_blank" rel="noopener noreferrer" className="about-btn">
                      <i className="fab fa-linkedin"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section (modern) */}
          <ModernSkillsSection />

          {/* Projects Section */}
          <section id="projects" className="projects">
            <div className="section-container">
              <div className="section-header">
                <h2>Featured Projects</h2>
                <p>Showcasing my best work and contributions</p>
              </div>

              <div className="projects-grid">
                {[
                  {
                    title: 'Blind Man Stick',
                    desc: 'IoT-enabled navigation system using ultrasonic sensors to assist visually impaired individuals. Features real-time obstacle detection and audio feedback.',
                    image: `${base}blind-man.jpeg`,
                    tags: ['IoT', 'Arduino', 'Sensors', 'Hardware'],
                    color: 'gradient-blue'
                  },
                  {
                    title: 'Scientific Calculator',
                    desc: 'Advanced calculator application built with Python supporting mathematical operations, trigonometry, and complex calculations with a user-friendly GUI.',
                    image: `${base}calc.png`,
                    tags: ['Python', 'Math Library', 'GUI', 'Tkinter'],
                    color: 'gradient-purple'
                  },
                  {
                    title: 'Resume Filter AI',
                    desc: 'AI-powered resume screening tool using NLP and machine learning to automatically filter and rank candidates based on job requirements.',
                    image: `${base}resume.jpeg`,
                    tags: ['AI/ML', 'NLP', 'Python', 'Data Processing'],
                    color: 'gradient-green'
                  },
                ].map((project, idx) => (
                  <div key={idx} className="project-card">
                    <div className="project-image-container">
                      <img src={project.image} alt={project.title} />
                      <div className={`project-overlay ${project.color}`}></div>
                    </div>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>{project.desc}</p>
                      <div className="project-tags">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="project-tag">{tag}</span>
                        ))}
                      </div>
                      <button className="project-link">Learn More →</button>
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
                <h2>Get In Touch</h2>
                <p>Let's connect and create something amazing together</p>
                {/* Button moved above cards */}
                <button className="btn-connect-now" onClick={openConnect}>Connect Now</button>
              </div>

              <div className="contact-wrapper">
                <div className="contact-info-grid">
                  <div className="contact-card">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <h4>Email</h4>
                    <a href="mailto:allen15022006@gmail.com">allen15022006@gmail.com</a>
                  </div>

                  <div className="contact-card">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <h4>Location</h4>
                    <p>India</p>
                  </div>

                  <div className="contact-card">
                    <div className="contact-icon">
                      <i className="fas fa-code"></i>
                    </div>
                    <h4>GitHub</h4>
                    <a href="https://github.com/allenjohn006" target="_blank" rel="noopener noreferrer">allenjohn006</a>
                  </div>
                </div>

                {/* Connect With Me (icons only) */}
                <div className="social-section">
                  <h3>Connect With Me</h3>
                  <div className="social-links">
                    <a className="social-link" href="https://github.com/allenjohn006" target="_blank" rel="noreferrer" aria-label="GitHub">
                      <i className="fab fa-github"></i>
                    </a>
                    <a className="social-link" href="https://www.linkedin.com/in/allenjohn006" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a className="social-link" href="mailto:allen15022006@gmail.com" aria-label="Email">
                      <i className="fas fa-envelope"></i>
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
              <p className="footer-credit">Crafted with passion and modern web technologies</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}