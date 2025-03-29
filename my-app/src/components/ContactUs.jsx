import React from "react";

 export const ContactUs = () => {
  return (
    <div style={styles.container}>
      {/* Left Section - Contact Info */}
      <div style={styles.leftSection}>
        <h1 style={styles.heading}>CONTACT-US</h1>
        <h3 style={styles.subHeading}>WE ARE HERE FOR YOU</h3>
        <p style={styles.description}>
          At Urban Roots Organic Farming, we are committed to supporting urban farmers, home gardeners, and nature enthusiasts. Whether you have questions about organic farming, need guidance on sustainable practices, or want recommendations for eco-friendly products, our team is here to help.
        </p>
        <p style={styles.address}>497 Evergreen Rd. Roseville, CA 95673</p>
        <p style={styles.viewMap}>
          <strong>View map</strong> <span style={styles.arrow}>&rarr;</span>
        </p>
        <p style={styles.contactDetails}>
          Phone: +44 345 678 903 <br />
          Email: urbanroots1912@gmail.com
        </p>
      </div>

      {/* Right Section - Contact Form */}
      <div style={styles.rightSection}>
        <form style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input type="text" style={styles.input} placeholder="Enter your name" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" style={styles.input} placeholder="Enter your email" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Message</label>
            <textarea style={styles.textarea} placeholder="Your message"></textarea>
          </div>

          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
};

// Inline CSS for styling
const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "50px 20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
  },
  leftSection: {
    width: "45%",
    paddingRight: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  rightSection: {
    width: "50%",
  },
  heading: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  subHeading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "16px",
    color: "#555",
    lineHeight: "1.5",
    marginBottom: "15px",
  },
  address: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  viewMap: {
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
  },
  arrow: {
    marginLeft: "5px",
    fontSize: "20px",
  },
  contactDetails: {
    fontSize: "16px",
    color: "#555",
    marginTop: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    height: "100px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#D4AF37",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
    width: "180px",
  },
};

