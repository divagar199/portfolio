import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import { GraduationCap, Award, Calendar, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

const CAROUSEL_ITEMS = [
  {
    id: 0,
    type: 'degree',
    title: 'M.Sc. in Computer Science',
    institution: "Park's College outpost",
    period: '2023 - 2025',
    color: 'var(--color-cyan)',
    desc: 'Advanced postgraduate specialization focused on modular systems engineering, computational intelligence, and distributed architectures.',
    bulletTitle: 'Key Research & Focus',
    bullets: [
      'Advanced Database Architectures & Optimization Systems.',
      'Full-Stack Design Patterns and RESTful Microservice paradigms.',
      'Distributed Algorithms and secure cloud data handling.',
      'Modern web frameworks (MERN) and real-time state synchronization.'
    ]
  },
  {
    id: 1,
    type: 'certifications',
    title: 'Professional Credentials',
    institution: 'Verified Global Authorities',
    period: 'Active Credentials',
    color: 'var(--color-pink)',
    desc: 'Specialized industrial accreditations validating expert capabilities across full-stack engineering, AI operations, and operational data analytics.',
    bulletTitle: 'Earned Certifications',
    bullets: [
      'MERN Full Stack Developer Certification — React, Express, Node, MongoDB structures.',
      'Prompt Engineering Specialist Course — Structured LLM instruction designs & AI systems.',
      'Power BI Master Certification — Advanced analytical modeling and operational dashboards.'
    ]
  },
  {
    id: 2,
    type: 'degree',
    title: 'BCA (Computer Applications)',
    institution: "Park's College outpost",
    period: '2020 - 2023',
    color: 'var(--color-violet)',
    desc: 'Solid undergraduate foundation mastering structural logic, object-oriented concepts, core databases, and script engineering.',
    bulletTitle: 'Core Disciplines',
    bullets: [
      'Database Management Systems (DBMS) and structural SQL queries.',
      'Object-Oriented Programming (Java, C++) and core algorithms.',
      'Fundamentals of Web Programming (HTML5, CSS3, JS, PHP).',
      'Logical deduction and computational mathematics.'
    ]
  }
];

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 480;
  const isTablet = windowWidth >= 480 && windowWidth < 768;

  // Mathematically scale card dimensions
  const cardHeight = isMobile ? 450 : isTablet ? 400 : 380;
  const xOffset = isMobile ? 40 : isTablet ? 110 : 180;
  const zOffset = isMobile ? -140 : isTablet ? -160 : -180;
  const scaleOffset = isMobile ? 0.8 : 0.9;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  };

  const handleCardClick = (id) => {
    setActiveIndex(id);
  };

  return (
    <section className="section-container" style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'left', marginBottom: '40px' }}
      >
        <span style={{
          fontSize: '0.85rem',
          fontWeight: 'bold',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-cyan)',
          textShadow: '0 0 10px rgba(255, 10, 10, 0.3)',
          display: 'block',
          marginBottom: '10px',
          fontFamily: 'var(--font-body)'
        }}>
          [ 🪖 INTELLECT SENSORY RECORDS ]
        </span>
        <h1 className="section-title">Credentials Stack</h1>
        <p className="section-subtitle">
          Academic enlistments and specialized technical credentials forming the architectural foundation of my engineering intellect.
        </p>
      </motion.div>

      {/* 3D Stack Carousel */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        width: '100%',
        height: `${cardHeight + 100}px`,
        marginTop: '10px',
        boxSizing: 'border-box'
      }}>
        
        {/* Card Stage with Perspective */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          height: `${cardHeight}px`,
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}>
          {CAROUSEL_ITEMS.map((item) => {
            let offset = item.id - activeIndex;
            
            if (offset > 1) offset -= CAROUSEL_ITEMS.length;
            if (offset < -1) offset += CAROUSEL_ITEMS.length;
            
            const isActive = offset === 0;
            const isBehindLeft = offset === -1;
            const isBehindRight = offset === 1;
            
            let translate3d = 'translate3d(0, 0, 0)';
            let rotateY = '0deg';
            let opacity = 0;
            let zIndex = 1;
            
            if (isActive) {
              translate3d = 'translate3d(0px, 0px, 50px) scale(1)';
              rotateY = '0deg';
              opacity = 1;
              zIndex = 10;
            } else if (isBehindLeft) {
              translate3d = `translate3d(${-xOffset}px, 0px, ${zOffset}px) scale(${scaleOffset})`;
              rotateY = '25deg';
              opacity = isMobile ? 0.12 : 0.45;
              zIndex = 5;
            } else if (isBehindRight) {
              translate3d = `translate3d(${xOffset}px, 0px, ${zOffset}px) scale(${scaleOffset})`;
              rotateY = '-25deg';
              opacity = isMobile ? 0.12 : 0.45;
              zIndex = 5;
            }

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: `${translate3d} rotateY(${rotateY})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  pointerEvents: isActive ? 'auto' : 'none',
                  cursor: isActive ? 'default' : 'pointer',
                  transition: 'transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.7s, z-index 0.7s',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Wrapped in Perspective TiltCard */}
                <TiltCard
                  style={{
                    padding: '0px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: `2px solid ${isActive ? 'rgba(255, 150, 12, 0.45)' : 'rgba(255, 255, 255, 0.08)'}`,
                    boxShadow: isActive ? `0 25px 60px -10px rgba(0, 0, 0, 0.85), 0 0 25px ${item.color}22` : 'var(--glass-shadow)'
                  }}
                >
                  <div className="hazard-tape" style={{ height: '6px' }} />
                  
                  {/* Exposed screws */}
                  <div className="bullet-hole" style={{ top: '12px', right: '12px', width: '8px', height: '8px', opacity: 0.2 }} />

                  {/* Card Core Content */}
                  <div style={{ padding: '28px 30px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <div>
                      {/* Header Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: item.color, letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>
                            <Calendar size={12} />
                            {item.period}
                          </span>
                          <h2 style={{ fontSize: '1.45rem', fontWeight: 'bold', letterSpacing: '0.02em', color: '#ffffff' }}>
                            {item.title}
                          </h2>
                          <span style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                            {item.institution}
                          </span>
                        </div>
                        
                        {/* Floating Circle Icon */}
                        <div
                          className="flex-center"
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '2px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: `1.5px solid ${item.color}44`,
                          }}
                        >
                          <GraduationCap size={20} style={{ color: item.color }} />
                        </div>
                      </div>

                      {/* Desc */}
                      <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: 'var(--color-text-secondary)', textAlign: 'left', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>
                        {item.desc}
                      </p>

                      {/* Accomplishments Bullets */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.45)', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)' }}>
                          <BookOpen size={12} style={{ color: item.color }} />
                          {item.bulletTitle}
                        </span>
                        
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: 0 }}>
                          {item.bullets.map((b, bIdx) => (
                            <li key={bIdx} style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.85)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: '1.35', fontFamily: 'var(--font-body)' }}>
                              <span style={{ color: item.color, fontWeight: 'bold' }}>»</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Resume Action Button */}
                    {item.type === 'certifications' && (
                      <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'center' }}>
                        <a
                          href="https://drive.google.com/file/d/1Xv9psWBoYLm2847AaEQLzf4nWMX0cuk5/view?usp=drive_link"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-neon"
                          style={{
                            fontSize: '0.78rem',
                            padding: '10px 18px',
                            width: '100%',
                            justifyContent: 'center',
                            boxShadow: `0 0 15px ${item.color}22`,
                            transform: 'translateZ(10px)',
                            gap: '8px',
                            borderRadius: '2px'
                          }}
                        >
                          <span>GET COMMAND RESUME</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>

                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controller Arrows */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '24px', zIndex: 10 }}>
          <button
            onClick={handlePrev}
            className="glass-card flex-center"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '2px',
              border: '1.5px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(15, 23, 42, 0.65)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-pink)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 150, 12, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={handleNext}
            className="glass-card flex-center"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '2px',
              border: '1.5px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(15, 23, 42, 0.65)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-pink)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 150, 12, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>

    </section>
  );
};

export default Education;
