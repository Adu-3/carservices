import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHeader from './components/User/UserHeader';

import AddingMoney from './components/User/AddingMoney';
import CarRegistration from './components/User/CarRegistration';
import Parking from './components/User/Parking';
import Tolls from './components/User/tolls';
import InsurancePage from './components/User/buyInsurance';
import TrafficViolationsPage from './components/User/trafficViolations';
import AuthenticationPage from './components/Guest/authentication';
import UserHomePage from './components/User/UserHomePage';
import HomePage from './components/User/HomePageU';

function User() {
  return (
    <Router>
      <UserHeader />

      <Routes>
        <Route path="/" element={<HomePage/>} /> 
        <Route path="/insurance" element={<InsurancePage />} />
        <Route path="/cars" element={<CarRegistration />} />
        <Route path="/tolls" element={<Tolls />} />
        <Route path="/violations" element={<TrafficViolationsPage />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/wallet" element={<AddingMoney />} />
        <Route path="/profile" element={<AuthenticationPage/>} />
      </Routes>
    </Router>
  );
}

export default User;