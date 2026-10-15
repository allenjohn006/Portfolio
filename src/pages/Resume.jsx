import React from 'react';
import resumePdf from '../assets/ALLEN_RESUME.pdf';

export default function Resume({ onBack }) {
  return (
    <section className="resume-section full-screen">
      <div className="resume-container">
        <button className="close-btn" onClick={onBack} aria-label="Close resume">
          <span>←</span> Back
        </button>

        <div className="resume-header">
          <div className="section-header">
            <span className="label" data-reveal>Resume</span>
            <h2 className="chrome-text" data-split>My Professional Profile</h2>
            <p data-reveal data-delay="0.15">Download or view my full resume</p>
          </div>
        </div>

        <div className="resume-content">
          <div className="resume-viewer" data-reveal>
            <iframe
              src={resumePdf}
              title="Resume"
              className="resume-iframe"
            ></iframe>
          </div>

          <div className="resume-download" data-reveal data-delay="0.1">
            <a href={resumePdf} download="ALLEN_RESUME.pdf" className="download-btn">
              <i className="fas fa-download"></i>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
