import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import projectsData from '../content/projects.json';
import '../css/Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  const handleDetailsClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.classList.add('modal-open');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.classList.remove('modal-open');
  };

  // 컴포넌트 언마운트 시 클래스 정리
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <>
      <section className="projects" id="projects">
        <div className="projects-container">
          <div className="projects-header">
            <h2>Project</h2>
            <p>제가 작업한 다양한 프로젝트들을 확인해보세요.</p>
          </div>
          
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onDetailsClick={handleDetailsClick}
              />
            ))}
          </div>
        </div>
      </section>
      
      {isModalOpen && selectedProject && (
        <ProjectModal 
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default Projects;