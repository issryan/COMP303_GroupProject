import React, { useState, useEffect } from "react";
import "../App.css";
import profile from "../images/profile.png"; 
import history from "../images/history.png";
import { useNavigate, useParams } from "react-router-dom";

const DonationHistory = () => {
  const navigate = useNavigate();
  const { donorId } = useParams();
  const [donations, setDonations] = useState([]);
  const [donor, setDonor] = useState(null);
  const [bloodBanks, setBloodBanks] = useState([]); // State to hold blood bank data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [errorBanks, setErrorBanks] = useState(null);

  // Fetch donor details based on donorId
  const fetchDonorData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/donors/${donorId}`);
      const data = await response.json();
      setDonor(data); // Set donor data to state
    } catch (err) {
      setError("Failed to fetch donor data");
      console.error(err);
    }
  };

  // Fetch blood banks
  const fetchBloodBanks = async () => {
    setLoadingBanks(true);
    setErrorBanks(null);
    try {
      const response = await fetch("http://localhost:8080/bloodbanks");
      if (!response.ok) {
        throw new Error("Failed to fetch blood banks");
      }
      const data = await response.json();
      setBloodBanks(data);
    } catch (err) {
      setErrorBanks(err.message);
    } finally {
      setLoadingBanks(false);
    }
  };

  // Fetch donations
  const fetchDonations = async () => {
    try {
      const response = await fetch(`http://localhost:8080/donations/${donorId}/history`);
      const data = await response.json();
  
      const completedDonations = data.filter(donation => donation.status === "complete");
  
      setDonations(completedDonations);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch donations:", err);
    }
  };

  const getBloodBankName = (id) => {
    const bank = bloodBanks.find((bank) => bank.id === id);
    return bank ? bank.name : "Unknown";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Go back to the previous page
  const handleBack = () => {
    navigate(-1); // Use navigate(-1) to go back
  };

  useEffect(() => {
    fetchDonorData(); // Fetch donor data
    fetchDonations(); // Fetch donation data
    fetchBloodBanks();
  }, [donorId]);

  return (
    <div className="donation-history">
      {/* Page Title */}
      <div className="image-container">
        <img src={history} alt="Donation History" className="admin-image" />
        <div className="overlay">
          <h1>Donation History</h1>
        </div>
      </div>

      {/* Donor Info Section */}
      <div className="profile-info mt-3">
        <img src={profile} alt="Profile" className="profile-picture" />
        <h2>{donor ? `${donor.firstName} ${donor.lastName}` : "Loading..."}</h2> {/* Show donor's name */}
      </div>

      <button className="back-button" onClick={handleBack}>Back</button>

      {/* Loading or Error Handling */}
      {loading && <p>Loading donation history...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Donation Cards Section */}
      <div className="donation-cards">
        {donations.length > 0 ? (
          donations.map((donation, index) => (
            <div className="donation-card" key={index}>
              <h2 className="card-title">{formatDate(donation.donationDate)}</h2>
              <div className="card-content">
                <p><strong>Blood Bank:</strong> {getBloodBankName(donation.bankId)}</p> {/* Show blood bank name */}
                <p><strong>Blood Group:</strong> {donation.bloodGroup}</p>
                <p><strong>Quantity Donated:</strong> {donation.quantityDonated} Units</p>
              </div>
            </div>
          ))
        ) : (
          <p>No blood donations yet.</p>
        )}
      </div>
    </div>
  );
};

export default DonationHistory;
