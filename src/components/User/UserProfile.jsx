import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './UserProfileStyle.module.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:5000/api/user/${username}`);
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className={`container ${styles.box}`}>
      <div className={styles.logoCombined}>
        <span className={`material-icons ${styles.logo}`} style={{ fontSize: '100px' }}>account_circle</span>
        <p className={styles.logoName}>User Details</p>
      </div>

      <div className={styles.profileInfo}>
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email || 'Not Provided'}</p>
        <p><strong>Age:</strong> {user.age || 'Not Provided'}</p>
      </div>

      <button onClick={handleSignOut} className={styles.logoutButton}>
        Sign Out
      </button>
    </div>
  );
}

export default UserProfile;
