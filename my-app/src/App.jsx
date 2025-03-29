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
import { useAuth } from '@clerk/clerk-react'

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

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [error, setError] = useState(null);
  const { isLoaded: isAuthLoaded } = useAuth();

  // Reset error when page changes
  useEffect(() => {
    setError(null);
  }, [currentPage]);

  const handleBookConsultant = (consultant) => {
    try {
      setSelectedConsultant(consultant);
      setCurrentPage("consultation");
    } catch (err) {
      console.error("Error during booking:", err);
      setError(err);
    }
  };

  const handlePaymentPage = () => {
    setCurrentPage("payment");
  };

  // If there's an error, show the error boundary
  if (error) {
    return <ErrorFallback error={error} />;
  }

  // If auth is not loaded yet, show a loading state
  if (!isAuthLoaded) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      {currentPage === "consultation" ? (
        <ConsultationPage 
          consultant={selectedConsultant} 
          onBack={() => setCurrentPage("home")} 
        />
      ) : currentPage === "payment" ? (
        <PaymentPage onBack={() => setCurrentPage("home")} />
      ) : (
        <>
          <Hero onFindConsultant={handlePaymentPage} />
          <ConsultantList onBookConsultant={handleBookConsultant} />
          <Services />
          <ProductList />
          <CustomerReviews />
          <Ourmission />
          <ContactUs />
        </>
      )}
      
      <Footer />
    </>
  )
}

export default App
