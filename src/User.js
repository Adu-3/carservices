import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserHeader from './components/User/UserHeader';

import AddingMoney from './components/User/AddingMoney';
import CarRegistration from './components/User/CarRegistration';
import Parking from './components/User/Parking';
import Tolls from './components/User/tolls';
import InsurancePage from './components/User/buyInsurance';
import TrafficViolationsPage from './components/User/trafficViolations';
import UserProfile from './components/User/UserProfile';
import HomePage from './components/User/HomePageU';

function User() {
  return (
    <>
      <UserHeader />
      {/* Add padding to the top to prevent content from hiding behind the fixed header */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/cars" element={<CarRegistration />} />
          <Route path="/tolls" element={<Tolls />} />
          <Route path="/violations" element={<TrafficViolationsPage />} />
          <Route path="/parking" element={<Parking />} />
          <Route path="/wallet" element={<AddingMoney />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default User;