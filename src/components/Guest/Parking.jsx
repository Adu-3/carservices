import React, { useState } from 'react';
import './Parking.css';

const countryData = {
  'Saudi Arabia': ['Riyadh Park Mall', 'Kingdom Centre', 'Red Sea Mall', 'Makkah Mall'],
  'Dubai': ['Dubai Mall', 'Mall of the Emirates', 'Ibn Battuta Mall', 'City Centre Deira'],
  'Kuwait': ['The Avenues Mall', '360 Mall', 'Marina Mall', 'Al Kout Mall'],
  'Bahrain': ['City Centre Bahrain', 'Seef Mall', 'Dana Mall', 'Bahrain Mall']
};

const vehicleTypes = [
  { id: 1, name: 'Small Car', rate: 10 },
  { id: 2, name: 'Large Car/SUV', rate: 15 },
  { id: 3, name: 'Motorcycle', rate: 5 },
  { id: 4, name: 'Truck/Bus', rate: 25 }
];

const ParkingPayment = () => {
  const [formData, setFormData] = useState({
    country: '',
    location: '',
    vehicleType: '',
    hours: 1,
    total: 0
  });

  const [availableLocations, setAvailableLocations] = useState([]);
  const [message, setMessage] = useState('');

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData({
      country,
      location: '',
      vehicleType: '',
      hours: 1,
      total: 0
    });
    setAvailableLocations(countryData[country] || []);
    setMessage('');
  };

  const handleLocationChange = (e) => {
    setFormData(prev => ({
      ...prev,
      location: e.target.value,
      vehicleType: '',
      hours: 1,
      total: 0
    }));
  };

  const handleVehicleChange = (e) => {
    const vehicleId = parseInt(e.target.value);
    const selectedVehicle = vehicleTypes.find(v => v.id === vehicleId);
    setFormData(prev => ({
      ...prev,
      vehicleType: vehicleId,
      hours: 1,
      total: selectedVehicle ? selectedVehicle.rate : 0
    }));
  };

  const handleHoursChange = (e) => {
    const hours = parseInt(e.target.value);
    const selectedVehicle = vehicleTypes.find(v => v.id === parseInt(formData.vehicleType));
    if (selectedVehicle) {
      setFormData(prev => ({
        ...prev,
        hours,
        total: hours * selectedVehicle.rate
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedVehicle = vehicleTypes.find(v => v.id === parseInt(formData.vehicleType));
    if (!formData.country || !formData.location || !selectedVehicle) {
      setMessage('Please fill all fields');
      return;
    }

    setMessage(`Payment successful for ${formData.hours} hour(s) at ${formData.location} for ${selectedVehicle.name}`);
    setFormData(prev => ({
      ...prev,
      vehicleType: '',
      hours: 1,
      total: 0
    }));
  };

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
            {Object.keys(countryData).map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
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
          <label>Vehicle Type</label>
          <select
            value={formData.vehicleType}
            onChange={handleVehicleChange}
            disabled={!formData.location}
            required
          >
            <option value="">Select Vehicle</option>
            {vehicleTypes.map(vehicle => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name} ({vehicle.rate} SAR/hour)
              </option>
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
            disabled={!formData.vehicleType}
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
          disabled={!formData.vehicleType}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default ParkingPayment;
