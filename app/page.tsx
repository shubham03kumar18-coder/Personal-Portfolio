'use client';

import { useState } from 'react';
import { Menu, X, Mail, ExternalLink, Code, Zap, Target } from 'lucide-react';

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
            {['about', 'projects', 'experience', 'skills'].map((item) => (
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
              {['about', 'projects', 'experience', 'skills'].map((item) => (
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
                <p className="text-primary font-semibold text-sm mb-2">FULL-STACK DEVELOPER</p>
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
                  onClick={() => scrollToSection('contact')}
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
              <div className="pt-4 flex gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-semibold">South Delhi, India</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-semibold">8+ Months</p>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden border-4 border-primary shadow-2xl">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2019.32.36-LNvbyqXeJnnD4d35H6p33KHNUKUXCs.jpeg"
                  alt="Subham Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m a pre-final year full-stack developer with a passion for building scalable web applications. My expertise lies in creating responsive user interfaces and robust backend systems using modern technologies.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                With 8+ months of production experience, I&apos;ve successfully delivered projects in EdTech and location-based services. I specialize in payment integration, real-time data synchronization, and building user-centric applications.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently pursuing B.Tech in Computer Science & Information Technology. When not coding, I&apos;m exploring new technologies and contributing to open-source projects.
              </p>
            </div>

            <div className="space-y-8">
              <div className="p-6 bg-card border border-border rounded-xl">
                <Code className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Full-Stack Development</h3>
                <p className="text-muted-foreground">Frontend + Backend + Database integration with modern frameworks and best practices.</p>
              </div>

              <div className="p-6 bg-card border border-border rounded-xl">
                <Zap className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Performance Focused</h3>
                <p className="text-muted-foreground">Building fast, accessible, and scalable applications optimized for user experience.</p>
              </div>

              <div className="p-6 bg-card border border-border rounded-xl">
                <Target className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Problem Solving</h3>
                <p className="text-muted-foreground">Translating business requirements into elegant technical solutions with measurable impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-6 py-20 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Skills & Expertise</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Frontend Mastery</h3>
              <p className="text-sm text-muted-foreground mb-4">React.js, Next.js 14, TypeScript, Tailwind CSS</p>
              <p className="text-muted-foreground">Used in Tradeverse City, Smart Parking, and multiple client projects.</p>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Backend & APIs</h3>
              <p className="text-sm text-muted-foreground mb-4">Node.js, REST APIs, Payment Gateway (Razorpay)</p>
              <p className="text-muted-foreground">Built course enrollment systems, booking platforms, and real-time APIs.</p>
            </div>

            {/* Databases */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Databases & Auth</h3>
              <p className="text-sm text-muted-foreground mb-4">Supabase, PostgreSQL, User Authentication</p>
              <p className="text-muted-foreground">Implemented session management, real-time sync, and secure data handling.</p>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Tools & Deployment</h3>
              <p className="text-sm text-muted-foreground mb-4">Vercel (CI/CD), Git, Firebase, npm/pnpm</p>
              <p className="text-muted-foreground">Experienced with modern DevOps workflows and deployment pipelines.</p>
            </div>
          </div>

          {/* Additional Skills */}
          <div className="mt-12 p-8 bg-background rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-4">Core Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {['Responsive Design', 'Mobile-First', '100% Cross-Browser', 'RESTful APIs', 'Real-Time Sync', 'Payment Integration', 'Authentication', 'Database Design', 'Performance Optimization', 'Git & Version Control'].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1: Tradeverse City */}
            <div className="group border border-border rounded-xl overflow-hidden bg-card hover:border-primary transition-colors">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <Code size={48} className="text-primary mx-auto mb-4" />
                  <p className="font-semibold">EdTech Platform</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tradeverse City</h3>
                <p className="text-muted-foreground mb-4">
                  Full-stack EdTech platform with real-time market data integration and secure payment processing.
                </p>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold text-primary mb-2">Problem Solved</p>
                  <p className="text-sm text-muted-foreground">Stock market education lacked real-time data and smooth payment flows.</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-primary mb-2">Solution</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Real-time NIFTY/SENSEX ticker updates</li>
                    <li>• Razorpay payment integration</li>
                    <li>• WhatsApp Business API integration</li>
                    <li>• Responsive dark-themed UI</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-primary mb-2">Impact</p>
                  <p className="text-sm text-muted-foreground">Deployed live on Vercel, 100% cross-browser compatibility, professional user experience.</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Razorpay API'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
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
                  <a
                    href="#"
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2: Smart Parking */}
            <div className="group border border-border rounded-xl overflow-hidden bg-card hover:border-primary transition-colors">
              <div className="h-48 bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <Target size={48} className="text-secondary mx-auto mb-4" />
                  <p className="font-semibold">Location Services</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Smart Parking</h3>
                <p className="text-muted-foreground mb-4">
                  Location-based parking finder app with real-time availability and booking system.
                </p>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold text-secondary mb-2">Problem Solved</p>
                  <p className="text-sm text-muted-foreground">Users wasted time searching for available parking spots in congested areas.</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-secondary mb-2">Solution</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Real-time parking availability maps</li>
                    <li>• One-tap booking system</li>
                    <li>• Mobile-responsive design</li>
                    <li>• Integrated Maps API</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-secondary mb-2">Impact</p>
                  <p className="text-sm text-muted-foreground">Reduces parking search time by 80%, deployed with analytics tracking.</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'Maps API', 'Supabase', 'Real-time Sync', 'React', 'Tailwind CSS'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
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
                  <a
                    href="#"
                    className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 py-20 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Professional Experience</h2>
          
          <div className="space-y-8">
            {/* Internship */}
            <div className="p-8 border border-border rounded-xl bg-background">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Frontend Developer Intern</h3>
                  <p className="text-primary font-semibold mt-2">Zidio Development</p>
                </div>
                <p className="text-muted-foreground whitespace-nowrap">June 2025 – Aug 2025 | Remote</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <p className="text-muted-foreground leading-relaxed">
                  Designed and developed responsive web components while ensuring 100% cross-browser compatibility. Implemented mobile-first design principles and earned formal team recognition for sprint delivery and code quality.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-primary mb-2">Key Achievements</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ Developed responsive web components with HTML5, CSS3, Bootstrap</li>
                    <li>✓ 100% cross-browser compatibility across 4+ browsers</li>
                    <li>✓ Tested on 15+ device sizes for mobile-first responsiveness</li>
                    <li>✓ Earned team recognition for code quality</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Work */}
            <div className="p-8 border border-border rounded-xl bg-background">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Full-Stack Developer</h3>
                  <p className="text-primary font-semibold mt-2">Independent Projects</p>
                </div>
                <p className="text-muted-foreground whitespace-nowrap">2025 – Present</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <p className="text-muted-foreground leading-relaxed">
                  Developed and deployed production-ready applications with focus on user experience and technical excellence. Handled full project lifecycle from design to deployment.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-primary mb-2">Key Projects</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ Tradeverse City: EdTech platform with live market data</li>
                    <li>✓ Smart Parking: Location-based booking system</li>
                    <li>✓ Integrated payment systems (Razorpay)</li>
                    <li>✓ Real-time data synchronization solutions</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'React', 'TypeScript', 'Supabase', 'APIs'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                I&apos;m always interested in hearing about new projects and opportunities. Whether you have a question or want to collaborate, feel free to reach out.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:Shubham46845@gmail.com"
                  className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors group"
                >
                  <Mail className="text-primary group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">Shubham46845@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+917428037001"
                  className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors group"
                >
                  <div className="text-primary font-bold text-xl group-hover:scale-110 transition-transform">📱</div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold">+91 7428037001</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/subham-kumar-888a98362/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors group"
                >
                  <div className="w-6 h-6 text-primary group-hover:scale-110 transition-transform">
                    <LinkedInIcon />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <p className="font-semibold">View Profile</p>
                  </div>
                </a>

                <a
                  href="https://github.com/shubham03kumar18-coder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors group"
                >
                  <div className="w-6 h-6 text-primary group-hover:scale-110 transition-transform">
                    <GitHubIcon />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GitHub</p>
                    <p className="font-semibold">View Repositories</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="p-8 bg-card border border-border rounded-2xl space-y-6">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">Current Status</p>
                  <p className="text-xl font-bold">Open to Opportunities</p>
                  <p className="text-muted-foreground mt-2">Seeking full-time roles in full-stack development and web engineering.</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">Location</p>
                  <p className="text-xl font-bold">South Delhi, India</p>
                  <p className="text-muted-foreground mt-2">Available for remote work and relocation.</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">Response Time</p>
                  <p className="text-xl font-bold">24-48 Hours</p>
                  <p className="text-muted-foreground mt-2">I typically respond to inquiries within one business day.</p>
                </div>

                <a
                  href="mailto:Shubham46845@gmail.com"
                  className="w-full px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity text-center"
                >
                  Send Email Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground">© 2026 Subham Kumar. All rights reserved.</p>
          
          <div className="flex gap-6">
            <a
              href="https://github.com/shubham03kumar18-coder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors w-5 h-5"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/subham-kumar-888a98362/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors w-5 h-5"
            >
              <LinkedInIcon />
            </a>
            <a
              href="mailto:Shubham46845@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
