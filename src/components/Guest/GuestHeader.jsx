import React from 'react';
import { NavLink } from 'react-router-dom';
import './GuestHeader.css';

const GuestHeader = () => {
  return (
    <header className="guest-header">
      <nav className="guest-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
      </nav>

      <div className="guest-icons">
        <NavLink to="/profile">
          <span className="material-icons profile-icon" style={{ cursor: 'pointer' }}>
            person
          </span>
        </NavLink>
      </div>
    </header>
  );
};

export default GuestHeader;
