import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * TransitionManager handles smooth transitions between pages
 * Wrap your app content with this component to enable page transitions
 */
export const TransitionManager = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    // If location changes, start exit animation
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
      
      // After exit animation completes, update location and start entrance animation
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("fadeIn");
      }, 400); // Must match the CSS transition duration
      
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <div className={`transition-container ${transitionStage}`}>
      {children}
      
      <style jsx="true">{`
        .transition-container {
          position: relative;
          width: 100%;
          min-height: 70vh; /* Ensure container has enough height */
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        
        .fadeIn {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fadeOut {
          opacity: 0;
          transform: translateY(10px);
        }
      `}</style>
    </div>
  );
};

export default TransitionManager;
