import React, { useState } from "react";
import logo from "../images/logo.png";
import add from "../images/add.jpg";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const AddDonor = () => {
  const navigate = useNavigate(); 

  // State variables for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    city: "",
    bloodGroup: "",
    phone: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (you can add more)
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      // Send POST request to the API
      const response = await fetch("http://localhost:8080/donors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add donor.");
      }

      // Handle success
      setIsSubmitted(true);
      setError(null); // Clear error
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        city: "",
        bloodGroup: "",
        phone: "",
      });

      // Redirect to admin page after success
      setTimeout(() => {
        navigate("/admin");
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (error) {
      setError(error.message || "An error occurred while adding donor.");
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header header-image">
        <div className="navbar">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/admin" className="link">Admin</Link>
              </li>
              <li>
                <Link to="/#make-a-donor" className="link">Become a Donor</Link>
              </li>
              <li>
                <a href="/blood-availability" className="link">Blood Availability</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="image-container">
          <img src={add} alt="Admin Panel Banner" className="admin-image" />
        </div>
      </header>

      {/* Add Donor Section */}
      <section className="become-donor">
        <h2>Add a Donor</h2>

        {isSubmitted && (
          <div className="success-message">
            Donor added successfully! Redirecting to admin page...
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form className="donor-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <input
              id="gender"
              name="gender"
              type="text"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="blood-group">Blood Group</label>
            <input
              id="blood-group"
              name="bloodGroup"
              type="text"
              placeholder="Blood Group"
              value={formData.bloodGroup}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions bottom-buttons">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button> {/* Cancel Button */}
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddDonor;
