import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ConsultationPage = ({ consultant, onBack }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

  // Fix Razorpay script loading with more reliable approach
  useEffect(() => {
    const loadRazorpayScript = () => {
      setError(null);
      
      // Check if Razorpay is already available globally
      if (window.Razorpay) {
        console.log('Razorpay already available');
        setRazorpayLoaded(true);
        return;
      }

      // Create script element
      try {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.defer = true; // Add defer to improve loading behavior
        
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
          // Double-check that Razorpay is really available
          if (window.Razorpay) {
            setRazorpayLoaded(true);
          } else {
            console.error("Script loaded but Razorpay not available");
            setError("Payment system failed to initialize properly");
          }
        };
        
        script.onerror = (e) => {
          console.error('Failed to load Razorpay script', e);
          setError('Failed to load payment gateway. Please check your internet connection and refresh the page.');
        };
        
        document.body.appendChild(script);
      } catch (err) {
        console.error("Error appending Razorpay script:", err);
        setError("Failed to initialize payment system");
      }
    };

    loadRazorpayScript();
    
    // No cleanup needed - we want to keep the script
  }, []);

  const createTestOrder = async () => {
    // For test purposes, we'll just return a dummy order object
    // In production, you would call your backend API to create a real order
    return {
      amount: 89900,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      order_id: `order_${Date.now()}`, // Simulating an order ID
    };
  };

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert('Payment gateway is still loading. Please try again in a moment.');
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time for your consultation');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Create a test order
      const order = await createTestOrder();
      
      // Format the date for display
      const formattedDate = selectedDate.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Razorpay options with required values properly formatted
      const options = {
        key: "rzp_test_0yx0AGbEbJaWtH", // Updated to provided key
        amount: order.amount.toString(), // Must be a string
        currency: "INR",
        name: "Urban Roots",
        description: `Consultant Fee: Session on ${formattedDate} at ${selectedTime}`,
        image: "https://via.placeholder.com/150", // Placeholder image
        order_id: "", // Optional for testing
        handler: function (response) {
          console.log("Payment success:", response);
          setIsPaid(true);
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999"
        },
        notes: {
          consultantId: consultant?.id || "1",
          appointmentDate: formattedDate,
          appointmentTime: selectedTime,
          paymentType: "Consultant Fee"
        },
        theme: {
          color: "#34A12E"
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal closed');
            setIsLoading(false);
          },
          escape: true,
          backdropclose: false
        }
      };

      // Add more validation and error handling
      if (!window.Razorpay) {
        throw new Error("Razorpay is not available - script may not have loaded correctly");
      }
      
      // Create and open Razorpay instance
      const razorpay = new window.Razorpay(options);
      
      // Handle payment failure
      razorpay.on('payment.failed', function (response) {
        console.error("Payment failed:", response.error);
        setError(`Payment failed: ${response.error.description}`);
        setIsLoading(false);
      });
      
      // Open payment modal
      razorpay.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      setError(`Unable to initialize payment: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem", background: "#f7fafc" }}>
      <button 
        onClick={onBack}
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
      
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Left Section - Consultant Info */}
        <div style={{ flex: 1, minWidth: "300px", background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={consultant?.image || "https://randomuser.me/api/portraits/women/44.jpg"}
              alt={consultant?.name || "Consultant"}
              style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "10px" }}
            />
            <div>
              <h2>{consultant?.name || "Expert Consultant"}</h2>
              <p style={{ color: "#666" }}>Urban Farming Specialist</p>
              <p style={{ color: "green", fontWeight: "bold" }}>🟢 Available Now</p>
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <h3>Expertise</h3>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Rooftop Farming", "Organic Cultivation", "Hydroponics", "Urban Agriculture"].map((skill, index) => (
                <span key={index} style={{ background: "#e3f2fd", padding: "5px 10px", borderRadius: "15px", fontSize: "14px" }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <h3>Experience</h3>
            <p>{consultant?.review || "Experienced consultant with expertise in urban organic farming and sustainable agriculture."}</p>
          </div>
          <div style={{ marginTop: "15px", fontSize: "1.2rem" }}>
            <strong>Session Price: </strong>
            <span style={{ color: "#007bff" }}>₹899</span> / 30 minutes
          </div>
        </div>

        {/* Right Section - Booking Form */}
        <div style={{ flex: 1, minWidth: "300px", background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2>Book Your Consultation</h2>
          
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
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              placeholderText="Choose a date"
              className="date-picker"
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
              required
            />
          </div>
          
          <div style={{ marginTop: "15px", marginBottom: "20px" }}>
            <h3>Available Time Slots</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  style={{
                    padding: "10px",
                    border: selectedTime === time ? "2px solid #34a12e" : "1px solid #ddd",
                    background: selectedTime === time ? "#e3f2fd" : "#fff",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Section */}
          <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
            <h3>Summary</h3>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
              <span>Consultation Fee:</span>
              <span>₹849.00</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
              <span>GST (5%):</span>
              <span>₹50.00</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", fontWeight: "bold", fontSize: "1.1em" }}>
              <span>Total:</span>
              <span>₹899.00</span>
            </div>
            
            {!isPaid ? (
              <button
                onClick={handlePayment}
                disabled={isLoading || !razorpayLoaded || !selectedDate || !selectedTime}
                style={{
                  background: (isLoading || !razorpayLoaded || !selectedDate || !selectedTime) ? "#cccccc" : "#34A12E",
                  color: "#fff",
                  padding: "12px",
                  width: "100%",
                  borderRadius: "5px",
                  border: "none",
                  cursor: (isLoading || !razorpayLoaded || !selectedDate || !selectedTime) ? "not-allowed" : "pointer",
                  marginTop: "15px",
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
                  'Proceed to Pay ₹899'
                )}
              </button>
            ) : (
              <div style={{ 
                backgroundColor: "#d4edda", 
                color: "#155724", 
                padding: "15px", 
                borderRadius: "5px", 
                marginTop: "15px",
                textAlign: "center"
              }}>
                <p style={{ fontWeight: "bold", marginBottom: "5px" }}>✅ Payment Successful!</p>
                <p>Your consultation has been scheduled for {selectedDate?.toLocaleDateString('en-IN')} at {selectedTime}.</p>
              </div>
            )}
            
            <div style={{ marginTop: "15px", fontSize: "12px", color: "#6c757d", textAlign: "center" }}>
              <p>This is a test payment. No actual charges will be made.</p>
              <p>For testing, use card number: 4111 1111 1111 1111</p>
              <p>Expiry: Any future date, CVV: Any 3 digits</p>
            </div>
          </div>
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
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  );
};

