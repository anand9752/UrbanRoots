import React from 'react';
import './Navbar.css';
import photo from '../components/environment-icon1.jpg';
import { useAuth, UserButton, SignInButton, SignUpButton } from '@clerk/clerk-react'; // Added SignInButton and SignUpButton

export const Navbar = () => {
  const { isSignedIn } = useAuth(); // Check if the user is signed in

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          <img src={photo} alt="UrbanRoots Logo" className="logo-image" />
          <span className="urban">Urban</span>
          <span className="roots">Roots</span>
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/service">Service</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        {isSignedIn ? (
          <div className="user-button-container">
            <UserButton />
          </div>
        ) : (
          <>
            <SignInButton>
              <button className="login">Log In</button>
            </SignInButton>
            <SignUpButton>
              <button className="signup">Sign Up</button>
            </SignUpButton>
          </>
        )}
      </div>
    </nav>
  );
};

