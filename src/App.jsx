import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [scrollPos, setScrollPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${scrollPos > 50 ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo-container">
            <img src="/logo1.png" alt="Logo" className="logo" />
            <span className="logo-text">AJI</span>
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
            <li><button onClick={() => scrollToSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</button></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-greeting">Welcome to my portfolio</div>
            <h1 className="hero-title">
              <span className="title-word">Allen</span>
              <span className="title-word">John</span>
              <span className="title-word gradient">Isac</span>
            </h1>
            <p className="hero-subtitle">
              Web Developer • ML & AI Enthusiast • Problem Solver
            </p>
            <p className="hero-description">
             Passionate about predictive analytics, data-driven decision making, and building end-to-end applications.<p>Currently pursuing my B.Tech degree with AI & DS Specialization.</p>
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                <span>View My Work</span>
                <i className="fas fa-arrow-right"></i>
              </button>
              <button className="btn btn-outline" onClick={() => scrollToSection('contact')}>
                <span>Let's Connect</span>
                <i className="fas fa-arrow-down"></i>
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <img src="/photo-removebg.png" alt="Allen John Isac" />
              <div className="glow-effect"></div>
              <div className="floating-shape shape-1"></div>
              <div className="floating-shape shape-2"></div>
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
              <img src="/photo1.jpg" alt="About" />
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

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="section-container">
          <div className="section-header">
            <h2>Technical Skills</h2>
            <p>Technologies and tools I used for Projects</p>
          </div>

          <div className="skills-content">
            <div className="skills-category">
              <h3>Languages</h3>
              <div className="skills-list">
                {[
                  { name: 'Python', level: 88 },
                  { name: 'JavaScript', level: 87 },
                  { name: 'C', level: 85 },
                  { name: 'Java', level: 75 },
                ].map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skills-category">
              <h3>Technologies</h3>
              <div className="skills-list">
                {[
                  { name: 'React.js', level: 85 },
                  { name: 'HTML/CSS', level: 92 },
                  { name: 'Node.js', level: 80 },
                  { name: 'MongoDB', level: 80 },
                ].map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skills-category">
              <h3>Specializations</h3>
              <div className="skills-tags">
                {['Data Science', 'Machine Learning', 'AI', 'IoT', 'Web Design', 'Git/GitHub'].map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
                image: '/blind-man.jpeg',
                tags: ['IoT', 'Arduino', 'Sensors', 'Hardware'],
                color: 'gradient-blue'
              },
              {
                title: 'Scientific Calculator',
                desc: 'Advanced calculator application built with Python supporting mathematical operations, trigonometry, and complex calculations with a user-friendly GUI.',
                image: '/calc.png',
                tags: ['Python', 'Math Library', 'GUI', 'Tkinter'],
                color: 'gradient-purple'
              },
              {
                title: 'Resume Filter AI',
                desc: 'AI-powered resume screening tool using NLP and machine learning to automatically filter and rank candidates based on job requirements.',
                image: '/resume.jpeg',
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
          </div>

          <div className="contact-wrapper">
            <div className="contact-info-grid">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h4>Email</h4>
                <a href="mailto:allenjohn24@karunya.edu.in">allenjohn24@karunya.edu.in</a>
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
                <a href="https://github.com/Allenjohn2006" target="_blank" rel="noopener noreferrer">Allenjohn2006</a>
              </div>
            </div>

            <div className="social-section">
              <h3>Connect With Me</h3>
              <div className="social-links">
                <a href="https://github.com/Allenjohn2006" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-github"></i>
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/allen-john-isac-7b6730363/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
                <a href="mailto:allenjohn24@karunya.edu.in" className="social-link">
                  <i className="fas fa-envelope"></i>
                  <span>Email</span>
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
    </div>
  );
}
