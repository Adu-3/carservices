import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Updated import paths
import GuestHeader from './components/Guest/GuestHeader';
import AuthenticationPage from './components/Guest/authentication';
import GuestHomePage from './components/Guest/GuestHomePage';
import HomePage from './components/Guest/Homepage';
import Login from './components/Guest/Login';
import Register from './components/Guest/Register';

function Guest() {
  return (
    <>
      <GuestHeader />

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  );
}

export default Guest;