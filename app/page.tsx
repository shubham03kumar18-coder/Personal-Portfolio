'use client';

import { useState } from 'react';
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
          <div className="hidden md:flex gap-8">
            {['about', 'projects', 'experience', 'skills', 'resume'].map((item) => (
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
              {['about', 'projects', 'experience', 'skills', 'resume'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-medium hover:text-primary transition-colors capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 bg-gradient-to-b from-card to-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <div>
                <p className="text-primary font-semibold text-sm mb-2 tracking-wide">FULL-STACK DEVELOPER</p>
                <h1 className="text-5xl md:text-6xl font-bold text-pretty leading-tight">
                  Building Digital Experiences
                </h1>
                <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                  Pre-final B.Tech student specializing in EdTech and location-based applications. Proficient in modern tech stack with 8+ months of production experience.
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

            {/* Right Column - Profile Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl"></div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2019.32.36-LNvbyqXeJnnD4d35H6p33KHNUKUXCs.jpeg"
                  alt="Subham Kumar - Full-Stack Developer"
                  className="relative w-full h-full object-cover rounded-full border-4 border-primary/20 shadow-2xl"
                />
              </div>
            </div>
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
      <section id="skills" className="px-6 py-16 md:py-24 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Skills</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-bold text-primary mb-3 uppercase text-sm tracking-wide">Frontend</p>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Bootstrap'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-bold text-secondary mb-3 uppercase text-sm tracking-wide">Backend & APIs</p>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'REST APIs', 'Razorpay API', 'Google Maps API', 'WhatsApp Business API'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-bold text-accent mb-3 uppercase text-sm tracking-wide">Databases & Auth</p>
              <div className="flex flex-wrap gap-2">
                {['Supabase', 'PostgreSQL', 'SQL', 'Authentication'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-bold text-primary mb-3 uppercase text-sm tracking-wide">Tools & Deployment</p>
              <div className="flex flex-wrap gap-2">
                {['Vercel', 'Git', 'GitHub', 'Firebase', 'npm', 'VS Code'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
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

          <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              Crafted with care by Subham Kumar. All rights reserved © {new Date().getFullYear()}.
            </p>
            <p>
              Deployed on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Vercel</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
