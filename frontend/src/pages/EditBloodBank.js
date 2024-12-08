import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import add from "../images/bank.png";
import "../App.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditBloodBank = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the blood bank ID from the URL

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    website: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing blood bank data
  useEffect(() => {
    const fetchBloodBank = async () => {
      try {
        const response = await fetch(`http://localhost:8080/bloodbanks/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blood bank data.");
        }
        const data = await response.json();
        setFormData({
          name: data.name || "",
          address: data.address || "",
          city: data.city || "",
          phone: data.phone || "",
          website: data.website || "",
          email: data.email || "",
        });
        setError(null);
      } catch (err) {
        setError(err.message || "An error occurred while fetching the data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBloodBank();
  }, [id]);

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

    // Basic validation
    if (!formData.name || !formData.address || !formData.city || !formData.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/bloodbanks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update blood bank.");
      }

      // Handle success
      setIsSubmitted(true);
      setError(null); // Clear error

      // Redirect to admin page after success
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred while updating the blood bank.");
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <img src={add} alt="Edit Blood Bank Banner" className="admin-image" />
        </div>
      </header>

      {/* Edit Blood Bank Section */}
      <section>
        <h2>Edit Blood Bank</h2>

        {isSubmitted && (
          <div className="success-message">
            Blood bank updated successfully! Redirecting to admin page...
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form className="donor-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="123 Street Dr"
              value={formData.address}
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
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions bottom-buttons">
            <button type="submit" className="submit-button">Update</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditBloodBank;
