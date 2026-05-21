import React, { useState, useEffect, useRef } from 'react';

const CoderAvatar = ({ size = 'small', forceTriggerHello = false }) => {
  const avatarRef = useRef(null);
  const [eyesOffset, setEyesOffset] = useState({ x: 0, y: 0 });
  const [showBubble, setShowBubble] = useState(false);
  const bubbleTimerRef = useRef(null);

  // Math physics for Eye-tracking cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!avatarRef.current) return;
      
      const rect = avatarRef.current.getBoundingClientRect();
      const avatarCenterX = rect.left + rect.width / 2;
      const avatarCenterY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - avatarCenterX;
      const deltaY = e.clientY - avatarCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      const maxShift = 2.8; // Maximum eye movement bounds
      let shiftX = 0;
      let shiftY = 0;
      
      if (distance > 0) {
        // Shift is proportional to coordinate offsets but clamped inside glasses boundaries
        const shiftAmount = Math.min(distance * 0.02, maxShift);
        shiftX = (deltaX / distance) * shiftAmount;
        shiftY = (deltaY / distance) * shiftAmount;
      }
      
      setEyesOffset({ x: shiftX, y: shiftY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hello speech bubble trigger
  const triggerHello = () => {
    if (bubbleTimerRef.current) {
      clearTimeout(bubbleTimerRef.current);
    }
    setShowBubble(true);
    // Dismiss after 4 seconds
    bubbleTimerRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 4000);
  };

  useEffect(() => {
    // If preloader finishes or mounted with trigger, pop hello bubble immediately
    if (forceTriggerHello) {
      const delay = setTimeout(() => {
        triggerHello();
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [forceTriggerHello]);

  useEffect(() => {
    return () => {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  const sizeClass = size === 'large' ? 'large-avatar' : '';

  return (
    <div 
      className={`logo-avatar-wrapper ${sizeClass}`}
      ref={avatarRef}
      onMouseEnter={triggerHello}
    >
      {/* Pop-up Sand-Beige Speech Bubble */}
      <div className={`avatar-speech-bubble ${showBubble ? 'show' : ''}`}>
        Hello! 👋
      </div>

      <svg 
        className={`logo-avatar ${sizeClass}`} 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`avatar-glow-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dfd1bc" />
            <stop offset="50%" stopColor="#ebdcb9" />
            <stop offset="100%" stopColor="#dfd1bc" />
          </linearGradient>
          <clipPath id={`avatar-clip-${size}`}>
            <circle cx="50" cy="50" r="43" />
          </clipPath>
        </defs>

        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          className="avatar-ring" 
          fill="none" 
          stroke={`url(#avatar-glow-grad-${size})`} 
          strokeWidth="2.5"
        ></circle>

        <g clipPath={`url(#avatar-clip-${size})`}>
          <circle cx="50" cy="50" r="43" fill="#161614" />
          <circle cx="50" cy="85" r="30" className="avatar-aura" fill="rgba(223, 209, 188, 0.1)" filter="blur(6px)" />
          
          {/* Boy Body */}
          <path d="M 25,90 C 25,75 35,70 50,70 C 65,70 75,75 75,90 Z" fill="#2a2a27" stroke="#dfd1bc" strokeWidth="1" />
          {/* Laptop Screen Glow */}
          <polygon points="35,90 65,90 60,78 40,78" fill="rgba(223, 209, 188, 0.15)" className="laptop-glow" />
          
          {/* Boy Head */}
          <circle cx="50" cy="46" r="16" fill="#3a3a36" stroke="#dfd1bc" strokeWidth="1" />
          
          {/* Boy Hair */}
          <path d="M 34,44 C 34,30 66,30 66,44 Z" fill="#161614" />
          
          {/* Eyes/Glasses Group with dynamic mouse-tracking translate transforms */}
          <g 
            className="avatar-eyes-group" 
            style={{ 
              transform: `translate(${eyesOffset.x}px, ${eyesOffset.y}px)`, 
              transition: 'transform 0.08s ease-out' 
            }}
          >
            {/* Glasses Frames */}
            <rect x="38" y="42" width="10" height="6" rx="2" className="avatar-glasses" fill="none" stroke="#dfd1bc" strokeWidth="1.5" />
            <rect x="52" y="42" width="10" height="6" rx="2" className="avatar-glasses" fill="none" stroke="#dfd1bc" strokeWidth="1.5" />
            <line x1="48" y1="45" x2="52" y2="45" stroke="#dfd1bc" strokeWidth="1.5" />
            
            {/* White pupils looking at cursor */}
            <circle cx="43" cy="45" r="1.5" fill="#dfd1bc" />
            <circle cx="57" cy="45" r="1.5" fill="#dfd1bc" />
          </g>

          {/* Headphones */}
          <path d="M 32,46 A 18,18 0 0,1 68,46" fill="none" stroke="#dfd1bc" strokeWidth="2" strokeLinecap="round" className="headphones-band" />
          <rect x="30" y="43" width="5" height="10" rx="2.5" fill="#dfd1bc" />
          <rect x="65" y="43" width="5" height="10" rx="2.5" fill="#dfd1bc" />
        </g>

        {/* Coder floating indicators */}
        <text x="12" y="32" className="floating-char char-1" fontFamily="monospace" fontSize="10" fill="#dfd1bc" opacity="0.6">&lt;/&gt;</text>
        <text x="74" y="28" className="floating-char char-2" fontFamily="monospace" fontSize="12" fill="#dfd1bc" opacity="0.5">{`{ }`}</text>
        <text x="20" y="68" className="floating-char char-3" fontFamily="monospace" fontSize="9" fill="#dfd1bc" opacity="0.4">JS</text>
        <text x="76" y="65" className="floating-char char-4" fontFamily="monospace" fontSize="9" fill="#dfd1bc" opacity="0.4">&lt;&gt;</text>
      </svg>
    </div>
  );
};

export default CoderAvatar;
