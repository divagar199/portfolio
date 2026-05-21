import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import { ShieldAlert, TrendingUp, ShoppingBag, Award, Target } from 'lucide-react';

const TIMELINE_DATA = [
  {
    id: 1,
    role: 'Floor Operational Commander',
    company: 'V-Mart Retail Ltd',
    period: 'Apr 2025 - Sep 2025',
    color: 'var(--color-pink)',
    icon: ShoppingBag,
    focus: 'Inventory Flow Management & Officer Leadership',
    bullets: [
      'Directed complex supply lines, inventory depots, and floor layout optimizations.',
      'Analysed customer behavioral logistics to optimize product distribution vectors.',
      'Commanded teams of tactical sales operators, driving coordination, agility, and target compliance.',
      'Transitioned operational inventory pipelines into structured databases, sparking system engineering interest.'
    ]
  },
  {
    id: 2,
    role: 'Strategic Logistics Executive',
    company: 'Zink London',
    period: 'Jul 2023 - Apr 2025',
    color: 'var(--color-cyan)',
    icon: TrendingUp,
    focus: 'Logistics Pipelines & Dynamic Negotiation Operations',
    bullets: [
      'Managed corporate sales tunnels, audit ledgers, and wholesale logistical grids.',
      'Utilized predictive models and historical indicators to forecast inventory allocations.',
      'Engineered structured vendor agreements to resolve operational bottleneck delays.',
      'Refined communication mappings during multi-party supply contract drafts.'
    ]
  },
  {
    id: 3,
    role: 'Operational Logistics Officer',
    company: 'Max Fashion India',
    period: 'Jun 2020 - Oct 2021',
    color: 'var(--color-violet)',
    icon: Award,
    focus: 'Inventory Allocation & Supply Chain Security',
    bullets: [
      'Audited supply lanes, cataloged incoming inventory, and managed stock allocations.',
      'Commanded rapid inventory sorting under high stress, developing coordination resilience.',
      'Discovered structural sorting patterns in cataloging codes, establishing systems-thinking foundations.'
    ]
  }
];

const Timeline = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll tracking to draw the burning fuse line
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startTrigger = windowHeight * 0.75;
      const totalDist = rect.height;
      const currentScrolled = startTrigger - rect.top;
      
      const progress = Math.min(Math.max(currentScrolled / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

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
        style={{ textAlign: 'left', marginBottom: '50px' }}
      >
        <span style={{
          fontSize: '0.85rem',
          fontWeight: 'bold',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-violet)',
          textShadow: '0 0 10px rgba(34, 197, 94, 0.3)',
          display: 'block',
          marginBottom: '10px',
          fontFamily: 'var(--font-body)'
        }}>
          [ 🪖 LOGISTICAL CAMPAIGN EVOLUTION ]
        </span>
        <h1 className="section-title">Enlistment Logs</h1>
        <p className="section-subtitle">
          From directing retail store logistics and managing supply depots, to weaponizing systems architecture in high-frequency MERN deployments.
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
        <div 
          className="timeline-axis"
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '4px',
            background: 'rgba(255, 255, 255, 0.05)',
            transform: 'translateX(-50%)',
            zIndex: 1,
            borderRadius: '2px'
          }} 
        />

        {/* Burning Fuse Axis Line */}
        <div 
          className="timeline-axis"
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            height: `${scrollProgress * 100}%`,
            width: '4px',
            background: 'linear-gradient(to bottom, var(--color-pink) 0%, var(--color-cyan) 60%, #ef4444 100%)',
            boxShadow: '0 0 15px rgba(239, 68, 68, 0.65), 0 0 5px rgba(255, 150, 12, 0.4)',
            transform: 'translateX(-50%)',
            zIndex: 2,
            transition: 'height 0.1s ease-out',
            borderRadius: '2px'
          }} 
        />

        {/* Timeline Items Alternating Left/Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', position: 'relative', zIndex: 3 }}>
          {TIMELINE_DATA.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const ItemIcon = item.icon;

            return (
              <div
                key={item.id}
                className="timeline-row"
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                
                {/* Visual Indicator Node on Center Line */}
                <div
                  className="timeline-node"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '2px', // Square industrial shape
                    background: 'var(--color-bg-darker)',
                    border: `2px solid ${scrollProgress > (idx / TIMELINE_DATA.length) ? item.color : 'rgba(255, 255, 255, 0.1)'}`,
                    boxShadow: scrollProgress > (idx / TIMELINE_DATA.length) ? `0 0 15px ${item.color}44` : 'none',
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
                      padding: '0px',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'left',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.8)'
                    }}
                  >
                    {/* Metal rivet corners */}
                    <div className="bullet-hole" style={{ top: '15px', right: '15px', width: '8px', height: '8px', opacity: 0.2 }} />

                    <div className={idx === 1 ? "hazard-tape-cyan" : "hazard-tape"} style={{ height: '6px' }} />

                    <div style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      
                      {/* Period Badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: item.color,
                          padding: '4px 10px',
                          background: `${item.color}15`,
                          border: `1.5px solid ${item.color}33`,
                          fontFamily: 'var(--font-body)'
                        }}>
                          {item.period}
                        </span>
                      </div>

                      {/* Roles Headers */}
                      <div>
                        <h2 style={{ fontSize: '1.45rem', fontWeight: 'bold', letterSpacing: '0.02em', color: '#ffffff' }}>
                          {item.role}
                        </h2>
                        <h3 style={{ fontSize: '0.98rem', color: '#ffffff', opacity: 0.85, fontWeight: 'bold', marginTop: '2px', fontFamily: 'var(--font-body)' }}>
                          {item.company}
                        </h3>
                      </div>

                      {/* MERN Career Focus Segment */}
                      <div style={{
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        color: 'rgba(255, 255, 255, 0.85)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderLeft: `3px solid ${item.color}`,
                        padding: '8px 12px',
                        borderRadius: '0 2px 2px 0',
                        fontFamily: 'var(--font-body)'
                      }}>
                        FOCUS: {item.focus}
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
                          <li key={bIdx} style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: '1.45', fontFamily: 'var(--font-body)' }}>
                            <span style={{ color: item.color, fontWeight: 'bold' }}>»</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

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
          .timeline-axis {
            left: 20px !important;
            transform: none !important;
          }
          .timeline-node {
            left: 20px !important;
            transform: translateX(-50%) !important;
          }
          .timeline-card-wrapper {
            width: calc(100% - 40px) !important;
            margin-left: 40px !important;
          }
          .timeline-row {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Timeline;
