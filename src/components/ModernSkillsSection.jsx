import React from 'react';
import './ModernSkillsSection.css';

const ModernSkillsSection = () => {
  const categories = [
    { title: "LANGUAGES", class: "languages", skills: [
      { name: "Python", icon: "fab fa-python" }, { name: "Java", icon: "fab fa-java" },
      { name: "C", icon: "fas fa-code" }, { name: "SQL", icon: "fas fa-database" },
      { name: "TypeScript", icon: "fas fa-code" } ] },
    { title: "AI / ML", class: "aiml", skills: [
      { name: "Scikit-learn", icon: "fas fa-flask" }, { name: "TensorFlow", icon: "fas fa-brain" },
      { name: "XGBoost", icon: "fas fa-chart-line" }, { name: "Prophet", icon: "fas fa-chart-area" },
      { name: "NLP", icon: "fas fa-language" }, { name: "RAG", icon: "fas fa-diagram-project" },
      { name: "FAISS", icon: "fas fa-magnifying-glass" }, { name: "Computer Vision", icon: "fas fa-eye" },
      { name: "AWS Bedrock", icon: "fab fa-aws" } ] },
    { title: "FRAMEWORKS", class: "frameworks", skills: [
      { name: "FastAPI", icon: "fas fa-bolt" }, { name: "Django", icon: "fas fa-server" },
      { name: "React", icon: "fab fa-react" }, { name: "React Native", icon: "fas fa-mobile-alt" },
      { name: "Streamlit", icon: "fas fa-stream" }, { name: "Expo", icon: "fas fa-cube" } ] },
    { title: "DATABASES", class: "database", skills: [
      { name: "PostgreSQL", icon: "fas fa-database" }, { name: "MySQL", icon: "fas fa-database" },
      { name: "MongoDB", icon: "fas fa-leaf" }, { name: "Firestore", icon: "fas fa-fire" },
      { name: "Vector DBs", icon: "fas fa-vector-square" } ] },
    { title: "ANALYTICS", class: "analytics", skills: [
      { name: "Power BI", icon: "fas fa-chart-column" }, { name: "Tableau", icon: "fas fa-chart-pie" },
      { name: "Matplotlib", icon: "fas fa-chart-simple" }, { name: "Seaborn", icon: "fas fa-chart-simple" },
      { name: "Recharts", icon: "fas fa-chart-line" } ] },
    { title: "DEVOPS & TESTING", class: "devops", skills: [
      { name: "Docker", icon: "fab fa-docker" }, { name: "MLflow", icon: "fas fa-code-branch" },
      { name: "Celery + Redis", icon: "fas fa-layer-group" }, { name: "Nginx", icon: "fas fa-network-wired" },
      { name: "Playwright", icon: "fas fa-vial" }, { name: "CI/CD", icon: "fas fa-rotate" },
      { name: "Git", icon: "fab fa-git-alt" } ] },
  ];

  return (
    <section id="skills" className="modern-skills-section">
      <div className="section-container">
        <div className="section-header">
          <span className="label" data-reveal>Expertise</span>
          <h2 className="chrome-text" data-split>Technical Skills</h2>
          <p data-reveal data-delay="0.15">The tools I reach for to take an idea from notebook to production</p>
        </div>

        <div className="skills-rows-wrapper" data-stagger>
          {categories.map((cat, idx) => (
            <div key={idx} className="skill-row-container fx-card">
              <div className={`category-side-label ${cat.class}`}>
                {cat.title}
              </div>
              <div className="skills-chips-list" data-stagger="pop">
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
