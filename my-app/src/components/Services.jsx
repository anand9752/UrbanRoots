import React from 'react';

export const Services = () => {
  // Services data array
  const servicesData = [
    {
      title: "Organic Farming Consultation",
      description: "Get expert advice on setting up and maintaining organic farms in urban spaces. Our consultants provide personalized guidance for your specific needs.",
      icon: "🌱"
    },
    {
      title: "Rooftop Garden Setup",
      description: "Transform your rooftop into a thriving garden with our professional setup services. We handle everything from design to implementation.",
      icon: "🏡"
    },
    {
      title: "Hydroponics Solutions",
      description: "Explore soil-less farming with our advanced hydroponics systems. Perfect for limited spaces and water-efficient farming.",
      icon: "💧"
    },
    {
      title: "Vertical Farming Installation",
      description: "Maximize your growing space with vertical farming solutions. Ideal for urban environments with limited horizontal space.",
      icon: "🏙️"
    },
    {
      title: "Sustainable Farming Workshops",
      description: "Learn sustainable farming practices through our hands-on workshops. Develop skills to grow your own organic produce.",
      icon: "🌿"
    },
    {
      title: "Organic Pest Management",
      description: "Control pests naturally without harmful chemicals. Our experts provide eco-friendly solutions for pest management.",
      icon: "🐞"
    }
  ];

  return (
    <div style={{
      padding: "4rem 2rem",
      backgroundColor: "#f9f9f9",
      width: "100%",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "3rem",
          color: "#34A12E",
        }}>Our Services</h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "2rem",
        }}>
          {servicesData.map((service, index) => (
            <div key={index} style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "2rem",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            className="service-card">
              <div style={{
                fontSize: "3rem",
                marginBottom: "1rem",
              }}>
                {service.icon}
              </div>
              <h3 style={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
                color: "#333",
              }}>
                {service.title}
              </h3>
              <p style={{
                color: "#666",
                lineHeight: "1.6",
              }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Services;
