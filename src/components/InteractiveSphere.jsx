import React, { useEffect, useRef, useState } from 'react';

const SKILLS = [
  { name: 'React.js', color: '#61dafb' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'HTML5', color: '#e34f26' },
  { name: 'CSS3', color: '#1572b6' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Express.js', color: '#ffffff' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'Firebase', color: '#ffca28' },
  { name: 'Supabase', color: '#3ecf8e' },
  { name: 'Razorpay API', color: '#00bfff' },
  { name: 'Prompt Eng.', color: '#00f2fe' },
  { name: 'ChatGPT', color: '#10a37f' },
  { name: 'Gemini', color: '#1a73e8' },
  { name: 'Vercel', color: '#ffffff' },
  { name: 'Render', color: '#46e3b7' }
];

const InteractiveSphere = () => {
  const containerRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [rot, setRot] = useState({ rx: 0.005, ry: 0.005 }); // Auto speed
  const mousePos = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

  // Initialize tags on a Fibonacci Sphere
  useEffect(() => {
    const radius = 180;
    const numTags = SKILLS.length;
    const initialTags = SKILLS.map((skill, index) => {
      // Golden ratio angle distribution
      const phi = Math.acos(-1 + (2 * index + 1) / numTags);
      const theta = Math.sqrt(numTags * Math.PI) * phi;
      
      return {
        ...skill,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });
    setTags(initialTags);
  }, []);

  // Main rotation animation loop
  useEffect(() => {
    let animationFrameId;

    const rotateTags = () => {
      // If hovered, speed is influenced by mouse coordinate distance from center
      let currentRx = rot.rx;
      let currentRy = rot.ry;

      if (isHovered.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Scale speed up to maximums
        currentRy = (mousePos.current.x - centerX) * 0.0001;
        currentRx = -(mousePos.current.y - centerY) * 0.0001;
      }

      setTags((prevTags) =>
        prevTags.map((tag) => {
          // Rotate around Y-axis (ry)
          const cosY = Math.cos(currentRy);
          const sinY = Math.sin(currentRy);
          const x1 = tag.x * cosY - tag.z * sinY;
          const z1 = tag.x * sinY + tag.z * cosY;

          // Rotate around X-axis (rx)
          const cosX = Math.cos(currentRx);
          const sinX = Math.sin(currentRx);
          const y2 = tag.y * cosX - z1 * sinX;
          const z2 = tag.y * sinX + z1 * cosX;

          return { ...tag, x: x1, y: y2, z: z2 };
        })
      );

      animationFrameId = requestAnimationFrame(rotateTags);
    };

    animationFrameId = requestAnimationFrame(rotateTags);
    return () => cancelAnimationFrame(animationFrameId);
  }, [rot]);

  const handleMouseMove = (e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    setRot({ rx: 0.006, ry: 0.006 }); // Restore default speed
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '450px',
        height: '450px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        userSelect: 'none',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {tags.map((tag, index) => {
        // Calculate scaling and opacity based on depth (Z)
        // Depth range: from -180 to +180
        const radius = 180;
        const scale = 0.8 + ((tag.z + radius) / (2 * radius)) * 0.4; // Scale range: 0.8 to 1.2
        const opacity = 0.2 + ((tag.z + radius) / (2 * radius)) * 0.8; // Opacity range: 0.2 to 1.0
        
        // Z-Index layering
        const zIndex = Math.round(((tag.z + radius) / (2 * radius)) * 100);

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              transform: `translate3d(${tag.x}px, ${tag.y}px, ${tag.z}px) scale(${scale})`,
              opacity: opacity,
              zIndex: zIndex,
              color: tag.color,
              padding: '10px 18px',
              borderRadius: '30px',
              background: 'rgba(15, 12, 28, 0.65)',
              border: `1px solid ${tag.color}33`,
              boxShadow: `0 4px 15px -3px ${tag.color}22`,
              backdropFilter: 'blur(8px)',
              fontWeight: '600',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              whiteSpace: 'nowrap',
              pointerEvents: opacity < 0.4 ? 'none' : 'auto', // Backside elements can't be hovered
              transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
            }}
            className="sphere-tag"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = tag.color;
              e.currentTarget.style.boxShadow = `0 0 15px ${tag.color}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${tag.color}33`;
              e.currentTarget.style.boxShadow = `0 4px 15px -3px ${tag.color}22`;
            }}
          >
            {tag.name}
          </div>
        );
      })}
    </div>
  );
};

export default InteractiveSphere;
