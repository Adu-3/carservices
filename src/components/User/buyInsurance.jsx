import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './buyInsurance.module.css';

function BuyInsurance() {
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState('');
  const [period, setPeriod] = useState('7 days');
  const [basePrice, setBasePrice] = useState({ Basic: 15, Premium: 35 });
  const [selectedPlan, setSelectedPlan] = useState('');
  const [insuranceActive, setInsuranceActive] = useState(false);

  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const gccCountries = [
    'Saudi Arabia', 'United Arab Emirates', 'Kuwait',
    'Qatar', 'Oman', 'Bahrain'
  ];

  const periodMultipliers = {
    '3 days': 1,
    '7 days': 2,
    '1 month': 7,
    '3 months': 18,
    '1 year': 60
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/vehicles/${username}`);
        const vehicles = res.data;
  
        if (!vehicles || vehicles.length === 0) {
          setError('No vehicle found. Please register your car first.');
          return;
        }
  
        const v = vehicles[0];
  
        // Case: No insurance
        if (!v.insurance || !v.insurance._id) {
          setVehicle(v);
          return;
        }
  
        // Case: Has insurance — check expiration
        const now = new Date();
        const end = new Date(v.insurance.endDate);
  
        if (now > end) {
          // Expired → delete insurance and unlink from vehicle (safely)
          try {
            if (v.insurance && v.insurance._id) {
              await axios.delete(`http://localhost:5000/api/insurances/${v.insurance._id}`);
              await axios.put(`http://localhost:5000/api/vehicles/${v._id}`, {
                insurance: null
              });
            }
          } catch (cleanupErr) {
            console.error('Error cleaning up expired insurance:', cleanupErr);
          }
  
          setVehicle({ ...v, insurance: null });
        } else {
          // Still valid
          setVehicle(v);
          setInsuranceActive(true);
        }
      } catch (err) {
        console.error('Error fetching vehicle:', err);
        setError('Failed to fetch vehicle. Make sure you have one registered.');
      }
    };
  
    fetchVehicle();
  }, [username]);
  
  

  const getFinalPrice = (plan) => {
    return Math.round(basePrice[plan] * periodMultipliers[period]);
  };

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setMessage(`You selected the ${plan} plan for ${period} in ${country}. Total: ${getFinalPrice(plan)} SAR`);
  };

  const handlePurchase = async () => {
    if (!country || !period || !selectedPlan) {
      setMessage('Please select country, period, and insurance plan.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/insurances', {
        insuranceType: selectedPlan,
        coverageLocation: country,
        period,
        vehicleId: vehicle._id
      });
      
      // ✅ fetch updated balance from backend
      const userRes = await axios.get(`http://localhost:5000/api/user/${username}`);
      if (userRes.data && typeof userRes.data.balance === 'number') {
        localStorage.setItem('balance', userRes.data.balance);
      }
      
      setMessage('✅ Insurance purchased and linked to your vehicle!');
      setInsuranceActive(true);
      
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to purchase insurance.');
    }
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

          {insuranceActive ? (
            <p className={styles.insurance_successText}>✅ Your vehicle is insured!</p>
          ) : (
            <>
              <label className={styles.insurance_label}>Traveling To:</label>
              <select className={styles.insurance_select} value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">-- Select Country --</option>
                {gccCountries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <label className={styles.insurance_label}>Insurance Period:</label>
              <select className={styles.insurance_select} value={period} onChange={(e) => setPeriod(e.target.value)}>
                {Object.keys(periodMultipliers).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <button className={styles.insurance_planCard} onClick={() => handlePlanClick('Basic')}>
                <h3 className={styles.insurance_planName}>
                  Basic <span className={styles.insurance_planPrice}>{getFinalPrice('Basic')} SAR</span>
                </h3>
                <p className={styles.insurance_planDesc}>Third-party Coverage</p>
              </button>

              <button className={styles.insurance_planCard} onClick={() => handlePlanClick('Premium')}>
                <h3 className={styles.insurance_planName}>
                  Premium <span className={styles.insurance_planPrice}>{getFinalPrice('Premium')} SAR</span>
                </h3>
                <p className={styles.insurance_planDesc}>Full Coverage</p>
              </button>

              {message && <p className={styles.insurance_successText}>{message}</p>}

              <button className={styles.insurance_submitButton} onClick={handlePurchase}>
                Purchase Insurance
              </button>
            </>
          )}
        </div>
      ) : (
        <p className={styles.insurance_loading}>Loading vehicle information...</p>
      )}
    </div>
  );
}

export default BuyInsurance;
