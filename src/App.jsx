import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle, 
  ExternalLink, 
  Menu, 
  Sparkles, 
  Layout, 
  Cpu, 
  LineChart, 
  ArrowUpRight 
} from 'lucide-react';

export default function App() {
  // --- State Hooks ---
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [projectFilter, setProjectFilter] = useState('all');
  const [typedText, setTypedText] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Dynamic Typing Effect ---
  const typingWords = ["Premium Web Apps", "Glassmorphic Interfaces", "Modern Experiences"];
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const handleType = () => {
      const currentWord = typingWords[wordIndex];
      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000; // wait before delete
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        speed = 500;
      }

      timer = setTimeout(handleType, speed);
    };

    timer = setTimeout(handleType, 500);
    return () => clearTimeout(timer);
  }, []);

  // --- Header Scroll & Active Section Spy ---
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      // Intersection tracking
      const sections = document.querySelectorAll('section');
      let current = 'hero';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id') || 'hero';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Project Data ---
  const projects = [
    {
      id: 1,
      title: "Aetherial Dashboard",
      category: "web",
      description: "A futuristic control console leveraging rich glassmorphism effects and real-time visualization.",
      tags: ["React", "CSS Grid", "ApexCharts"],
      icon: <Layout className="project-icon" />,
      bgClass: "design-bg-1"
    },
    {
      id: 2,
      title: "Luminary App Interface",
      category: "design",
      description: "Premium glassmorphic user flows designed for immersive high-end mobile experiences.",
      tags: ["Figma", "Glassmorphism", "Micro-interactions"],
      icon: <Sparkles className="project-icon" />,
      bgClass: "design-bg-2"
    },
    {
      id: 3,
      title: "Nebula Code Hub",
      category: "web",
      description: "Cloud repository manager configured with elegant visual overlays and smooth layout transitions.",
      tags: ["Next.js", "CSS Modules", "GitHub API"],
      icon: <Cpu className="project-icon" />,
      bgClass: "design-bg-3"
    },
    {
      id: 4,
      title: "Spectra Analytics Engine",
      category: "web",
      description: "Interactive data modeling application featuring customizable charting modules.",
      tags: ["React", "TailwindCSS", "Recharts"],
      icon: <LineChart className="project-icon" />,
      bgClass: "design-bg-1"
    }
  ];

  const filteredProjects = projectFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === projectFilter);

  // --- Form Handling ---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  return (
    <>
      {/* Background Ambient Glows */}
      <div class="ambient-glow bg-glow-1"></div>
      <div class="ambient-glow bg-glow-2"></div>
      <div class="ambient-glow bg-glow-3"></div>

      {/* Glass Header */}
      <header className="header">
        <div className="nav-container glass-card">
          <a href="#" className="logo">
            <span className="logo-accent">&lt;</span>Manura<span>.A</span><span class="logo-accent">/&gt;</span>
          </a>
          
          <nav className={`navbar ${mobileNavActive ? 'mobile-active' : ''}`}>
            {['hero', 'about', 'projects', 'contact'].map((sec) => (
              <a 
                key={sec} 
                href={`#${sec}`} 
                className={`nav-link ${activeSection === sec ? 'active' : ''}`}
                onClick={() => setMobileNavActive(false)}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a href="#contact" className="btn btn-primary glass-btn">Get In Touch</a>
            <button 
              className="mobile-nav-toggle" 
              aria-label="Toggle Menu"
              onClick={() => setMobileNavActive(!mobileNavActive)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="container hero-container">
            <div className="hero-content">
              <div className="badge-wrapper">
                <span className="status-badge glass-card">
                  <span className="pulse-dot"></span> Available for Opportunities
                </span>
              </div>
              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">Manura Anuhas</span>
              </h1>
              <h2 className="hero-subtitle">
                Crafting <span>{typedText}</span><span className="cursor">&nbsp;</span>
              </h2>
              <p className="hero-description">
                A passionate designer & developer focusing on high-performance interfaces, rich visual systems, and bespoke digital experiences wrapped in modern interactive environments.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">
                  <span>View Projects</span>
                  <ArrowUpRight size={18} />
                </a>
                <a href="#contact" className="btn btn-secondary glass-btn">Let's Connect</a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="glass-orb-container">
                <div className="floating-glass-card glass-card">
                  <div className="card-header">
                    <div className="window-dot red"></div>
                    <div className="window-dot yellow"></div>
                    <div className="window-dot green"></div>
                  </div>
                  <div className="card-body">
                    <span className="code-comment">// Core Philosophy</span>
                    <pre><code><span className="code-keyword">const</span> <span className="code-var">portfolio</span> = &#123;
  aesthetics: <span className="code-string">'Glassmorphism'</span>,
  feel: <span className="code-string">'Ultra Premium'</span>,
  framework: <span className="code-string">'React + Vite'</span>,
  responsive: <span class="code-bool">true</span>
&#125;;</code></pre>
                  </div>
                </div>
                <div className="floating-orb-accent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Discover</span>
              <h2 className="section-title">About Me</h2>
              <div className="header-line"></div>
            </div>

            <div className="about-grid">
              <div className="about-info-card glass-card">
                <h3>Who I Am</h3>
                <p>I build solutions at the intersection of design and technology. I believe that digital products should not only work flawlessly but should also provide a visual masterpiece to the users. With attention to micro-interactions, layout rhythms, and performance, I deliver high-value web applications.</p>
                
                <div className="bio-details">
                  <div className="detail-item">
                    <span className="label">Location</span>
                    <span className="value">Sri Lanka</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Role</span>
                    <span className="value">Full Stack Creator</span>
                  </div>
                </div>
              </div>

              <div className="skills-card glass-card">
                <h3>My Tech Suite</h3>
                <div className="skills-grid">
                  {[
                    { name: "Frontend Engineering (HTML/CSS/JS)", level: "95%" },
                    { name: "React & Next.js Frameworks", level: "90%" },
                    { name: "UI/UX Design & Glassmorphism", level: "92%" },
                    { name: "Creative Motion & Animating Interfaces", level: "85%" }
                  ].map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-info">
                        <span>{skill.name}</span>
                        <span>{skill.level}</span>
                      </div>
                      <div className="skill-bar-bg">
                        <div className="skill-bar-fill" style={{ width: skill.level, transition: 'width 1s ease-in-out' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Portfolio</span>
              <h2 className="section-title">Featured Work</h2>
              <div className="header-line"></div>
            </div>

            <div className="project-filters">
              {['all', 'web', 'design'].map((filter) => (
                <button 
                  key={filter}
                  className={`filter-btn ${projectFilter === filter ? 'active' : ''}`}
                  onClick={() => setProjectFilter(filter)}
                >
                  {filter === 'all' ? 'All Projects' : filter === 'web' ? 'Web Apps' : 'UI/UX Design'}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card glass-card">
                  <div className="project-img-wrapper">
                    <div className={`project-placeholder ${project.bgClass}`}>
                      {project.icon}
                    </div>
                    <div className="project-overlay">
                      <a href="#" className="project-link" aria-label="Github link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      </a>
                      <a href="#" className="project-link" aria-label="Demo link">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                  <div className="project-details">
                    <span className="project-category">
                      {project.category === 'web' ? 'Web Development' : 'UI/UX Design'}
                    </span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Reach Out</span>
              <h2 className="section-title">Let's Create Together</h2>
              <div className="header-line"></div>
            </div>

            <div className="contact-wrapper">
              <div className="contact-card glass-card">
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          required 
                          placeholder="Your Name" 
                          className="glass-input"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          required 
                          placeholder="your.email@example.com" 
                          className="glass-input"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        required 
                        placeholder="Project Proposal" 
                        className="glass-input"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea 
                        id="message" 
                        rows="5" 
                        required 
                        placeholder="Tell me about your vision..." 
                        className="glass-input"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <Send size={18} />
                    </button>
                  </form>
                ) : (
                  <div className="form-feedback-card">
                    <CheckCircle className="success-icon" size={64} />
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out, Manura will get back to you shortly.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <p className="copyright">&copy; 2026 Manura Anuhas. Built with premium design standards.</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
