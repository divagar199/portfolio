import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Briefcase, Cpu, ShieldAlert, GraduationCap, Mail } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Universe', icon: Home },
  { path: '/projects', label: 'Builds', icon: Briefcase },
  { path: '/skills', label: 'Orbit', icon: Cpu },
  { path: '/experience', label: 'Evolution', icon: ShieldAlert }, // Serves as the timeline/journey path
  { path: '/education', label: 'Intellect', icon: GraduationCap },
  { path: '/contact', label: 'Portal', icon: Mail }
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        background: 'rgba(15, 12, 28, 0.45)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '50px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(170, 59, 255, 0.15)',
        maxWidth: '90vw',
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
              padding: '10px 18px',
              borderRadius: '30px',
              color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
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
              if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            {/* Active sliding capsule indicator */}
            {isActive && (
              <motion.div
                layoutId="active-nav-bubble"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(170, 59, 255, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%)',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  borderRadius: '30px',
                  zIndex: -1,
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.25)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            
            <Icon size={18} style={{ color: isActive ? 'var(--color-cyan)' : 'inherit' }} />
            <span className="nav-label" style={{ display: 'inline' }}>
              {item.label}
            </span>
          </NavLink>
        );
      })}

      {/* Embedded CSS for responsive hide-label on smaller screens */}
      <style>{`
        @media (max-width: 640px) {
          .nav-label {
            display: none !important;
          }
          .nav-link-item {
            padding: 12px !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
