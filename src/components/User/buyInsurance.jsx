import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './buyInsurance.module.css';

function BuyInsurance() {
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/vehicles/${username}`);
        if (res.data.length > 0) {
          setVehicle(res.data[0]);
        } else {
          setError('No vehicle found. Please register your car first.');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch vehicle. Make sure you have one registered.');
      }
    };
    fetchVehicle();
  }, [username]);

  const handlePlanClick = (plan) => {
    // This is where you'd implement the purchase logic
    setMessage(`You selected the ${plan} plan.`);
  };

  return (
    <div className={`container ${styles.insurance_box}`}>
      <div className={styles.insurance_logoCombined}>
        <span className={`material-icons ${styles.insurance_logo}`} style={{ fontSize: '100px' }}>
          verified_user
        </span>
        <p className={styles.insurance_logoName}>Buy Insurance</p>
      </div>

      {error ? (
        <p className={styles.insurance_errorText}>{error}</p>
      ) : vehicle ? (
        <div className={styles.insurance_form}>
          <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model}</p>
          <p><strong>Year:</strong> {vehicle.year}</p>
          <p><strong>Plate:</strong> {vehicle.plateNumber}</p>

          <button className={styles.insurance_planCard} onClick={() => handlePlanClick('Basic')}>
            <h3 className={styles.insurance_planName}>
              Basic <span className={styles.insurance_planPrice}>150 SAR</span>
            </h3>
            <p className={styles.insurance_planDesc}>Third-party Coverage</p>
            <p className={styles.insurance_balanceText}>Your Balance: <span>SAR</span> • Remaining: <span>NaN SAR</span></p>
          </button>

          <button className={styles.insurance_planCard} onClick={() => handlePlanClick('Premium')}>
            <h3 className={styles.insurance_planName}>
              Premium <span className={styles.insurance_planPrice}>300 SAR</span>
            </h3>
            <p className={styles.insurance_planDesc}>Full Coverage</p>
            <p className={styles.insurance_balanceText}>Your Balance: <span>SAR</span> • Remaining: <span>NaN SAR</span></p>
          </button>

          {message && <p className={styles.insurance_successText}>{message}</p>}
        </div>
      ) : (
        <p className={styles.insurance_loading}>Loading vehicle information...</p>
      )}
    </div>
  );
}

export default BuyInsurance;
