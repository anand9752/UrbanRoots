import React, { useState, useEffect, useRef } from "react";
import { Star, Heart } from "lucide-react";
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
      {/* Heart Icon */}
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

      {/* Product Image */}
      <div style={{ width: "180px", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={product.image} alt={product.name} style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }} />
      </div>

      {/* Star Rating */}
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

      {/* Product Name */}
      <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>
        {product.name}
      </h3>

      {/* Price */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <span style={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>{product.price}</span>
      </div>

      {/* Buy Button */}
      <button style={{
        backgroundColor: "#34A12E",
        color: "white",
        fontSize: "16px",
        padding: "8px 16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s",
      }}>
        Buy Now
      </button>
    </div>
  );
};

export const ProductList = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolling, setScrolling] = useState(true);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const speed = 2; // Increased speed

    const scroll = () => {
      if (!isHovered && scrolling) {
        scrollContainer.scrollLeft += speed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 20); // Faster interval
    return () => clearInterval(interval);
  }, [isHovered, scrolling]);

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

      {/* Horizontal Scroll Container */}
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
    </div>
  );
};

