import React, { useState, useEffect, useRef } from "react";
import { Star, Heart } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import photo1 from '../components/1kg-vermi-compost-1.jpg';
import photo2 from '../components/41N9WvU7bnL.jpg';
import photo3 from '../components/fertilizer.jpg';
import photo4 from '../components/cakepowder.jpg';
import photo5 from '../components/1562584157146-jpg-1000x1000.jpg';
import photo6 from '../components/product_4d446b774d7a49774d6a4d784d6a41314e4452664d513d3d_image_13_05_2023_01_23_05.jpg';
import photo7 from '../components/PEMIUM_ORGANIC_COMPOST_BAG.jpg';

const products = [
  { id: 1, name: "Organic Compost", image: photo1, price: "₹1225", rating: 4.8 },
  { id: 2, name: "Vermicompost", image: photo2, price: "₹1530", rating: 4.7 },
  { id: 3, name: "Neem Cake Powder", image: photo3, price: "₹1220", rating: 4.6 },
  { id: 4, name: "Seaweed Extract", image: photo4, price: "₹1035", rating: 4.9 },
  { id: 5, name: "Biofertilizer", image: photo5, price: "₹1128", rating: 4.5 },
  { id: 6, name: "Coco Peat", image: photo6, price: "₹918", rating: 4.4 },
  { id: 7, name: "Organic Manure", image: photo7, price: "₹1022", rating: 4.0 },
];

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRazorpayScript = () => {
      setError(null);
      
      if (window.Razorpay) {
        console.log('Razorpay already available for products');
        setRazorpayLoaded(true);
        return;
      }

      try {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log('Razorpay script loaded successfully for products');
          if (window.Razorpay) {
            setRazorpayLoaded(true);
          } else {
            setError("Payment system failed to initialize properly");
          }
        };
        
        script.onerror = () => {
          console.error('Failed to load Razorpay script for products');
          setError('Failed to load payment gateway. Please check your internet connection and refresh.');
        };
        
        document.body.appendChild(script);
      } catch (err) {
        console.error("Error loading Razorpay script:", err);
        setError("Failed to initialize payment system");
      }
    };

    loadRazorpayScript();
  }, []);

  const getPriceValue = (priceString) => {
    return parseInt(priceString.replace(/[^\d]/g, ''));
  };

  const handleBuyNow = () => {
    if (!isLoaded) {
      alert("Authentication is loading. Please try again in a moment.");
      return;
    }

    if (!isSignedIn) {
      alert("Please sign in to make a purchase.");
      return;
    }

    if (!razorpayLoaded) {
      alert('Payment gateway is still loading. Please try again in a moment.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const priceValue = getPriceValue(product.price);
      
      const options = {
        key: "rzp_test_0yx0AGbEbJaWtH",
        amount: priceValue * 100,
        currency: "INR",
        name: "Urban Roots",
        description: `Payment for ${product.name}`,
        image: "https://via.placeholder.com/150",
        handler: function(response) {
          console.log("Payment success:", response);
          alert(`Payment Successful! Your order for ${product.name} has been placed. Payment ID: ${response.razorpay_payment_id}`);
          setIsLoading(false);
        },
        prefill: {
          name: "Urban Roots Customer",
          email: "",
          contact: ""
        },
        notes: {
          productId: product.id,
          productName: product.name,
          price: product.price,
          paymentType: "Product Purchase"
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

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function(response) {
        console.error("Payment failed:", response.error);
        setError(`Payment failed: ${response.error.description}`);
        setIsLoading(false);
      });
      
      razorpay.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      setError(`Unable to initialize payment: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      width: "250px",
      height: "380px",
      padding: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      backgroundColor: "white",
      textAlign: "center",
      border: "1px solid #ddd",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0,
      position: "relative",
    }}>
      <Heart
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
          color: liked ? "red" : "gray",
          transition: "transform 0.3s ease, color 0.3s ease",
          transform: liked ? "scale(1.1)" : "scale(1)",
        }}
        fill={liked ? "red" : "none"}
        size={24}
        onClick={() => setLiked(!liked)}
      />

      <div style={{ width: "180px", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={product.image} alt={product.name} style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "2px", marginBottom: "5px" }}>
        {[...Array(5)].map((_, index) => {
          const isHalfStar = product.rating - index > 0 && product.rating - index < 1;
          return (
            <Star key={index} size={18} style={{ color: "gold" }} 
              fill={index < Math.floor(product.rating) ? "gold" : (isHalfStar ? "gold" : "lightgray")}
            />
          );
        })}
      </div>

      <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>
        {product.name}
      </h3>

      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <span style={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>{product.price}</span>
      </div>

      <button 
        style={{
          backgroundColor: isLoading ? "#ccc" : "#34A12E",
          color: "white",
          fontSize: "16px",
          padding: "8px 16px",
          border: "none",
          borderRadius: "5px",
          cursor: isLoading ? "not-allowed" : "pointer",
          transition: "background 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
        onClick={handleBuyNow}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="loading-spinner" style={{ marginRight: "8px" }}></span>
            Processing...
          </>
        ) : "Buy Now"}
      </button>

      {error && (
        <div style={{
          color: "red",
          fontSize: "12px",
          marginTop: "5px",
          position: "absolute",
          bottom: "5px",
          width: "90%"
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export const ProductList = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolling, setScrolling] = useState(true);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const speed = 2;

    const scroll = () => {
      if (!isHovered && scrolling) {
        scrollContainer.scrollLeft += speed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, [isHovered, scrolling]);

  useEffect(() => {
    const loadRazorpayScript = () => {
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
          }
        };
        
        script.onerror = () => {
          console.error('Failed to load Razorpay script');
        };
        
        document.body.appendChild(script);
      } catch (err) {
        console.error("Error loading Razorpay script:", err);
      }
    };

    loadRazorpayScript();
  }, []);

  return (
    <div style={{
      position: "relative",
      padding: "24px",
      maxWidth: "100%",
      margin: "0 auto",
      backgroundColor: "#f5f5f5",
      borderRadius: "10px",
      overflow: "hidden",
    }}>
      <h2 style={{ fontSize: "26px", fontWeight: "bold", textAlign: "center", marginBottom: "24px" }}>Organic Farming Raw Materials</h2>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          width: "100%",
          gap: "32px",
          whiteSpace: "nowrap",
          overflowX: "auto",
          scrollBehavior: "smooth",
          padding: "10px 0",
          scrollbarWidth: "none",
        }}
        onMouseEnter={() => { setIsHovered(true); setScrolling(false); }}
        onMouseLeave={() => { setIsHovered(false); setScrolling(true); }}
      >
        {[...products, ...products].map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <style>
        {`
          .loading-spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

