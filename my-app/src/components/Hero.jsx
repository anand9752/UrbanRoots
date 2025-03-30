import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/green.jpg';

export const Hero = ({ onFindConsultant }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const heroStyle = {
    width: '95%',
    height: 'calc(100vh - 60px)',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    borderRadius: '15px',
    margin: '20px auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    transition: 'all 0.5s ease-in-out',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 2,
    transition: 'background-color 0.5s ease',
  };

  const heroContentStyle = {
    maxWidth: '80%',
    width: '100%',
    zIndex: 3,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px'
  };

  const h2Style = {
    maxWidth: '856px',
    width: '100%',
    fontFamily: 'ABeeZee',
    fontWeight: 400,
    fontSize: 'clamp(36px, 5vw, 64px)',
    lineHeight: '1.2',
    letterSpacing: '0%',
    textAlign: 'center',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
    margin: '0 auto',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
  };

  const h5Style = {
    maxWidth: '856px',
    width: '100%',
    fontFamily: 'ABeeZee',
    fontWeight: 400,
    fontSize: 'clamp(18px, 2.5vw, 28px)',
    lineHeight: '1.4',
    letterSpacing: '0%',
    textAlign: 'center',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
    margin: '0 auto',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
  };

  const buttonStyle = {
    width: '182px',
    height: '40px',
    borderRadius: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34A12E',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transitionDelay: '0.4s',
    marginTop: '20px'
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#2a8124',
    transform: isVisible ? 'scale(1.05)' : 'translateY(20px)',
    boxShadow: '0 5px 15px rgba(52, 161, 46, 0.4)',
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleButtonClick = () => {
    if (typeof onFindConsultant === 'function') {
      onFindConsultant();
    } else {
      // Default fallback if handler is not provided
      window.location.href = '/payment';
    }
  };

  return (
    <div style={heroStyle} className="hero-section">
      <div style={overlayStyle}></div>
      <div style={heroContentStyle}>
        <h2 style={h2Style} className="hero-title">Transform Your Urban Space into a Thriving Garden</h2>
        <h5 style={h5Style} className="hero-subtitle">Connect with expert consultants who will guide you through creating your own organic garden, whether it's on your terrace or in your backyard.</h5>
        <button
          style={isHovered ? buttonHoverStyle : buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleButtonClick}
          className="ripple hero-button"
        >
          Find Your Consultant
        </button>
      </div>
    </div>
  );
};
