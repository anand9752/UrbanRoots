import React from 'react';
import backgroundImage from '../assets/green.jpg'; // Adjust the path and filename as needed

export const Hero = () => {
  const heroStyle = {
    width: '95%',
    height: 'calc(100vh - 60px)', // Adjust height to fit screen minus Navbar height (assuming Navbar height is 60px)
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    borderRadius: '15px', // Rounded corners
    margin: '20px auto', // Center horizontally with auto margin
    padding: '20px', // Added padding inside the hero section
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
    position: 'relative', // Added relative positioning for absolute elements
    overflow: 'hidden', // Prevents overflow of child elements
    zIndex: 1, // Ensures the hero section is above other elements
    backdropFilter: 'blur(5px)', // Optional: adds a blur effect to the background
    WebkitBackdropFilter: 'blur(5px)', // For Safari
    border: '2px solid rgba(255, 255, 255, 0.5)', // Optional: adds a border to the hero section
    transition: 'all 0.3s ease-in-out', // Smooth transition for hover effects
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black color with 20% opacity
    zIndex: 2, // Ensure the overlay is above the background but below the content
  };

  const heroContentStyle = {
    maxWidth: '80%',
  };

  const h2Style = {
    width: '856px',
    height: '158.56px',
    position: 'absolute',
    top: '200px', // Adjusted top position for reduced gap
    left: '292px',
    fontFamily: 'ABeeZee',
    fontWeight: 400,
    fontSize: '64px', // Increased font size
    lineHeight: '100%',
    letterSpacing: '0%',
    textAlign: 'center',
  };

  const h5Style = {
    width: '856px',
    height: '93.35px',
    position: 'absolute',
    top: '430px', // Further reduced the top position
    left: '293px',
    fontFamily: 'ABeeZee',
    fontWeight: 400,
    fontSize: '28px', // Increased font size
    lineHeight: '100%',
    letterSpacing: '0%',
    textAlign: 'center',
  };

  const buttonStyle = {
    width: '182px',
    height: '40px',
    position: 'absolute',
    top: '583px', // Positioned just below the h5 element
    left: 'calc(50% - 91px)', // Center horizontally (182px / 2 = 91px)
    borderRadius: '80px', // Rounded corners
    display: 'flex', // Use flexbox for centering content
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    backgroundColor: '#34A12E', // Button background color
    color: 'white',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s ease', // Smooth transition for hover effects
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#2a8124', // Darker green on hover
    transform: 'scale(1.05)', // Slightly enlarge the button
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleButtonClick = () => {
    alert('Find Your Consultant button clicked!');
  };

  return (
    <div style={heroStyle}>
      <div style={overlayStyle}></div> {/* Overlay for darkening the background */}
      <div style={heroContentStyle}>
        <h2 style={h2Style}>Transform Your Urban Space into a Thriving Garden</h2>
        <h5 style={h5Style}>Connect with expert consultants who will guide you through creating your own organic garden, whether it's on your terrace or in your backyard.</h5>
        <button
          style={isHovered ? buttonHoverStyle : buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleButtonClick}
        >
          Find Your Consultant
        </button>
      </div>
    </div>
  );
};
