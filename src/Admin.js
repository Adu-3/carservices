import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Updated import paths
import AdminHeader from './components/Admin/AdminHeader';
import EditUserAccounts from './components/Admin/EditUserAccounts';
import AdminCreateServiceProvider from './components/Admin/AdminCreateServiceProvider';
import AdminFormsPage from './components/Admin/AdminFormsPage';
import AdminSendEmailPage from './components/Admin/AdminSendEmailPage';
import InsuredVehiclesList from './components/Admin/InsuredVehiclesList';
import AuthenticationPage from './components/Guest/authentication';
import Login from './components/Guest/Login';
import Register from './components/Guest/Register';
import AdminHomePage from './components/Admin/AdminHomePage';
import HomePageA from './components/Admin/HomePageA';
import AdminProfile from './components/Admin/AdminProfile';


function Admin() {
  return (
    <Router>
          <AdminHeader />
          
      <Routes>
        <Route path="/" element={<HomePageA/>} /> // change later fr
        <Route path="/users" element={<><AdminHeader active="Users" /><EditUserAccounts /></>} />
        <Route path="/service-providers" element={<><AdminHeader active="Service Providers" /><AdminCreateServiceProvider /></>} />
        <Route path="/forms" element={<><AdminHeader active="Forms" /><AdminFormsPage /></>} />
        <Route path="/send-email" element={<><AdminHeader active="" /><AdminSendEmailPage /></>} />
        <Route path="/insured-vehicles" element={<><AdminHeader active="" /><InsuredVehiclesList /></>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<AdminProfile/>} />

      </Routes>
    </Router>
  );
}

export default Admin;