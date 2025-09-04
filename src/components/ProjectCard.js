import React, { useState, useRef } from 'react';
import '../css/ProjectCard.css';

function ProjectCard({ project, onDetailsClick }) {
  const [tiltStyle, setTiltStyle] = useState({});
  const [lightStyle, setLightStyle] = useState({});
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // 틸트 강도를 더욱 부드럽게 조정
    const maxTilt = 4; // 최대 회전 각도를 4도로 제한
    const tiltX = Math.max(-maxTilt, Math.min(maxTilt, (mouseY / rect.height) * maxTilt));
    const tiltY = Math.max(-maxTilt, Math.min(maxTilt, (mouseX / rect.width) * -maxTilt));
    
    const mouseXPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseYPercent = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTiltStyle({
      transform: `perspective(1500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.2s ease-out'
    });
    
    setLightStyle({
      '--mouse-x': `${mouseXPercent}%`,
      '--mouse-y': `${mouseYPercent}%`,
      '--light-opacity': '0.15'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    setLightStyle({
      '--mouse-x': '50%',
      '--mouse-y': '50%',
      '--light-opacity': '0'
    });
  };

  const handleDetailsClick = () => {
    if (onDetailsClick) {
      onDetailsClick(project);
    }
  };

  return (
    <div
      ref={cardRef}
      className="project-card"
      style={{ ...tiltStyle, ...lightStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="light-overlay"></div>
      
      <div className="project-image">
        <img 
          src={`${process.env.PUBLIC_URL}${project.image}`} 
          alt={project.title} 
        />
        <div className="project-overlay"></div>
      </div>
      
      <div className="project-content">
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-tech">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <button 
            onClick={handleDetailsClick}
            className="details-btn"
          >
            자세히 보기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;