import React, { useState, useEffect, useRef } from 'react';
import CoderAvatar from './components/CoderAvatar';
import ProjectCard from './components/ProjectCard';
import AdminPortal from './components/AdminPortal';

const API_BASE = 'http://localhost:5000';

const App = () => {
  // Preloader and loading percentages
  const [isLoading, setIsLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // Global project state synced with server
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  
  // Interactive navigation toggles
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Contact phone reveals
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const phoneTimerRef = useRef(null);

  // Math simulation counting preloader
  useEffect(() => {
    let currentPercent = 0;
    const countUp = () => {
      const jump = Math.floor(Math.random() * 5) + 1;
      currentPercent = Math.min(currentPercent + jump, 100);
      setLoadPercentage(currentPercent);

      if (currentPercent < 100) {
        const interval = Math.floor(Math.random() * 60) + 20;
        setTimeout(countUp, interval);
      } else {
        // Safe slide wipe delay
        setTimeout(() => {
          setIsLoading(false);
        }, 700);
      }
    };
    countUp();
  }, []);

  // Sync scroll lock body class when preloader changes state
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('is-loading');
    } else {
      document.body.classList.remove('is-loading');
    }
  }, [isLoading]);

  // Syncing database projects
  const fetchAllProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/projects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        loadMockFallback();
      }
    } catch (err) {
      console.warn("Backend API offline, loading localStorage cache:", err.message);
      loadMockFallback();
    }
  };

  const loadMockFallback = () => {
    const cached = localStorage.getItem('divagar_projects');
    if (cached) {
      setProjects(JSON.parse(cached));
    } else {
      // Seed initial defaults if offline completely
      const defaults = [
        {
          id: "f83a48e2-c0cb-464a-9ef8-b197825b42fa",
          title: "Kuviyal",
          subtitle: "Digital Bookstore Platform",
          desc: "Built with MERN, Tailwind, Firebase, Supabase, Razorpay API. A digital bookstore that enables users to browse, search, purchase and download books online with seamless secure checkouts and cloud persistence.",
          tags: ["React.js", "Node.js", "Express", "MongoDB", "Firebase", "Supabase", "Razorpay", "Tailwind"],
          link: "https://github.com/divagar199",
          image: "" // Handled via fallback graphic inside card component
        },
        {
          id: "e5cf6289-7221-48bf-ae4a-4e2b17a1c720",
          title: "TripAdvisor Clone",
          subtitle: "Online Travel Site UI",
          desc: "A pixel-perfect, highly responsive frontend clone of the TripAdvisor site, demonstrating advanced CSS grid/flexbox controls, precise layouts, custom micro-interactions, and high-fidelity responsive design standards.",
          tags: ["HTML5", "CSS3", "JavaScript (ES6+)", "DOM Manipulation", "Pixel-Perfect"],
          link: "https://github.com/divagar199",
          image: ""
        }
      ];
      setProjects(defaults);
      localStorage.setItem('divagar_projects', JSON.stringify(defaults));
    }
  };

  useEffect(() => {
    fetchAllProjects();
    const token = sessionStorage.getItem('admin_token');
    if (token === 'active_session') {
      setIsAdmin(true);
    }
  }, []);

  // Update administrative notification callbacks
  const handleAdminStatusChange = (status) => {
    setIsAdmin(status);
  };

  // Trailing Cursor & Background Spotlight calculations (Lerp Loops inside requestAnimationFrame)
  useEffect(() => {
    if (isLoading) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Trail physics coordinate arrays
    let curOuterX = mouseX;
    let curOuterY = mouseY;
    let curDotX = mouseX;
    let curDotY = mouseY;
    
    let spotX = mouseX;
    let spotY = mouseY;
    
    const captureMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      curDotX = e.clientX;
      curDotY = e.clientY;
    };
    
    const handleMouseOver = (e) => {
      const cursorOuter = document.getElementById('custom-cursor');
      if (!cursorOuter) return;
      
      const target = e.target.closest('a, button, .magnet, .footer-admin-btn, .social-pill, .cta-button, .project-link-btn, .go-top-btn');
      if (target) {
        if (target.classList.contains('project-card-3d') || target.closest('.project-card-3d')) {
          cursorOuter.classList.add('hovered');
        } else {
          cursorOuter.classList.add('link-hovered');
        }
      } else {
        cursorOuter.classList.remove('hovered');
        cursorOuter.classList.remove('link-hovered');
      }
    };
    
    window.addEventListener('mousemove', captureMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    let animationId;
    const physicsFrame = () => {
      // 1. Spotlight LERP (Snappy factor 0.08)
      spotX += (mouseX - spotX) * 0.08;
      spotY += (mouseY - spotY) * 0.08;
      
      const spotlightBg = document.getElementById('spotlight-bg');
      if (spotlightBg) {
        spotlightBg.style.setProperty('--mouse-x', `${spotX}px`);
        spotlightBg.style.setProperty('--mouse-y', `${spotY}px`);
      }
      
      // 2. Cursor LERP (Lag trailing factor 0.15)
      curOuterX += (curDotX - curOuterX) * 0.15;
      curOuterY += (curDotY - curOuterY) * 0.15;
      
      const cursorOuter = document.getElementById('custom-cursor');
      const cursorDot = document.getElementById('custom-cursor-dot');
      
      if (cursorOuter) {
        cursorOuter.style.left = `${curOuterX}px`;
        cursorOuter.style.top = `${curOuterY}px`;
      }
      if (cursorDot) {
        cursorDot.style.left = `${curDotX}px`;
        cursorDot.style.top = `${curDotY}px`;
      }
      
      animationId = requestAnimationFrame(physicsFrame);
    };
    
    physicsFrame();
    
    return () => {
      window.removeEventListener('mousemove', captureMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, [isLoading]);

  // Skill Card glow updates
  const updateCardGlow = (e, index) => {
    const card = document.getElementById(`skills-card-${index}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--card-mouse-x', `${x}px`);
    card.style.setProperty('--card-mouse-y', `${y}px`);
  };

  // Interactive copy triggers
  const executePhoneCopy = (e) => {
    e.preventDefault();
    const rawNumber = '+919080323419';
    
    navigator.clipboard.writeText(rawNumber).then(() => {
      if (phoneTimerRef.current) clearTimeout(phoneTimerRef.current);
      setShowPhoneTooltip(true);
      phoneTimerRef.current = setTimeout(() => {
        setShowPhoneTooltip(false);
      }, 2000);
    }).catch(() => {
      alert('Phone Number: ' + rawNumber);
    });
  };

  // Close menus
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Mobile menu actions
  const toggleMobileNav = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // CRUD actions from homepage overlays
  const handleEditProject = (project) => {
    setIsAdminPortalOpen(true);
    // Modal automatically detects auth and opens form via hooks
  };

  const handleDeleteProject = async (project) => {
    if (confirm(`Are you absolutely sure you want to delete "${project.title}" from your portfolio?`)) {
      try {
        const response = await fetch(`${API_BASE}/api/projects/${project.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          fetchAllProjects();
        } else {
          // Fallback delete if server offline
          const projectsCopy = projects.filter(p => p.id !== project.id);
          setProjects(projectsCopy);
          localStorage.setItem('divagar_projects', JSON.stringify(projectsCopy));
        }
      } catch (err) {
        console.warn("Delete server sync failed, deleting from local cache:", err.message);
        const projectsCopy = projects.filter(p => p.id !== project.id);
        setProjects(projectsCopy);
        localStorage.setItem('divagar_projects', JSON.stringify(projectsCopy));
      }
    }
  };

  // Sticky Header scroll classes & Go Top visibility
  const [isScrolled, setIsScrolled] = useState(false);
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Guard against running checks before preloader resolves
      if (document.body.classList.contains('is-loading')) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (scrollTop > 400) {
        setShowGoTop(true);
      } else {
        setShowGoTop(false);
      }
    };

    // Run synchronization check immediately on mount/load
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* 1. CUSTOM ORGANIC PRELOADER OVERLAY */}
      <div id="preloader" className={`preloader ${!isLoading ? 'loaded' : ''}`}>
        <div className="preloader-container">
          <div className="preloader-logo-wrapper">
            <CoderAvatar size="large" />
          </div>
          <div className="preloader-meta">
            <span className="preloader-subtitle">INITIALIZING PORTFOLIO</span>
            <div className="preloader-percent-wrapper">
              <span className="preloader-percent">
                {loadPercentage < 10 ? '0' + loadPercentage : loadPercentage}
              </span>
              <span className="preloader-percent-symbol">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC AMBIENT BACKLIGHTS */}
      <div id="spotlight-bg" className="spotlight-bg"></div>
      <div className="spotlight-ambient"></div>

      {/* CURSOR HIGHLIGHT TRAILS */}
      {!isLoading && (
        <>
          <div id="custom-cursor" className="custom-cursor"></div>
          <div id="custom-cursor-dot" className="custom-cursor-dot"></div>
        </>
      )}

      {/* HEADER NAVIGATION */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <a href="#" className="logo-link magnet" aria-label="Home">
            <CoderAvatar size="small" forceTriggerHello={!isLoading} />
            <span className="logo-text">DIVAGAR M</span>
          </a>

          <nav className={`nav ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              <li><a href="#about" className="nav-link magnet" onClick={handleNavLinkClick}>About</a></li>
              <li><a href="#skills" className="nav-link magnet" onClick={handleNavLinkClick}>Arsenal</a></li>
              <li><a href="#projects" className="nav-link magnet" onClick={handleNavLinkClick}>Projects</a></li>
              <li><a href="#experience" className="nav-link magnet" onClick={handleNavLinkClick}>Experience</a></li>
              <li><a href="#education" className="nav-link magnet" onClick={handleNavLinkClick}>Education</a></li>
            </ul>
          </nav>

          <div className="header-cta">
            <a href="mailto:divagar.m.msc.cs@gmail.com" className="cta-button magnet">Let's Connect</a>
          </div>

          <button 
            className={`nav-toggle magnet ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileNav}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="main-content">
        
        {/* HERO SECTION */}
        <section id="about" className="section hero-section">
          <div className="container hero-container">
            <div className="hero-tag-wrapper scroll-reveal reveal-visible">
              <span className="mono-tag">// HELLO WORLD, I AM</span>
            </div>
            
            <div className="hero-title-wrapper scroll-reveal reveal-visible">
              <h1 className="hero-title">
                <span className="hero-name-span">DIVAGAR M</span>
              </h1>
              <h2 className="hero-subtitle">MERN Stack Developer</h2>
            </div>

            <div className="hero-desc-wrapper scroll-reveal reveal-visible">
              <p className="hero-desc">
                Detail-oriented MERN Stack Developer with expertise in building responsive, scalable web applications. Strong problem-solving abilities, enhanced by leveraging AI tools through advanced prompt engineering to deliver clean, semantic code.
              </p>
            </div>

            <div className="hero-socials scroll-reveal reveal-visible">
              <a href="https://github.com/divagar199" target="_blank" rel="noopener noreferrer" className="social-pill magnet" id="github-link">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>GitHub</span>
              </a>

              <a href="https://linkedin.com/in/divagar-m-3598b3391/" target="_blank" rel="noopener noreferrer" className="social-pill magnet" id="linkedin-link">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span>LinkedIn</span>
              </a>

              <a href="mailto:divagar.m.msc.cs@gmail.com" className="social-pill magnet" id="email-link">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Email</span>
              </a>

              <button className="social-pill magnet" onClick={executePhoneCopy} aria-label="Show Phone Contact">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Phone</span>
                <span className={`phone-tooltip ${showPhoneTooltip ? 'show' : ''}`}>Copied: +91 90803 23419!</span>
              </button>
            </div>

            <div className="scroll-down-wrapper scroll-reveal reveal-visible">
              <a href="#skills" className="scroll-down magnet" aria-label="Scroll Down">
                <span className="scroll-line"></span>
                <span className="scroll-text mono-tag">SCROLL TO DISCOVER</span>
              </a>
            </div>
          </div>
        </section>

        {/* TECHNICAL ARSENAL SECTION */}
        <section id="skills" className="section skills-section">
          <div className="container">
            <div className="section-header scroll-reveal reveal-visible">
              <span className="mono-tag">// WHAT I DO</span>
              <h2 className="section-title">Technical Arsenal</h2>
            </div>

            <div className="skills-grid">
              {/* Category 1: Frontend */}
              <div 
                className="skills-card scroll-reveal reveal-visible"
                id="skills-card-0"
                onMouseMove={(e) => updateCardGlow(e, 0)}
              >
                <div className="skills-card-glow"></div>
                <div className="skills-card-content">
                  <div className="skills-category-header">
                    <div className="skills-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                    </div>
                    <h3 className="skills-category-title">Frontend</h3>
                  </div>
                  <ul className="skills-badge-list">
                    <li className="skill-badge"><span className="bullet"></span> React.js</li>
                    <li className="skill-badge"><span className="bullet"></span> HTML5</li>
                    <li className="skill-badge"><span className="bullet"></span> CSS3</li>
                    <li className="skill-badge"><span className="bullet"></span> JavaScript <span className="mono-sub">ES6+</span></li>
                    <li className="skill-badge"><span className="bullet"></span> Tailwind CSS</li>
                  </ul>
                </div>
              </div>

              {/* Category 2: Backend */}
              <div 
                className="skills-card scroll-reveal reveal-visible"
                id="skills-card-1"
                onMouseMove={(e) => updateCardGlow(e, 1)}
              >
                <div className="skills-card-glow"></div>
                <div className="skills-card-content">
                  <div className="skills-category-header">
                    <div className="skills-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6.01" y2="6"></line>
                        <line x1="6" y1="18" x2="6.01" y2="18"></line>
                      </svg>
                    </div>
                    <h3 className="skills-category-title">Backend & APIs</h3>
                  </div>
                  <ul className="skills-badge-list">
                    <li className="skill-badge"><span className="bullet"></span> Node.js</li>
                    <li className="skill-badge"><span className="bullet"></span> Express.js</li>
                    <li className="skill-badge"><span className="bullet"></span> REST APIs</li>
                  </ul>
                </div>
              </div>

              {/* Category 3: Database */}
              <div 
                className="skills-card scroll-reveal reveal-visible"
                id="skills-card-2"
                onMouseMove={(e) => updateCardGlow(e, 2)}
              >
                <div className="skills-card-glow"></div>
                <div className="skills-card-content">
                  <div className="skills-category-header">
                    <div className="skills-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                      </svg>
                    </div>
                    <h3 className="skills-category-title">Database</h3>
                  </div>
                  <ul className="skills-badge-list">
                    <li className="skill-badge"><span className="bullet"></span> MongoDB</li>
                  </ul>
                </div>
              </div>

              {/* Category 4: Cloud & Integrations */}
              <div 
                className="skills-card scroll-reveal reveal-visible"
                id="skills-card-3"
                onMouseMove={(e) => updateCardGlow(e, 3)}
              >
                <div className="skills-card-glow"></div>
                <div className="skills-card-content">
                  <div className="skills-category-header">
                    <div className="skills-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M18 10h-1.25V7.25a4.75 4.75 0 1 0-9.5 0V10H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-18 10zm-9.25-2.75a2.75 2.75 0 1 1 5.5 0V10h-5.5z"></path>
                      </svg>
                    </div>
                    <h3 className="skills-category-title">Cloud & Integration</h3>
                  </div>
                  <ul className="skills-badge-list">
                    <li className="skill-badge"><span className="bullet"></span> Firebase</li>
                    <li className="skill-badge"><span className="bullet"></span> Supabase</li>
                    <li className="skill-badge"><span className="bullet"></span> Razorpay API</li>
                  </ul>
                </div>
              </div>

              {/* Category 5: AI & Productivity */}
              <div 
                className="skills-card scroll-reveal reveal-visible"
                id="skills-card-4"
                onMouseMove={(e) => updateCardGlow(e, 4)}
              >
                <div className="skills-card-glow"></div>
                <div className="skills-card-content">
                  <div className="skills-category-header">
                    <div className="skills-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l-7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <h3 className="skills-category-title">AI & Productivity</h3>
                  </div>
                  <ul className="skills-badge-list">
                    <li className="skill-badge highlight-badge"><span className="bullet"></span> ChatGPT</li>
                    <li className="skill-badge highlight-badge"><span className="bullet"></span> Google Gemini</li>
                    <li className="skill-badge highlight-badge"><span className="bullet"></span> Prompt Engineering</li>
                    <li className="skill-badge"><span className="bullet"></span> Git</li>
                    <li className="skill-badge"><span className="bullet"></span> Vercel</li>
                    <li className="skill-badge"><span className="bullet"></span> Render</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED SHOWCASE PROJECTS SECTION */}
        <section id="projects" className="section projects-section">
          <div className="container">
            <div className="section-header scroll-reveal reveal-visible">
              <span className="mono-tag">// SELECTED WORK</span>
              <h2 className="section-title">Featured Projects</h2>
            </div>

            <div className="projects-container">
              {projects.length === 0 ? (
                <div className="project-loading-placeholder mono-tag">// LOADING SECURE SHOWCASE ASSETS...</div>
              ) : (
                projects.map((project, index) => (
                  <ProjectCard 
                    key={project.id || index}
                    project={project}
                    index={index}
                    isAdmin={isAdmin}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* PROFESSIONAL EXPERIENCE SECTION */}
        <section id="experience" className="section experience-section">
          <div className="container">
            <div className="section-header scroll-reveal reveal-visible">
              <span className="mono-tag">// TIMELINE OF GROWTH</span>
              <h2 className="section-title">Professional Experience</h2>
            </div>

            <div className="timeline-container">
              <div className="timeline-line"></div>

              {/* Experience Node 1 */}
              <div className="timeline-item scroll-reveal reveal-visible">
                <div className="timeline-dot-wrapper">
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-card">
                  <div className="timeline-header-meta">
                    <span className="timeline-date mono-tag">APR 2025 - SEP 2025</span>
                    <span className="timeline-location mono-tag">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="loc-icon">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg> 
                      Coimbatore
                    </span>
                  </div>
                  <h3 className="timeline-role">Floor Manager</h3>
                  <h4 className="timeline-company">V-Mart Retail Ltd</h4>
                  <p className="timeline-desc">
                    Spearheaded store floor activities and inventory workflows, cultivating seamless operations and high performance. Handled visual layouts, stock management, and team synchronization, refining outstanding organizational and agile troubleshooting abilities in high-intensity settings.
                  </p>
                </div>
              </div>

              {/* Experience Node 2 */}
              <div className="timeline-item scroll-reveal reveal-visible">
                <div className="timeline-dot-wrapper">
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-card">
                  <div className="timeline-header-meta">
                    <span className="timeline-date mono-tag">JUL 2023 - APR 2025</span>
                    <span className="timeline-location mono-tag">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="loc-icon">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg> 
                      Tiruppur
                    </span>
                  </div>
                  <h3 className="timeline-role">Sales Executive</h3>
                  <h4 className="timeline-company">Zink London (Pantaloons)</h4>
                  <p className="timeline-desc">
                    Drove commercial performance, client interaction, and customer satisfaction. Strengthened key skills in proactive engagement, customer relation frameworks, and data tracking, enhancing interpersonal communications and goal-focused strategic planning.
                  </p>
                </div>
              </div>

              {/* Experience Node 3 */}
              <div className="timeline-item scroll-reveal reveal-visible">
                <div className="timeline-dot-wrapper">
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-card">
                  <div className="timeline-header-meta">
                    <span className="timeline-date mono-tag">JUN 2020 - OCT 2021</span>
                    <span className="timeline-location mono-tag">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="loc-icon">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg> 
                      Tiruppur
                    </span>
                  </div>
                  <h3 className="timeline-role">Sales Assistant</h3>
                  <h4 className="timeline-company">Max Fashion India</h4>
                  <p className="timeline-desc">
                    Assisted customers, managed shelf displays, and handled front-end transactions. Fostered collaborative capabilities, active problem resolution techniques, and customer experience methodologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACADEMICS & CREDENTIALS SECTION */}
        <section id="education" className="section education-section">
          <div className="container">
            <div className="education-grid">
              
              {/* Academic Foundations */}
              <div className="education-col scroll-reveal reveal-visible">
                <div className="section-header">
                  <span className="mono-tag">// ACADEMIC FOUNDATION</span>
                  <h2 className="section-title">Education</h2>
                </div>

                <div className="edu-timeline">
                  <div className="edu-card">
                    <div className="edu-meta">
                      <span className="edu-duration mono-tag">2023 - 2025</span>
                    </div>
                    <h3 className="edu-degree">M.Sc. in Computer Science</h3>
                    <span className="edu-college">Park's College</span>
                    <p className="edu-details">
                      Acquired advanced knowledge in database administration, software modeling, computer networks, and full-stack systems architecture. Specialized in leveraging MERN stack integrations and cloud architectures.
                    </p>
                  </div>

                  <div className="edu-card">
                    <div className="edu-meta">
                      <span className="edu-duration mono-tag">2020 - 2023</span>
                    </div>
                    <h3 className="edu-degree">BCA (Bachelor of Computer Applications)</h3>
                    <span className="edu-college">Park's College</span>
                    <p className="edu-details">
                      Established robust fundamental concepts in object-oriented programming, data structures, UI design, web layouts, and SQL query scripting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Capabilities (Certifications) */}
              <div className="certs-col scroll-reveal reveal-visible">
                <div className="section-header">
                  <span className="mono-tag">// VERIFIED CAPABILITIES</span>
                  <h2 className="section-title">Certifications</h2>
                </div>

                <div className="certs-container">
                  <div className="cert-card">
                    <div className="cert-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="cert-info">
                      <h3 className="cert-title">MERN Full Stack Developer</h3>
                      <span className="cert-issuer mono-tag">Professional Certification</span>
                      <p className="cert-desc">Detailed mastery in structuring React frontends, Express APIs, Node execution contexts, and MongoDB clusters.</p>
                    </div>
                  </div>

                  <div className="cert-card">
                    <div className="cert-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <div className="cert-info">
                      <h3 className="cert-title">Prompt Engineering Course</h3>
                      <span className="cert-issuer mono-tag">Advanced AI Systems</span>
                      <p className="cert-desc">Formulating advanced templates, multi-shot styling, and role constraints to streamline high-quality coding deliverables.</p>
                    </div>
                  </div>

                  <div className="cert-card">
                    <div className="cert-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <div className="cert-info">
                      <h3 className="cert-title">Power BI Master Certification</h3>
                      <span className="cert-issuer mono-tag">Data Analysis & Visuals</span>
                      <p className="cert-desc">Data cleaning pipelines, interactive dashboard modeling, DAX query logic, and robust business visual analytics.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-left">
            <CoderAvatar size="small" />
            <div className="footer-credits">
              <span className="footer-signature">DIVAGAR M</span>
              <span className="footer-title-sub">MERN Stack Developer & Prompt Engineer</span>
            </div>
          </div>

          <div className="footer-center">
            <p className="footer-tagline">Synthesizing clean code and elegant UI design using full-stack precision.</p>
            
            {/* Lock Admin Portal gateway trigger */}
            <div className="footer-admin-trigger-container">
              <button 
                className="footer-admin-btn magnet"
                onClick={() => setIsAdminPortalOpen(true)}
                aria-label="Open Admin Control Panel"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lock-icon-svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span className="footer-admin-label mono-tag">ADMIN GATEWAY</span>
              </button>
            </div>
          </div>

          <div className="footer-right">
            <span className="footer-copy mono-tag">&copy; {new Date().getFullYear()} DIVAGAR M. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>

      {/* SECURE CRUD ADMINISTRATIVE DASHBOARD MODAL */}
      <AdminPortal 
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        projects={projects}
        onRefresh={fetchAllProjects}
        onNotify={handleAdminStatusChange}
      />

      {/* GO TO TOP BUTTON */}
      {!isLoading && (
        <button 
          className={`go-top-btn magnet ${showGoTop ? 'visible' : ''}`} 
          onClick={scrollToTop}
          aria-label="Scroll to Top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="go-top-icon">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </>
  );
};

export default App;
