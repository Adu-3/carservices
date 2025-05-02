import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './UserHeader.css';

const UserHeader = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // clear authToken in App.js
    }
    navigate('/login'); // redirect to login
  };

  return (
    <header className="user-header">
      <nav className="user-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/insurance" className={({ isActive }) => (isActive ? 'active' : '')}>Insurance</NavLink>
        <NavLink to="/cars" className={({ isActive }) => (isActive ? 'active' : '')}>Cars</NavLink>
        <NavLink to="/tolls" className={({ isActive }) => (isActive ? 'active' : '')}>Tolls</NavLink>
        <NavLink to="/violations" className={({ isActive }) => (isActive ? 'active' : '')}>Violations</NavLink>
        <NavLink to="/parking" className={({ isActive }) => (isActive ? 'active' : '')}>Parking</NavLink>
      </nav>

      <div className="user-icons">
        <NavLink to="/wallet">
          <span className="material-icons balance-icon" style={{ cursor: 'pointer' }}>credit_card</span>
        </NavLink>

        <span className="balance">
          <img
            src={require('../../assets/Saudi_Riyal_Symbol-1.png')}
            alt="Currency Symbol"
            className="currency-icon"
          />
          0.00
        </span>

        <NavLink to="/profile">
          <span className="material-icons profile-icon" style={{ cursor: 'pointer' }}>person</span>
        </NavLink>

        {/* Logout Icon */}
        <span
          className="material-icons logout-icon"
          style={{ cursor: 'pointer', marginLeft: '1rem', color: 'red' }}
          onClick={handleLogout}
          title="Logout"
        >
          logout
        </span>
      </div>
    </header>
  );
};

export default UserHeader;
