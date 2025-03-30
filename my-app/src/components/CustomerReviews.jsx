import React from "react";
import { Star } from "lucide-react";
import photo1 from '../components/sunita.avif';
import photo2 from '../components/c1.jpg';
import photo3 from '../components/c3.jpg';

// Sample customer reviews data
const reviews = [
  {
    id: 1,
    name: "Sunita Williams",
    image: photo1,
    review: "I've always wanted to start organic farming on my terrace, but had no idea where to begin. This platform connected me with an expert who guided me on soil, seeds, and setup. Highly recommended!",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Ajay Saxena",
    image: photo2,
    review: "This site has everything – expert guidance, organic products, and even a blog for learning. The checkout process was smooth. The UI is clean and intuitive!",
    rating: 4,
  },
  {
    id: 3,
    name: "Anand Kumar",
    image: photo3,
    review: "The website is well-designed, and the green theme gives it a fresh, natural feel. Would love to see more interactive content in the blog section!",
    rating: 4.5,
  },
];

const ReviewCard = ({ review }) => {
  return (
    <div style={{
      width: "350px",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      border: "1px solid #ddd",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    className="hover-card">
      {/* Profile Picture + Name */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <img
          src={review.image}
          alt={review.name}
          style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
        />
        <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>{review.name}</h3>
      </div>

      {/* Star Rating */}
      <div style={{ display: "flex", marginBottom: "8px" }}>
        {[...Array(5)].map((_, index) => {
          const isHalfStar = review.rating - index > 0 && review.rating - index < 1;
          return (
            <Star key={index} size={18} style={{ marginRight: "2px", color: "gold" }} 
              fill={index < Math.floor(review.rating) ? "gold" : (isHalfStar ? "gold" : "lightgray")}
            />
          );
        })}
      </div>

      {/* Review Text */}
      <p style={{
        fontSize: "14px",
        color: "#555",
        lineHeight: "1.4",
        margin: "0",
        textAlign: "left"
      }}>
        {review.review}
      </p>
    </div>
  );
};

const CustomerReviews = () => {
  return (
    <div style={{
      padding: "40px 0",
      maxWidth: "1200px",
      margin: "0 auto",
      textAlign: "center",
    }}>
      <h2 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "10px" }}>What Our Clients Say</h2>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
        Real Stories From Urban Farmers Who Transformed Their Spaces
      </p>

      {/* Reviews Container (Single Row) */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        overflowX: "auto",
        paddingBottom: "10px",
      }}
      className="scroll-container">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* CSS for Hover Effect */}
      <style>
        {`
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          }
          .scroll-container::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default CustomerReviews;