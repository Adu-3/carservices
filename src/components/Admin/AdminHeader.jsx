import React from 'react';
import './AdminHeader.css'; // Assuming you put the CSS rule in a separate file

const AdminHeader = ({ active = 'Home' }) => {
  return (
    <header className="admin-header">
      <nav className="admin-nav">
        <a href="#" className={active === 'Home' ? 'active' : ''}>Home</a>
        <a href="#" className={active === 'Users' ? 'active' : ''}>Users</a>
        <a href="#" className={active === 'Service Providers' ? 'active' : ''}>Service Providers</a>
        <a href="#" className={active === 'Forms' ? 'active' : ''}>Forms</a>
      </nav>
      <div className="admin-icons">
        <a href="/wallet">
        <span className="material-icons balance-icon" style={{ cursor: 'pointer' }}>
            credit_card
        </span>
        </a>

        <span className="balance">
        <img
            src={require('../../assets/Saudi_Riyal_Symbol-1.png')}
            alt="Currency Symbol"
            className="currency-icon"
        />
        0.00
        </span>


        <span></span><span></span><span></span>
        
        <a href="/profile">
        <span className="material-icons profile-icon" style={{ cursor: 'pointer' }}>
            person
        </span>
        </a>
      </div>
    </header>
  );
};

export default AdminHeader;
