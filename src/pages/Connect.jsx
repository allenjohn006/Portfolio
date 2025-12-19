import React, { useEffect, useRef } from 'react';

export default function Connect({ onBack }) {
  const canvasRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <section id="connect" className="connect-page">
      <div className="section-container">
        <div className="section-header">
          <h2>Let's <span className="gradient-text">Connect</span></h2>
          <p>Have a project in mind or want to collaborate?</p><p>I'd love to hear from you. Let's create something amazing together!</p>
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
            <form onSubmit={(e) => e.preventDefault()} className="connect-form-grid">
              <div className="form-field">
                <label>Your Name</label>
                <input type="text" placeholder="ALLEN JOHN" />
              </div>
              <div className="form-field">
                <label>Your Email</label>
                <input type="email" placeholder="allen@example.com" />
              </div>
              <div className="form-field span-2">
                <label>Subject</label>
                <input type="text" placeholder="What's this about?" />
              </div>
              <div className="form-field span-2">
                <label>Message</label>
                <textarea rows="5" placeholder="Tell me about your project or idea..."></textarea>
              </div>
              <div className="actions span-2">
                <button className="btn btn-primary" type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
