import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ShieldAlert, Cpu, Terminal, Bomb } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../components/BrandIcons';
import { triggerHeavyExplosion } from '../components/BlastParticles';

const TYPING_STRINGS = ["MERN Tactical Engineer", "Bunker Command Architect", "Systems Weaponizer"];

const Hero = () => {
  const navigate = useNavigate();
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Coordinate tracker for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Flashing typing terminal script
  useEffect(() => {
    let timer;
    const currentFullText = TYPING_STRINGS[typingIndex];
    
    const tick = () => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 1600);
        } else {
          timer = setTimeout(tick, 90);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % TYPING_STRINGS.length);
        } else {
          timer = setTimeout(tick, 45);
        }
      }
    };

    timer = setTimeout(tick, 80);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingIndex]);

  // Style builder for 3D depth
  const get3DStyle = (depth, rotMultiplier = 12) => ({
    transform: `translate3d(${mouseOffset.x * depth}px, ${mouseOffset.y * depth}px, ${depth}px) 
                rotateY(${mouseOffset.x * rotMultiplier}deg) 
                rotateX(${-mouseOffset.y * rotMultiplier}deg)`,
    transformStyle: 'preserve-3d',
    transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
  });

  // Action fire blast triggers large shockwave
  const fireHeavyArtillery = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const blastX = rect.left + rect.width / 2;
    const blastY = rect.top + rect.height / 2;
    // Detonate 3 giant consecutive chain explosions
    triggerHeavyExplosion(blastX, blastY);
    setTimeout(() => triggerHeavyExplosion(blastX - 150, blastY - 100), 200);
    setTimeout(() => triggerHeavyExplosion(blastX + 150, blastY + 100), 400);
  };

  return (
    <section className="section-container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* Left: Officer Badges & Telemetry Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ display: 'flex', flexDirection: 'column', gap: '22px', textAlign: 'left', zIndex: 10 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Officer Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 'bold',
              letterSpacing: '0.15rem',
              textTransform: 'uppercase',
              color: 'var(--color-pink)',
              background: 'rgba(255, 150, 12, 0.08)',
              border: '1.5px solid var(--color-pink)',
              padding: '4px 10px',
              borderRadius: '2px',
              fontFamily: 'var(--font-body)',
              textShadow: '0 0 8px rgba(255, 150, 12, 0.3)'
            }}>
              [ 🪖 BUNKER OFFICER BADGE #0199 // SEC_09 ]
            </span>
          </div>

          <h1 style={{
            fontSize: '4.2rem',
            lineHeight: '1.1',
            fontWeight: 'bold',
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(135deg, #ffffff 40%, var(--color-pink) 70%, var(--color-cyan) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 10px rgba(255, 10, 10, 0.1))'
          }}>
            COMMANDER <span className="text-neon-cyan">DIVAGAR</span>
          </h1>
        </div>

        {/* Dynamic Typing Title */}
        <h2 style={{
          fontSize: '2.0rem',
          fontWeight: 'bold',
          fontFamily: 'var(--font-body)',
          color: '#ffffff',
          minHeight: '44px',
        }} className="cursor-typing">
          {displayText}
        </h2>

        {/* Combat Objective Copy */}
        <p style={{
          fontSize: '1.15rem',
          lineHeight: '1.7',
          color: 'var(--color-text-secondary)',
          maxWidth: '550px',
          fontFamily: 'var(--font-body)',
        }}>
          Engineered to command battlefield full-stack deployments. Weaponizing MongoDB, Express, React, and Node.js (MERN) to launch secure, heavy-duty tactical systems under fire.
        </p>

        {/* Action Button Trigger & Heavy Detonator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
            <button 
              className="btn-neon" 
              onClick={() => navigate('/projects')}
              style={{ display: 'inline-flex', gap: '10px' }}
            >
              Enter Arsenal
              <ArrowRight size={18} />
            </button>

            {/* Firing Artillery detonate button */}
            <button 
              className="btn-neon-payload" 
              onClick={fireHeavyArtillery}
              style={{ display: 'inline-flex', gap: '10px' }}
              className="btn-neon-payload"
            >
              <Bomb size={18} style={{ animation: 'pulseCore 0.8s infinite alternate' }} />
              DETONATE ARTILLERY
            </button>
          </div>

          {/* Social connections */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <a
              href="https://github.com/divagar199?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex-center"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-cyan)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 10, 10, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/divagar-m-3598b3391/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex-center"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-pink)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 150, 12, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:divagar.m.cs@gmail.com"
              className="glass-card flex-center"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-violet)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Right: Damaged 3D Tactical Field-Console */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.25 }}
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
        {/* Orbit radar ring 1 */}
        <div
          style={{
            ...get3DStyle(10, 4),
            position: 'absolute',
            width: '320px',
            height: '320px',
            border: '2px dashed rgba(255, 150, 12, 0.2)',
            borderRadius: '50%',
            animation: 'spin 30s linear infinite',
            zIndex: 1,
          }}
        />

        {/* Orbit radar ring 2 */}
        <div
          style={{
            ...get3DStyle(30, 8),
            position: 'absolute',
            width: '260px',
            height: '260px',
            border: '1.5px solid rgba(259, 68, 68, 0.25)',
            borderRadius: '50%',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            animation: 'spin 14s linear infinite reverse',
            zIndex: 2,
          }}
        />

        {/* Damaged Glass Code Editor Card */}
        <div
          className="glass-card"
          style={{
            ...get3DStyle(70, 15),
            width: '350px',
            height: '240px',
            padding: '0px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 10, 10, 0.15)',
            zIndex: 4,
          }}
        >
          {/* Warning tape header strip */}
          <div className="hazard-tape" />

          {/* Bullet holes on terminal console */}
          <div className="bullet-hole" style={{ top: '35px', left: '15px' }} />
          <div className="bullet-hole" style={{ bottom: '25px', right: '15px', width: '22px', height: '22px' }} />
          
          {/* Shattered glass fractures */}
          <div className="shatter-line" style={{ top: '48px', left: '26px', width: '60px', height: '1.5px', transform: 'rotate(25deg)' }} />
          <div className="shatter-line" style={{ top: '48px', left: '26px', width: '40px', height: '1.5px', transform: 'rotate(-40deg)' }} />

          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '6px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff3b30' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffcc00' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34c759' }} />
              </div>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'var(--font-body)', letterSpacing: '1px' }}>
                bunker_readout.log
              </span>
            </div>
            
            <code style={{ fontSize: '0.82rem', color: '#ffca28', fontFamily: 'var(--font-body)', background: 'none', padding: 0 }}>
              <span style={{ color: 'var(--color-pink)' }}>const</span> <span style={{ color: 'var(--color-cyan)' }}>bunkerOutpost</span> = &#123;
              <br />
              &nbsp;&nbsp;sector: <span style={{ color: '#22c55e' }}>'TACTICAL_SEC_09'</span>,
              <br />
              &nbsp;&nbsp;artillery: <span style={{ color: '#22c55e' }}>'MERN Stack Heavy'</span>,
              <br />
              &nbsp;&nbsp;armor_plates: <span style={{ color: '#ef4444' }}>'48% (DAMAGED)'</span>,
              <br />
              &nbsp;&nbsp;coolant_temp: <span style={{ color: '#ef4444' }}>'1845°C'</span>,
              <br />
              &nbsp;&nbsp;payload: <span style={{ color: 'var(--color-pink)' }}>'ARMED_DEPLOYING'</span>
              <br />
              &#125;;
            </code>
          </div>
        </div>

        {/* Floating Icon 1: Heavy Shield (Floating left) */}
        <div
          className="glass-card floating-badge flex-center"
          style={{
            ...get3DStyle(105, 18),
            position: 'absolute',
            top: '80px',
            left: '15px',
            width: '60px',
            height: '60px',
            borderRadius: '4px',
            border: '1.5px solid rgba(255, 10, 10, 0.3)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 10, 10, 0.1)',
            zIndex: 5,
          }}
        >
          <ShieldAlert size={24} style={{ color: 'var(--color-cyan)' }} />
        </div>

        {/* Floating Icon 2: CPU Artillery (Floating right) */}
        <div
          className="glass-card floating-badge-delayed flex-center"
          style={{
            ...get3DStyle(90, 16),
            position: 'absolute',
            bottom: '60px',
            right: '15px',
            width: '60px',
            height: '60px',
            borderRadius: '4px',
            border: '1.5px solid rgba(255, 150, 12, 0.3)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 150, 12, 0.1)',
            zIndex: 5,
          }}
        >
          <Cpu size={24} style={{ color: 'var(--color-pink)' }} />
        </div>

        {/* Floating Icon 3: Terminal Command (Floating top-right) */}
        <div
          className="glass-card floating-badge-fast flex-center"
          style={{
            ...get3DStyle(115, 20),
            position: 'absolute',
            top: '20px',
            right: '90px',
            width: '52px',
            height: '52px',
            borderRadius: '4px',
            border: '1.5px solid rgba(34, 197, 94, 0.3)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(34, 197, 94, 0.1)',
            zIndex: 5,
          }}
        >
          <Terminal size={20} style={{ color: 'var(--color-violet)' }} />
        </div>
      </motion.div>

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
            padding-bottom: 120px !important;
            gap: 50px !important;
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
            font-size: 2.8rem !important;
          }
          h2 {
            font-size: 1.45rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
