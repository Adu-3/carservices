import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <nav className="admin-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
          Users
        </NavLink>
        <NavLink to="/service-providers" className={({ isActive }) => (isActive ? 'active' : '')}>
          Service Providers
        </NavLink>
        <NavLink to="/forms" className={({ isActive }) => (isActive ? 'active' : '')}>
          Forms
        </NavLink>
        <NavLink to="/send-email" className={({ isActive }) => (isActive ? 'active' : '')}>
          Mail
        </NavLink>
      </nav>

      <div className="admin-icons">
        <NavLink to="/profile">
          <span className="material-icons profile-icon" style={{ cursor: 'pointer' }}>
            person
          </span>
        </NavLink>
      </div>
    </header>
  );
};

export default AdminHeader;
