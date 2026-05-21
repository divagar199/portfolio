import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Cpu, ShieldAlert, GraduationCap, Mail, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { getMuteState, setMuteState, playClick, playSonarPing } from '../utils/audioEngine';

const NAV_ITEMS = [
  { path: '/', label: 'Command', techId: 'FREQ_SECTOR_01', secNum: '01', icon: Home, color: 'var(--color-violet)' },
  { path: '/projects', label: 'Arsenal', techId: 'FREQ_SECTOR_02', secNum: '02', icon: Briefcase, color: 'var(--color-pink)' },
  { path: '/skills', label: 'Artillery', techId: 'FREQ_SECTOR_03', secNum: '03', icon: Cpu, color: 'var(--color-cyan)' },
  { path: '/experience', label: 'Trench Logs', techId: 'FREQ_SECTOR_04', secNum: '04', icon: ShieldAlert, color: 'var(--color-violet)' },
  { path: '/education', label: 'Intellect', techId: 'FREQ_SECTOR_05', secNum: '05', icon: GraduationCap, color: 'var(--color-pink)' },
  { path: '/contact', label: 'Comms', techId: 'FREQ_SECTOR_06', secNum: '06', icon: Mail, color: 'var(--color-cyan)' }
];

// High-fidelity React Nuclear Core Logo Component
const ReactNuclearLogo = () => {
  return (
    <div style={{ position: 'relative', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {/* 3 Orbiting Electron Shells of React Nuclear Core */}
      <motion.svg
        viewBox="0 0 100 100"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 0 8px var(--color-violet))',
        }}
        animate={{ 
          rotate: 360,
          scale: [1, 0.96, 1.04, 1] // Slight micro-vibration scaling
        }}
        transition={{ 
          rotate: { duration: 16, repeat: Infinity, ease: 'linear' },
          scale: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        {/* Orbit 1 - Dashed Cybermatic Scanning Shell */}
        <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="var(--color-violet)" strokeWidth="3" transform="rotate(0 50 50)" strokeDasharray="5, 3" />
        {/* Orbit 2 */}
        <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="var(--color-violet)" strokeWidth="3" transform="rotate(60 50 50)" />
        {/* Orbit 3 */}
        <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="var(--color-violet)" strokeWidth="3" transform="rotate(120 50 50)" />
        
        {/* Orbiting electron warning particle */}
        <circle cx="92" cy="50" r="4.5" fill="var(--color-cyan)" />
      </motion.svg>

      {/* Pulsing core nuclear reactor */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #ffffff 10%, var(--color-cyan) 60%, var(--color-pink) 100%)',
        boxShadow: '0 0 14px var(--color-cyan), 0 0 6px var(--color-pink)',
        animation: 'pulseCore 1s infinite alternate ease-in-out'
      }} />

      <style>{`
        @keyframes pulseCore {
          0% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.85; filter: brightness(1); }
          100% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; filter: brightness(1.5); }
        }
      `}</style>
    </div>
  );
};

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [audioMuted, setAudioMuted] = useState(getMuteState());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    // Play a sonar sweep on page navigation transitions!
    playSonarPing();
  }, [location.pathname]);

  // Audio Toggle Switch Handler
  const toggleAudio = (e) => {
    e.stopPropagation(); // Avoid triggering global explosions on the switch itself
    const newState = !audioMuted;
    setAudioMuted(newState);
    setMuteState(newState);
    playClick();
  };

  return (
    <>
      {/* 1. Scrolling Emergency Battle Warning Ticker */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '24px',
        background: 'var(--color-bg-darker)',
        borderBottom: '2.5px solid var(--color-cyan)',
        zIndex: 1002,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          color: 'var(--color-cyan)',
          fontWeight: 'bold',
          letterSpacing: '0.12em',
          animation: 'warningTickerAnimation 22s linear infinite',
          paddingLeft: '100%',
        }}>
          ⚠️ DETONATION OUTPOST ACTIVE // TACTICAL COMM CHANNELS ENCRYPTED // HULL ARMOR SHIELD: 48% (CRITICAL BURNS) // AMMUNITION DEPOT: 32% RESERVES // EMERGENCY RADIO SIGNAL ENGAGED ⚠️
        </div>
        <style>{`
          @keyframes warningTickerAnimation {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-100%, 0, 0); }
          }
        `}</style>
      </div>

      {/* 2. Heavy Armored Header Console */}
      <header
        style={{
          position: 'fixed',
          top: '24px', // Shifted down for the warning ticker
          left: 0,
          right: 0,
          zIndex: 1000,
          height: scrolled ? '72px' : '88px',
          background: scrolled ? 'rgba(12, 14, 18, 0.94)' : 'rgba(12, 14, 18, 0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '2px solid rgba(255, 150, 12, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 6%',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 15px 40px rgba(0, 0, 0, 0.9), 0 0 15px rgba(255, 150, 12, 0.05)' : 'none',
        }}
      >
        {/* Metal Plate Corner Rivets for navigation header */}
        <div style={{ position: 'absolute', top: '4px', left: '6px', fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>[R_T-0]</div>
        <div style={{ position: 'absolute', top: '4px', right: '6px', fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>[R_T-1]</div>

        <NavLink
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            outline: 'none',
          }}
        >
          {/* React Nuclear Core */}
          <ReactNuclearLogo />

          {/* Text labels */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #ffffff 40%, var(--color-pink) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.04em',
              lineHeight: '1',
              filter: 'drop-shadow(0 0 10px rgba(255, 150, 12, 0.15))'
            }}>
              DIVAGAR M.
            </span>
            <span style={{
              fontSize: '0.62rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-cyan)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              animation: 'flickerText 5s infinite',
              fontWeight: 'bold'
            }}>
              SYS_NUCLEUS // WAR BUNKER OUTPOST 🪖
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px 18px',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  transition: 'color 0.2s ease',
                  border: isActive ? '1px solid var(--color-pink)' : '1px solid transparent',
                  background: isActive ? 'rgba(255, 150, 12, 0.05)' : 'transparent',
                  borderRadius: '2px'
                }}
                className="hud-nav-item"
              >
                {/* Tactical Radio Frequency indicator */}
                <span style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.08em',
                  color: isActive ? 'var(--color-pink)' : 'rgba(255, 255, 255, 0.3)',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-body)',
                }}>
                  {item.techId}
                </span>

                {/* Text and Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
                  <Icon size={12} style={{
                    color: isActive ? item.color : 'inherit',
                    filter: isActive ? `drop-shadow(0 0 6px ${item.color})` : 'none',
                    transition: 'all 0.3s ease'
                  }} />
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>
                    {item.label}
                  </span>
                </div>

                {/* Cybernetic active brackets */}
                {isActive && (
                  <>
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      left: '2px',
                      width: '4px',
                      height: '4px',
                      borderTop: '1.5px solid var(--color-pink)',
                      borderLeft: '1.5px solid var(--color-pink)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '4px',
                      height: '4px',
                      borderBottom: '1.5px solid var(--color-pink)',
                      borderRight: '1.5px solid var(--color-pink)',
                    }} />
                  </>
                )}
              </NavLink>
            );
          })}

          {/* 3. Audio Master COMM Lever Toggle Switch */}
          <div 
            onClick={toggleAudio}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '15px',
              userSelect: 'none',
              transition: 'all 0.2s ease',
              boxShadow: audioMuted ? 'none' : '0 0 12px rgba(120, 255, 120, 0.25)',
              borderColor: audioMuted ? 'rgba(255, 255, 255, 0.1)' : 'var(--color-violet)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.85)';
            }}
          >
            {audioMuted ? <VolumeX size={15} style={{ color: 'var(--color-cyan)' }} /> : <Volume2 size={15} style={{ color: 'var(--color-violet)' }} />}
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-body)', fontWeight: 'bold', color: audioMuted ? 'var(--color-text-muted)' : '#ffffff' }}>
              COMM_LINK: {audioMuted ? 'OFF' : 'ON'}
            </span>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: audioMuted ? '#ef4444' : '#22c55e',
              boxShadow: audioMuted ? '0 0 6px #ef4444' : '0 0 8px #22c55e'
            }} />
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Audio toggle in mobile view */}
          <div 
            onClick={toggleAudio}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              background: 'rgba(15, 23, 42, 0.85)',
              border: `1.5px solid ${audioMuted ? 'rgba(255, 255, 255, 0.15)' : 'var(--color-violet)'}`,
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            className="mobile-audio-toggle"
          >
            {audioMuted ? <VolumeX size={15} style={{ color: 'var(--color-cyan)' }} /> : <Volume2 size={15} style={{ color: 'var(--color-violet)' }} />}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              background: 'rgba(15, 12, 28, 0.85)',
              border: '1.5px solid var(--color-pink)',
              borderRadius: '4px',
              width: '42px',
              height: '42px',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isOpen ? 'var(--color-cyan)' : 'var(--color-pink)',
              boxShadow: isOpen ? '0 0 15px rgba(255, 50, 12, 0.25)' : '0 0 15px rgba(255, 150, 12, 0.15)',
              outline: 'none',
            }}
            className="mobile-toggle-btn"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Dynamic Scanning Laser Beam */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: scrolled 
            ? 'linear-gradient(90deg, transparent 10%, rgba(255, 150, 12, 0.3) 40%, rgba(255, 10, 10, 0.3) 60%, transparent 90%)' 
            : 'linear-gradient(90deg, transparent 20%, rgba(255, 255, 255, 0.08) 50%, transparent 80%)',
          boxShadow: scrolled ? '0 0 8px rgba(255, 150, 12, 0.3)' : 'none',
          pointerEvents: 'none'
        }} />
      </header>

      {/* Cybernetic HUD Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              background: 'radial-gradient(circle at center, rgba(12, 14, 18, 0.99) 0%, rgba(4, 4, 8, 0.995) 100%)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '120px 8% 80px 8%',
              overflow: 'hidden'
            }}
          >
            {/* Grid matrix behind overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255, 150, 12, 0.015) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 150, 12, 0.015) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle, #fff 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle, #fff 30%, transparent 80%)',
              pointerEvents: 'none',
              zIndex: -1
            }} />

            {/* Glowing emergency border */}
            <div style={{
              position: 'absolute',
              inset: '16px',
              border: '2px solid rgba(255, 10, 10, 0.15)',
              borderRadius: '8px',
              pointerEvents: 'none',
              boxShadow: 'inset 0 0 30px rgba(255, 10, 10, 0.03)',
              zIndex: -1
            }} />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '420px',
                gap: '12px',
              }}
            >
              <div style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-pink)',
                letterSpacing: '0.2em',
                textAlign: 'center',
                marginBottom: '10px',
                textTransform: 'uppercase',
                animation: 'flickerText 3s infinite'
              }}>
                // ⚠️ RADIO INTERRUPT // COMBAT COMMAND CHANNELS
              </div>

              {NAV_ITEMS.map((item, idx) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.25, ease: 'easeOut' }}
                  >
                    <NavLink
                      to={item.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 20px',
                        borderRadius: '2px',
                        background: isActive 
                          ? 'rgba(255, 150, 12, 0.08)' 
                          : 'rgba(255, 255, 255, 0.01)',
                        border: isActive 
                          ? '1.5px solid rgba(255, 150, 12, 0.4)' 
                          : '1.5px solid rgba(255, 255, 255, 0.04)',
                        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'var(--font-body)',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <Icon size={16} style={{ color: isActive ? item.color : 'inherit', filter: isActive ? `drop-shadow(0 0 6px ${item.color})` : 'none' }} />
                        <span style={{
                          fontSize: '0.95rem',
                          fontWeight: 'bold',
                          fontFamily: 'var(--font-heading)',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}>
                          {item.label}
                        </span>
                      </div>

                      {/* Vector Coordinate Sector Label */}
                      <span style={{ fontSize: '0.68rem', color: isActive ? 'var(--color-pink)' : 'rgba(255, 255, 255, 0.25)' }}>
                        [{item.secNum} // {item.techId}]
                      </span>
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes flickerText {
          0%, 100% { opacity: 1; filter: brightness(1); }
          23% { opacity: 0.95; }
          25% { opacity: 0.4; filter: brightness(0.7); }
          26% { opacity: 0.95; }
          42% { opacity: 1; }
          43% { opacity: 0.3; }
          45% { opacity: 0.95; }
          80% { opacity: 1; }
          81% { opacity: 0.5; }
          82% { opacity: 1; }
        }
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
          .mobile-audio-toggle {
            display: flex !important;
          }
          header {
            padding: 0 5% !important;
          }
        }
        .hud-nav-item:hover {
          color: #ffffff !important;
          border-color: var(--color-pink) !important;
          background: rgba(255, 150, 12, 0.02) !important;
        }
      `}</style>
    </>
  );
};

export default Navigation;
