import React, { useRef } from 'react';

const ProjectCard = ({ project, index, isAdmin, onEdit, onDelete }) => {
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  // Math for 3D Perspective Card Tilt & Glossy Sheen
  const handleMouseMove = (e) => {
    if (!cardRef.current || !innerRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Coordinates relative to card viewport bounds
    const cardX = e.clientX - rect.left;
    const cardY = e.clientY - rect.top;
    
    // Map offsets to natural degrees (-12deg to 12deg)
    const rotateY = ((cardX / rect.width) - 0.5) * 18;
    const rotateX = (0.5 - (cardY / rect.height)) * 18;
    
    innerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Pass coordinate variables for gradient linear sheet reflection inside CSS
    cardRef.current.style.setProperty('--sheen-x', `${cardX}px`);
    cardRef.current.style.setProperty('--sheen-y', `${cardY}px`);
  };

  const handleMouseLeave = () => {
    if (!innerRef.current || !cardRef.current) return;
    // Reset back to absolute center
    innerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    cardRef.current.style.setProperty('--sheen-x', '0px');
    cardRef.current.style.setProperty('--sheen-y', '0px');
  };

  return (
    <div 
      className="project-card-3d scroll-reveal reveal-visible" 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-index={index}
    >
      <div className="project-sheen"></div>
      <div className="project-inner" ref={innerRef}>
        <div className="project-image-wrapper">
          <img 
            src={project.image || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a1a17"/><text x="50%" y="50%" fill="%23dfd1bc" text-anchor="middle" dominant-baseline="middle">Preview</text></svg>'} 
            alt={`${project.title} Preview`} 
            className="project-image" 
            loading="lazy" 
          />
          <div className="project-image-overlay"></div>
        </div>
        
        <div className="project-info-container">
          <div className="project-meta-top">
            <span className="project-badge">FEATURED PROJECT</span>
            <span className="project-year mono-tag">2026</span>
          </div>
          
          <h3 className="project-name">{project.title}</h3>
          <span className="project-subtitle-detail">{project.subtitle}</span>
          <p className="project-description">{project.desc}</p>
          
          <div className="project-tech-tags">
            {project.tags && project.tags.map((tag, idx) => (
              <span key={idx} className="tech-tag">{tag}</span>
            ))}
          </div>
          
          <div className="project-links">
            <a 
              href={project.link || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link-btn magnet"
            >
              <span>View Source</span>
              <svg className="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Dynamic Administrative Overlays (Quick controls) */}
      {isAdmin && (
        <div className="admin-quick-ctrls">
          <button 
            type="button" 
            className="quick-edit-btn magnet" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project, index);
            }} 
            title="Modify Showcase"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
          
          <button 
            type="button" 
            className="quick-delete-btn magnet" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project, index);
            }} 
            title="Remove Showcase"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
