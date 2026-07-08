import React, { useState, useEffect } from 'react';
import {
  Menu, X, ArrowUpRight, Send, CheckCircle, ExternalLink,
  Code2, Cpu, Layers, Database, Palette, PenTool, Film,
  Briefcase, Award, Mail, Phone, MapPin,
  ChevronDown, BookOpen, Star, Zap, Globe, User
} from 'lucide-react';

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const NAV_LINKS = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'];

const TYPED_WORDS = [
  'Modern Digital Experiences',
  'Full-Stack Web Apps',
  'Beautiful UI/UX Designs',
  'Cloud-Based Solutions',
];

const SKILL_CATEGORIES = [
  {
    id: 'languages',
    title: 'Languages',
    icon: <Code2 size={22} />,
    color: '#5400ff',
    gradient: 'linear-gradient(135deg, #5400ff, #7b3fff)',
    items: ['C', 'Java', 'Python (Basic)', 'JavaScript (Basic)'],
  },
  {
    id: 'web',
    title: 'Web Technologies',
    icon: <Globe size={22} />,
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9, #5400ff)',
    items: ['HTML5', 'CSS3', 'Flask', 'WebSockets'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: <Database size={22} />,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #5400ff)',
    items: ['Azure Serverless', 'AWS S3', 'Git', 'GitHub', 'Trello'],
  },
  {
    id: 'design',
    title: 'Design Suite',
    icon: <Palette size={22} />,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    items: ['Figma', 'Photoshop', 'Illustrator', 'Lightroom', 'Canva', 'CapCut'],
  },
];

const CORE_SKILLS = [
  { name: 'UI/UX Design', pct: 90, icon: <PenTool size={16} /> },
  { name: 'Graphic Design', pct: 92, icon: <Palette size={16} /> },
  { name: 'Full-Stack Development', pct: 85, icon: <Code2 size={16} /> },
  { name: 'Cloud Solutions', pct: 72, icon: <Database size={16} /> },
  { name: 'Leadership & Teamwork', pct: 95, icon: <Star size={16} /> },
  { name: 'Creative Direction', pct: 88, icon: <Zap size={16} /> },
];

const EXPERIENCES = [
  {
    year: '2025',
    role: 'Public Visibility Head',
    org: 'IEEE Computer Society — SLTC Branch',
    desc: 'Led public visibility and outreach initiatives, managing media campaigns and communications.',
    type: 'leadership',
  },
  {
    year: '2025',
    role: 'Member Coordinator',
    org: 'AI-Driven Sri Lanka — IEEE Young Professionals',
    desc: 'Coordinated member engagement and event management for a national IEEE initiative.',
    type: 'leadership',
  },
  {
    year: '2024',
    role: 'Vice President / Design Head',
    org: 'Leo Club of Colombo Griffins',
    desc: '★ Griffin of the Year 2026. Led high-visibility design campaigns and event management.',
    type: 'leadership',
  },
  {
    year: '2023',
    role: 'Technical Team Member',
    org: 'Codemania v5 & Innomind v2',
    desc: 'Contributed to technical execution and delivery of two major tech competitions.',
    type: 'technical',
  },
  {
    year: '2019–2022',
    role: 'Media President',
    org: "St. John's College, Panadura",
    desc: 'Managed all media and communications for the school community for 3+ years.',
    type: 'leadership',
  },
];

const EDUCATION = [
  {
    year: '2024–Now',
    title: 'BSc (Hons) Software Engineering',
    org: 'Sri Lanka Technology Campus (SLTC)',
    desc: 'Specializing in full-stack development, cloud computing, and software engineering.',
  },
  {
    year: '2009–2022',
    title: 'G.C.E. A/L & O/L',
    org: "St. John's College, Panadura",
    desc: 'Completed secondary education with distinction and leadership as Media President.',
  },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Real-Time Chat Application',
    category: 'dev',
    bg: 'pb-1',
    icon: <Cpu size={36} />,
    desc: 'Built with Python, Flask, and WebSockets for real-time messaging with user authentication.',
    tags: ['Python', 'Flask', 'WebSockets'],
  },
  {
    id: 2,
    title: 'Serverless API Development',
    category: 'dev',
    bg: 'pb-2',
    icon: <Database size={36} />,
    desc: 'Developed RESTful APIs using Node.js and Azure Functions with secure, scalable architecture.',
    tags: ['Node.js', 'Azure Functions'],
  },
  {
    id: 3,
    title: 'Cloud Storage Integration',
    category: 'dev',
    bg: 'pb-3',
    icon: <Layers size={36} />,
    desc: 'Scalable file management system using AWS S3 for secure and efficient storage.',
    tags: ['AWS S3', 'Python', 'Flask'],
  },
  {
    id: 4,
    title: 'Restaurant Web Interface & Branding',
    category: 'design',
    bg: 'pb-4',
    icon: <Palette size={36} />,
    desc: 'End-to-end design and branding for a restaurant including UI/UX, logo, and marketing materials.',
    tags: ['UI/UX', 'Branding', 'Figma'],
  },
  {
    id: 5,
    title: 'CloudSpace v1.0 Identity Design',
    category: 'design',
    bg: 'pb-5',
    icon: <PenTool size={36} />,
    desc: 'Creative direction and visual identity design for the IEEE CloudSpace v1.0 event.',
    tags: ['Branding', 'Graphic Design'],
  },
  {
    id: 6,
    title: 'Monkey Graphic Portfolio',
    category: 'design',
    bg: 'pb-6',
    icon: <Layers size={36} />,
    desc: 'Professional brand assets and social media designs for various clients and projects.',
    tags: ['Graphic Design', 'Social Media'],
  },
];

const CERTS = [
  { name: 'Python for Everybody', provider: 'Coursera', icon: <BookOpen size={16} /> },
  { name: 'Responsive Web Design', provider: 'freeCodeCamp', icon: <Code2 size={16} /> },
  { name: 'Figma UI/UX Design', provider: 'Coursera', icon: <PenTool size={16} /> },
  { name: 'AWS Cloud Practitioner Essentials', provider: 'AWS Training', icon: <Database size={16} /> },
];

// ─────────────────────────────────────────────
//  SVG ICONS
// ─────────────────────────────────────────────
function GHIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}
function LIIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function IGIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

// ─────────────────────────────────────────────
//  APP
// ─────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('all');
  const [typedText, setTypedText] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // Loading screen
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(t);
  }, []);

  // Typing
  useEffect(() => {
    let wi = 0, ci = 0, del = false;
    let timer;
    const tick = () => {
      const w = TYPED_WORDS[wi];
      setTypedText(del ? w.slice(0, ci - 1) : w.slice(0, ci + 1));
      del ? ci-- : ci++;
      let speed = del ? 45 : 90;
      if (!del && ci === w.length) { speed = 2200; del = true; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % TYPED_WORDS.length; speed = 400; }
      timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  // Scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      let cur = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) cur = id;
      }
      setActiveSection(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1600);
  };

  const filtered = projectFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === projectFilter);
  // Duplicate cards for seamless carousel loop
  const carouselItems = [...PROJECTS, ...PROJECTS];

  return (
    <>
      {/* ── LOADING SCREEN ── */}
      {loading && (
        <div className="loader-screen">
          <div className="loader-inner">
            <div className="loader-logo">
              <img src="/logo-dark.png" alt="logo" className="ll-img" />
            </div>
            <div className="loader-bar-wrap">
              <div className="loader-bar" />
            </div>
            <p className="loader-text">Crafting your experience…</p>
          </div>
        </div>
      )}

      <div className={`site-wrap ${loading ? 'site-hidden' : 'site-visible'}`}>
      <div className="ambient amb-1" />
      <div className="ambient amb-2" />

      {/* ── NAVBAR ── */}
      <header className="header-dock">
        <nav className="dock-nav">
          <a href="#home" className="dock-logo">
            <img src="/logo-dark.png" alt="Logo" style={{ height: '20px', display: 'block' }} />
          </a>
          <ul className="dock-links">
            {NAV_LINKS.map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className={activeSection === l.toLowerCase() ? 'active' : ''}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="dock-actions">
            <a href="#contact" className="dock-cta">Hire Me</a>
            <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}><X size={28} /></button>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)}>{l}</a>
        ))}
      </div>

      <main>
        {/* ══════════════════════════════════════ HERO */}
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-left">
              <div className="hero-eyebrow">
                <span className="dot" /> Available for Projects
              </div>
              <h1 className="hero-name">
                Building<br /><span className="hl">Digital Magic</span>
              </h1>
              <p className="hero-roles">
                Software Engineer &nbsp;|&nbsp; <span>Full-Stack Developer</span> &nbsp;|&nbsp; UI/UX Designer
              </p>
              <div className="hero-typed-wrapper">
                <span className="typed">{typedText}</span>
                <span className="cursor" />
              </div>
              <p className="hero-desc">
                Building scalable software and meaningful digital experiences through code, creativity, and innovation. Software Engineering undergraduate at SLTC.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">View My Work <ArrowUpRight size={18} /></a>
                <a href="#" className="btn btn-outline" onClick={e => e.preventDefault()}>Download CV</a>
                <a href="#contact" className="btn btn-ghost">Contact Me</a>
              </div>
              <div className="hero-stats">
                <div><div className="hero-stat-num">6+</div><div className="hero-stat-label">Projects Completed</div></div>
                <div><div className="hero-stat-num">3+</div><div className="hero-stat-label">Years Leadership</div></div>
                <div><div className="hero-stat-num">4</div><div className="hero-stat-label">Certifications</div></div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-code-card">
                <div className="code-dots">
                  <div className="code-dot r" /><div className="code-dot y" /><div className="code-dot g" />
                </div>
                <div className="code-line"><span className="cm">// Manura Anuhas — 2026</span></div>
                <div className="code-line"><span className="ck">const</span> <span className="cv">me</span> <span className="cw">= {'{'}</span></div>
                <div className="code-line">&nbsp;&nbsp;<span className="cv">name</span><span className="cw">: </span><span className="cs">'Manura Anuhas'</span><span className="cw">,</span></div>
                <div className="code-line">&nbsp;&nbsp;<span className="cv">role</span><span className="cw">: </span><span className="cs">'Software Engineer'</span><span className="cw">,</span></div>
                <div className="code-line">&nbsp;&nbsp;<span className="cv">location</span><span className="cw">: </span><span className="cs">'Sri Lanka'</span><span className="cw">,</span></div>
                <div className="code-line">&nbsp;&nbsp;<span className="cv">skills</span><span className="cw">: [</span><span className="cs">'Code'</span><span className="cw">, </span><span className="cs">'Design'</span><span className="cw">, </span><span className="cs">'Cloud'</span><span className="cw">],</span></div>
                <div className="code-line">&nbsp;&nbsp;<span className="cv">available</span><span className="cw">: </span><span className="cp">true</span></div>
                <div className="code-line"><span className="cw">{'}'}</span></div>
                <br />
                <div className="code-line"><span className="cm">// "Code. Design. Innovate."</span></div>
              </div>
              <div className="hero-float-badge hfb-1">
                <div className="badge-icon"><Zap size={18} /></div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--clr-text-muted)' }}>Achievement</div>
                  <div>Griffin of the Year 🏆</div>
                </div>
              </div>
              <div className="hero-float-badge hfb-2">
                <div className="badge-icon"><Code2 size={18} /></div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--clr-text-muted)' }}>Currently At</div>
                  <div>SLTC Undergrad</div>
                </div>
              </div>
            </div>
          </div>
          <a href="#about" className="scroll-hint">
            <ChevronDown size={28} />
          </a>
        </section>

        {/* ══════════════════════════════════════ ABOUT */}
        <section id="about" className="section">
          <div className="container">
            <div className="section-center-head">
              <div className="section-label"><User className="label-icon" /> About Me</div>
              <h2 className="section-title">Bridging Design &<br /><span className="text-gradient">Technology</span></h2>
            </div>

            <div className="about-redesign">
              <div className="about-hero-photo">
                <div className="ahp-frame">
                  <img src="/manura-new.jpg" alt="Manura Anuhas" className="ahp-img" />
                  <div className="ahp-glow"></div>
                  <div className="ahp-badge">
                    <div className="ahp-dot"></div> Open to Work
                  </div>
                </div>
                <div className="ahp-socials">
                  <a href="https://github.com/amanuhas" className="ahp-soc" target="_blank" rel="noreferrer"><GHIcon /></a>
                  <a href="https://linkedin.com/in/manura-anuhas" className="ahp-soc" target="_blank" rel="noreferrer"><LIIcon /></a>
                  <a href="mailto:manuraanuhas@gmail.com" className="ahp-soc"><Mail /></a>
                </div>
              </div>

              <div className="about-hero-content">
                <h3 className="ahc-greeting">Hello, I'm Manura! 👋</h3>
                <p className="ahc-desc">
                  I am a passionate software engineer based in Sri Lanka, dedicated to crafting beautiful, high-performance web applications and bridging the gap between elegant design and complex engineering.
                </p>
                
                <div className="ahc-stats">
                  <div className="ahc-stat-box">
                    <span className="ahc-stat-num">3+</span>
                    <span className="ahc-stat-text">Years<br/>Experience</span>
                  </div>
                  <div className="ahc-stat-box">
                    <span className="ahc-stat-num">20+</span>
                    <span className="ahc-stat-text">Projects<br/>Completed</span>
                  </div>
                  <div className="ahc-stat-box">
                    <span className="ahc-stat-num">100%</span>
                    <span className="ahc-stat-text">Client<br/>Satisfaction</span>
                  </div>
                </div>

                <div className="ahc-cards">
                  <div className="ahc-card">
                    <div className="ahc-card-icon"><Code2 /></div>
                    <div>
                      <div className="ahc-card-title">Frontend Developer</div>
                      <div className="ahc-card-desc">React, Vue, modern UI/UX</div>
                    </div>
                  </div>
                  <div className="ahc-card">
                    <div className="ahc-card-icon"><Database /></div>
                    <div>
                      <div className="ahc-card-title">Backend Architect</div>
                      <div className="ahc-card-desc">Node.js, Python, APIs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ SKILLS */}
        <section id="skills" className="section">
          <div className="container">
            <div className="section-center-head">
              <div className="section-label"><Zap size={13} /> Tech Stack</div>
              <h2 className="section-title">Skills &amp; <span>Expertise</span></h2>
            </div>

            <div className="skills-master-grid">
              {/* Left — category cards */}
              <div className="skills-cat-panel">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="skill-cat-card card">
                    <div className="scc-header">
                      <div className="scc-icon" style={{ background: cat.gradient }}>{cat.icon}</div>
                      <span className="scc-title">{cat.title}</span>
                    </div>
                    <div className="scc-tags">
                      {cat.items.map(item => (
                        <span key={item} className="scc-tag" style={{ '--tag-clr': cat.color }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right — proficiency bars */}
              <div className="skills-bar-panel card">
                <div className="sbp-header">
                  <div className="sbp-icon"><Zap size={20} /></div>
                  <div>
                    <div className="sbp-title">Core Proficiencies</div>
                    <div className="sbp-sub">Skill confidence levels</div>
                  </div>
                </div>
                <div className="sbp-bars">
                  {CORE_SKILLS.map(s => (
                    <div key={s.name} className="sbp-row">
                      <div className="sbp-meta">
                        <div className="sbp-name">
                          <span className="sbp-name-icon">{s.icon}</span>
                          {s.name}
                        </div>
                        <span className="sbp-pct">{s.pct}%</span>
                      </div>
                      <div className="sbp-track">
                        <div className="sbp-fill" style={{ width: `${s.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ EXPERIENCE */}
        <section id="experience" className="section section-alt">
          <div className="container">
            <div className="section-center-head">
              <div className="section-label"><Briefcase size={13} /> Journey</div>
              <h2 className="section-title">Professional <span>Journey</span></h2>
            </div>

            <div className="journey-master">
              {/* Experience — vertical timeline layout */}
              <div className="journey-block">
                <div className="journey-block-title">
                  <span className="jbt-dot" />
                  Leadership & Experience
                </div>
                <div className="timeline-container">
                  {EXPERIENCES.map((e, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-node"></div>
                      <div className="timeline-content">
                        <div className="tc-year">{e.year}</div>
                        <h4 className="tc-role">{e.role}</h4>
                        <div className="tc-org">{e.org}</div>
                        <p className="tc-desc">{e.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education + Certs side by side */}
              <div className="journey-bottom">
                <div className="journey-block" style={{ flex: 1 }}>
                  <h3 className="journey-block-title">
                    <span className="jbt-dot" style={{ background: '#0ea5e9' }} />
                    Education
                  </h3>
                  <div className="edu-cards">
                    {EDUCATION.map((e, i) => (
                      <div key={i} className="edu-card card">
                        <div className="edu-year">{e.year}</div>
                        <div className="edu-title">{e.title}</div>
                        <div className="edu-org">{e.org}</div>
                        <div className="edu-desc">{e.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="journey-block" style={{ flex: 1 }}>
                  <h3 className="journey-block-title">
                    <span className="jbt-dot" style={{ background: '#ec4899' }} />
                    Certifications
                  </h3>
                  <div className="cert-stack">
                    {CERTS.map((c, i) => (
                      <div key={i} className="cert-row card">
                        <div className="cert-ico">{c.icon}</div>
                        <div>
                          <div className="cert-name">{c.name}</div>
                          <div className="cert-prov">{c.provider}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ PROJECTS — AUTO SCROLL CAROUSEL */}
        <section id="projects" className="section">
          <div className="container">
            <div className="section-center-head">
              <div className="section-label"><Layers size={13} /> Portfolio</div>
              <h2 className="section-title">Featured <span>Projects</span></h2>
              <p style={{ color: 'var(--clr-text-2)', marginTop: '0.5rem' }}>
                Hover over the carousel to pause · Click links to explore
              </p>
            </div>
          </div>

          {/* Full-width carousel — no container constraint */}
          <div className="carousel-viewport">
            <div className="carousel-fade-left" />
            <div className="carousel-fade-right" />
            <div className="carousel-track">
              {carouselItems.map((p, idx) => (
                <div key={`${p.id}-${idx}`} className="carousel-card card">
                  <div className={`cc-thumb ${p.bg}`}>
                    <div className="cc-thumb-icon">{p.icon}</div>
                    <div className="cc-overlay">
                      <a href="#" className="cc-action" aria-label="GitHub"><GHIcon size={18} /></a>
                      <a href="#" className="cc-action" aria-label="Demo"><ExternalLink size={18} /></a>
                    </div>
                  </div>
                  <div className="cc-body">
                    <div className="cc-cat">{p.category === 'dev' ? '⚡ Development' : '🎨 Design'}</div>
                    <h3 className="cc-title">{p.title}</h3>
                    <p className="cc-desc">{p.desc}</p>
                    <div className="cc-tags">
                      {p.tags.map(t => <span key={t} className="cc-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ CONTACT */}
        <section id="contact" className="section section-alt">
          <div className="container">
            <div className="section-center-head">
              <div className="section-label"><Mail size={13} /> Contact</div>
              <h2 className="section-title">Let's <span>Create</span> Together</h2>
              <p style={{ color: 'var(--clr-text-2)', marginTop: '0.5rem' }}>
                I'm always open to new projects, creative ideas, or opportunities.
              </p>
            </div>

            <div className="contact-wrapper">
              <div>
                {[
                  { icon: <Phone size={20} />, label: 'Phone', val: '+94 70 185 4881' },
                  { icon: <Mail size={20} />, label: 'Email', val: 'amanuraanuhas@gmail.com' },
                  { icon: <MapPin size={20} />, label: 'Location', val: 'Panadura, Sri Lanka' },
                  { icon: <GHIcon />, label: 'GitHub', val: 'github.com/amanuhas' },
                  { icon: <LIIcon />, label: 'LinkedIn', val: 'ManarAnuhas' },
                ].map((item, i) => (
                  <div key={i} className="contact-info-item">
                    <div className="ci-icon">{item.icon}</div>
                    <div>
                      <div className="ci-label">{item.label}</div>
                      <div className="ci-val">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card contact-form-card">
                {!submitted ? (
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" className="form-input" type="text" required placeholder="Your Name"
                          value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" className="form-input" type="email" required placeholder="your@email.com"
                          value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input id="subject" className="form-input" type="text" required placeholder="Project Proposal"
                        value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" className="form-input" rows="5" required placeholder="Tell me about your vision..."
                        value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn" disabled={sending}>
                      {sending ? 'Sending…' : 'Send Message'} <Send size={17} />
                    </button>
                  </form>
                ) : (
                  <div className="form-success">
                    <CheckCircle size={64} style={{ color: '#10b981' }} />
                    <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', fontWeight: 800 }}>Message Sent!</h3>
                    <p style={{ color: 'var(--clr-text-2)' }}>Manura will get back to you shortly.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          {/* Top CTA Banner */}
          <div className="footer-cta-banner">
            <div className="fcb-left">
              <span className="fcb-eyebrow">Open to opportunities</span>
              <h2>Let's build something <span>extraordinary</span> together.</h2>
            </div>
            <div className="fcb-right">
              <a href="#contact" className="btn btn-primary fcb-btn">
                Start a Project <ArrowUpRight size={18} />
              </a>
              <a href="mailto:amanuraanuhas@gmail.com" className="btn btn-outline fcb-btn">
                <Mail size={16} /> amanuraanuhas@gmail.com
              </a>
            </div>
          </div>

          {/* Footer Divider */}
          <div className="footer-divider" />

          {/* Footer Bottom Row */}
          <div className="footer-row">
            <div className="footer-brand">
              <img src="/logo-dark.png" alt="Manura Anuhas Logo" className="f-logo-img" />
              <p>Designed &amp; built with passion in Sri Lanka 🇱🇰</p>
            </div>
            <div className="footer-links">
              {NAV_LINKS.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
              ))}
            </div>
            <div className="footer-socials">
              <a href="https://github.com/amanuhas" className="f-soc" target="_blank" rel="noreferrer" aria-label="GitHub"><GHIcon /></a>
              <a href="https://linkedin.com/in/ManarAnuhas" className="f-soc" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LIIcon /></a>
              <a href="https://instagram.com/monkey_graphic" className="f-soc" target="_blank" rel="noreferrer" aria-label="Instagram"><IGIcon /></a>
            </div>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Manura Anuhas · All Rights Reserved</p>
        </div>
      </footer>
      </div>{/* /site-wrap */}
    </>
  );
}
