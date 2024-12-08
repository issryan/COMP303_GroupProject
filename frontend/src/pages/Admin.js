import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import admin from "../images/admin.jpg";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const handleAddDonorClick = () => {
    navigate("/add-donor");
  };

  const handleAddBloodBankClick = () => {
    navigate("/add-blood-bank");
  };

  const handleAddBloodStockClick = () => {
    navigate("/add-blood-stock");
  };

  // State for donors data
  const [donors, setDonors] = useState([]);
  const [loadingDonors, setLoadingDonors] = useState(false);
  const [errorDonors, setErrorDonors] = useState(null);

  // State for blood banks data
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [errorBanks, setErrorBanks] = useState(null);

  // State for blood stocks data
  const [bloodStocks, setBloodStocks] = useState([]);
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [errorStocks, setErrorStocks] = useState(null);

  const [donations, setDonations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [quantityDonated, setQuantityDonated] = useState("");
  const [status, setStatus] = useState("pending");

  // Fetch donors
  const fetchDonors = async () => {
    setLoadingDonors(true);
    setErrorDonors(null);
    try {
      const response = await fetch("http://localhost:8080/donors");
      if (!response.ok) {
        throw new Error("Failed to fetch donors");
      }
      const data = await response.json();
      setDonors(data);
    } catch (err) {
      setErrorDonors(err.message);
    } finally {
      setLoadingDonors(false);
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

  // Fetch blood stocks
  const fetchBloodStocks = async () => {
    setLoadingStocks(true);
    setErrorStocks(null);
    try {
      const response = await fetch("http://localhost:8080/bloodstocks");
      if (!response.ok) {
        throw new Error("Failed to fetch blood stocks");
      }
      const data = await response.json();
      setBloodStocks(data);
    } catch (err) {
      setErrorStocks(err.message);
    } finally {
      setLoadingStocks(false);
    }
  };

  // Fetch donations
  const fetchDonations = async () => {
    try {
      const response = await fetch("http://localhost:8080/donations");
      const data = await response.json();
  
      // Filter the donations to only include those with a "pending" status
      const pendingDonations = data.filter(donation => donation.status === "pending");
  
      // Set only the pending donations
      setDonations(pendingDonations);
    } catch (err) {
      console.error("Failed to fetch donations:", err);
    }
  };
  

  // Fetch data when component mounts
  useEffect(() => {
    fetchDonors();
    fetchBloodBanks();
    fetchBloodStocks();
    fetchDonations();
  }, []);

  const handleProfileClick = (donorId) => {
    navigate(`/profile/${donorId}`);
  };

  const handleBankEditClick = (bankId) => {
    navigate(`/edit-blood-bank/${bankId}`);
  };

  const handleStockEditClick = (stockId) => {
    navigate(`/edit-blood-stock/${stockId}`);
  };

  // Helper function to get blood bank name by ID
  const getBloodBankName = (id) => {
    const bank = bloodBanks.find((bank) => bank.id === id);
    return bank ? bank.name : "Unknown";
  };

  // Helper function to format date as YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Helper function to get donor name by ID
  const getDonorName = (donorId) => {
    const donor = donors.find((d) => d.id === donorId);
    return donor ? `${donor.firstName} ${donor.lastName}` : "Unknown";
  };

  // Handle modal open
  const handleUpdateClick = (donation) => {
    setSelectedDonation(donation);
    setQuantityDonated(donation.quantityDonated || "");
    setStatus(donation.status || "pending");
    setModalVisible(true);
  };

  // Handle modal close
  const closeModal = () => {
    setModalVisible(false);
    setSelectedDonation(null);
    setQuantityDonated("");
    setStatus("pending");
  };

  // Handle donation update
  const handleSaveChanges = async () => {
    const updatedDonation = {
      ...selectedDonation,
      quantityDonated,
      status,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/donations/${selectedDonation.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDonation),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update donation.");
      }
      fetchDonations(); // Reload donations
      closeModal(); // Close the modal
    } catch (error) {
      console.error("Error updating donation:", error);
    }
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
                <a href="/admin" className="link active">Admin</a>
              </li>
              <li>
                <a href="/#make-a-donor" className="link">Become a Donor</a>
              </li>
              <li>
                <a href="/blood-availability" className="link">Blood Availability</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="image-container">
          <img src={admin} alt="Admin Panel Banner" className="admin-image" />
          <div className="overlay">
            <h1>Admin Panel</h1>
          </div>
        </div>
      </header>

      {/* Donors List Section */}
      <section className="donors-list">
        <div className="section-header">
          <h2>Donors List</h2>
          <button className="btn add-btn" onClick={handleAddDonorClick}>Add a Donor</button>
        </div>
        {loadingDonors && <p>Loading donors...</p>}
        {errorDonors && <p style={{ color: "red" }}>{errorDonors}</p>}
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>City</th>
              <th>Phone Number</th>
              <th>Blood Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id}>
                <td>{donor.firstName}</td>
                <td>{donor.lastName}</td>
                <td>{donor.age}</td>
                <td>{donor.gender}</td>
                <td>{donor.city}</td>
                <td>{donor.phone}</td>
                <td>{donor.bloodGroup}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleProfileClick(donor.id)}
                  >
                    Edit Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Blood Banks List Section */}
      <section className="blood-banks-list">
        <div className="section-header">
          <h2>Blood Bank List</h2>
          <button className="btn add-btn" onClick={handleAddBloodBankClick}>
            Add a Blood Bank
          </button>
        </div>
        {loadingBanks && <p>Loading blood banks...</p>}
        {errorBanks && <p style={{ color: "red" }}>{errorBanks}</p>}
        <table>
          <thead>
            <tr>
              <th>Blood Bank Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bloodBanks.map((bank) => (
              <tr key={bank.id}>
                <td>{bank.name}</td>
                <td>{bank.city}</td>
                <td>{bank.address}</td>
                <td>{bank.phone}</td>
                <td>
                  <a href={bank.website} target="_blank" rel="noopener noreferrer">
                    {bank.website}
                  </a>
                </td>
                <td>{bank.email}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleBankEditClick(bank.id)}
                  >
                    View and Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Blood Stock List Section */}
      <section className="blood-stock-list">
        <div className="section-header">
          <h2>Blood Stock List</h2>
          <button className="btn add-btn" onClick={handleAddBloodStockClick}>
            Add Blood Stock
          </button>
        </div>
        {loadingStocks && <p>Loading stocks...</p>}
        {errorStocks && <p style={{ color: "red" }}>{errorStocks}</p>}
        <table>
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Blood Bank</th>
              <th>Quantity</th>
              <th>Best Before</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bloodStocks.map((stock) => (
              <tr key={stock.id}>
                <td>{stock.bloodGroup}</td>
                <td>{getBloodBankName(stock.bloodBankId)}</td>
                <td>{stock.quantity}</td>
                <td>{formatDate(stock.bestBefore)}</td>
                <td>{stock.status}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleStockEditClick(stock.id)}
                  >
                    View and Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
     {/* Donation Appointments Section */}
     <section className="donation-appointments">
        <div className="section-header">
          <h2>Pending Donation Appointments</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Blood Bank Name</th>
              <th>Scheduled Date</th>
              <th>Timeslot</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{getDonorName(donation.donorId)}</td>
                <td>{getBloodBankName(donation.bankId)}</td>
                <td>{formatDate(donation.donationDate)}</td>
                <td>{donation.timeSlot}</td>
                <td>{donation.bloodGroup}</td>
                <td>{donation.status}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleUpdateClick(donation)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal for updating donation */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update this Appointment</h2>
            <form>
              <div className="form-group">
                <label htmlFor="quantityDonated">Quantity Donated:</label>
                <input
                  type="number"
                  id="quantityDonated"
                  value={quantityDonated}
                  className="width-300"
                  onChange={(e) => setQuantityDonated(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  value={status}
                  className="width-300"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="complete">Complete</option>
                </select>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn save-btn"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
