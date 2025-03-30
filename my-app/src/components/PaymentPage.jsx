import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const PaymentPage = ({ onBack }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    tickets: 1,
    mobile: "",
    email: "",
    date: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      setError(null);
      
      if (window.Razorpay) {
        console.log('Razorpay already available');
        setRazorpayLoaded(true);
        return;
      }

      try {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
          if (window.Razorpay) {
            setRazorpayLoaded(true);
          } else {
            setError("Payment system failed to initialize properly");
          }
        };
        
        script.onerror = () => {
          setError('Failed to load payment gateway. Please check your internet connection and refresh the page.');
        };
        
        document.body.appendChild(script);
      } catch (err) {
        setError("Failed to initialize payment system");
      }
    };

    loadRazorpayScript();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const validateForm = () => {
    if (!formData.name) return "Name is required";
    if (!formData.tickets || formData.tickets < 1) return "Number of tickets must be at least 1";
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) return "Valid 10-digit mobile number is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) return "Valid email is required";
    if (!formData.date) return "Date is required";
    return null;
  };

  const handlePayment = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!razorpayLoaded) {
      alert('Payment gateway is still loading. Please try again in a moment.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const baseAmount = 699; // Base amount per ticket
      const totalAmount = formData.tickets * baseAmount;

      const options = {
        key: "rzp_test_0yx0AGbEbJaWtH", // Already using the correct key
        amount: totalAmount * 100, // Amount in paise
        currency: "INR",
        name: "Urban Roots",
        description: `Consultant Fee: Payment for ${formData.tickets} Consultation Session(s)`,
        image: "https://via.placeholder.com/150", // Replace with your logo
        handler: function(response) {
          console.log("Payment success:", response);
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          sendConfirmationEmail();
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile
        },
        notes: {
          address: 'Urban Roots Booking',
          tickets: formData.tickets,
          date: formData.date?.toLocaleDateString('en-IN'),
          paymentType: "Consultant Fee"
        },
        theme: {
          color: "#34A12E"
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      // Create and open Razorpay instance
      if (!window.Razorpay) {
        throw new Error("Razorpay is not available");
      }
      
      const razorpay = new window.Razorpay(options);
      
      // Handle payment failure
      razorpay.on('payment.failed', function(response) {
        setError(`Payment failed: ${response.error.description}`);
        setIsLoading(false);
      });
      
      // Open payment modal
      razorpay.open();
    } catch (error) {
      setError(`Unable to initialize payment: ${error.message}`);
      setIsLoading(false);
    }
  };

  const sendConfirmationEmail = () => {
    // Here you would integrate with an email service like EmailJS
    // For now, we'll just log to console
    console.log("Sending confirmation email to:", formData.email);
    
    // If you want to integrate EmailJS, you would add the code here
    // Similar to the sendMail function in the provided example
  };

  const handleBackClick = () => {
    if (typeof onBack === 'function') {
      onBack();
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem", background: "#f7fafc" }}>
      <button 
        onClick={handleBackClick}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          background: "#f1f1f1",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        ← Back to Home
      </button>
      
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#34A12E" }}>Book Your Session - Urban Roots</h1>
        
        {error && (
          <div style={{ 
            padding: "10px", 
            backgroundColor: "#f8d7da", 
            color: "#721c24", 
            borderRadius: "4px", 
            marginBottom: "15px" 
          }}>
            ⚠️ {error}
          </div>
        )}
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Name:</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Number of Sessions:</label>
          <input 
            type="number" 
            name="tickets"
            value={formData.tickets}
            onChange={handleInputChange}
            min="1"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Mobile Number:</label>
          <input 
            type="tel" 
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            pattern="[0-9]{10}"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Email:</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Select Date:</label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            placeholderText="Choose a date"
            className="date-picker"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
            required
          />
        </div>
        
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
            <span>Session Fee (₹699 per session):</span>
            <span>₹{formData.tickets * 699}.00</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", fontWeight: "bold", fontSize: "1.1em" }}>
            <span>Total:</span>
            <span>₹{formData.tickets * 699}.00</span>
          </div>
        </div>
        
        <button
          onClick={handlePayment}
          disabled={isLoading || !razorpayLoaded}
          style={{
            background: (isLoading || !razorpayLoaded) ? "#cccccc" : "#34A12E",
            color: "#fff",
            padding: "12px",
            width: "100%",
            borderRadius: "5px",
            border: "none",
            cursor: (isLoading || !razorpayLoaded) ? "not-allowed" : "pointer",
            marginTop: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px"
          }}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Processing...
            </>
          ) : !razorpayLoaded ? (
            'Loading Payment Gateway...'
          ) : (
            `Proceed to Pay ₹${formData.tickets * 699}`
          )}
        </button>
        
        <div style={{ marginTop: "15px", fontSize: "12px", color: "#6c757d", textAlign: "center" }}>
          <p>This is a test payment. No actual charges will be made.</p>
          <p>For testing, use card number: 4111 1111 1111 1111</p>
          <p>Expiry: Any future date, CVV: Any 3 digits</p>
        </div>
      </div>
      
      {/* Add loading spinner styles */}
      <style>
        {`
          .loading-spinner {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          .date-picker {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            borderRadius: 4px;
          }
        `}
      </style>
    </div>
  );
};
