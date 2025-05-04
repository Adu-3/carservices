import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Parking.css';

const ParkingPayment = () => {
  const [formData, setFormData] = useState({
    country: '',
    location: '',
    hours: 1,
    total: 10,
    carId: ''
  });

  const [availableLocations, setAvailableLocations] = useState([]);
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userCars, setUserCars] = useState([]);
  const [parkingRecords, setParkingRecords] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        // Fetch all required data in parallel
        const [userRes, carsRes, parkingRes] = await Promise.all([
          axios.get(`https://project.dubaisi.net/api/user/${username}`),
          axios.get(`https://project.dubaisi.net/api/vehicles/${username}`),
          axios.get(`https://project.dubaisi.net/api/parking/${username}`)
        ]);

        setBalance(userRes.data.balance);
        setUserCars(carsRes.data || []);
        setParkingRecords(parkingRes.data || []);
        setShowPaymentForm(parkingRes.data.length === 0);
        
      } catch (error) {
        console.error('Error loading data:', error);
        setMessage('Error loading data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [username]);

  useEffect(() => {
    const fetchLocations = async () => {
      if (formData.country) {
        try {
          const response = await axios.get(
            `https://project.dubaisi.net/api/parking-locations?country=${formData.country}`
          );
          setAvailableLocations(response.data.parkingLocations || []);
        } catch (error) {
          console.error('Error fetching locations:', error.message);
          setMessage('Failed to load parking locations. Please try again.');
        }
      }
    };

    fetchLocations();
  }, [formData.country]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'hours' ? { total: value * 10 } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.country || !formData.location || !formData.carId) {
      setMessage('Please fill all required fields');
      return;
    }

    try {
      const now = new Date();
      const endTime = new Date(now.getTime() + formData.hours * 60 * 60 * 1000);
      const selectedCar = userCars.find(car => car._id === formData.carId);

      if (!selectedCar) {
        setMessage('Selected car not found');
        return;
      }

      const response = await axios.post('https://project.dubaisi.net/api/pay-parking', {
        username,
        amount: formData.total,
        carId: formData.carId,
        location: formData.location,
        country: formData.country,
        startTime: now,
        endTime: endTime,
        carDetails: {
          make: selectedCar.make,
          model: selectedCar.model,
          plateNumber: selectedCar.plateNumber
        }
      });

      // Update state with new parking record
      setParkingRecords(prev => [
        ...prev,
        {
          ...response.data.parking,
          carDetails: selectedCar
        }
      ]);
      
      setBalance(response.data.newBalance);
      setShowPaymentForm(false);
      setMessage(`Payment successful! Remaining balance: ${response.data.newBalance} SAR`);
      
      // Reset form
      setFormData({
        country: '',
        location: '',
        hours: 1,
        total: 10,
        carId: ''
      });
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'Payment failed. Please try again.');
      console.error('Payment failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="parking-payment-container">
        <div className="loading">Loading parking data...</div>
      </div>
    );
  }

  return (
    <div className="parking-payment-container">
      <h2>Parking Management</h2>
      
      {message && (
        <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {/* Display active parking records */}
      {parkingRecords.length > 0 && !showPaymentForm && (
        <div className="parking-records">
          
          {parkingRecords.map((record, index) => (
  <div key={record._id || index} className="parking-card" style={{ marginBottom: '20px' }}>
              <div className="card-header">
                <h4>Receipt #{index + 1}</h4>
                <span className={`status-badge ${
                  new Date(record.endTime) > new Date() ? 'active' : 'expired'
                }`}>
                  {new Date(record.endTime) > new Date() ? 'ACTIVE' : 'EXPIRED'}
                </span>
              </div>
              
              <div className="card-body">
                <div className="detail-row">
                  <span className="detail-label">Vehicle:</span>
                  <span className="detail-value">
                    {record.car?.make || record.carDetails?.make} {record.car?.model || record.carDetails?.model}
                    ({record.car?.plateNumber || record.carDetails?.plateNumber})
                  </span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">
                    {record.location}, {record.country}
                  </span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">
                    {record.hours || Math.round((new Date(record.endTime) - new Date(record.startTime)) / (60 * 60 * 1000))} hours
                  </span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">
                    {new Date(record.startTime).toLocaleString()} - {new Date(record.endTime).toLocaleString()}
                  </span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">{record.amount} SAR</span>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => setShowPaymentForm(true)}
            className="submit-button"
          >
            Book New Parking
          </button>
        </div>
      )}

      {/* Payment Form */}
      {showPaymentForm && (
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
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
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!formData.country}
              required
            >
              <option value="">Select Location</option>
              {availableLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Your Car</label>
            <select
              name="carId"
              value={formData.carId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Car</option>
              {userCars.length > 0 ? (
                userCars.map(car => (
                  <option key={car._id} value={car._id}>
                    {car.make} {car.model} ({car.plateNumber})
                  </option>
                ))
              ) : (
                <option value="" disabled>No vehicles registered</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Hours ({formData.total} SAR total)</label>
            <input
              type="range"
              name="hours"
              min="1"
              max="24"
              value={formData.hours}
              onChange={handleInputChange}
              disabled={!formData.location}
            />
            <div className="hours-display">
              {formData.hours} hour{formData.hours !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={!formData.location || !formData.carId}
            >
              Pay Now
            </button>
            
            {parkingRecords.length > 0 && (
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowPaymentForm(false)}
              >
                View Parking
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ParkingPayment;