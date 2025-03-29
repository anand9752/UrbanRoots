import React from "react";
import { Star } from "lucide-react";
import photo1 from "../components/OIP.jpg";
import photo2 from "../components/OIP (1).jpg";
import photo3 from "../components/amith-1596100358085.jpg";

// Sample consultant data
const consultants = [
  {
    id: 1,
    name: "Dr. Vikash Patel",
    image: photo1,
    review: "Dr. Vikash is an exceptional consultant with 10+ years of experience.",
    rating: 4.0,  // 4 full stars
  },
  {
    id: 2,
    name: "Dr. Ramesh Patidar",
    image: photo2,
    review: "Dr. Ramesh has helped numerous clients with his deep expertise.",
    rating: 4.5,  // 4 full stars + 1 half star
  },
  {
    id: 3,
    name: "Dr. Yashwant Singh",
    image: photo3,
    review: "Dr. Yashwant is known for his strategic insights and problem-solving skills.",
    rating: 4.14,  // 4 full stars + slightly filled 5th star
  },
];

const ConsultantCard = ({ consultant }) => {
  return (
    <div
      style={{
        padding: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        width: "280px",
        textAlign: "center",
        background: "white",
        transition: "transform 0.2s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Consultant Image */}
      <img
        src={consultant.image}
        alt={consultant.name}
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "12px",
          border: "3px solid #34A12E",
        }}
      />
      <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
        {consultant.name}
      </h3>
      <p style={{ color: "#555", fontSize: "14px", marginBottom: "12px" }}>
        {consultant.review}
      </p>
      
      {/* Star Ratings with Proper Yellow Filling */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
          marginBottom: "12px",
        }}
      >
        {[...Array(5)].map((_, index) => {
          let fillColor = "#D3D3D3"; // Default gray
          if (index + 1 <= Math.floor(consultant.rating)) {
            fillColor = "#FFD700"; // Fully filled yellow star
          } else if (index < consultant.rating) {
            fillColor = "linear-gradient(to right, #FFD700 50%, #D3D3D3 50%)"; // Half-filled star
          }

          return (
            <Star
              key={index}
              size={20}
              style={{
                fill: fillColor,
                stroke: "#FFD700", // Keep yellow border for better visibility
              }}
            />
          );
        })}
      </div>

      {/* Updated button with green color */}
      <button
        style={{
          backgroundColor: "#34A12E",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#287E22")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#34A12E")}
      >
        Book Consultant
      </button>
    </div>
  );
};

export const ConsultantList = () => {
  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "32px",
          color: "#333",
        }}
      >
        Our Expert Consultants
      </h2>
      {/* Perfectly Aligned Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          justifyContent: "center",
        }}
      >
        {consultants.map((consultant) => (
          <ConsultantCard key={consultant.id} consultant={consultant} />
        ))}
      </div>
    </div>
  );
};

