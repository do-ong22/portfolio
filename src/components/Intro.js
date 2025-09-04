import React, { useState, useEffect, useRef } from 'react';

function Intro() {
  // 기존 타이핑 효과 상태들...
  const jobTitles = ['백엔드', '프론트엔드', 'AI'];
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [displayedJob, setDisplayedJob] = useState('');
  const [isTypingJob, setIsTypingJob] = useState(true);
  
  const specialties = [
    'AI API 백엔드 설계', 
    '머신러닝 모델링',
    '데이터 분석 및 시각화',
    '리액트 개발',
  ];
  const [currentSpecialtyIndex, setCurrentSpecialtyIndex] = useState(0);
  const [displayedSpecialty, setDisplayedSpecialty] = useState('');
  const [isTypingSpecialty, setIsTypingSpecialty] = useState(true);

  // 3D 틸트 효과용 상태
  const [tiltStyle, setTiltStyle] = useState({});
  const imageRef = useRef(null);

  // 마우스 움직임 핸들러
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // 틸트 강도 조절 (값이 클수록 더 많이 기울어짐)
    const tiltX = (mouseY / rect.height) * 20; // 상하 기울기
    const tiltY = (mouseX / rect.width) * -20; // 좌우 기울기
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  // 마우스가 이미지를 벗어났을 때 원래 상태로 복귀
  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  // 기존 타이핑 효과 코드들...
  useEffect(() => {
    const currentText = jobTitles[currentJobIndex];
    
    if (isTypingJob) {
      if (displayedJob.length < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayedJob(currentText.slice(0, displayedJob.length + 1));
        }, 150);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsTypingJob(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else {
      if (displayedJob.length > 0) {
        const timer = setTimeout(() => {
          setDisplayedJob(displayedJob.slice(0, -1));
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setCurrentJobIndex((prev) => (prev + 1) % jobTitles.length);
        setIsTypingJob(true);
      }
    }
  }, [currentJobIndex, displayedJob, isTypingJob, jobTitles]);

  useEffect(() => {
    const currentText = specialties[currentSpecialtyIndex];
    
    if (isTypingSpecialty) {
      if (displayedSpecialty.length < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayedSpecialty(currentText.slice(0, displayedSpecialty.length + 1));
        }, 80);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsTypingSpecialty(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else {
      if (displayedSpecialty.length > 0) {
        const timer = setTimeout(() => {
          setDisplayedSpecialty(displayedSpecialty.slice(0, -1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setCurrentSpecialtyIndex((prev) => (prev + 1) % specialties.length);
        setIsTypingSpecialty(true);
      }
    }
  }, [currentSpecialtyIndex, displayedSpecialty, isTypingSpecialty, specialties]);

  return (
    <section className="intro">
      <div className="intro-text">
        <h1 style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>
          안녕하세요!<br />
          <span className="typing-text">
            {displayedJob}
          </span><br />
          개발자 김동근입니다.
        </h1>
        <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
            사용자와 팀을 위한 기술을 고민하고<br /> 문제 해결하는 것을 좋아합니다.<br />
            요즘은 이런 일에 집중하고 있습니다.<br />
          <span className="typing-text force-newline">
            {displayedSpecialty}
          </span><br />
        </p>
      </div>
      <img 
        ref={imageRef}
        src={`${process.env.PUBLIC_URL}/images/KakaoTalk_Photo_2025-05-28-11-56-06.jpeg`} 
        alt="Profile Image" 
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="profile-image-3d"
      />
    </section>
  );
}

export default Intro;