import React, { useState, useEffect, lazy, Suspense } from 'react';

import { ThemeProvider } from './themeContext';
import ThemeToggle from './components/ThemeToggle';
import HeroBackground from './components/HeroBackground';
import InvoiceGenerator from './components/InvoiceGenerator';

import {
  Menu, X, ArrowUpRight, Send, CheckCircle, ExternalLink,
  Code2, Cpu, Layers, Database, Palette, PenTool, Film,
  Briefcase, Award, Mail, Phone, MapPin,
  ChevronDown, BookOpen, Star, Zap, Globe, User, Terminal,
  ChevronLeft, ChevronRight
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
    color: '#0072ff',
    gradient: 'linear-gradient(135deg, #0072ff, #00d2ff)',
    items: ['C', 'Java', 'Python (Basic)', 'JavaScript (Basic)'],
  },
  {
    id: 'web',
    title: 'Web Technologies',
    icon: <Globe size={22} />,
    color: '#00d2ff',
    gradient: 'linear-gradient(135deg, #00d2ff, #0052d4)',
    items: ['HTML5', 'CSS3', 'Flask', 'WebSockets'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: <Database size={22} />,
    color: '#4364f7',
    gradient: 'linear-gradient(135deg, #4364f7, #6fb1fc)',
    items: ['Azure Serverless', 'AWS S3', 'Git', 'GitHub', 'Trello'],
  },
  {
    id: 'design',
    title: 'Design Suite',
    icon: <Palette size={22} />,
    color: '#00f0ff',
    gradient: 'linear-gradient(135deg, #00f0ff, #0072ff)',
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
    year: '2026–Now',
    role: 'Founder & Creative Director',
    org: 'Muxx Digital',
    desc: 'Founded Muxx Digital to help businesses build strong and professional digital identities. Managing creative direction, client communication, branding, graphic design, social media content, and web design.',
    type: 'leadership',
  },
  {
    year: '2026–Now',
    role: 'Full Stack Developer & Graphic Designer',
    org: 'BitLab',
    desc: 'Handling graphic design, UI/UX design, software development, and social media management to improve brand presence.',
    type: 'technical',
  },
  {
    year: '2026–Now',
    role: 'Webmaster',
    org: 'IEEE Computer Society of SLTC',
    desc: 'Managed all web assets, portals, and digital communications for the society.',
    type: 'technical',
  },
  {
    year: '2025–Now',
    role: 'Co-Founder',
    org: 'ARCLIGHT',
    desc: 'Co-founded the organization focusing on building software and community solutions.',
    type: 'leadership',
  },
  {
    year: '2025–Now',
    role: 'Vice President',
    org: 'Leo Club of Colombo Griffins',
    desc: '★ Griffin of the Year 2026. Managing club operations, editorial direction, and community service projects.',
    type: 'leadership',
  },
  {
    year: '2025–Now',
    role: 'Member Coordinator',
    org: 'AI-Driven Sri Lanka',
    desc: 'Coordinating member engagement and AI event management.',
    type: 'leadership',
  },
];

const EDUCATION = [
  {
    year: '2024–Now',
    title: 'BSc (Hons) Software Engineering',
    org: 'SLTC Research University',
    desc: 'Specializing in full-stack development, cloud computing, and software engineering.',
  },
  {
    year: '2009–2023',
    title: 'School Education',
    org: "St. John's College, Panadura",
    desc: 'Secondary education with distinctions and leadership roles.',
  },
];

const PROJECTS = [
  {
    id: 7,
    title: 'Muxx Digital Invoice SaaS',
    category: 'systems',
    bg: 'pb-7',
    icon: <Cpu size={36} />,
    desc: 'An interactive billing dashboard and PDF receipt builder designed for digital freelancers and agencies.',
    tags: ['React', 'jsPDF', 'html2canvas', 'CSS3'],
    url: 'invoice.muxxdigital.com',
    features: ['Real-time PDF document rendering', 'One-click service templates', 'Client info and receipt manager', 'Downloadable PDF invoices'],
    isInteractive: true,
  },
  {
    id: 1,
    title: 'Real-Time Chat Application',
    category: 'systems',
    bg: 'pb-1',
    icon: <Cpu size={36} />,
    desc: 'Built with Python, Flask, and WebSockets for real-time messaging with user authentication.',
    tags: ['Python', 'Flask', 'WebSockets'],
    url: 'chat-app.manura.me',
    features: ['Instant Message Delivery', 'JWT Secure Authentication', 'Active User Presence Indicator', 'Custom Chat Rooms'],
  },
  {
    id: 10,
    title: 'Divyashaarika A/L Media Campaign',
    category: 'designs',
    image: '/social-media-post-1.png',
    desc: 'High-impact yellow & orange brand visual identity for a G.C.E. Advanced Level Online Media class campaign.',
    tags: ['Photoshop', 'Branding', 'Social Media'],
    url: 'facebook.com/design-campaign-1',
  },
  {
    id: 11,
    title: 'Trigonometry Grade 11 Class Visual',
    category: 'designs',
    image: '/social-media-post-2.png',
    desc: 'Brilliant dark and orange themed marketing visual designed for secondary mathematics classes.',
    tags: ['Graphic Design', 'Poster Design', 'Branding'],
    url: 'facebook.com/design-campaign-2',
  },
  {
    id: 12,
    title: 'Lunivo POS Ultimate Cloud System UI',
    category: 'designs',
    image: '/social-media-post-3.jpg',
    desc: 'Full-bleed product visual design for Lunivo Labs POS software, featuring system benefit highlights and high-tech aesthetics.',
    tags: ['UI/UX', 'Product Showcase', 'Figma'],
    url: 'lunivolabs.com',
  },
  {
    id: 13,
    title: 'Lunivo Labs Digital Upgrade Banner',
    category: 'designs',
    image: '/social-media-post-4.jpg',
    desc: '3D character-themed marketing collateral banner created for business automation and digital transformation services.',
    tags: ['Social Media', '3D Graphics', 'Ad Campaign'],
    url: 'lunivolabs.com',
  },
  {
    id: 14,
    title: 'Lunivo Labs Website Launch Asset',
    category: 'designs',
    image: '/social-media-post-5.jpg',
    desc: 'Premium multi-device desktop and mobile mockup showcase graphics for the Lunivo Labs website launch.',
    tags: ['Mockups', 'UI/UX', 'Figma'],
    url: 'lunivolabs.com',
  },
];

const CERTS = [
  { name: 'AWS S3 Basics', provider: 'Amazon Web Services', icon: <Database size={16} /> },
  { name: 'Azure NodeJS Serverless REST API', provider: 'Microsoft Azure', icon: <Code2 size={16} /> },
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
//  END DATA DEFINITION
// ─────────────────────────────────────────────

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

  // Interactive Device Showcase State
  const [showcaseProjectId, setShowcaseProjectId] = useState(7);
  const [activeProjectId, setActiveProjectId] = useState(7);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showLiveDemo, setShowLiveDemo] = useState(false);
  const [cardSlideIndex, setCardSlideIndex] = useState(0);

  const [apiLatency, setApiLatency] = useState(28);
  const [cpuLoad, setCpuLoad] = useState(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setApiLatency(Math.floor(22 + Math.random() * 12));
      setCpuLoad(Math.floor(8 + Math.random() * 22));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCardSlideIndex((prev) => (prev + 1) % 5);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Scroll Parallax State
  const [scrollY, setScrollY] = useState(0);



  // Terminal Shell State
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: "Welcome to Manura's Developer Shell v1.0.0." },
    { type: 'output', text: 'Type "help" to see all available commands.' },
    { type: 'output', text: ' ' },
  ]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { type: 'input', text: cmd }];
    let output = '';

    switch (cmd) {
      case 'help':
        output = `Available commands:
  about    - Developer bio and credentials
  skills   - Technical skills catalog
  projects - High-profile projects list
  contact  - How to contact Manura
  clear    - Clear console history
  help     - Show list of commands`;
        break;
      case 'about':
        output = `
 ██████╗██╗  ██╗███████╗██╗     ██╗     
██╔════╝██║  ██║██╔════╝██║     ██║     
██║     ███████║█████╗  ██║     ██║     
██║     ██╔══██║██╔══╝  ██║     ██║     
╚██████╗██║  ██║███████╗███████╗███████╗
 ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
 
Name: Manura Anuhas
Role: Software Engineering Undergrad & Frontend Developer
Motto: "Bridging the gap between design and technology."
Education: BSc (Hons) Software Engineering (SLTC Research University)`;
        break;
      case 'skills':
        output = `TECHNICAL SKILLS:
  Frontend   [████████████████░░░] 85% - React, JS/TS, CSS3
  Backend    [██████████████░░░░░] 70% - Node.js, Python, REST APIs
  Design     [██████████████████░] 88% - Figma, UI/UX, Branding
  Cloud      [████████████░░░░░░░] 60% - AWS S3, Azure Functions`;
        break;
      case 'projects':
        output = `FEATURED WORKS:
  - Muxx Digital Invoice SaaS (Interactive dashboard and PDF generator)
  - Real-Time Chat Application (Python, Flask, WebSockets)
  - Graphic Design & UI campaigns (Figma, Photoshop, Branding)`;
        break;
      case 'contact':
        output = `CONTACT INFORMATION:
  Email:    andianuhas@gmail.com
  Phone:    +94 70 185 4881
  GitHub:   github.com/amanuhas
  LinkedIn: linkedin.com/in/amanuhas`;
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output = `Command not found: "${cmd}". Type "help" for a list of available commands.`;
    }

    setTerminalHistory([...newHistory, { type: 'output', text: output }]);
    setTerminalInput('');
  };

  useEffect(() => {
    const handleScrollY = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScrollY, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollY);
  }, []);

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
      const ids = ['home', 'about', 'skills', 'experience', 'projects', 'showcase', 'contact'];
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

  const devProjects = PROJECTS.filter(p => p.category === 'dev');
  const designProjects = PROJECTS.filter(p => p.category === 'design');
  const filtered = projectFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === projectFilter);

  return (<ThemeProvider>
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
      <header className={`header-dock ${activeSection === 'home' ? 'nav-dark' : 'nav-light'}`}>
        <nav className="dock-nav">
          <a href="#home" className="dock-logo">
            <img
              src={activeSection === 'home' ? '/logo-light.png' : '/logo-dark.png'}
              alt="Logo"
              style={{ height: '20px', display: 'block' }}
            />
          </a>
          <ul className="dock-links">
            {NAV_LINKS.map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(' ', '-')}`} className={activeSection === l.toLowerCase().replace(' ', '-') ? 'active' : ''}>
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
          <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileOpen(false)}>{l}</a>
        ))}
      </div>

      <main>
        {/* ══════════════════════════════════════ HERO */}
        <section id="home" className="hero hero-split">
          {/* Animated background */}
          <HeroBackground />
          <div className="hero-orb-1" style={{ transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0005})` }} />
          <div className="hero-orb-2" style={{ transform: `translateY(${scrollY * -0.2}px) translateX(${scrollY * 0.1}px)` }} />
          <div className="hero-orb-3" style={{ transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * -0.15}px)` }} />
          <div className="parallax-layer parallax-ring" style={{
            width: '260px', height: '260px', top: '15%', left: '10%',
            transform: `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.04}deg)`
          }} />
          <div className="parallax-layer parallax-ring" style={{
            width: '140px', height: '140px', bottom: '20%', right: '35%',
            transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * -0.08}deg)`
          }} />
          <div className="hero-beam-x" />
          <div className="hero-beam-x2" />
          <div className="hero-beam-y" />

          {/* LEFT — text content */}
          <div className="hero-split-left">
            <div className="hero-eyebrow">
              <span className="dot" /> SOFTWARE ENGINEERING &bull; FRONTEND &bull; UI/UX DESIGN
            </div>

            <h1 className="hero-name-v2">
              <span className="hin-greeting">Hi, I'm</span>
              <span className="hero-name-gradient">Manura.</span>
              <span className="hero-name-sub">I build digital experiences<br/>where technology meets creativity.</span>
            </h1>

            <div className="hero-role-pills">
              <span className="hrp hrp-primary">Software Engineering Undergrad</span>
              <span className="hrp hrp-secondary">Frontend Developer</span>
              <span className="hrp hrp-tertiary">UI/UX Design</span>
            </div>



            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary btn-hero-main">View My Work <ArrowUpRight size={18} /></a>
              <a href="/documents/manura-anuhas-resume.pdf" className="btn btn-outline" target="_blank" rel="noreferrer">Download CV</a>
              <a href="#contact" className="btn btn-ghost">Contact Me</a>
            </div>

            {/* Social proof + location strip */}
            <div className="hero-strip">
              <div className="hero-strip-item">
                <MapPin size={13} />
                <span>Panadura, Sri Lanka</span>
              </div>
              <div className="hero-strip-divider" />
              <div className="hero-strip-item">
                <a href="https://github.com/ManurAnuhas" target="_blank" rel="noreferrer" className="hero-strip-link"><GHIcon size={14} /> ManurAnuhas</a>
              </div>
              <div className="hero-strip-divider" />
              <div className="hero-strip-item">
                <a href="https://linkedin.com/in/amanuhas" target="_blank" rel="noreferrer" className="hero-strip-link"><LIIcon size={14} /> amanuhas</a>
              </div>
            </div>
          </div>

          {/* RIGHT — full-bleed photo */}
          <div className="hero-split-right">
            <img src="/DSC03196.jpg" alt="Manura Anuhas" className="hero-split-photo" />
          {/* Floating cards */}
            <div className="hps-cards-row">
              <div className="hps-card hps-card-top">
                <div className="hps-card-icon"><Code2 size={16} /></div>
                <div>
                  <div className="hps-card-label">Currently At</div>
                  <div className="hps-card-value">SLTC Undergrad</div>
                </div>
              </div>
              <div className="hps-card hps-card-bottom">
                <div className="hps-card-icon"><Zap size={16} /></div>
                <div>
                  <div className="hps-card-label">Achievement</div>
                  <div className="hps-card-value">Griffin of the Year 🏆</div>
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
                  <a href="https://linkedin.com/in/amanuhas" className="ahp-soc" target="_blank" rel="noreferrer"><LIIcon /></a>
                  <a href="mailto:andianuhas@gmail.com" className="ahp-soc"><Mail /></a>
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

            {/* ── DEVELOPER SYSTEM MONITOR DASHBOARD ── */}
            <div className="dev-system-dashboard card" style={{ marginTop: '2.5rem', padding: '1.5rem', border: '1px solid rgba(0, 210, 255, 0.15)', background: 'rgba(11, 21, 40, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '1rem', marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div className="dev-status-beacon" />
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0 }}>System Monitor Dashboard</h3>
                    <p style={{ color: 'var(--clr-text-2)', fontSize: '0.78rem', margin: 0 }}>Live simulated microservices stats</p>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', background: 'rgba(0, 210, 255, 0.08)', color: 'var(--clr-primary)', padding: '0.25rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(0, 210, 255, 0.2)' }}>
                  Server Node: SLTC-WEST-01
                </div>
              </div>

              <div className="dev-dash-grid">
                <div className="dev-dash-widget">
                  <div className="ddw-label">Live API Latency</div>
                  <div className="ddw-val" style={{ color: apiLatency > 30 ? '#f59e0b' : 'var(--clr-primary)' }}>
                    {apiLatency} <span className="ddw-unit">ms</span>
                  </div>
                  <div className="ddw-sub">Normal: &lt; 40ms</div>
                </div>

                <div className="dev-dash-widget">
                  <div className="ddw-label">Node CPU Load</div>
                  <div className="ddw-val" style={{ color: cpuLoad > 25 ? '#ef4444' : '#10b981' }}>
                    {cpuLoad}%
                  </div>
                  <div className="ddw-progress-track">
                    <div className="ddw-progress-fill" style={{ width: `${cpuLoad}%`, backgroundColor: cpuLoad > 25 ? '#ef4444' : '#10b981' }} />
                  </div>
                </div>

                <div className="dev-dash-widget">
                  <div className="ddw-label">System Uptime</div>
                  <div className="ddw-val" style={{ color: '#10b981' }}>99.98%</div>
                  <div className="ddw-sub">Target SLA: 99.9%</div>
                </div>

                <div className="dev-dash-widget">
                  <div className="ddw-label">Total Code Commits</div>
                  <div className="ddw-val" style={{ color: 'var(--clr-primary-light)' }}>142,503+</div>
                  <div className="ddw-sub">Active coding lifecycle</div>
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

        {/* ══════════════════════════════════════ PROJECTS */}
        <section id="projects" className="section">
          <div className="container" style={{ position: 'relative' }}>
            {/* Scroll-driven floating parallax background shapes */}
            <div className="parallax-layer parallax-ring" style={{
              width: '180px', height: '180px', top: '-40px', right: '-80px',
              transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.05}deg)`
            }} />
            
            <div className="section-center-head">
              <div className="section-label"><Layers size={13} /> Portfolio</div>
              <h2 className="section-title">Interactive <span>Project Hub</span></h2>
              <p style={{ color: 'var(--clr-text-2)', marginTop: '0.5rem' }}>
                Select a project below to launch its interactive presentation shell.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="project-filters">
              {[
                { key: 'all', label: '✦ All Works' },
                { key: 'systems', label: '⚡ Systems & Dev' },
                { key: 'designs', label: '🎨 UI/UX & Graphics' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`pf-btn ${projectFilter === key ? 'active' : ''}`}
                  onClick={() => {
                    setProjectFilter(key);
                    // Reset active project if filter excludes it
                    const available = key === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === key);
                    if (available.length > 0 && !available.some(p => p.id === activeProjectId)) {
                      setActiveProjectId(available[0].id);
                    }
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Redesigned interactive layout */}
            {/* Redesigned Premium Visual Grid */}
            <div className="portfolio-visual-grid">
              {PROJECTS.filter(p => projectFilter === 'all' || p.category === projectFilter).map(p => {
                const isDesign = p.category === 'designs';
                return (
                  <div key={p.id} className={`portfolio-visual-card card ${isDesign ? 'pvc-design-only' : ''}`} onClick={isDesign ? () => {
                    setActiveProjectId(p.id);
                    setShowInvoiceModal(true);
                  } : undefined}>
                    <div className="pvc-media" style={{ height: isDesign ? '340px' : '200px' }}>
                      {p.id === 7 ? (
                        <div className="pvc-image-wrap" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', cursor: 'pointer' }} onClick={() => {
                          setActiveProjectId(p.id);
                          setShowInvoiceModal(true);
                        }}>
                          <div className="pvc-card-slider-track" style={{ display: 'flex', width: '100%', height: '100%', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)', transform: `translateX(-${cardSlideIndex * 100}%)` }}>
                            {['/invoice-ss5.jpg', '/invoice-ss1.png', '/invoice-ss2.png', '/invoice-ss3.png', '/invoice-ss4.png'].map((imgSrc, idx) => (
                              <img key={idx} src={imgSrc} alt="Preview" style={{ minWidth: '100%', height: '100%', objectFit: 'cover' }} />
                            ))}
                          </div>
                        </div>
                      ) : p.isVideo ? (
                        <div className="pvc-video-wrap">
                          <video src={p.videoUrl} muted loop playsInline className="pvc-video" poster="/Manura Anuhas.png" />
                          <div className="pvc-video-overlay">
                            <button onClick={(e) => {
                              e.stopPropagation();
                              setActiveProjectId(p.id);
                              setShowInvoiceModal(true);
                            }} className="pvc-play-btn" aria-label="Play video">
                              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : p.image ? (
                        <div className="pvc-image-wrap" style={{ width: '100%', height: '100%' }}>
                          <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
                          {isDesign && (
                            <div className="pvc-design-overlay">
                              <h3 className="pvc-design-title">{p.title}</h3>
                              <span className="pvc-design-tag">Click to expand</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className={`pvc-image-placeholder ${p.bg}`}>
                          {p.icon}
                        </div>
                      )}
                      <span className="pvc-badge">{p.category === 'systems' ? '⚡ System' : p.category === 'designs' ? '🎨 Design' : '🎬 Video'}</span>
                    </div>

                    {!isDesign && (
                      <div className="pvc-info">
                        <h3 className="pvc-title">{p.title}</h3>
                        <p className="pvc-desc">{p.desc}</p>
                        <div className="pvc-tags">
                          {p.tags.map(t => (
                            <span key={t} className="pvc-tag" style={{ border: '1px solid rgba(0,210,255,0.15)', background: 'rgba(0,210,255,0.05)' }}>{t}</span>
                          ))}
                        </div>
                        <div className="pvc-actions" style={{ display: 'flex', gap: '0.6rem', marginTop: '1.2rem' }}>
                          {p.isInteractive ? (
                            <button onClick={() => {
                              setActiveProjectId(p.id);
                              setShowInvoiceModal(true);
                            }} className="btn btn-primary btn-sm" style={{ flexGrow: 1, padding: '0.45rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer', border: 'none' }}>
                              Launch App Live <ArrowUpRight size={14} />
                            </button>
                          ) : p.isVideo ? (
                            <button onClick={() => {
                              setActiveProjectId(p.id);
                              setShowInvoiceModal(true);
                            }} className="btn btn-primary btn-sm" style={{ flexGrow: 1, padding: '0.45rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer', border: 'none' }}>
                              Play Video <ArrowUpRight size={14} />
                            </button>
                          ) : (
                            <a href={p.url.startsWith('http') ? p.url : `https://${p.url}`} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ flexGrow: 1, padding: '0.45rem 0.8rem', fontSize: '0.8rem', textAlign: 'center' }}>
                              View Work <ArrowUpRight size={14} />
                            </a>
                          )}
                          <a href="https://github.com/ManurAnuhas" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}>
                            <GHIcon size={13} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
                  { icon: <Mail size={20} />, label: 'Email', val: 'andianuhas@gmail.com' },
                  { icon: <MapPin size={20} />, label: 'Location', val: 'Panadura, Sri Lanka' },
                  { icon: <GHIcon />, label: 'GitHub', val: 'github.com/amanuhas' },
                  { icon: <LIIcon />, label: 'LinkedIn', val: 'linkedin.com/in/amanuhas' },
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
              <a href="mailto:andianuhas@gmail.com" className="btn btn-outline fcb-btn">
                <Mail size={16} /> andianuhas@gmail.com
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
              <a href="https://linkedin.com/in/amanuhas" className="f-soc" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LIIcon /></a>
              <a href="https://instagram.com/monkey_graphic" className="f-soc" target="_blank" rel="noreferrer" aria-label="Instagram"><IGIcon /></a>
            </div>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Manura Anuhas · All Rights Reserved</p>
        </div>
      </footer>

      {/* ── MODAL FOR INTERACTIVE PROJECTS ── */}
      {showInvoiceModal && (() => {
        const activeProject = PROJECTS.find(p => p.id === activeProjectId) || PROJECTS[0];
        const invoiceSlides = [
          { src: '/invoice-ss5.jpg', label: 'Billing System Feature Overview' },
          { src: '/invoice-ss1.png', label: 'Admin Login Screen' },
          { src: '/invoice-ss2.png', label: 'Quotation History & Status' },
          { src: '/invoice-ss3.png', label: 'Service Catalog Config' },
          { src: '/invoice-ss4.png', label: 'Saved Quotes Directory' }
        ];

        const handleClose = () => {
          setShowInvoiceModal(false);
          setShowLiveDemo(false);
          setActiveSlideIndex(0);
        };

        return (
          <div className="portfolio-modal-overlay" onClick={handleClose}>
            <div className="portfolio-modal-card card" style={{ maxWidth: '960px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
              <button className="portfolio-modal-close" onClick={handleClose}>
                <X size={24} />
              </button>
              <div className="portfolio-modal-body">
                {activeProject.id === 7 ? (
                  showLiveDemo ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <button onClick={() => setShowLiveDemo(false)} className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                        ← Back to Screenshot Gallery
                      </button>
                      <InvoiceGenerator />
                    </div>
                  ) : (
                    <div className="invoice-carousel-container">
                      <div className="invoice-carousel-viewport">
                        <div className="invoice-carousel-track" style={{ transform: `translateX(-${activeSlideIndex * 100}%)` }}>
                          {invoiceSlides.map((slide, idx) => (
                            <div key={idx} className="invoice-carousel-slide">
                              <img src={slide.src} alt={slide.label} className="invoice-carousel-img" />
                            </div>
                          ))}
                        </div>
                        
                        {/* Navigation Arrows */}
                        <button className="invoice-carousel-arrow prev" onClick={() => setActiveSlideIndex((prev) => (prev === 0 ? invoiceSlides.length - 1 : prev - 1))}>
                          <ChevronLeft size={24} />
                        </button>
                        <button className="invoice-carousel-arrow next" onClick={() => setActiveSlideIndex((prev) => (prev === invoiceSlides.length - 1 ? 0 : prev + 1))}>
                          <ChevronRight size={24} />
                        </button>
                      </div>

                      {/* Dots indicators */}
                      <div className="invoice-carousel-dots">
                        {invoiceSlides.map((_, idx) => (
                          <button key={idx} className={`invoice-carousel-dot ${idx === activeSlideIndex ? 'active' : ''}`} onClick={() => setActiveSlideIndex(idx)} aria-label={`Slide ${idx + 1}`} />
                        ))}
                      </div>

                      {/* Info and CTA */}
                      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>{activeProject.title}</h3>
                        <p style={{ color: 'var(--clr-text-2)', maxWidth: '650px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                          {invoiceSlides[activeSlideIndex].label} — {activeProject.desc}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                          <button onClick={() => setShowLiveDemo(true)} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', cursor: 'pointer' }}>
                            Try Live Interactive Prototype <ArrowUpRight size={16} />
                          </button>
                          <a href="https://github.com/ManurAnuhas" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem' }}>
                            <GHIcon size={16} /> View Code
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                ) : activeProject.isVideo ? (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
                    <video src={activeProject.videoUrl} controls autoPlay style={{ width: '100%', height: '100%' }} />
                  </div>
                ) : activeProject.image ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '100%', maxHeight: '70vh', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--clr-border)', background: 'rgba(0,0,0,0.2)' }}>
                      <img src={activeProject.image} alt={activeProject.title} style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
                    </div>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>{activeProject.title}</h3>
                      <p style={{ color: 'var(--clr-text-2)', maxWidth: '600px', margin: '0 auto 1.2rem auto', fontSize: '0.95rem', lineHeight: 1.6 }}>{activeProject.desc}</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>{activeProject.title}</h3>
                    <p style={{ color: 'var(--clr-text-2)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{activeProject.desc}</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      <a href={activeProject.url.startsWith('http') ? activeProject.url : `https://${activeProject.url}`} target="_blank" rel="noreferrer" className="btn btn-primary">
                        Visit Live Link <ExternalLink size={14} />
                      </a>
                      <a href="https://github.com/ManurAnuhas" target="_blank" rel="noreferrer" className="btn btn-outline">
                        <GHIcon size={16} /> View Code
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── INTERACTIVE DEVELOPER TERMINAL ── */}
      <button className="dev-terminal-toggle" onClick={() => setShowTerminal(!showTerminal)} aria-label="Open Terminal Shell">
        <Terminal size={22} />
      </button>

      {showTerminal && (
        <div className="dev-terminal-drawer">
          <div className="dev-terminal-header">
            <div className="dth-controls">
              <span className="dth-btn close" onClick={() => setShowTerminal(false)} />
              <span className="dth-btn minimize" onClick={() => setShowTerminal(false)} />
              <span className="dth-btn maximize" />
            </div>
            <div className="dth-title">manura@developer-shell:~</div>
          </div>
          <div className="dev-terminal-body">
            <div className="dtb-history">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className={`dtb-line ${item.type}`}>
                  {item.type === 'input' ? (
                    <span className="dtb-prompt">manura-anuhas ~ % {item.text}</span>
                  ) : (
                    <pre className="dtb-output">{item.text}</pre>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleTerminalSubmit} className="dtb-form">
              <span className="dtb-prompt">manura-anuhas ~ % </span>
              <input type="text" className="dtb-input" value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)} autoFocus placeholder='Type "help"…' />
            </form>
          </div>
        </div>
      )}

      </div>{/* /site-wrap */}
    </></ThemeProvider>
  );
}
