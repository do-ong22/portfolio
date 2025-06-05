import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>연락처</h3>
          <p>Email: kdg3729@naver.com</p>
          <p>Phone: 010-3729-8329</p>
        </div>
        
        <div className="footer-section">
          <h3>소셜 미디어</h3>
          <div className="social-links">
            <a href="https://github.com/do-ong22" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/%EB%8F%99%EA%B7%BC-%EA%B9%80-104aaa319/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://velog.io/@soondcuk/posts" target="_blank" rel="noopener noreferrer">Velog</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 do_ong.io. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;