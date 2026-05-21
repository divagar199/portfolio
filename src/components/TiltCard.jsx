import React, { useRef, useState } from 'react';

const TiltCard = ({ children, className = '', ...props }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Position of cursor relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates around center (from -0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Rotate max 12 degrees
    const rotateX = -normalizedY * 12;
    const rotateY = normalizedX * 12;
    
    setCoords({ x, y, rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  const cardStyle = {
    transform: isHovered
      ? `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: isHovered ? 'transform 0.05s ease-out, box-shadow 0.2s ease' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease',
    position: 'relative',
    transformStyle: 'preserve-3d',
  };

  const glowStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: isHovered
      ? `radial-gradient(circle 200px at ${coords.x}px ${coords.y}px, rgba(6, 182, 212, 0.18), transparent 80%)`
      : 'transparent',
    transition: 'background 0.1s ease-out',
    borderRadius: 'inherit',
    zIndex: 2,
  };

  return (
    <div
      ref={cardRef}
      className={`glass-card ${className}`}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div style={glowStyle} />
      <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d', height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
