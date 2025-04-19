import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHeader from './components/User/UserHeader';

import AddingMoney from './components/User/AddingMoney';
import CarRegistration from './components/User/CarRegistration';
import Parking from './components/User/Parking';
import Tolls from './components/User/tolls';
import InsurancePage from './components/User/buyInsurance';
import TrafficViolationsPage from './components/User/trafficViolations';

function User() {
  return (
    <Router>
      <UserHeader />

      <Routes>
        <Route path="/" element={<div>Welcome to User Home</div>} /> // change later fr
        <Route path="/insurance" element={<InsurancePage />} />
        <Route path="/cars" element={<CarRegistration />} />
        <Route path="/tolls" element={<Tolls />} />
        <Route path="/violations" element={<TrafficViolationsPage />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/wallet" element={<AddingMoney />} />
        <Route path="/profile" element={<div>Welcome to User Profile</div>} />  // change later fr
      </Routes>
    </Router>
  );
}

export default User;
