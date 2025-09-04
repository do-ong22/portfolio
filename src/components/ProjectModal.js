import React, { useState } from 'react';
import '../css/ProjectModal.css';

function ProjectModal({ project, isOpen, onClose }) {
  const [expandedImage, setExpandedImage] = useState(null);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageClick = (imageSrc) => {
    setExpandedImage(imageSrc);
  };

  const handleCloseExpanded = () => {
    setExpandedImage(null);
  };

  return (
    <>
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content">
          <div className="modal-header">
            <img 
              src={project.image.startsWith('http') ? project.image : `${process.env.PUBLIC_URL}${project.image}`}
              alt={project.title}
              className="modal-image"
            />
            <div className="modal-title-section">
              <h2>{project.title}</h2>
              <p className="modal-date">{project.date}</p>
              <p className="modal-category">{project.category}</p>
            </div>
          </div>

          <div className="modal-body">
            <section className="modal-description-section">
              <h3>📋 프로젝트 소개</h3>
              <p>{project.description}</p>
            </section>

            {project.myRole && (
              <section className="modal-role-section">
                <h3>👤 담당 역할</h3>
                <p>{project.myRole}</p>
              </section>
            )}

            {project.stackSummary && (
              <section className="modal-stack-section">
                <h3>⚡ 기술 스택 요약</h3>
                <p>{project.stackSummary}</p>
              </section>
            )}

            <section className="modal-tech-section">
              <h3>🛠️ 사용 기술</h3>
              <div className="modal-tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="modal-tech-tag">{tech}</span>
                ))}
              </div>
            </section>

            {project.challenges && project.challenges.length > 0 && (
              <section className="modal-challenges-section">
                <h3>🚧 주요 도전 과제</h3>
                <ul className="modal-challenges-list">
                  {project.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.features && project.features.length > 0 && (
                <section className="modal-features-section">
                  <h3>✨ 주요 기능</h3>
                  <ul className="modal-features-list">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </section>
              )}

            {project.outcome && project.outcome.length > 0 && (
              <section className="modal-outcome-section">
                <h3>🎯 성과 및 결과</h3>
                <ul className="modal-outcome-list">
                  {project.outcome.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.reflection && (
              <section className="modal-reflection-section">
                <h3>🤔 프로젝트 회고</h3>
                <p>{project.reflection}</p>
              </section>
            )}

            {project.screenshots && project.screenshots.length > 0 && (
              <section className="modal-screenshots-section">
                <h3>📸 스크린샷</h3>
                <div className="modal-screenshots-grid">
                  {project.screenshots.map((screenshot, index) => (
                    <div key={index} className="screenshot-item">
                      <img 
                        src={screenshot.startsWith('http') ? screenshot : `${process.env.PUBLIC_URL}${screenshot}`} 
                        alt={`${project.title} 스크린샷 ${index + 1}`}
                        className="screenshot-image"
                        onClick={() => handleImageClick(screenshot.startsWith('http') ? screenshot : `${process.env.PUBLIC_URL}${screenshot}`)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="modal-links-section">
              <h3>🔗 프로젝트 링크</h3>
              <div className="modal-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="modal-link github">
                  <span>🔗</span> GitHub 저장소
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="modal-link demo">
                    <span>🚀</span> 라이브 데모
                  </a>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    
    {/* 확대된 이미지 모달 */}
    {expandedImage && (
      <div 
        className="image-modal-backdrop" 
        onClick={handleCloseExpanded}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100002,
          cursor: 'pointer'
        }}
      >
        <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
          <button 
            onClick={handleCloseExpanded}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(255, 255, 255, 0.8)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '20px',
              cursor: 'pointer',
              zIndex: 100003
            }}
          >
            ✕
          </button>
          <img 
            src={expandedImage}
            alt="확대된 이미지"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    )}
  </>
  );
}

export default ProjectModal;