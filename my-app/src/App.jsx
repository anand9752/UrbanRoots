import './App.css'
import { useState, useEffect } from 'react'
import { Hero } from './components/Hero.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Services } from './components/Services.jsx'
import { ConsultantList } from './components/ConsultantList.jsx'
import { Ourmission } from './components/Ourmission.jsx'
import { ProductList } from './components/ProductList.jsx'
import CustomerReviews from './components/CustomerReviews.jsx'
import { ContactUs } from './components/ContactUs.jsx'
import { Footer } from './components/Footer.jsx'
import { ConsultationPage } from './components/ConsultationPage.jsx'
import { PaymentPage } from './components/PaymentPage.jsx'
import { Weather } from './components/Weather.jsx'
import { useAuth } from '@clerk/clerk-react'
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { TransitionManager } from './components/TransitionManager.jsx'

// Error boundary component
function ErrorFallback({ error }) {
  return (
    <div style={{ padding: '20px', margin: '20px', backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '4px' }}>
      <h2>Something went wrong:</h2>
      <p style={{ color: '#d32f2f' }}>{error.message}</p>
      <button 
        onClick={() => window.location.reload()}
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#f44336', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'  
        }}
      >
        Reload page
      </button>
    </div>
  );
}

// Home component to encapsulate all home sections
const HomePage = () => {
  const [activeSection, setActiveSection] = useState("home");
  
  useEffect(() => {
    // Animation trigger for sections as they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Update active section for navbar highlight
            const id = entry.target.id;
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    // Observe all sections with a slight delay to ensure DOM is ready
    setTimeout(() => {
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach(section => {
        observer.observe(section);
      });
    }, 100);

    return () => {
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <main className="home-content">
      <section id="home" className="animate-on-scroll section-container">
        <Hero onFindConsultant={() => window.location.href = '/payment'} />
      </section>
      
      <section id="consultants" className="animate-on-scroll section-container">
        <ConsultantList onBookConsultant={(consultant) => {
          // Store selected consultant in sessionStorage before navigation
          sessionStorage.setItem('selectedConsultant', JSON.stringify(consultant));
          window.location.href = '/consultation';
        }} />
      </section>
      
      <section id="services" className="animate-on-scroll section-container">
        <Services />
      </section>
      
      <section id="shop" className="animate-on-scroll section-container">
        <ProductList />
      </section>
      
      <section id="reviews" className="animate-on-scroll section-container">
        <CustomerReviews />
      </section>
      
      <section id="about" className="animate-on-scroll section-container">
        <Ourmission />
      </section>
      
      <section id="contact" className="animate-on-scroll section-container">
        <ContactUs />
      </section>
    </main>
  );
};

function App() {
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [error, setError] = useState(null);
  const { isLoaded: isAuthLoaded } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  // Handle page transitions
  useEffect(() => {
    setError(null);
    
    // Add page transition effect
    setIsPageTransitioning(true);
    document.body.classList.add('page-transition');
    
    const timer = setTimeout(() => {
      document.body.classList.remove('page-transition');
      setIsPageTransitioning(false);
    }, 300);
    
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('page-transition');
    };
  }, [location.pathname]);

  // Get consultant data from sessionStorage if available
  useEffect(() => {
    try {
      const savedConsultant = sessionStorage.getItem('selectedConsultant');
      if (savedConsultant && location.pathname === '/consultation') {
        setSelectedConsultant(JSON.parse(savedConsultant));
      }
    } catch (err) {
      console.error("Error retrieving consultant data:", err);
    }
  }, [location.pathname]);

  // If there's an error, show the error boundary
  if (error) {
    return <ErrorFallback error={error} />;
  }

  // If auth is not loaded yet, show a loading state
  if (!isAuthLoaded) {
    return (
      <div className="app-loading-container">
        <div className="app-loading-spinner"></div>
        <p>Loading UrbanRoots...</p>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      
      <TransitionManager>
        <div className={`page-container ${isPageTransitioning ? 'transitioning' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/consultation" element={
              <ConsultationPage 
                consultant={selectedConsultant} 
                onBack={() => navigate('/')} 
              />
            } />
            <Route path="/payment" element={
              <PaymentPage onBack={() => navigate('/')} />
            } />
            {/* Catch-all route to redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </TransitionManager>
      
      <Footer />
      
      {/* Add some additional styles to fix positioning */}
      <style jsx="true">{`
        .app-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        .home-content {
          display: flex;
          flex-direction: column;
        }
        
        .section-container {
          width: 100%;
          min-height: 200px;
          margin: 20px 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section-container.fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}

export default App
