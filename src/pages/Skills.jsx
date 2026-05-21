import React from 'react';
import { motion } from 'framer-motion';
import InteractiveSphere from '../components/InteractiveSphere';
import TiltCard from '../components/TiltCard';
import { Layout, Cpu, Terminal, Orbit, Crosshair, Zap, Shield } from 'lucide-react';

const SKILLS_CATEGORIES = [
  {
    title: 'Frontend Infantry (UI Control)',
    icon: Layout,
    color: 'var(--color-pink)',
    items: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript (ES6+)']
  },
  {
    title: 'Backend Batteries (Heavy Logistics)',
    icon: Cpu,
    color: 'var(--color-cyan)',
    items: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Supabase', 'Razorpay API']
  },
  {
    title: 'AI Radar Support (Tactical Intelligence)',
    icon: Terminal,
    color: 'var(--color-violet)',
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
          [ 🪖 ARTILLERY SQUAD RESERVES ]
        </span>
        <h1 className="section-title">Weapons & Tech</h1>
        <p className="section-subtitle">
          Commanding isotopic stacks, backend heavy artillery grids, and AI computational radar tracking elements.
        </p>
      </motion.div>

      {/* Split layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.05fr',
        gap: '50px',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* Left Side: Heavy Armored Category Panels */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
        >
          {SKILLS_CATEGORIES.map((cat, idx) => {
            const CatIcon = cat.icon;

            return (
              <TiltCard
                key={idx}
                style={{
                  padding: '0px',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.6)'
                }}
              >
                {/* Panel hazard caution header line */}
                <div className={idx === 1 ? "hazard-tape-cyan" : "hazard-tape"} style={{ height: '6px' }} />
                
                {/* Panel corners screwnuts */}
                <div className="bullet-hole" style={{ top: '12px', right: '12px', width: '8px', height: '8px', opacity: 0.2 }} />

                <div style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      className="flex-center"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '2px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: `1.5px solid ${cat.color}44`,
                      }}
                    >
                      <CatIcon size={18} style={{ color: cat.color }} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
                      {cat.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cat.items.map((item, iIdx) => (
                      <span
                        key={iIdx}
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          padding: '6px 12px',
                          borderRadius: '2px',
                          background: 'rgba(15, 23, 42, 0.65)',
                          border: '1.5px solid rgba(255, 255, 255, 0.06)',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontFamily: 'var(--font-body)',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = cat.color;
                          e.currentTarget.style.boxShadow = `0 0 8px ${cat.color}33`;
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </motion.div>

        {/* Right Side: Artillery Radar Sweep Guide Bounds */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
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
              border: '1.5px dashed rgba(255, 10, 10, 0.1)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: 'spin 40s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '390px',
              height: '390px',
              border: '1.5px solid rgba(255, 150, 12, 0.08)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: 'spin 20s linear infinite reverse',
            }}
          />
          
          {/* 3D Math Sphere */}
          <InteractiveSphere />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: 'var(--color-text-muted)', fontSize: '0.82rem', fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
            <Crosshair size={14} className="text-neon-cyan" style={{ animation: 'spin 6s linear infinite' }} />
            <span>RADAR FIELD CONSOLE. TAP TACTICAL LABELS FOR CALIBRATION.</span>
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
      `}</style>
    </section>
  );
};

export default Skills;
