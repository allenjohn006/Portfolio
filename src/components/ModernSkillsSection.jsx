import React from 'react';
import './ModernSkillsSection.css';

const ModernSkillsSection = () => {
  const categories = [
    {
      title: "LANGUAGES",
      class: "languages",
      skills: [
        { name: "Java", icon: "fab fa-java" },
        { name: "C", icon: "fas fa-code" },
        { name: "Python", icon: "fab fa-python" },
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "TypeScript", icon: "fas fa-code" }
      ]
    },
    {
      title: "FRONTEND",
      class: "frontend",
      skills: [
        { name: "HTML5", icon: "fab fa-html5" },
        { name: "CSS3", icon: "fab fa-css3-alt" },
        { name: "Flutter", icon: "fas fa-mobile-alt" },
        { name: "Tailwind", icon: "fas fa-wind" },
        { name: "React", icon: "fab fa-react" }
      ]
    },
    {
      title: "BACKEND",
      class: "backend",
      skills: [
        { name: "Spring Boot", icon: "fas fa-leaf" },
        { name: "FastAPI", icon: "fas fa-bolt" },
        { name: "Node.js", icon: "fab fa-node-js" }
      ]
    },
    {
      title: "DEVOPS",
      class: "devops",
      skills: [
        { name: "Docker", icon: "fab fa-docker" },
        { name: "Kubernetes", icon: "fas fa-dharmachakra" },
        { name: "GitHub Actions", icon: "fab fa-github" },
        { name: "AWS", icon: "fab fa-aws" }
      ]
    },
    {
      title: "DATABASE",
      class: "database",
      skills: [
        { name: "MongoDB", icon: "fas fa-database" },
        { name: "MySQL", icon: "fas fa-database" },
        { name: "PostgreSQL", icon: "fas fa-database" },
        { name: "SQLite", icon: "fas fa-database" }
      ]
    }
  ];

  return (
    <section id="skills" className="modern-skills-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Technical Skills</h2>
          <p>Technologies and expertise demonstrated through real-world projects</p>
        </div>

        <div className="skills-rows-wrapper">
          {categories.map((cat, idx) => (
            <div key={idx} className="skill-row-container">
              <div className={`category-side-label ${cat.class}`}>
                {cat.title}
              </div>
              <div className="skills-chips-list">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-chip-pill">
                    <i className={skill.icon}></i>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernSkillsSection;
