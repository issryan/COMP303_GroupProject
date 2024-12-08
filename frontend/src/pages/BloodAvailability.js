import React, { useState } from "react";
import "../App.css";
import availability from "../images/availability.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const BloodAvailability = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [availableBanks, setAvailableBanks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handleSearchClick = async () => {
    if (!bloodGroup) {
      setErrorMessage("Please enter a blood group to search.");
      setAvailableBanks([]);
      return;
    }

    setErrorMessage(null); // Clear previous errors
    setLoading(true); // Set loading to true

    try {
      // Fetch blood stocks by bloodGroup
      const stockResponse = await fetch(
        `http://localhost:8080/bloodstocks/availability/${bloodGroup}`
      );
      if (!stockResponse.ok) {
        throw new Error("Failed to fetch blood stocks.");
      }
      const stockData = await stockResponse.json();

      // If no stocks are found, show an appropriate message
      if (!stockData.length) {
        setErrorMessage("Sorry, we couldn't find any available stocks.");
        setAvailableBanks([]);
        setLoading(false); // Set loading to false
        return;
      }

      // Extract unique bloodBankIds from the stocks
      const bloodBankIds = [...new Set(stockData.map((stock) => stock.bloodBankId))];

      // Fetch blood banks information
      const bankResponses = await Promise.all(
        bloodBankIds.map((id) =>
          fetch(`http://localhost:8080/bloodbanks/${id}`).then((res) => res.json())
        )
      );

      // Combine bank information with stock quantity
      const banksWithStock = bankResponses.map((bank) => {
        const totalQuantity = stockData
          .filter((stock) => stock.bloodBankId === bank.id)
          .reduce((sum, stock) => sum + stock.quantity, 0);

        return {
          ...bank,
          quantity: totalQuantity,
        };
      });

      // Update the availableBanks state
      setAvailableBanks(banksWithStock);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while searching.");
      setAvailableBanks([]);
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  const handleScheduleClick = (phone) => {
    // Check if phone is available and then initiate the phone call
    if (phone) {
      const telLink = `tel:${phone}`;
      window.location.href = telLink;
    } else {
      setErrorMessage("Phone number not available.");
    }
  };

  return (
    <div className="app">
      <header className="header header-image pt-0">
        <div className="navbar">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <a href="/admin" className="link">
                  Admin
                </a>
              </li>
              <li>
                <a href="/#make-a-donor" className="link">
                  Become a Donor
                </a>
              </li>
              <li>
                <a href="#blood-availability" className="link active">
                  Blood Availability
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="blood-availability">
        {/* Banner Section */}
        <div className="banner">
          <img src={availability} alt="Banner" className="banner-image" />
          <div className="banner-overlay">
            <h1>Find Blood Banks</h1>
            <p>Select a blood group to find available blood banks.</p>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Enter blood group"
                value={bloodGroup}
                onChange={handleInputChange}
              />
              <button className="search-button" onClick={handleSearchClick}>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Blood Banks Section */}
        <section className="blood-banks-section">
          {loading && <p>Loading...</p>} {/* Loading message */}
          <h2>
            {errorMessage
              ? errorMessage
              : availableBanks.length
              ? "Available Blood Banks"
              : ""}
          </h2>
          <div className="blood-banks-list1">
            {availableBanks.map((bank, index) => (
              <div key={index} className="blood-bank-card">
                <h3>{bank.name}</h3>
                <p>
                  <strong>City:</strong> {bank.city}, <strong>Contact:</strong>{" "}
                  {bank.phone}, <strong>Available:</strong> {bank.quantity} units
                </p>
                <button
                  className="contact-button"
                  onClick={() => handleScheduleClick(bank.phone)} // Pass the contact phone
                >
                  Contact
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BloodAvailability;
