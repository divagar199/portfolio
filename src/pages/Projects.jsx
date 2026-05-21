import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import { ExternalLink, BookOpen, Compass, ShieldCheck, Database, Zap, Layers } from 'lucide-react';
import { GithubIcon as Github } from '../components/BrandIcons';

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Kuviyal',
    subtitle: 'Full-Stack Digital Bookstore Platform',
    icon: BookOpen,
    color: 'var(--color-cyan)',
    desc: 'Architected a highly scalable e-commerce platform dedicated to digital literature. Engineered to support smooth transaction pipelines, secure accounts, and instant digital asset delivery.',
    techs: ['React.js', 'MongoDB', 'Firebase Auth', 'Supabase Storage', 'Razorpay API', 'Tailwind CSS'],
    achievements: [
      'Engineered safe payment operations with Razorpay SDK integration.',
      'Constructed distributed storage structures using Supabase buckets for secure PDF deliveries.',
      'Programmed instant administrative control panels to audit collections, orders, and logs in real-time.',
      'Achieved zero unauthorized resource retrieval through Firebase and database validation rules.'
    ],
    github: 'https://github.com/divagar199?tab=repositories',
    demo: '#' // Premium mock link or active repo path
  },
  {
    id: 2,
    title: 'TripAdvisor Clone',
    subtitle: 'Pixel-Perfect Mobile-First Frontend',
    icon: Compass,
    color: 'var(--color-pink)',
    desc: 'Engineered a highly responsive, visual clone of TripAdvisor. Recreated from scratch prioritizing extreme rendering optimizations, clean animations, and structural accuracy on all device ports.',
    techs: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Complex DOM APIs', 'Mobile-First Grid'],
    achievements: [
      'Created a 100% pixel-perfect recreation utilizing strict responsive breakpoints.',
      'Engineered lightning-fast layouts that score high on browser paint cycles.',
      'Programmed custom search indices and sliders with pure JavaScript DOM manipulation.',
      'Implemented fluid touch gestures and dynamic scrolling navigation structures.'
    ],
    github: 'https://github.com/divagar199?tab=repositories',
    demo: '#' // Mock or active deployment
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
        style={{ textAlign: 'left', marginBottom: '60px' }}
      >
        <span style={{
          fontSize: '0.9rem',
          fontWeight: '600',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-pink)',
          textShadow: '0 0 10px rgba(236, 72, 153, 0.3)',
          display: 'block',
          marginBottom: '10px'
        }}>
          Showcase Of Crafts
        </span>
        <h1 className="section-title">Featured Builds</h1>
        <p className="section-subtitle">
          Explore production-grade implementations emphasizing clean code practices, distributed resource systems, and responsive user layouts.
        </p>
      </motion.div>

      {/* Grid of Projects */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
        gap: '40px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {PROJECTS_DATA.map((proj, idx) => {
          const ProjIcon = proj.icon;

          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              style={{ height: '100%' }}
            >
              {/* Tilt card wrapper applies cursor interactive perspective */}
              <TiltCard
                style={{
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  height: '100%',
                  textAlign: 'left',
                }}
              >
                
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
                      {proj.title}
                    </h2>
                    <span style={{ fontSize: '0.95rem', color: proj.color, fontWeight: '600' }}>
                      {proj.subtitle}
                    </span>
                  </div>
                  
                  {/* Glowing Project Icon Container */}
                  <div
                    className="flex-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${proj.color}44`,
                      boxShadow: `0 0 15px ${proj.color}22`
                    }}
                  >
                    <ProjIcon size={26} style={{ color: proj.color }} />
                  </div>
                </div>

                {/* Description Text */}
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: 'var(--color-text-secondary)'
                }}>
                  {proj.desc}
                </p>

                {/* Technical Accomplishments bullet items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={14} style={{ color: proj.color }} />
                    Architectural Milestones
                  </span>
                  
                  <ul style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    paddingLeft: '2px'
                  }}>
                    {proj.achievements.map((ach, aIdx) => (
                      <li key={aIdx} style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', display: 'flex', gap: '10px', alignItems: 'flex-start', lineHeight: '1.5' }}>
                        <span style={{ color: proj.color, marginTop: '2px', fontWeight: 'bold' }}>✓</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies List */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto', paddingTop: '10px' }}>
                  {proj.techs.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        padding: '6px 12px',
                        borderRadius: '30px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', marginTop: '10px' }}>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-center"
                    style={{
                      gap: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.03)',
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
                    <Github size={16} />
                    Source Code
                  </a>
                  
                  <a
                    href={proj.demo}
                    className="flex-center"
                    style={{
                      gap: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.03)',
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
                    <ExternalLink size={16} />
                    Live System
                  </a>
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
        @media (max-width: 640px) {
          .glass-card {
            padding: 24px !important;
          }
          h2 {
            font-size: 1.6rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
