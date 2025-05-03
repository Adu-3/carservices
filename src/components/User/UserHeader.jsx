import React from 'react';
import { NavLink } from 'react-router-dom';
import './UserHeader.css';

const UserHeader = () => {
  return (
    <header className="user-header">
      <nav className="user-nav">
        <NavLink to="/user" className={({ isActive }) => (isActive ? 'active' : '')}>
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
            alt="Currency Symbol"
            className="currency-icon"
          />
          0.00
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