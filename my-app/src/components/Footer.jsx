import React from "react";

export const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        
        {/* Left Section */}
        <div>
          <h2 style={{ color: "green", fontSize: "24px" }}>
            Urban<span style={{ color: "white" }}>roots</span>
          </h2>
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            497 Evergreen Rd. Mumbai <br />
            +91 345 678 903 <br />
            urbanroots@gmail.com
          </p>
        </div>

        {/* Middle Section - Links */}
        <div>
          <p style={linkStyle}>About Us</p>
          <p style={linkStyle}>Contact</p>
          <p style={linkStyle}>Terms & Conditions</p>
        </div>

        {/* Middle Section - Social Media */}
        <div>
          <p style={linkStyle}>Facebook</p>
          <p style={linkStyle}>Twitter</p>
          <p style={linkStyle}>Instagram</p>
        </div>

        {/* Right Section - Newsletter */}
        <div>
          <p>Subscribe to our newsletter</p>
          <div style={subscribeContainer}>
            <input type="email" placeholder="Email Address" style={inputStyle} />
            <button style={buttonStyle}>OK</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Inline Styles
const footerStyle = {
  backgroundColor: "#333",
  color: "white",
  padding: "30px 0",
  width: "100%",
};

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  maxWidth: "1200px",
  margin: "0 auto",
  flexWrap: "wrap",
};

const linkStyle = {
  fontSize: "16px",
  marginBottom: "10px",
  cursor: "pointer",
};

const subscribeContainer = {
  display: "flex",
  marginTop: "10px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px 0 0 5px",
};

const buttonStyle = {
  backgroundColor: "#D9B778",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "0 5px 5px 0",
  cursor: "pointer",
};

