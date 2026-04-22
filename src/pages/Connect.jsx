import React, { useState } from 'react';

export default function Connect({ onBack }) {
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xzddbbor', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setShowDialog(true);
        form.reset();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <section id="connect" className="connect-page">
      <div className="section-container">
        <div className="section-header">
          <span className="label">Connect</span>
          <h2>Let's <span className="gradient-text">Talk</span></h2>
          <p>Have a project in mind or want to collaborate? I'd love to hear from you.</p>
        </div>

        <div className="connect-grid">
          <div className="connect-info">
            <h3>Get in Touch</h3>
            <p>Feel free to reach out through any of the following channels. I typically respond within 24 hours.</p>

            <div className="connect-card">
              <div className="connect-icon"><i className="fas fa-envelope"></i></div>
              <div className="connect-details">
                <div className="connect-label">EMAIL</div>
                <a href="mailto:allen15022006@gmail.com">allen15022006@gmail.com</a>
              </div>
            </div>

            <div className="connect-card">
              <div className="connect-icon"><i className="fas fa-phone"></i></div>
              <div className="connect-details">
                <div className="connect-label">PHONE</div>
                <a href="tel:+919263213093">+91 9263213093</a>
              </div>
            </div>

            <button className="btn btn-outline" onClick={onBack}>← Back</button>
          </div>

          <div className="connect-form">
            <h3>Send a Message</h3>
            <form
              onSubmit={handleSubmit}
              className="connect-form-grid"
            >
              <div className="form-field">
                <label>Your Name</label>
                <input name="name" type="text" placeholder="ALLEN JOHN" required />
              </div>
              <div className="form-field">
                <label>Your Email</label>
                <input name="email" type="email" placeholder="allen@example.com" required />
              </div>
              <div className="form-field span-2">
                <label>Subject</label>
                <input name="subject" type="text" placeholder="What's this about?" />
              </div>
              <div className="form-field span-2">
                <label>Message</label>
                <textarea name="message" rows="5" placeholder="Tell me about your project or idea..." required></textarea>
              </div>
              <div className="actions span-2">
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Thank You Dialog */}
      {showDialog && (
        <div className="dialog-overlay" onClick={() => setShowDialog(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. I'll get back to you soon!</p>
            <button className="btn btn-primary" onClick={() => setShowDialog(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
