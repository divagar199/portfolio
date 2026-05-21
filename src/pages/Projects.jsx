import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import { ExternalLink, BookOpen, Compass, ShieldCheck, Database, Zap, Layers, Target } from 'lucide-react';
import { GithubIcon as Github } from '../components/BrandIcons';

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Kuviyal',
    subtitle: 'TACTICAL DIGITAL LITERATURE PIPELINE',
    icon: BookOpen,
    color: 'var(--color-cyan)',
    image: '/kuviyal_mockup.png',
    desc: 'Architected a highly scalable MERN bookstore platform dedicated to instant digital literature delivery. Engineered safe payment pipelines, protected accounts, and administrative telemetry portals.',
    techs: ['React.js', 'MongoDB', 'Firebase Auth', 'Supabase Storage', 'Razorpay API', 'Tailwind CSS'],
    achievements: [
      'Engineered protected payment funnels via Razorpay transaction gateways.',
      'Configured remote Supabase buckets to prevent unauthorized asset access.',
      'Programmed real-time administrative command desks to monitor sales operations.',
      'Achieved 100% security against leakage utilizing rigorous database rules.'
    ],
    github: 'https://github.com/divagar199?tab=repositories',
    demo: '#',
    telemetry: '[ TARGET_SECTOR: SEC_RECON_ALPHA ]'
  },
  {
    id: 2,
    title: 'TripAdvisor',
    subtitle: 'PIXEL-PERFECT COMBAT FRONTEND FIELD-TEST',
    icon: Compass,
    color: 'var(--color-pink)',
    image: '/tripadvisor_mockup.png',
    desc: 'Engineered a highly optimized front-end model of TripAdvisor from scratch. Prioritized extreme rendering paint speed, clean DOM animations, and perfect structural accuracy across viewport coordinates.',
    techs: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Complex DOM APIs', 'Mobile-First Grid'],
    achievements: [
      'Created a 100% responsive frame utilizing strict breakpoints down to 320px.',
      'Engineered lightweight rendering cycles with minimal DOM paint latency.',
      'Programmed custom client-side search indexing algorithms with pure JavaScript.',
      'Crafted fluid touch gestures and responsive side-navigation layouts.'
    ],
    github: 'https://github.com/divagar199?tab=repositories',
    demo: '#',
    telemetry: '[ TARGET_SECTOR: SEC_RECON_BRAVO ]'
  }
];

const Projects = () => {
  return (
    <section className="section-container" style={{ paddingTop: '120px' }}>
      
      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'left', marginBottom: '50px' }}
      >
        <span style={{
          fontSize: '0.85rem',
          fontWeight: 'bold',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-pink)',
          textShadow: '0 0 10px rgba(255, 150, 12, 0.3)',
          display: 'block',
          marginBottom: '10px',
          fontFamily: 'var(--font-body)'
        }}>
          [ 🪖 BATTLEFIELD COMPLETED ARSENAL ]
        </span>
        <h1 className="section-title">Combat Projects</h1>
        <p className="section-subtitle">
          Explore tactical systems built with strict architectural discipline, distributed resources, and combat-tested responsive grids.
        </p>
      </motion.div>

      {/* Grid of Projects */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
        gap: '40px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {PROJECTS_DATA.map((proj, idx) => {
          const ProjIcon = proj.icon;

          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              style={{ height: '100%' }}
            >
              {/* Armored military plates */}
              <TiltCard
                style={{
                  padding: '0px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  textAlign: 'left',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.85)'
                }}
              >
                {/* Panel caution header */}
                <div className={idx === 1 ? "hazard-tape" : "hazard-tape-cyan"} style={{ height: '8px' }} />

                {/* Simulated metal screws and bullet holes in card */}
                <div className="bullet-hole" style={{ top: '25px', right: '25px', width: '12px', height: '12px', opacity: 0.3 }} />
                <div className="bullet-hole" style={{ bottom: '70px', left: '15px', width: '16px', height: '16px', opacity: 0.25 }} />
                
                {/* Shattered glass fractures */}
                <div className="shatter-line" style={{ bottom: '78px', left: '23px', width: '45px', height: '1px', transform: 'rotate(-25deg)' }} />
                <div className="shatter-line" style={{ bottom: '78px', left: '23px', width: '30px', height: '1px', transform: 'rotate(50deg)' }} />

                <div style={{ padding: '36px 36px 30px 36px', display: 'flex', flexDirection: 'column', gap: '22px', height: '100%' }}>
                  
                  {/* Project Screenshot Display Banner */}
                  <div style={{
                    width: '100%',
                    height: '210px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    border: '2.5px solid rgba(255, 255, 255, 0.08)',
                    position: 'relative',
                    background: 'rgba(0, 0, 0, 0.3)',
                    flexShrink: 0
                  }}>
                    <img
                      src={proj.image}
                      alt={proj.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(35%) sepia(10%) contrast(1.1)', // Bunker CRT monitor screen filter
                        transition: 'transform 0.5s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.04)';
                        e.currentTarget.style.filter = 'grayscale(0%) sepia(0%) contrast(1.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.filter = 'grayscale(35%) sepia(10%) contrast(1.1)';
                      }}
                    />
                    
                    {/* Blending overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 40%, rgba(14, 16, 20, 0.98) 100%)',
                      pointerEvents: 'none'
                    }} />

                    {/* Sector telemetry tag */}
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      fontSize: '0.62rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'bold',
                      background: 'rgba(0,0,0,0.8)',
                      border: `1.5px solid ${proj.color}`,
                      padding: '3px 8px',
                      color: proj.color,
                      letterSpacing: '0.1em'
                    }}>
                      {proj.telemetry}
                    </span>
                  </div>

                  {/* Header Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', letterSpacing: '0.02em', color: '#ffffff' }}>
                        {proj.title}
                      </h2>
                      <span style={{ fontSize: '0.78rem', color: proj.color, fontWeight: 'bold', fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}>
                        {proj.subtitle}
                      </span>
                    </div>
                    
                    <div
                      className="flex-center"
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '2px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: `1.5px solid ${proj.color}44`,
                      }}
                    >
                      <ProjIcon size={22} style={{ color: proj.color }} />
                    </div>
                  </div>

                  {/* Description Text */}
                  <p style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-secondary)'
                  }}>
                    {proj.desc}
                  </p>

                  {/* Achievements */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.45)', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)' }}>
                      <Target size={13} style={{ color: proj.color }} />
                      RECONNAISSANCE TASKS COMPLETED
                    </span>
                    
                    <ul style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      paddingLeft: '2px'
                    }}>
                      {proj.achievements.map((ach, aIdx) => (
                        <li key={aIdx} style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.8)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: '1.4', fontFamily: 'var(--font-body)' }}>
                          <span style={{ color: proj.color, fontWeight: 'bold' }}>»</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto', paddingTop: '10px' }}>
                    {proj.techs.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 'bold',
                          padding: '4px 10px',
                          borderRadius: '2px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1.5px solid rgba(255, 255, 255, 0.08)',
                          color: 'rgba(255, 255, 255, 0.75)',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div style={{ display: 'flex', gap: '14px', borderTop: '1.5px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', marginTop: '5px' }}>
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-center"
                      style={{
                        gap: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 'bold',
                        padding: '10px 18px',
                        borderRadius: '2px',
                        border: '1.5px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        fontFamily: 'var(--font-heading)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = proj.color;
                        e.currentTarget.style.background = `${proj.color}11`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      }}
                    >
                      <Github size={14} />
                      CODEBASE
                    </a>
                    
                    <a
                      href={proj.demo}
                      className="flex-center"
                      style={{
                        gap: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 'bold',
                        padding: '10px 18px',
                        borderRadius: '2px',
                        border: '1.5px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        fontFamily: 'var(--font-heading)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = proj.color;
                        e.currentTarget.style.background = `${proj.color}11`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      }}
                    >
                      <ExternalLink size={14} />
                      LIVE RADAR
                    </a>
                  </div>

                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 1080px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
