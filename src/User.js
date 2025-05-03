import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserHeader from './components/User/UserHeader';

import AddingMoney from './components/User/AddingMoney';
import CarRegistration from './components/User/CarRegistration';
import Parking from './components/User/Parking';
import Tolls from './components/User/tolls';
import InsurancePage from './components/User/buyInsurance';
import TrafficViolationsPage from './components/User/trafficViolations';
import UserHomePage from './components/User/UserHomePage';
import UserProfile from './components/User/UserProfile';

function User() {
  return (
    <>
      <UserHeader />
      <Routes>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/insurance" element={<InsurancePage />} />
        <Route path="/cars" element={<CarRegistration />} />
        <Route path="/tolls" element={<Tolls />} />
        <Route path="/violations" element={<TrafficViolationsPage />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/wallet" element={<AddingMoney />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default User;
