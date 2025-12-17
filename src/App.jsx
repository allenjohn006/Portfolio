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
            <img src="Logo-removebg.png" alt="Logo" className="logo" />
           
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

      {/* Skills Section (new design) */}
      <section id="skills" className="skills skills-section">
        <div className="skills-wrap">
          <div className="header">
            <h1>Technical Skills</h1>
            <p>Technologies and expertise demonstrated through real-world projects</p>
          </div>

          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                </div>
                <h3>Python & Data Science</h3>
              </div>
              <div className="skill-items">
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy"/> NumPy</span>
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" alt="Pandas"/> Pandas</span>
                <span className="skill-tag"><i className="fas fa-brain" style={{color: '#F7931E'}}></i> Scikit-learn</span>
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow"/> TensorFlow</span>
                <span className="skill-tag"><i className="fas fa-chart-line" style={{color: '#11557c'}}></i> Matplotlib</span>
                <span className="skill-tag"><i className="fas fa-chart-area" style={{color: '#4C9BDF'}}></i> Seaborn</span>
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" alt="Jupyter"/> Jupyter</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon"><i className="fas fa-robot" style={{color: '#00d4ff'}}></i></div>
                <h3>Machine Learning & AI</h3>
              </div>
              <div className="skill-items">
                <span className="skill-tag">Random Forest</span>
                <span className="skill-tag">Gradient Boosting</span>
                <span className="skill-tag">Model Evaluation</span>
                <span className="skill-tag">Predictive Analytics</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon"><i className="fas fa-language" style={{color: '#00d4ff'}}></i></div>
                <h3>Natural Language Processing</h3>
              </div>
              <div className="skill-items">
                <span className="skill-tag"><i className="fas fa-book" style={{color: '#4B8BBE'}}></i> NLTK</span>
                <span className="skill-tag"><i className="fas fa-comments" style={{color: '#09A3D5'}}></i> spaCy</span>
                <span className="skill-tag">Text Classification</span>
                <span className="skill-tag">Sentiment Analysis</span>
                <span className="skill-tag">Word Embeddings</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React"/></div>
                <h3>Web Development</h3>
              </div>
              <div className="skill-items">
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React"/> React.js</span>
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js"/> Node.js</span>
                <span className="skill-tag"><i className="fas fa-server" style={{color: '#000'}}></i> Express.js</span>
                <span className="skill-tag"><i className="fas fa-stream" style={{color: '#FF4B4B'}}></i> Streamlit</span>
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5"/> HTML5/CSS3</span>
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JS"/> JavaScript</span>
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind"/> Tailwind CSS</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java"/></div>
                <h3>Java & Software Engineering</h3>
              </div>
              <div className="skill-items">
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java"/> Java SE</span>
                <span className="skill-tag">Swing Framework</span>
                <span className="skill-tag">MVC Architecture</span>
                <span className="skill-tag">OOP Design</span>
                <span className="skill-tag">Desktop Apps</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="DB"/></div>
                <h3>Database & Cloud</h3>
              </div>
              <div className="skill-items">
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB"/> MongoDB</span>
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="SQL"/> SQL</span>
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS"/> AWS</span>
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker"/> Docker</span>
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git"/> Git & GitHub</span>
                <span className="skill-tag"><i className="fas fa-plug" style={{color: '#00d4ff'}}></i> REST APIs</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon"><i className="fas fa-chart-bar" style={{color: '#E97627'}}></i></div>
                <h3>Data Visualization & BI</h3>
              </div>
              <div className="skill-items">
                <span className="skill-tag"><i className="fas fa-chart-line" style={{color: '#E97627'}}></i> Tableau</span>
                <span className="skill-tag">Dashboard Design</span>
                <span className="skill-tag">Interactive Charts</span>
                <span className="skill-tag">Business Analytics</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C"/></div>
                <h3>Systems & Embedded</h3>
              </div>
              <div className="skill-items">
                <span className="skill-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C"/> C Programming</span>
                <span className="skill-tag"><i className="fas fa-microchip" style={{color: '#00979D'}}></i> Embedded Systems</span>
                <span className="skill-tag"><i className="fas fa-wifi" style={{color: '#00d4ff'}}></i> IoT</span>
                <span className="skill-tag">Hardware Integration</span>
                <span className="skill-tag">Low-level Programming</span>
              </div>
            </div>
          </div>

          <div className="specializations">
            <h2>Specializations</h2>
            <div className="spec-grid">
              <div className="spec-card"><h3>Machine Learning</h3></div>
              <div className="spec-card"><h3>NLP & Text Analytics</h3></div>
              <div className="spec-card"><h3>Predictive Analytics</h3></div>
              <div className="spec-card"><h3>Full-Stack Development</h3></div>
              <div className="spec-card"><h3>Data Science</h3></div>
              <div className="spec-card"><h3>IoT Solutions</h3></div>
            </div>
          </div>

          {/* Certifications removed per request */}
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
