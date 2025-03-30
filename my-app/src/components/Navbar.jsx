import React, { useState, useEffect } from 'react';
import './Navbar.css';
import photo from '../components/environment-icon1.jpg';
import { useAuth, UserButton, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  // Handle scroll effects for navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check which section is in view
    const checkActiveSection = () => {
      const sections = ['home', 'services', 'shop', 'about', 'contact'];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', checkActiveSection);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', checkActiveSection);
    };
  }, []);

  const scrollToSection = (id) => {
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      // Add fade out animation
      document.body.classList.add('page-transition');
      
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        document.body.classList.remove('page-transition');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          setActiveLink(id);
        }
      }, 400);
    } else {
      // We're already on the home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        setActiveLink(id);
      }
    }
  };

  // For external page links (like Weather)
  const handleNavigation = (e, path) => {
    e.preventDefault();
    // Add a fade effect before navigation
    document.body.classList.add('page-transition');
    setTimeout(() => {
      navigate(path);
      setTimeout(() => {
        document.body.classList.remove('page-transition');
      }, 100);
    }, 300);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-left">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
          className="logo"
        >
          <img src={photo} alt="UrbanRoots Logo" className="logo-image" />
          <span className="urban">Urban</span>
          <span className="roots">Roots</span>
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a 
              href="#" 
              className={activeLink === 'home' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeLink === 'services' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
            >
              Service
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeLink === 'shop' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); scrollToSection('shop'); }}
            >
              Shop
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={location.pathname === '/weather' ? 'active' : ''} 
              onClick={(e) => handleNavigation(e, '/weather')}
            >
              Weather
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeLink === 'about' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeLink === 'contact' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            >
              Contact Us
            </a>
          </li>
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
              <button className="login ripple">Log In</button>
            </SignInButton>
            <SignUpButton>
              <button className="signup ripple">Sign Up</button>
            </SignUpButton>
          </>
        )}
      </div>
    </nav>
  );
};

