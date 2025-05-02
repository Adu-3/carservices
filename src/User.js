import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserHeader from './components/User/UserHeader';
import AddingMoney from './components/User/AddingMoney';
import CarRegistration from './components/User/CarRegistration';
import Parking from './components/User/Parking';
import Tolls from './components/User/tolls';
import InsurancePage from './components/User/buyInsurance';
import TrafficViolationsPage from './components/User/trafficViolations';
import HomePage from './components/User/HomePageU';

function User({ onLogout }) {
  return (
    <>
      <UserHeader onLogout={onLogout} />
      
      <Routes>
        <Route path="/dashbaord" element={<HomePage/>}/>
        <Route path="/insurance" element={<InsurancePage />} />
        <Route path="/cars" element={<CarRegistration />} />
        <Route path="/tolls" element={<Tolls />} />
        <Route path="/violations" element={<TrafficViolationsPage />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/wallet" element={<AddingMoney />} />
      </Routes>
    </>
  );
}

export default User;