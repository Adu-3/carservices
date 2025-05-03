import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './UserHeader.css';

const UserHeader = () => {
  const [balance, setBalance] = useState(0);
  const [isTabActive, setIsTabActive] = useState(true);

  const fetchBalance = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await axios.get(`http://localhost:5000/api/user/${username}`);
      if (response.data?.balance !== undefined) {
        setBalance(response.data.balance);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchBalance();

    // Tab visibility listener (stop polling when tab is inactive)
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Smart polling (every 2 seconds, but only if tab is active)
    const pollingInterval = setInterval(() => {
      if (isTabActive) {
        fetchBalance();
      }
    }, 2000); // Check every 2 seconds

    // Cleanup
    return () => {
      clearInterval(pollingInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isTabActive]); // Re-run effect when tab focus changes

  return (
    <header className="user-header">
      <nav className="user-nav">
        <NavLink to="/user" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/user/insurance" className={({ isActive }) => (isActive ? 'active' : '')}>
          Insurance
        </NavLink>
        <NavLink to="/user/cars" className={({ isActive }) => (isActive ? 'active' : '')}>
          Cars
        </NavLink>
        <NavLink to="/user/tolls" className={({ isActive }) => (isActive ? 'active' : '')}>
          Tolls
        </NavLink>
        <NavLink to="/user/violations" className={({ isActive }) => (isActive ? 'active' : '')}>
          Violations
        </NavLink>
        <NavLink to="/user/parking" className={({ isActive }) => (isActive ? 'active' : '')}>
          Parking
        </NavLink>
      </nav>

      <div className="user-icons">
        <NavLink to="/user/wallet">
          <span className="material-icons balance-icon" style={{ cursor: 'pointer' }}>
            credit_card
          </span>
        </NavLink>

        <span className="balance">
          <img
            src={require('../../assets/Saudi_Riyal_Symbol-1.png')}
            alt="SAR"
            className="currency-icon"
          />{' '}
          {balance.toFixed(2)}
        </span>

        <NavLink to="/user/profile">
          <span className="material-icons profile-icon" style={{ cursor: 'pointer' }}>
            person
          </span>
        </NavLink>
      </div>
    </header>
  );
};

export default UserHeader;