import React, { useState, useEffect } from "react";
import "../App.css";
import add from "../images/schedule.jpeg";
import logo from "../images/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";

const ScheduleDonation = () => {
  const { donorId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    donationDate: "",
    bankId: "",
    donorId: "",
    status: "",
    quantityDonated: "",
    timeSlot: "",
    bloodGroup: "", // Start with an empty blood group, will be populated later
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // Sample timeslot list
  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
  ];

  // Fetch the donor's information, including the blood group
  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/donors/${donorId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch donor information.");
        }
        const donorData = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          bloodGroup: donorData.bloodGroup, // Set the blood group from the donor data
        }));
      } catch (error) {
        setErrorMessage("Error fetching donor information.");
      }
    };

    fetchDonorData();
  }, [donorId]);

  // Fetch the blood banks from the API
  useEffect(() => {
    const fetchBloodBanks = async () => {
      try {
        const response = await fetch("http://localhost:8080/bloodbanks");
        if (!response.ok) {
          throw new Error("Failed to fetch blood banks.");
        }
        const banks = await response.json();
        setBloodBanks(banks);
      } catch (error) {
        setErrorMessage("Error fetching blood banks.");
      }
    };

    fetchBloodBanks();
  }, []);

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
    if (formData.date && formData.bloodBank && formData.timeSlot) {
      try {
        const response = await fetch("http://localhost:8080/donations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            donationDate: formData.date,
            bankId: formData.bloodBank,
            donorId: donorId,
            timeSlot: formData.timeSlot,
            bloodGroup: formData.bloodGroup,
            status: 'pending'
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to schedule the donation.");
        }

        setIsSubmitted(true);
        setTimeout(() => {
          navigate(`/profile/${donorId}`); // Redirect to the profile page after success
        }, 2000); // Wait for the success message to be shown
      } catch (error) {
        setErrorMessage(error.message || "An error occurred while scheduling the donation.");
      }
    } else {
      alert("Please fill in all the fields before confirming.");
    }
  };

  const handleCancel = () => {
    navigate(-1); // This will take you back to the previous page
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
              <li><a href="/admin" className="link">Admin</a></li>
              <li><a href="/#make-a-donor" className="link">Become a Donor</a></li>
              <li><a href="/blood-availability" className="link">Blood Availability</a></li>
            </ul>
          </nav>
        </div>
        <div className="image-container">
          <img src={add} alt="Admin Panel Banner" className="admin-image" />
        </div>
      </header>
      
      <div className="schedule-donation">
        {/* Error or Success Message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {isSubmitted && (
          <div className="success-message">
            Your donation appointment has been successfully scheduled!
          </div>
        )}

        {/* Form Section */}
        <h1>Schedule a Donation</h1>
        <form className="donation-form" onSubmit={handleSubmit}>
          {/* Select a Date */}
          <div className="form-group">
            <label htmlFor="date">Select a Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              className="date-input"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Select a Blood Bank */}
          <div className="form-group">
            <label htmlFor="bloodBank">Select a Blood Bank:</label>
            <select
              id="bloodBank"
              name="bloodBank"
              value={formData.bloodBank}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose a Blood Bank --</option>
              {bloodBanks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select a Time */}
          <div className="form-group">
            <label htmlFor="timeSlot">Select a Time:</label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose a Time Slot --</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Blood Group (Disabled Input) */}
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group:</label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              className="blood-group-input"
              disabled
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="confirm-button">
              Confirm Appointment
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleDonation;
