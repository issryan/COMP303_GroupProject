import React, { useState, useEffect } from "react";
import "../App.css"; 
import profile from "../images/profile.png"; 
import banner from "../images/banner.png";
import { Link, useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams(); // Get the donor ID from the URL
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonor = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/donors/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch donor");
        }
        const data = await response.json();
        setDonor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, [id]);

  const handleSaveChanges = async (e) => {
    console.log('hi')
    e.preventDefault();
    const updatedDonor = {
      firstName: donor.firstName,
      lastName: donor.lastName,
      age: donor.age,
      gender: donor.gender,
      city: donor.city,
      phone: donor.phone,
      bloodGroup: donor.bloodGroup,
    };

    try {
      const response = await fetch(`http://localhost:8080/donors/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDonor),
      });

      if (!response.ok) {
        throw new Error("Failed to update donor profile");
      }

      setSuccessMessage("Profile updated successfully!"); // Set success message
      setTimeout(() => {
        navigate("/admin"); // Redirect to admin page after 2 seconds
      }, 2000);
    } catch (err) {
      console.error(err.message);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!donor) return <p>Donor not found.</p>;

  const handleScheduleClick = (donorId) => {
    navigate(`/schedule/${donorId}`);
  };

  return (
    <div className="profile-page">
      {/* Banner Section */}
      <div className="banner">
        <img src={banner} alt="Banner" className="banner-image" />
      </div>
      <div className="profile-info">
        <img src={profile} alt="Profile" className="profile-picture" />
        <h2>
          {donor.firstName} {donor.lastName} <span className="verified-badge">✔️</span>
        </h2>
      </div>

      {/* Edit Profile Section */}
      <div className="edit-profile">
        <h1>Edit Donor Profile</h1>

        {/* Success Message */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Contact Information Form */}
        <form className="profile-form" onSubmit={handleSaveChanges}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={donor.firstName + " " + donor.lastName} disabled />
          </div>

          <h2>Contact Information</h2>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input
                id="first-name"
                type="text"
                value={donor.firstName}
                onChange={(e) => setDonor({ ...donor, firstName: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                id="last-name"
                type="text"
                value={donor.lastName}
                onChange={(e) => setDonor({ ...donor, lastName: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label htmlFor="dob">Age</label>
              <input
                id="dob"
                type="text"
                value={donor.age}
                onChange={(e) => setDonor({ ...donor, age: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label htmlFor="gender">Gender</label>
              <input
                id="gender"
                type="text"
                value={donor.gender}
                onChange={(e) => setDonor({ ...donor, gender: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                value={donor.city}
                onChange={(e) => setDonor({ ...donor, city: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={donor.phone}
                onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label htmlFor="blood-group">Blood Group</label>
              <input
                id="blood-group"
                type="text"
                value={donor.bloodGroup}
                onChange={(e) => setDonor({ ...donor, bloodGroup: e.target.value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn action-btn">
              Save Changes
            </button>
            <button type="button" className="btn action-btn" onClick={() => navigate("/admin")}>
              Cancel
            </button>
            <button type="button" className="btn action-btn" onClick={() => navigate(`/history/${id}`)}>
              Donation History
            </button>
            <button type="button" className="btn action-btn" onClick={() => handleScheduleClick(id)}>
              Schedule Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
