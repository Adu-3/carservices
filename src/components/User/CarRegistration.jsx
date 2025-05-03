import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CarRegistrationStyle.module.css';

function CarRegistrationPage() {
  const [vehicle, setVehicle] = useState(null);
  const [formData, setFormData] = useState({
    nickname: '',
    ownerName: '',
    color: '',
    year: '',
    make: '',
    model: '',
    country: '',
    plateNumber: ''
  });
  const [message, setMessage] = useState('');

  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/vehicles/${username}`);
        if (res.data.length > 0) {
          setVehicle(res.data[0]);
        }
      } catch (err) {
        console.error('Error fetching vehicle:', err);
      }
    };
    fetchVehicle();
  }, [username]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...formData, username };
      const res = await axios.post('http://localhost:5000/api/vehicles', payload);
      setVehicle(res.data.vehicle);
      setMessage('Car registered successfully.');
    } catch (err) {
      console.error('Registration failed:', err);
      setMessage('Failed to register car.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${vehicle._id}`);
      setVehicle(null);
      setMessage('Car deleted successfully.');
    } catch (err) {
      console.error('Deletion failed:', err);
      setMessage('Failed to delete car.');
    }
  };

  return (
    <div className={`container ${styles.box}`}>
      <div className={styles.logoCombined}>
        <span className={`material-icons ${styles.logo}`} style={{ fontSize: '100px' }}>directions_car</span>
        <p className={styles.logoName}>Car Registration</p>
      </div>

      {vehicle ? (
        <div className={styles.form}>
          <p><strong>Nickname:</strong> {vehicle.nickname}</p>
          <p><strong>Owner:</strong> {vehicle.ownerName}</p>
          <p><strong>Color:</strong> {vehicle.color}</p>
          <p><strong>Year:</strong> {vehicle.year}</p>
          <p><strong>Make:</strong> {vehicle.make}</p>
          <p><strong>Model:</strong> {vehicle.model}</p>
          <p><strong>Country:</strong> {vehicle.country}</p>
          <p><strong>Plate Number:</strong> {vehicle.plateNumber}</p>

          <button className={styles.deleteButton} onClick={handleDelete}>Delete Car</button>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div className={styles.form}>
          {['nickname', 'ownerName', 'color', 'year', 'make', 'model', 'country', 'plateNumber'].map((field) => (
            <div key={field} className={styles.formInput}>
              <input
                type={field === 'year' ? 'number' : 'text'}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            </div>
          ))}

          <button onClick={handleSubmit} className={styles.addCarButton}>Register Car</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default CarRegistrationPage;
