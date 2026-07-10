'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Menu, X, Mail, ExternalLink, Code, Zap, Target, Download, FileText } from 'lucide-react';

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.945v5.442h-3.554s.05-8.828 0-9.537h3.554v1.349c-.009.015-.021.029-.033.042h.033v-.042c.537-.827 1.496-2.007 3.644-2.007 2.661 0 4.649 1.737 4.649 5.475v4.72zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.704 0-.955.77-1.704 1.956-1.704 1.187 0 1.915.749 1.948 1.704 0 .946-.761 1.704-1.989 1.704zm-1.66 11.597h3.321V9.915H3.677v9.537zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/>
  </svg>
);

function TiltImage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number | null>(null);
  const floatRaf  = useRef<number | null>(null);
  const isMobile  = useRef(false);
  const isHovering = useRef(false);
  const floatT     = useRef(0);

  const cur = useRef({ rx: 0, ry: 0, scale: 1, gx: 50, gy: 50 });
  const tgt = useRef({ rx: 0, ry: 0, scale: 1, gx: 50, gy: 50 });

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const commit = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const { rx, ry, scale, gx, gy } = cur.current;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
    const ox = -ry * 1.2;
    const oy =  rx * 1.2;
    el.style.boxShadow = [
      `${ox}px ${oy}px 40px rgba(37,99,235,0.40)`,
      `${ox * 0.5}px ${oy * 0.5}px 80px rgba(37,99,235,0.18)`,
      `0 24px 64px rgba(0,0,0,0.22)`,
    ].join(', ');
    el.style.backgroundImage = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.07) 0%, transparent 65%)`;
  }, []);

  const tick = useCallback(() => {
    const speed = isHovering.current ? 0.13 : 0.075;
    const c = cur.current;
    const t = tgt.current;
    c.rx    = lerp(c.rx,    t.rx,    speed);
    c.ry    = lerp(c.ry,    t.ry,    speed);
    c.scale = lerp(c.scale, t.scale, speed);
    c.gx    = lerp(c.gx,    t.gx,    speed);
    c.gy    = lerp(c.gy,    t.gy,    speed);
    commit();
    const moving =
      Math.abs(c.rx - t.rx) > 0.004 ||
      Math.abs(c.ry - t.ry) > 0.004 ||
      Math.abs(c.scale - t.scale) > 0.0004;
    if (moving) { rafRef.current = requestAnimationFrame(tick); }
    else         { rafRef.current = null; }
  }, [commit]);

  const kick = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  /* idle float */
  const float = useCallback(() => {
    if (isHovering.current) { floatRaf.current = requestAnimationFrame(float); return; }
    floatT.current += 0.012;
    tgt.current.rx = Math.sin(floatT.current) * 3.5;
    tgt.current.ry = Math.cos(floatT.current * 0.8) * 2.5;
    kick();
    floatRaf.current = requestAnimationFrame(float);
  }, [kick]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile.current) return;
    const el = wrapperRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    tgt.current = { rx: -dy * 13, ry: dx * 13, scale: 1.03, gx: 50 + dx * 28, gy: 50 + dy * 28 };
    kick();
  }, [kick]);

  const onMouseEnter = useCallback(() => {
    if (isMobile.current) return;
    isHovering.current = true;
    tgt.current.scale = 1.03;
    kick();
  }, [kick]);

  const onMouseLeave = useCallback(() => {
    if (isMobile.current) return;
    isHovering.current = false;
    tgt.current = { rx: 0, ry: 0, scale: 1, gx: 50, gy: 50 };
    kick();
  }, [kick]);

  useEffect(() => {
    isMobile.current = window.matchMedia('(pointer: coarse)').matches;
    if (!isMobile.current) floatRaf.current = requestAnimationFrame(float);
    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current);
      if (floatRaf.current) cancelAnimationFrame(floatRaf.current);
    };
  }, [float]);

  return (
    <div className="flex justify-center md:justify-end">
      {/* ambient glow behind card — untouched by tilt */}
      <div className="relative" style={{ width: 320, maxWidth: '100%' }}>
        <div
          className="absolute -inset-6 rounded-3xl blur-3xl opacity-40"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.45), transparent 70%)' }}
          aria-hidden="true"
        />

        {/* tilt card */}
        <div
          ref={wrapperRef}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            position: 'relative',
            borderRadius: 22,
            overflow: 'hidden',
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            border: '1.5px solid rgba(37,99,235,0.30)',
            cursor: 'default',
            lineHeight: 0,
          }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2019.32.36-LNvbyqXeJnnD4d35H6p33KHNUKUXCs.jpeg"
            alt="Subham Kumar - Full-Stack Developer"
            draggable={false}
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
          {/* sheen overlay — moves with tilt via backgroundImage set in commit() */}
          <div
            style={{
              position: 'absolute', inset: 0,
              borderRadius: 22,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SKILLS DATA  (no percentages)
───────────────────────────────────────────── */
const SKILL_GROUPS = [
  {
    category: 'Frontend',
    accent: '#2563eb',
    accentRgb: '37,99,235',
    categoryIcon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    skills: [
      { name: 'React.js',        icon: '⚛' },
      { name: 'Next.js 14',      icon: '▲' },
      { name: 'TypeScript',      icon: 'TS' },
      { name: 'Tailwind CSS',    icon: '🌊' },
      { name: 'JavaScript ES6+', icon: 'JS' },
      { name: 'HTML5 / CSS3',    icon: '#' },
      { name: 'Bootstrap',       icon: 'B' },
    ],
  },
  {
    category: 'Backend & APIs',
    accent: '#7c3aed',
    accentRgb: '124,58,237',
    categoryIcon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    skills: [
      { name: 'Node.js',               icon: '⬡' },
      { name: 'REST APIs',             icon: '⇄' },
      { name: 'Razorpay API',          icon: '₹' },
      { name: 'Google Maps API',       icon: '📍' },
      { name: 'WhatsApp Business API', icon: '💬' },
    ],
  },
  {
    category: 'Databases & Auth',
    accent: '#0891b2',
    accentRgb: '8,145,178',
    categoryIcon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    skills: [
      { name: 'Supabase',       icon: '⚡' },
      { name: 'PostgreSQL',     icon: '🐘' },
      { name: 'SQL',            icon: '∑' },
      { name: 'Firebase',       icon: '🔥' },
      { name: 'Authentication', icon: '🔐' },
    ],
  },
  {
    category: 'Tools & Deploy',
    accent: '#059669',
    accentRgb: '5,150,105',
    categoryIcon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    skills: [
      { name: 'Git',      icon: '⎇' },
      { name: 'GitHub',   icon: '🐙' },
      { name: 'Vercel',   icon: '▲' },
      { name: 'VS Code',  icon: '⌥' },
      { name: 'npm',      icon: '⬡' },
      { name: 'Figma',    icon: '✦' },
    ],
  },
] as const;

/* Individual skill card with 3D tilt + icon chips */
function SkillCard({ group, index, visible }: {
  group: typeof SKILL_GROUPS[number]; index: number; visible: boolean;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number | null>(null);
  const cur      = useRef({ rx: 0, ry: 0 });
  const tgt      = useRef({ rx: 0, ry: 0 });
  const hovering = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const commit = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    const { rx, ry } = cur.current;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${hovering.current ? -7 : 0}px)`;
    el.style.boxShadow = hovering.current
      ? `${-ry * 0.9}px ${rx * 0.9}px 32px rgba(${group.accentRgb},0.30), 0 14px 44px rgba(0,0,0,0.14)`
      : `0 2px 14px rgba(0,0,0,0.07)`;
  }, [group.accentRgb]);

  const tick = useCallback(() => {
    const speed = hovering.current ? 0.14 : 0.08;
    cur.current.rx = lerp(cur.current.rx, tgt.current.rx, speed);
    cur.current.ry = lerp(cur.current.ry, tgt.current.ry, speed);
    commit();
    const moving = Math.abs(cur.current.rx - tgt.current.rx) > 0.003 ||
                   Math.abs(cur.current.ry - tgt.current.ry) > 0.003;
    if (moving) { rafRef.current = requestAnimationFrame(tick); }
    else         { rafRef.current = null; }
  }, [commit]);

  const kick = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer:coarse)').matches) return;
    const el = cardRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    tgt.current = { rx: -dy * 8, ry: dx * 8 };
    kick();
  }, [kick]);

  const onEnter = useCallback(() => {
    if (window.matchMedia('(pointer:coarse)').matches) return;
    hovering.current = true;
    kick();
  }, [kick]);

  const onLeave = useCallback(() => {
    hovering.current = false;
    tgt.current = { rx: 0, ry: 0 };
    kick();
  }, [kick]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <div style={{
      opacity:   visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
    }}>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          background: 'var(--card)',
          borderRadius: 18,
          padding: '22px 20px 20px',
          border: `1.5px solid rgba(${group.accentRgb},0.20)`,
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        {/* inner gradient shimmer */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 18, pointerEvents: 'none',
          background: `linear-gradient(135deg, rgba(${group.accentRgb},0.10) 0%, transparent 55%, rgba(${group.accentRgb},0.05) 100%)`,
        }} aria-hidden="true" />

        {/* category header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, position: 'relative' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9, flexShrink: 0,
            background: `rgba(${group.accentRgb},0.14)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: group.accent,
            boxShadow: `0 0 12px rgba(${group.accentRgb},0.22)`,
          }}>
            {group.categoryIcon}
          </div>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.09em',
            textTransform: 'uppercase', color: group.accent, lineHeight: 1.2,
          }}>
            {group.category}
          </span>
        </div>

        {/* skill chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, position: 'relative' }}>
          {group.skills.map((s) => (
            <SkillChip key={s.name} name={s.name} icon={s.icon} accent={group.accent} accentRgb={group.accentRgb} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Interactive skill chip */
function SkillChip({ name, icon, accent, accentRgb }: {
  name: string; icon: string; accent: string; accentRgb: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '5px 10px', borderRadius: 8,
        background: hovered ? `rgba(${accentRgb},0.14)` : `rgba(${accentRgb},0.07)`,
        border: `1px solid ${hovered ? `rgba(${accentRgb},0.45)` : `rgba(${accentRgb},0.18)`}`,
        cursor: 'default',
        transition: 'background 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? `0 4px 14px rgba(${accentRgb},0.22)` : 'none',
      }}
    >
      <span style={{
        fontSize: 11, lineHeight: 1, color: accent,
        fontWeight: 700, minWidth: 14, textAlign: 'center',
        transition: 'transform 0.18s',
        transform: hovered ? 'scale(1.15)' : 'scale(1)',
        display: 'inline-block',
      }}>
        {icon}
      </span>
      <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--foreground)', whiteSpace: 'nowrap' }}>
        {name}
      </span>
    </div>
  );
}

/* Skills section — observes viewport entry */
function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="px-6 py-16 md:py-24 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {SKILL_GROUPS.map((g, i) => (
            <SkillCard key={g.category} group={g} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-xl text-primary">Subham Kumar</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {['home', 'about', 'projects', 'experience', 'skills', 'education', 'resume', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm font-medium hover:text-primary transition-colors capitalize"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-6 py-4 flex flex-col gap-4">
              {['home', 'about', 'projects', 'experience', 'skills', 'education', 'resume', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-medium hover:text-primary transition-colors capitalize text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative px-6 py-20 md:py-32 bg-gradient-to-b from-card to-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <div>
                <p className="text-primary font-semibold text-sm mb-3 tracking-widest uppercase">Open to Internship Opportunities</p>
                <h1 className="text-4xl md:text-5xl font-bold text-pretty leading-tight">
                  {"Hi, I'm Subham Kumar"}
                </h1>
                <p className="text-lg font-semibold text-primary mt-3">
                  Frontend Developer • Full-Stack Developer • Problem Solver
                </p>
                <p className="text-base text-muted-foreground mt-4 leading-relaxed">
                  Building modern, scalable, and responsive web applications while continuously expanding my skills through real-world development.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Get in Touch
                  <Mail size={18} />
                </a>
                <a
                  href="https://github.com/shubham03kumar18-coder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2"
                >
                  View GitHub
                  <div className="w-[18px] h-[18px]">
                    <GitHubIcon />
                  </div>
                </a>
              </div>

              {/* Quick Info */}
              <div className="flex flex-col gap-3 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  South Delhi, India
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Available for Full-Stack & Frontend Roles
                </div>
              </div>
            </div>

            {/* Right Column - Profile Image with 3D Tilt */}
            <TiltImage />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">About Me</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-primary" size={24} />
                <h3 className="font-semibold text-lg">Full-Stack Development</h3>
              </div>
              <p className="text-muted-foreground">
                Building production-grade applications with modern tech stack: Next.js 14, React, TypeScript, and Supabase.
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-primary" size={24} />
                <h3 className="font-semibold text-lg">Performance Focused</h3>
              </div>
              <p className="text-muted-foreground">
                Optimizing for speed, accessibility, and user experience. Deployed projects on Vercel with SEO optimization.
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-primary" size={24} />
                <h3 className="font-semibold text-lg">Problem Solving</h3>
              </div>
              <p className="text-muted-foreground">
                Creative solutions for real-world problems. Experience integrating payment gateways, APIs, and real-time data sync.
              </p>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m a pre-final year B.Tech student specializing in full-stack and frontend web development. With <strong>8+ months of production experience</strong>, I&apos;ve built scalable applications serving real users. My expertise spans modern frontend frameworks (React, Next.js), backend development (Node.js, REST APIs), and cloud deployment (Vercel, Supabase). I&apos;m passionate about writing clean code, collaborating in agile environments, and delivering exceptional user experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 py-16 md:py-24 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 - Tradeverse City */}
            <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors group">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                <div className="relative z-10 text-center">
                  <Code size={48} className="text-primary/50 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-muted-foreground">Tradeverse City</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tradeverse City</h3>
                <p className="text-sm text-muted-foreground mb-4">Full-Stack EdTech Web Platform</p>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-2">Problem</p>
                    <p className="text-sm text-muted-foreground">Stock market education platforms lack real-time data and smooth payment flows.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary mb-2">Solution</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ Real-time NIFTY/SENSEX ticker display</li>
                      <li>✓ Razorpay payment integration for course enrollment</li>
                      <li>✓ WhatsApp Business API for lead capture</li>
                      <li>✓ Supabase for authentication & data sync</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Razorpay'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://tradeverse-website-enhancement5.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/shubham03kumar18-coder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 border border-primary text-primary text-sm font-semibold rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <div className="w-[16px] h-[16px]">
                      <GitHubIcon />
                    </div>
                    Code
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 - Smart Parking */}
            <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors group">
              <div className="h-48 bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors"></div>
                <div className="relative z-10 text-center">
                  <Code size={48} className="text-secondary/50 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-muted-foreground">Smart Parking</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Smart Parking Finder</h3>
                <p className="text-sm text-muted-foreground mb-4">Location-Based Parking Booking System</p>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-secondary mb-2">Problem</p>
                    <p className="text-sm text-muted-foreground">Urban commuters struggle to find available parking with real-time availability.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-secondary mb-2">Solution</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ Interactive map with real-time slot availability</li>
                      <li>✓ Proximity filtering for nearest parking</li>
                      <li>✓ Seamless online booking system</li>
                      <li>✓ Digital payments via Razorpay</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Leaflet.js', 'Google Maps API'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://smart-parking-flame.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/shubham03kumar18-coder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 border border-secondary text-secondary text-sm font-semibold rounded-lg hover:bg-secondary/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <div className="w-[16px] h-[16px]">
                      <GitHubIcon />
                    </div>
                    Code
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Explore more projects on my GitHub profile</p>
            <a
              href="https://github.com/shubham03kumar18-coder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
            >
              <GitHubIcon />
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Experience</h2>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            {/* Experience 1 */}
            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary">Frontend Developer Intern</h3>
                  <p className="font-semibold text-foreground">Zidio Development</p>
                  <p className="text-sm text-muted-foreground">Remote</p>
                </div>
                <p className="text-sm font-semibold text-primary whitespace-nowrap mt-2 md:mt-0">Jun 2025 – Aug 2025</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span>Designed and developed responsive user interfaces with 100% cross-browser compatibility across Chrome, Firefox, Safari, and Edge</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span>Built interactive web components and reusable UI elements with focus on performance optimization and accessibility</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span>Collaborated with cross-functional teams in Agile environment, delivering features within sprint timelines</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span>Earned formal team recognition for dedication to code quality and professional excellence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Education Section */}
      <section id="education" className="px-6 py-16 md:py-24 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Education</h2>
          <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-primary">B.Tech in Computer Science & Information Technology</h3>
                <p className="font-semibold text-foreground mt-1">MERI College of Engineering and Technology</p>
                <p className="text-sm text-muted-foreground mt-1">New Delhi, India</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm font-semibold text-primary whitespace-nowrap">2022 – 2026</p>
                <p className="text-sm text-muted-foreground mt-1">Pre-Final Year</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Data Structures & Algorithms', 'Web Development', 'Database Management', 'Operating Systems', 'Computer Networks', 'Software Engineering'].map((subject) => (
                <span key={subject} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="px-6 py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Resume</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Preview Card */}
            <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
              <div className="h-96 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="text-primary/50 mx-auto mb-3" size={64} />
                  <p className="font-semibold text-muted-foreground">Subham Kumar Resume</p>
                  <p className="text-xs text-muted-foreground mt-1">Full-Stack Developer</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold mb-2">Full-Stack Web Developer Resume</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive resume highlighting 8+ months of production experience, technical skills, projects, internship, and certifications.
                </p>
                <a
                  href="https://blobs.vusercontent.net/blob/Subham_Kumar_Web_Developer_Resume-qjuNXS6R2K4eQmZIuGbiqShEUs3tRE.pdf"
                  download
                  className="w-full px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
                >
                  <Download size={16} />
                  Download Resume (PDF)
                </a>
              </div>
            </div>

            {/* Resume Details */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3 text-primary flex items-center gap-2">
                  <Code size={20} />
                  Technical Skills
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Comprehensive expertise across modern web development stack including:
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    Frontend: React, Next.js 14, TypeScript, Tailwind CSS
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    Backend: Node.js, REST APIs, Payment Integration
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    Databases: Supabase, PostgreSQL, Authentication
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    DevOps: Vercel CI/CD, Git, GitHub, Firebase
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3 text-secondary flex items-center gap-2">
                  <Target size={20} />
                  Key Highlights
                </h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    8+ months of production experience
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    2 live projects deployed and live
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    Razorpay payment integration expertise
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    Real-time API integration experience
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    5+ industry certifications
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-16 md:py-24 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Let&apos;s Connect</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <a
              href="https://www.linkedin.com/in/subham-kumar-888a98362/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors group"
            >
              <div className="w-8 h-8 text-primary group-hover:scale-110 transition-transform">
                <LinkedInIcon />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">LinkedIn</p>
                <p className="font-semibold">Connect with me</p>
              </div>
            </a>

            <a
              href="https://github.com/shubham03kumar18-coder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors group"
            >
              <div className="w-8 h-8 text-primary group-hover:scale-110 transition-transform">
                <GitHubIcon />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">GitHub</p>
                <p className="font-semibold">View Repositories</p>
              </div>
            </a>
          </div>

          <div className="bg-card border border-primary/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m always interested in hearing about new projects and opportunities. Feel free to reach out!
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Mail className="text-primary" size={20} />
                <a href="mailto:Shubham46845@gmail.com" className="text-primary font-semibold hover:underline">
                  Shubham46845@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-muted-foreground">Phone:</span>
                <a href="tel:+917428037001" className="text-primary font-semibold hover:underline">
                  +91 7428037001
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-lg text-primary mb-1">Subham Kumar</p>
              <p className="text-sm text-muted-foreground">Full-Stack Developer & B.Tech Student</p>
            </div>
            
            <div className="flex gap-6">
              <a
                href="https://github.com/shubham03kumar18-coder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors w-6 h-6"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/subham-kumar-888a98362/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors w-6 h-6"
              >
                <LinkedInIcon />
              </a>
              <a
                href="mailto:Shubham46845@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>Crafted with care by Subham Kumar. All rights reserved © {new Date().getFullYear()}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
