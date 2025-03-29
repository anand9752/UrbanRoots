import React from 'react';
import logo1 from '../assets/Vector.png'; // Replace with actual logo path
import logo2 from '../assets/landscaping-icon-1.png'; // Replace with actual logo path
import logo3 from '../assets/Vector2.png'; // Replace with actual logo path
export const Services = () => {
  const divStyle = {
    width: '125.84px', // Decreased by 20%
    height: '39.52px', // Decreased by 20%
    margin: '20.8px auto', // Decreased by 20%
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '28px', // Decreased by 20%
    lineHeight: '104%', // Decreased by 20%
    letterSpacing: '0%',
    textTransform: 'capitalize',
    color: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10.4px', // Decreased by 20%
    borderRadius: '5.2px', // Decreased by 20%
  };

  const secondDivStyle = {
    width: '1183.52px', // Decreased by 20%
    height: '216.32px', // Decreased by 20%
    margin: '86.32px auto', // Decreased by 20%
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '28px', // Decreased by 20%
    lineHeight: '104%', // Decreased by 20%
    letterSpacing: '0%',
    textTransform: 'capitalize',
    color: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10.4px', // Decreased by 20%
    borderRadius: '5.2px', // Decreased by 20%
    gap: '20.8px', // Decreased by 20%
  };

  const innerDivStyle = {
    width: '336.96px', // Decreased by 20%
    height: '216.32px', // Decreased by 20%
    backgroundColor: 'lightgray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20.8px', // Decreased by 20%
    borderRadius: '5.2px', // Decreased by 20%
    transition: 'transform 0.3s ease', // Add smooth transition for scaling
  };

  const innerDivHoverStyle = {
    transform: 'scale(1.1)', // Scale up on hover
  };

  const logoStyle = {
    width: '52.78px', // Decreased by 20%
    height: '50.96px', // Decreased by 20%
    marginBottom: '12.48px', // Decreased by 20%
  };

  const textStyle = {
    width: '232.96px', // Decreased by 20%
    height: '29.12px', // Decreased by 20%
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '20.8px', // Decreased by 20%
    lineHeight: '104%', // Decreased by 20%
    letterSpacing: '0%',
    textTransform: 'capitalize',
    color: '#2B2B2B',
    marginBottom: '8.32px', // Decreased by 20%
  };

  const descriptionStyle = {
    width: '282.88px', // Decreased by 20%
    height: '53.04px', // Decreased by 20%
    fontFamily: 'Arial, sans-serif',
    fontWeight: '400',
    fontSize: '12.8px', // Decreased by 20%
    lineHeight: '104%', // Decreased by 20%
    letterSpacing: '0%',
    textTransform: 'capitalize',
    color: '#2B2B2B',
  };

  return (
    <div>
      <div style={divStyle}>Services</div>
      <div style={secondDivStyle}>
        <div
          style={innerDivStyle}
          onMouseEnter={(e) => (e.currentTarget.style.transform = innerDivHoverStyle.transform)}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <img src={logo1} alt="Logo 1" style={logoStyle} />
          <div style={textStyle}>Expert Consultation</div>
          <div style={descriptionStyle}>Get personalized guidance from experienced urban farming consultants.</div>
        </div>
        <div
          style={innerDivStyle}
          onMouseEnter={(e) => (e.currentTarget.style.transform = innerDivHoverStyle.transform)}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <img src={logo2} alt="Logo 2" style={logoStyle} />
          <div style={textStyle}>Farm Setup</div>
          <div style={descriptionStyle}>Complete setup services including soil preparation and plant selection.</div>
        </div>
        <div
          style={innerDivStyle}
          onMouseEnter={(e) => (e.currentTarget.style.transform = innerDivHoverStyle.transform)}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <img src={logo3} alt="Logo 3" style={logoStyle} />
          <div style={textStyle}>Organic Products</div>
          <div style={descriptionStyle}>High-quality organic seeds, soil, and fertilizers for your garden.</div>
        </div>
      </div>
    </div>
  );
};
