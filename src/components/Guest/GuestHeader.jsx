import React from 'react';
import { NavLink } from 'react-router-dom';
import './GuestHeader.css';

const GuestHeader = () => {
  return (
    <header className="guest-header">
      <nav className="guest-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        <div className="flex items-center space-x-2">
        <span className="material-icons bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent">directions_car</span>
        <h1 className="font-bold bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent text-xl">Car Service</h1>

        </div>
        </NavLink>
      </nav>

    </header>
  );
};

export default GuestHeader;