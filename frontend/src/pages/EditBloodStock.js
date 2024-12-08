import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import add from "../images/stock.png";
import "../App.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditBloodStock = () => {
  const { id } = useParams(); // Get stockId from route params
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    bloodGroup: "",
    quantity: "",
    bestBefore: "",
    status: "",
    bloodBankId: "",
  });

  // State for blood banks dropdown
  const [bloodBanks, setBloodBanks] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true); // To indicate data fetch status

  // Fetch blood banks for the dropdown
  useEffect(() => {
    const fetchBloodBanks = async () => {
      try {
        const response = await fetch("http://localhost:8080/bloodbanks");
        if (!response.ok) {
          throw new Error("Failed to fetch blood banks.");
        }
        const data = await response.json();
        setBloodBanks(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBloodBanks();
  }, []);

  // Fetch blood stock data for the given stockId
  useEffect(() => {
    const fetchBloodStock = async () => {
      try {
        const response = await fetch(`http://localhost:8080/bloodstocks/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blood stock.");
        }
        const data = await response.json();
         // Format the bestBefore date to YYYY-MM-DD
      const formattedDate = data.bestBefore
      ? new Date(data.bestBefore).toISOString().split("T")[0]
      : "";

    setFormData({
      bloodGroup: data.bloodGroup || "",
      quantity: data.quantity || "",
      bestBefore: formattedDate,
      status: data.status || "",
      bloodBankId: data.bloodBankId || "",
    });
    setLoading(false);
  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};

    fetchBloodStock();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update the blood stock
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.bloodGroup ||
      !formData.quantity ||
      !formData.bestBefore ||
      !formData.status ||
      !formData.bloodBankId
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/bloodstocks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update blood stock.");
      }

      // Handle success
      setIsSubmitted(true);
      setError(null); // Clear error
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred while updating the blood stock.");
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate to the previous page
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

      {/* Edit Blood Stock Section */}
      <section className="become-donor">
        <h2>Edit Blood Stock</h2>

        {isSubmitted && (
          <div className="success-message">
            Blood stock updated successfully! Redirecting to admin page...
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form className="donor-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="bloodGroup">Blood Group</label>
              <input
                id="bloodGroup"
                name="bloodGroup"
                type="text"
                placeholder="e.g., A+"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="bestBefore">Best Before</label>
              <input
                id="bestBefore"
                name="bestBefore"
                type="date"
                value={formData.bestBefore}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="status">Status</label>
              <input
                id="status"
                name="status"
                type="text"
                placeholder="e.g., Very Low"
                value={formData.status}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="bloodBankId">Blood Bank</label>
              <select
                id="bloodBankId"
                name="bloodBankId"
                value={formData.bloodBankId}
                onChange={handleChange}
                className="input-select"
              >
                <option value="">Select a Blood Bank</option>
                {bloodBanks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-actions bottom-buttons">
              <button type="submit" className="submit-button">Update</button>
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default EditBloodStock;
