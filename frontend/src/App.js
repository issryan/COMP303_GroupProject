import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import home from "./images/home.png";
import thumbs from "./images/thumbs-up.png";
import check from "./images/check-filled.png";
import attachment from "./images/attachment.png";
import awards from "./images/award.png";
import star from "./images/star.png";
import Admin from "./pages/Admin";
import AddDonor from "./pages/AddDonor";
import AddBloodBank from "./pages/AddBloodBank";
import AddBloodStock from "./pages/AddBloodStock";
import Profile from "./pages/Profile";
import DonationHistory from "./pages/DonationHistory";
import "./App.css";
import BloodAvailability from "./pages/BloodAvailability";
import ScheduleDonation from "./pages/ScheduleDonation";
import EditBloodBank from "./pages/EditBloodBank";
import EditBloodStock from "./pages/EditBloodStock";

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Header Section */}
        <header className="header">
          <div className="navbar">
            <div class="logo">
              <Link to="/"><img src={logo} alt="Logo" /></Link>
            </div>
            <nav>
              <ul>
                <li><Link to="/admin" className="link">Admin</Link></li>
                <li><a href="/#make-a-donor" className="link">Become a Donor</a></li>
                <li><a href="/blood-availability" className="link">Blood Availability</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />  {/* Admin route */}
          <Route path="/add-donor" element={<AddDonor />} />
          <Route path="/add-blood-bank" element={<AddBloodBank />} />
          <Route path="/add-blood-stock" element={<AddBloodStock />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/history/:donorId" element={<DonationHistory />} />
          <Route path="/blood-availability" element={<BloodAvailability />} />
          <Route path="/schedule/:donorId" element={<ScheduleDonation />} />
          <Route path="/edit-blood-bank/:id" element={<EditBloodBank />} />
          <Route path="/edit-blood-stock/:id" element={<EditBloodStock />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
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

    } catch (error) {
      setError(error.message || "An error occurred while adding donor.");
    }
  };

  return (
    <div>
      <h1>Donate Blood, Save Lives</h1>
      <div className="image-section">
        <img
          src={home} // Replace with actual image URL
          alt="Blood donation scene"
          className="main-image"
        />
      </div>

      {/* Why Donate Section */}
      <section className="why-donate">
        <h2>Why Donate Blood?</h2>
        <div className="benefits">
          <div className="benefit-card">
            <div className="image-wrapper">
              <img src={thumbs} alt="Save lives" />
            </div>
            <p>Save up to 3 lives with one donation.</p>
          </div>
          <div className="benefit-card">
            <div className="image-wrapper">
              <img src={check} alt="Free checkup" />
            </div>
            <p>Get a free health check-up.</p>
          </div>
          <div className="benefit-card">
            <div className="image-wrapper">
              <img src={thumbs} alt="Feel good" />
            </div>
            <p>Feel good about giving back.</p>
          </div>
          <div className="benefit-card">
            <div className="image-wrapper">
              <img src={attachment} alt="Stable supply" />
            </div>
            <p>Help ensure a stable blood supply.</p>
          </div>
          <div className="benefit-card">
            <div className="image-wrapper">
              <img src={awards} alt="Rewards" />
            </div>
            <p>Receive donor rewards and recognition.</p>
          </div>
          <div className="benefit-card">
            <div className="image-wrapper">
              <img src={star} alt="Be a hero" />
            </div>
            <p>Be a hero in your community.</p>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="impact-metrics">
        <h2>Impact Metrics</h2>
        <div className="metrics">
          <div className="metric">
            <h3>5000</h3>
            <p>Lives Saved</p>
          </div>
          <div className="metric">
            <h3>2000</h3>
            <p>Donors Registered</p>
          </div>
          <div className="metric">
            <h3>1500</h3>
            <p>Blood Drives Conducted</p>
          </div>
          <div className="metric">
            <h3>10000</h3>
            <p>Units of Blood Collected</p>
          </div>
        </div>
      </section>

      <section className="become-donor" id="make-a-donor">
        <h2>Become a Donor</h2>
        <p>Join our community of life-savers. Fill out the form to register as a blood donor.</p>
        {isSubmitted && (
          <div className="success-message">
            Congraduations! Donor registered successfully!
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
        <form className="donor-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="first-name">First Name</label>
            <input id="first-name" type="text" placeholder="First Name" name="firstName" value={formData.firstName}
              onChange={handleChange}/>
          </div>
          <div className="input-group">
            <label htmlFor="last-name">Last Name</label>
            <input id="last-name" type="text" placeholder="Last Name" name="lastName" value={formData.lastName}
              onChange={handleChange}/>
          </div>
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input id="age" type="number" placeholder="Age" name="age" value={formData.age}
              onChange={handleChange}/>
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <input id="gender" type="text" placeholder="Gender" name="gender" value={formData.gender}
              onChange={handleChange}/>
          </div>
          <div className="input-group">
            <label htmlFor="city">City</label>
            <input id="city" type="text" placeholder="City" name="city" value={formData.city}
              onChange={handleChange}/>
          </div>
          <div className="input-group">
            <label htmlFor="blood-group">Blood Group</label>
            <input id="blood-group" type="text" placeholder="Blood Group" name="bloodGroup" value={formData.bloodGroup}
              onChange={handleChange}/>
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" placeholder="Phone Number" name="phone" value={formData.phone}
              onChange={handleChange}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>


      {/* Footer Section */}
      <footer className="footer">
        <h2>Stay Updated</h2>
        <form className="newsletter">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </footer>
    </div>
  );
};

export default App;
