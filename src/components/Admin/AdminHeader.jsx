import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <nav className="admin-nav">
        <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'active' : '')}>
          Users
        </NavLink>
        <NavLink to="/admin/service-providers" className={({ isActive }) => (isActive ? 'active' : '')}>
          Service Providers
        </NavLink>
        <NavLink to="/admin/forms" className={({ isActive }) => (isActive ? 'active' : '')}>
          Forms
        </NavLink>
        <NavLink to="/admin/send-email" className={({ isActive }) => (isActive ? 'active' : '')}>
          Mail
        </NavLink>
      </nav>

      <div className="admin-icons">
        <NavLink to="/admin/profile">
          <span className="material-icons profile-icon" style={{ cursor: 'pointer' }}>
            person
          </span>
        </NavLink>
      </div>
    </header>
  );
};

export default AdminHeader;