import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Terminal, Server, Code } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../components/BrandIcons';

const TYPING_STRINGS = ["MERN Stack Developer", "Creative Engineer", "Full Stack Builder"];

const Hero = () => {
  const navigate = useNavigate();
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // 1. Cursor coordinate tracker for 3D parallax elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5; // -0.5 to 0.5
      const y = (e.clientY / window.innerHeight) - 0.5; // -0.5 to 0.5
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. Typing Effect Engine
  useEffect(() => {
    let timer;
    const currentFullText = TYPING_STRINGS[typingIndex];
    
    const tick = () => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before delete
        } else {
          timer = setTimeout(tick, 100);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % TYPING_STRINGS.length);
        } else {
          timer = setTimeout(tick, 50);
        }
      }
    };

    timer = setTimeout(tick, 80);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingIndex]);

  // Style helper for 3D layers
  const get3DStyle = (depth, rotMultiplier = 15) => ({
    transform: `translate3d(${mouseOffset.x * depth}px, ${mouseOffset.y * depth}px, ${depth}px) 
                rotateY(${mouseOffset.x * rotMultiplier}deg) 
                rotateX(${-mouseOffset.y * rotMultiplier}deg)`,
    transformStyle: 'preserve-3d',
    transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
  });

  return (
    <section className="section-container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* Hero Content Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left', zIndex: 10 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{
            fontSize: '1rem',
            fontWeight: '600',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-cyan)',
            textShadow: '0 0 10px rgba(6, 182, 212, 0.4)'
          }}>
            Welcome to my matrix
          </span>
          <h1 style={{
            fontSize: '4.8rem',
            lineHeight: '1.05',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #ffffff 40%, var(--color-pink) 70%, var(--color-violet) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(170, 59, 255, 0.15))'
          }}>
            Hi, I'm <span className="text-neon-cyan">DIVAGAR</span>
          </h1>
        </div>

        {/* Dynamic Typing Title */}
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: '600',
          fontFamily: 'var(--font-heading)',
          color: '#ffffff',
          minHeight: '50px',
        }} className="cursor-typing">
          {displayText}
        </h2>

        {/* Hook statement */}
        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.7',
          color: 'var(--color-text-secondary)',
          maxWidth: '550px',
          fontFamily: 'var(--font-body)',
        }}>
          Bridging business acumen with scalable MERN stack engineering. Transitioning operational precision into high-performance web systems.
        </p>

        {/* Action Button & Social Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '30px', marginTop: '16px' }}>
          <button 
            className="btn-neon" 
            onClick={() => navigate('/projects')}
            style={{ display: 'inline-flex', gap: '12px' }}
          >
            Enter My Universe
            <ArrowRight size={20} />
          </button>

          {/* Social connections */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <a
              href="https://github.com/divagar199?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex-center"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-cyan)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.4)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/divagar-m-3598b3391/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex-center"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-pink)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(236, 72, 153, 0.4)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:divagar.m.cs@gmail.com"
              className="glass-card flex-center"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-violet)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(170, 59, 255, 0.4)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Hero Visual Right - Dynamic 3D Holographic Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          zIndex: 5,
        }}
      >
        {/* Layer 1: Backdrop Grid (Slow motion) */}
        <div
          style={{
            ...get3DStyle(10, 5),
            position: 'absolute',
            width: '320px',
            height: '320px',
            border: '2px dashed rgba(170, 59, 255, 0.25)',
            borderRadius: '50%',
            animation: 'spin 25s linear infinite',
            zIndex: 1,
          }}
        />

        {/* Layer 2: Futuristic Circle (Medium motion) */}
        <div
          style={{
            ...get3DStyle(30, 10),
            position: 'absolute',
            width: '260px',
            height: '260px',
            border: '1.5px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '50%',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            animation: 'spin 12s linear infinite reverse',
            zIndex: 2,
          }}
        />

        {/* Layer 3: Glass Code Editor Window (Fast motion, floats closest) */}
        <div
          className="glass-card"
          style={{
            ...get3DStyle(70, 18),
            width: '340px',
            height: '220px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            textAlign: 'left',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(6, 182, 212, 0.2)',
            zIndex: 4,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>
              divagar.js
            </span>
          </div>
          <code style={{ fontSize: '0.85rem', color: '#ffca28', fontFamily: 'var(--font-heading)', background: 'none', padding: 0 }}>
            <span style={{ color: 'var(--color-pink)' }}>const</span> <span style={{ color: 'var(--color-cyan)' }}>developer</span> = &#123;
            <br />
            &nbsp;&nbsp;name: <span style={{ color: '#46e3b7' }}>'DIVAGAR'</span>,
            <br />
            &nbsp;&nbsp;engine: <span style={{ color: '#46e3b7' }}>'MERN Stack'</span>,
            <br />
            &nbsp;&nbsp;vision: <span style={{ color: '#46e3b7' }}>'Scalable Code'</span>,
            <br />
            &nbsp;&nbsp;transitioned: <span style={{ color: 'var(--color-pink)' }}>true</span>
            <br />
            &#125;;
          </code>
        </div>

        {/* Floating Icon 1: Server (Floating left) */}
        <div
          className="glass-card floating-badge flex-center"
          style={{
            ...get3DStyle(100, 22),
            position: 'absolute',
            top: '80px',
            left: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            border: '1px solid rgba(170, 59, 255, 0.3)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(170, 59, 255, 0.2)',
            zIndex: 5,
          }}
        >
          <Server size={24} style={{ color: 'var(--color-violet)' }} />
        </div>

        {/* Floating Icon 2: Code (Floating right) */}
        <div
          className="glass-card floating-badge-delayed flex-center"
          style={{
            ...get3DStyle(85, 20),
            position: 'absolute',
            bottom: '70px',
            right: '25px',
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(6, 182, 212, 0.2)',
            zIndex: 5,
          }}
        >
          <Code size={24} style={{ color: 'var(--color-cyan)' }} />
        </div>

        {/* Floating Icon 3: Terminal (Floating center-top) */}
        <div
          className="glass-card floating-badge-fast flex-center"
          style={{
            ...get3DStyle(110, 25),
            position: 'absolute',
            top: '30px',
            right: '100px',
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(236, 72, 153, 0.2)',
            zIndex: 5,
          }}
        >
          <Terminal size={20} style={{ color: 'var(--color-pink)' }} />
        </div>
      </motion.div>

      {/* CSS Animations helper inline */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 968px) {
          section {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            padding-top: 130px !important;
            padding-bottom: 140px !important;
            gap: 60px !important;
          }
          div[style*="text-align: left"] {
            text-align: center !important;
            align-items: center !important;
          }
          div[style*="justify-content: space-between"] {
            text-align: left !important;
          }
        }
        @media (max-width: 640px) {
          h1 {
            font-size: 3.2rem !important;
          }
          h2 {
            font-size: 1.6rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
