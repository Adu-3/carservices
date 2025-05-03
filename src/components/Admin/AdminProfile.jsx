import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminProfileStyle.module.css'; // Import the new style module

function AdminProfile() {
  const [user, setUser] = useState(null);  // To hold the fetched user data
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState('');  // For any error messages

  useEffect(() => {
    // Fetch user profile from the backend
    const fetchUser = async () => {
      try {
        const username = localStorage.getItem('username');  // Get logged-in user username from localStorage
        const response = await axios.get(`http://localhost:5000/api/user/${username}`); // Fetch user info
        
        setUser(response.data);  // Set user data to state
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchUser();
  }, []);

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
        {/* You can add more fields here if needed */}
      </div>
    </div>
  );
}

export default AdminProfile;
