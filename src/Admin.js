import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminHeader from './components/Admin/AdminHeader';
import EditUserAccounts from './components/Admin/EditUserAccounts';
import AdminCreateServiceProvider from './components/Admin/AdminCreateServiceProvider';
import AdminFormsPage from './components/Admin/AdminFormsPage';
import AdminSendEmailPage from './components/Admin/AdminSendEmailPage';
import InsuredVehiclesList from './components/Admin/InsuredVehiclesList';
import AdminHomePage from './components/Admin/AdminHomePage';
import AdminProfile from './components/Admin/AdminProfile';
import HomePage from './components/Admin/HomePageA';

function Admin() {
  return (
    <>
      <AdminHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<EditUserAccounts />} />
        <Route path="/service-providers" element={<AdminCreateServiceProvider />} />
        <Route path="/forms" element={<AdminFormsPage />} />
        <Route path="/send-email" element={<AdminSendEmailPage />} />
        <Route path="/insured-vehicles" element={<InsuredVehiclesList />} />
        <Route path="/profile" element={<AdminProfile />} />
      </Routes>
    </>
  );
}

export default Admin;
