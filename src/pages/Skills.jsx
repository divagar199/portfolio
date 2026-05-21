import React from 'react';
import { motion } from 'framer-motion';
import InteractiveSphere from '../components/InteractiveSphere';
import TiltCard from '../components/TiltCard';
import { Layout, Cpu, Terminal, Sparkles, Orbit } from 'lucide-react';

const SKILLS_CATEGORIES = [
  {
    title: 'Frontend Systems',
    icon: Layout,
    color: 'var(--color-cyan)',
    items: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript (ES6+)']
  },
  {
    title: 'Backend & Cloud',
    icon: Cpu,
    color: 'var(--color-violet)',
    items: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Supabase', 'Razorpay API']
  },
  {
    title: 'AI & Deployment',
    icon: Terminal,
    color: 'var(--color-pink)',
    items: ['Prompt Engineering', 'ChatGPT', 'Gemini', 'Vercel', 'Render']
  }
];

const Skills = () => {
  return (
    <section className="section-container" style={{ paddingTop: '120px' }}>
      
      {/* Title */}
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
          color: 'var(--color-cyan)',
          textShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
          display: 'block',
          marginBottom: '10px'
        }}>
          My Arsenal
        </span>
        <h1 className="section-title">The Tech Orbit</h1>
        <p className="section-subtitle">
          An interactive catalog of languages, architectures, databases, and AI frameworks that I command to solve engineering problems.
        </p>
      </motion.div>

      {/* Split layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* Left Side: Category Blocks */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {SKILLS_CATEGORIES.map((cat, idx) => {
            const CatIcon = cat.icon;

            return (
              <TiltCard
                key={idx}
                style={{
                  padding: '24px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    className="flex-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${cat.color}33`,
                      boxShadow: `0 0 10px ${cat.color}11`
                    }}
                  >
                    <CatIcon size={20} style={{ color: cat.color }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>
                    {cat.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {cat.items.map((item, iIdx) => (
                    <span
                      key={iIdx}
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        padding: '6px 14px',
                        borderRadius: '30px',
                        background: 'rgba(15, 12, 28, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        color: 'rgba(255, 255, 255, 0.85)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = cat.color;
                        e.currentTarget.style.boxShadow = `0 0 8px ${cat.color}44`;
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            );
          })}
        </motion.div>

        {/* Right Side: Interactive Tag Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            position: 'relative'
          }}
        >
          {/* Subtle spinning orbital guides behind the sphere */}
          <div
            style={{
              position: 'absolute',
              width: '460px',
              height: '460px',
              border: '1px dashed rgba(6, 182, 212, 0.1)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: 'spin 40s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              border: '1px solid rgba(170, 59, 255, 0.05)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: 'spin 20s linear infinite reverse',
            }}
          />
          
          {/* Active 3D Math Sphere */}
          <InteractiveSphere />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: '500' }}>
            <Orbit size={14} className="text-neon-cyan" style={{ animation: 'spin 4s linear infinite' }} />
            <span>Interactive Space. Drag or hover to navigate stars.</span>
          </div>
        </motion.div>

      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1024px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          div[style*="justify-content: center"] {
            margin-top: 20px;
          }
        }
        @media (max-width: 500px) {
          .sphere-tag {
            padding: 8px 14px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
