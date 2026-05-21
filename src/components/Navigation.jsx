import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Cpu, ShieldAlert, GraduationCap, Mail, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Universe', icon: Home },
  { path: '/projects', label: 'Builds', icon: Briefcase },
  { path: '/skills', label: 'Orbit', icon: Cpu },
  { path: '/experience', label: 'Evolution', icon: ShieldAlert },
  { path: '/education', label: 'Intellect', icon: GraduationCap },
  { path: '/contact', label: 'Portal', icon: Mail }
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
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: scrolled ? '70px' : '88px',
          background: scrolled ? 'rgba(10, 8, 20, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8%',
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.3)' : 'none',
        }}
      >
        {/* Branding Logo */}
        <NavLink
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '1.3rem',
            fontWeight: '800',
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(135deg, #ffffff 40%, var(--color-cyan) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>🌌</span>
          <span>DIVAGAR M.</span>
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
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'color 0.3s ease',
                  outline: 'none',
                }}
                className="nav-link-item"
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-bubble"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(170, 59, 255, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                      border: '1px solid rgba(6, 182, 212, 0.35)',
                      borderRadius: '20px',
                      zIndex: -1,
                      boxShadow: '0 0 12px rgba(6, 182, 212, 0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                <Icon size={16} style={{ color: isActive ? 'var(--color-cyan)' : 'inherit' }} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            width: '44px',
            height: '44px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ffffff',
            outline: 'none',
            transition: 'all 0.3s ease',
          }}
          className="mobile-toggle-btn"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'var(--color-cyan)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Full-Screen Glassmorphic Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              background: 'rgba(10, 8, 20, 0.96)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '120px 8% 80px 8%',
              gap: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '400px',
                gap: '16px',
              }}
            >
              {NAV_ITEMS.map((item, idx) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={item.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px 24px',
                        borderRadius: '16px',
                        background: isActive 
                          ? 'linear-gradient(135deg, rgba(170, 59, 255, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)' 
                          : 'rgba(255, 255, 255, 0.02)',
                        border: isActive 
                          ? '1px solid rgba(6, 182, 212, 0.3)' 
                          : '1px solid rgba(255, 255, 255, 0.05)',
                        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'var(--color-cyan)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                        } else {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(170, 59, 255, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)';
                          e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                          e.currentTarget.style.color = '#ffffff';
                        }
                      }}
                    >
                      <Icon size={22} style={{ color: isActive ? 'var(--color-cyan)' : 'inherit' }} />
                      <span>{item.label}</span>
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
          header {
            padding: 0 5% !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;
