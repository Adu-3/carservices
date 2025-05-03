import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Parking.css';

const ParkingPayment = () => {
  const [formData, setFormData] = useState({
    country: '',
    location: '',
    hours: 1,
    total: 10 // Fixed amount of 10 SAR for all vehicle types
  });

  const [availableLocations, setAvailableLocations] = useState([]);  // Dynamically fetched locations
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(0); // Initially set to 0
  const [loading, setLoading] = useState(true);

  // Fetch initial data (including balance) from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const username = localStorage.getItem('username'); // Assuming the username is saved in local storage

        // Fetch user balance
        const userRes = await axios.get(`http://localhost:5000/api/user/${username}`);
        setBalance(userRes.data.balance);
      } catch (error) {
        console.error('Failed to load data:', error.message);
        setMessage('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch locations for the selected country
  useEffect(() => {
    const fetchLocations = async () => {
      if (formData.country) {
        try {
          const response = await axios.get(`http://localhost:5000/api/parking-locations?country=${formData.country}`);
          console.log("Response data: ", response.data);  // Log to check response structure
          setAvailableLocations(response.data.parkingLocations || []);
        } catch (error) {
          console.error('Error fetching parking locations:', error.message);
          setMessage('Failed to load parking locations. Please try again.');
        }
      }
    };

    fetchLocations();
  }, [formData.country]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData({
      country,
      location: '',
      hours: 1,
      total: 10 // Set to a fixed amount of 10 SAR for all
    });
    console.log("Selected Country:", country);  // Log selected country
    setMessage('');  // Clear any previous messages
  };

  const handleLocationChange = (e) => {
    setFormData(prev => ({
      ...prev,
      location: e.target.value,
      hours: 1,
      total: 10 // Set to a fixed amount of 10 SAR for all
    }));
  };

  const handleHoursChange = (e) => {
    const hours = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      hours,
      total: hours * 10 // 10 SAR for every hour
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.country || !formData.location) {
      setMessage('Please fill all fields');
      return;
    }

    // Check if the balance is sufficient
    if (balance >= formData.total) {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.post('http://localhost:5000/api/pay-parking', {
          username,
          amount: formData.total
        });

        // Update balance from response
        setBalance(response.data.newBalance);
        setMessage(`Payment successful for ${formData.hours} hour(s) at ${formData.location}. Remaining Balance: ${response.data.newBalance} SAR`);
      } catch (error) {
        setMessage('Payment failed. Please try again.');
        console.error('Payment failed:', error);
      }
    } else {
      setMessage('Insufficient balance.');
    }

    // Reset form fields
    setFormData(prev => ({
      ...prev,
      location: '',
      hours: 1,
      total: 10 // Fixed amount after reset
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="parking-payment-container">
      <h2>Pay for Parking</h2>
      {message && (
        <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Country</label>
          <select value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Dubai">Dubai</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Bahrain">Bahrain</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <select
            value={formData.location}
            onChange={handleLocationChange}
            disabled={!formData.country}
            required
          >
            <option value="">Select Location</option>
            {availableLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Hours ({formData.total} SAR total)</label>
          <input
            type="range"
            min="1"
            max="24"
            value={formData.hours}
            onChange={handleHoursChange}
            disabled={!formData.location}
          />
          <div className="hours-display">
            {formData.hours} hour{formData.hours !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="total-amount">
          <h3>Total Amount: {formData.total} SAR</h3>
        </div>

        <button 
          type="submit" 
          className="submit-button" 
          disabled={!formData.location}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default ParkingPayment;
