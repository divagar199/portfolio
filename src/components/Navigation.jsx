import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Cpu, ShieldAlert, GraduationCap, Mail, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Universe', techId: 'SYS_CORE', secNum: '01', icon: Home, color: 'var(--color-cyan)' },
  { path: '/projects', label: 'Builds', techId: 'SYS_BUILDS', secNum: '02', icon: Briefcase, color: 'var(--color-pink)' },
  { path: '/skills', label: 'Orbit', techId: 'SYS_ORBIT', secNum: '03', icon: Cpu, color: 'var(--color-violet)' },
  { path: '/experience', label: 'Evolution', techId: 'SYS_EVOLVE', secNum: '04', icon: ShieldAlert, color: 'var(--color-cyan)' },
  { path: '/education', label: 'Intellect', techId: 'SYS_INTEL', secNum: '05', icon: GraduationCap, color: 'var(--color-pink)' },
  { path: '/contact', label: 'Portal', techId: 'SYS_PORTAL', secNum: '06', icon: Mail, color: 'var(--color-violet)' }
];

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
  }, [location.pathname]);

  return (
    <>
      {/* Holographic Header Console */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: scrolled ? '72px' : '92px',
          background: scrolled ? 'rgba(10, 8, 24, 0.78)' : 'rgba(10, 8, 24, 0.1)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8%',
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          boxShadow: scrolled ? '0 15px 40px rgba(0, 0, 0, 0.5), 0 0 15px rgba(6, 182, 212, 0.05)' : 'none',
        }}
      >
        {/* Dynamic Holographic Logo */}
        <NavLink
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            outline: 'none',
          }}
        >
          {/* Constellation Nucleus Core */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '2px dashed var(--color-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(6, 182, 212, 0.35)',
              position: 'relative'
            }}
          >
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-cyan), var(--color-pink))',
              boxShadow: '0 0 8px rgba(6, 182, 212, 0.8)'
            }} />
          </motion.div>

          {/* Text labels */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px' }}>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: '800',
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #ffffff 40%, var(--color-cyan) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.04em',
              lineHeight: '1',
            }}>
              DIVAGAR M.
            </span>
            <span style={{
              fontSize: '0.62rem',
              fontFamily: 'monospace',
              color: 'var(--color-cyan)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              opacity: 0.85
            }}>
              SYS_NUCLEUS // ACTIVE
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Console Links */}
        <div
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
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
                  padding: '10px 20px',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                  fontFamily: 'monospace',
                  outline: 'none',
                  transition: 'color 0.3s ease',
                }}
                className="hud-nav-item"
              >
                {/* Micro Tech Sector Label */}
                <span style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  color: isActive ? 'var(--color-cyan)' : 'rgba(255, 255, 255, 0.32)',
                  marginBottom: '5px',
                  fontFamily: 'monospace',
                  transition: 'color 0.3s ease'
                }}>
                  {item.techId}
                </span>

                {/* Text and Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
                  <Icon size={13} style={{
                    color: isActive ? item.color : 'inherit',
                    filter: isActive ? `drop-shadow(0 0 5px ${item.color})` : 'none',
                    transition: 'all 0.3s ease'
                  }} />
                  <span style={{
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>
                    {item.label}
                  </span>
                </div>

                {/* Cybernetic Corner Brackets tracking active items */}
                {isActive && (
                  <>
                    <motion.div
                      layoutId="bracket-tl"
                      style={{
                        position: 'absolute',
                        top: '4px',
                        left: '8px',
                        width: '6px',
                        height: '6px',
                        borderTop: '1.5px solid var(--color-cyan)',
                        borderLeft: '1.5px solid var(--color-cyan)',
                        filter: 'drop-shadow(0 0 4px var(--color-cyan))',
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                    <motion.div
                      layoutId="bracket-br"
                      style={{
                        position: 'absolute',
                        bottom: '4px',
                        right: '8px',
                        width: '6px',
                        height: '6px',
                        borderBottom: '1.5px solid var(--color-cyan)',
                        borderRight: '1.5px solid var(--color-cyan)',
                        filter: 'drop-shadow(0 0 4px var(--color-cyan))',
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                    {/* Glowing Core Coordinate Pulse */}
                    <motion.div
                      layoutId="active-nav-dot"
                      style={{
                        position: 'absolute',
                        bottom: '-1px',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: item.color,
                        boxShadow: `0 0 8px ${item.color}`,
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Cyber Radar mobile menu trigger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'rgba(15, 12, 28, 0.65)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isOpen ? 'var(--color-pink)' : 'var(--color-cyan)',
            boxShadow: isOpen ? '0 0 15px rgba(236, 72, 153, 0.35)' : '0 0 15px rgba(6, 182, 212, 0.25)',
            outline: 'none',
            position: 'relative',
            transition: 'all 0.3s ease',
          }}
          className="mobile-toggle-btn"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
          
          {/* Rotating radar dash ring */}
          <div style={{
            position: 'absolute',
            inset: '-4px',
            border: '1.5px dashed rgba(6, 182, 212, 0.2)',
            borderRadius: '50%',
            animation: 'spin 12s linear infinite',
            pointerEvents: 'none'
          }} />
        </button>

        {/* Dynamic Scanning Laser Beam */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: scrolled 
            ? 'linear-gradient(90deg, transparent 10%, rgba(6, 182, 212, 0.5) 40%, rgba(170, 59, 255, 0.5) 60%, transparent 90%)' 
            : 'linear-gradient(90deg, transparent 20%, rgba(255, 255, 255, 0.12) 50%, transparent 80%)',
          boxShadow: scrolled ? '0 0 12px rgba(6, 182, 212, 0.4)' : 'none',
          transition: 'all 0.4s ease',
          pointerEvents: 'none'
        }} />
      </header>

      {/* Cybernetic Holographic HUD Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              background: 'radial-gradient(circle at center, rgba(15, 12, 35, 0.98) 0%, rgba(8, 5, 18, 0.99) 100%)',
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
            {/* Holographic matrix grids lines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
              maskImage: 'radial-gradient(circle, #fff 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle, #fff 30%, transparent 80%)',
              pointerEvents: 'none',
              zIndex: -1
            }} />

            {/* Orbit rings decoration in background */}
            <div style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              border: '1px dashed rgba(6, 182, 212, 0.05)',
              animation: 'spin 40s linear infinite',
              pointerEvents: 'none',
              zIndex: -1
            }} />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '420px',
                gap: '16px',
              }}
            >
              <div style={{
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                color: 'var(--color-pink)',
                letterSpacing: '0.25em',
                textAlign: 'center',
                marginBottom: '10px',
                textTransform: 'uppercase'
              }}>
                // PORTAL DIRECTORY SECTORS
              </div>

              {NAV_ITEMS.map((item, idx) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.35, ease: 'easeOut' }}
                  >
                    <NavLink
                      to={item.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 24px',
                        borderRadius: '16px',
                        background: isActive 
                          ? 'rgba(6, 182, 212, 0.08)' 
                          : 'rgba(255, 255, 255, 0.01)',
                        border: isActive 
                          ? '1px solid rgba(6, 182, 212, 0.4)' 
                          : '1px solid rgba(255, 255, 255, 0.04)',
                        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'monospace',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                        e.currentTarget.style.borderColor = 'var(--color-cyan)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                        } else {
                          e.currentTarget.style.background = 'rgba(6, 182, 212, 0.08)';
                          e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                          e.currentTarget.style.color = '#ffffff';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Icon size={20} style={{ color: isActive ? item.color : 'inherit', filter: isActive ? `drop-shadow(0 0 6px ${item.color})` : 'none' }} />
                        <span style={{
                          fontSize: '1.05rem',
                          fontWeight: '700',
                          fontFamily: 'var(--font-heading)',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}>
                          {item.label}
                        </span>
                      </div>

                      {/* Vector Coordinate Sector Label */}
                      <span style={{ fontSize: '0.72rem', color: isActive ? 'var(--color-cyan)' : 'rgba(255, 255, 255, 0.25)' }}>
                        [{item.secNum} / {item.techId}]
                      </span>

                      {/* Cybernetic active node glow inside the button */}
                      {isActive && (
                        <div style={{
                          position: 'absolute',
                          left: '4px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '3px',
                          height: '20px',
                          background: item.color,
                          boxShadow: `0 0 10px ${item.color}`,
                          borderRadius: '2px'
                        }} />
                      )}
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cybernetic Spinning Spin animation inside styles */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
          header {
            padding: 0 6% !important;
          }
        }
        .hud-nav-item:hover {
          color: #ffffff !important;
        }
      `}</style>
    </>
  );
};

export default Navigation;
