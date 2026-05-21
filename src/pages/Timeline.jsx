import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import { ShieldAlert, TrendingUp, ShoppingBag, Award, ArrowUpRight } from 'lucide-react';

const TIMELINE_DATA = [
  {
    id: 1,
    role: 'Floor Manager',
    company: 'V-Mart Retail Ltd',
    period: 'Apr 2025 - Sep 2025',
    color: 'var(--color-pink)',
    icon: ShoppingBag,
    focus: 'Operational Architecture & Team Leadership',
    bullets: [
      'Directed retail operations, inventory flows, and floor layouts for maximum consumer throughput.',
      'Analysed customer psychological behaviors to optimize product structures, similar to UX mapping in frontend engineering.',
      'Led teams of cross-functional sales operators, driving coordination, agility, and target compliance.',
      'Transitioned operational inventory pipelines into structured spreadsheets, initiating the spark for database management.'
    ]
  },
  {
    id: 2,
    role: 'Sales Executive',
    company: 'Zink London',
    period: 'Jul 2023 - Apr 2025',
    color: 'var(--color-cyan)',
    icon: TrendingUp,
    focus: 'Consumer Psychology & Logical Negotiation',
    bullets: [
      'Managed corporate sales funnels, accounting logs, and wholesale logistics pipelines.',
      'Utilized predictive patterns and historical sales metrics to forecast inventory needs and purchase orders.',
      'Developed critical problem-solving capacities by engineering customized vendor agreements and resolve delays.',
      'Refined communication skills and technical requirements mapping during wholesale contract drafts.'
    ]
  },
  {
    id: 3,
    role: 'Sales Assistant',
    company: 'Max Fashion India',
    period: 'Jun 2020 - Oct 2021',
    color: 'var(--color-violet)',
    icon: Award,
    focus: 'Systems Organization & Inventory Logistics',
    bullets: [
      'Audited supply lines, cataloged incoming inventory sheets, and managed stock allocations.',
      'Practiced high-frequency coordination under high customer volume seasons, developing operational resilience.',
      'Discovered structured patterns in category codes and stock IDs, developing a systems-thinking foundation.'
    ]
  }
];

const Timeline = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll tracking to draw the vertical timeline path
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Compute progress: from when container top crosses middle of screen, to when bottom crosses middle
      const startTrigger = windowHeight * 0.75;
      const endTrigger = windowHeight * 0.25;
      
      const totalDist = rect.height;
      const currentScrolled = startTrigger - rect.top;
      
      const progress = Math.min(Math.max(currentScrolled / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Trigger early

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="section-container" style={{ paddingTop: '120px' }}>
      
      {/* Page Title */}
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
          color: 'var(--color-violet)',
          textShadow: '0 0 10px rgba(170, 59, 255, 0.3)',
          display: 'block',
          marginBottom: '10px'
        }}>
          My Journey
        </span>
        <h1 className="section-title">Evolution & Experience</h1>
        <p className="section-subtitle">
          From directing retail store logistics and managing business operational teams, to architecting high-frequency full-stack web applications.
        </p>
      </motion.div>

      {/* Timeline Space */}
      <div
        ref={containerRef}
        id="timeline-container"
        style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '40px 0',
          width: '100%'
        }}
      >
        
        {/* Backdrop Static Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '4px',
          background: 'rgba(255, 255, 255, 0.05)',
          transform: 'translateX(-50%)',
          zIndex: 1,
          borderRadius: '4px'
        }} />

        {/* Animated Drawing Path */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          height: `${scrollProgress * 100}%`,
          width: '4px',
          background: 'linear-gradient(to bottom, var(--color-pink) 0%, var(--color-cyan) 60%, var(--color-violet) 100%)',
          boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
          transform: 'translateX(-50%)',
          zIndex: 2,
          transition: 'height 0.1s ease-out',
          borderRadius: '4px'
        }} />

        {/* Timeline Items Alternating Left/Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', position: 'relative', zIndex: 3 }}>
          {TIMELINE_DATA.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const ItemIcon = item.icon;

            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                
                {/* Visual Indicator Node on Center Line */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--color-bg-darker)',
                    border: `3px solid ${scrollProgress > (idx / TIMELINE_DATA.length) ? item.color : 'rgba(255, 255, 255, 0.1)'}`,
                    boxShadow: scrollProgress > (idx / TIMELINE_DATA.length) ? `0 0 15px ${item.color}` : 'none',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
                  }}
                >
                  <ItemIcon size={14} style={{ color: scrollProgress > (idx / TIMELINE_DATA.length) ? item.color : 'rgba(255, 255, 255, 0.4)' }} />
                </div>

                {/* Node Description Card Container */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, type: 'spring' }}
                  style={{
                    width: '44%',
                  }}
                  className="timeline-card-wrapper"
                >
                  <TiltCard
                    style={{
                      padding: '30px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      textAlign: 'left'
                    }}
                  >
                    
                    {/* Period Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: item.color,
                        padding: '4px 10px',
                        background: `${item.color}15`,
                        borderRadius: '4px',
                        border: `1px solid ${item.color}33`
                      }}>
                        {item.period}
                      </span>
                    </div>

                    {/* Roles Headers */}
                    <div>
                      <h2 style={{ fontSize: '1.6rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
                        {item.role}
                      </h2>
                      <h3 style={{ fontSize: '1.05rem', color: '#ffffff', opacity: 0.9, fontWeight: '600', marginTop: '2px' }}>
                        {item.company}
                      </h3>
                    </div>

                    {/* MERN Career Focus Segment */}
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: 'rgba(255, 255, 255, 0.8)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderLeft: `3px solid ${item.color}`,
                      padding: '8px 12px',
                      borderRadius: '0 6px 6px 0',
                    }}>
                      Focus: {item.focus}
                    </div>

                    {/* Operational Achievement Points */}
                    <ul style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      paddingLeft: '0'
                    }}>
                      {item.bullets.map((b, bIdx) => (
                        <li key={bIdx} style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: '1.5' }}>
                          <span style={{ color: item.color, fontWeight: 'bold' }}>•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                  </TiltCard>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #timeline-container {
            padding: 40px 10px !important;
          }
          /* Align line to the left edge on mobile */
          div[style*="left: 50%"] {
            left: 20px !important;
            transform: none !important;
          }
          /* Card container displays full-width on mobile */
          .timeline-card-wrapper {
            width: calc(100% - 40px) !important;
            margin-left: 40px !important;
          }
          div[style*="justify-content: flex-start"],
          div[style*="justify-content: flex-end"] {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Timeline;
