import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Updated import paths
import GuestHeader from './components/Guest/GuestHeader';
import AuthenticationPage from './components/Guest/authentication';
import GuestHomePage from './components/Guest/GuestHomePage';
import HomePage from './components/Guest/homepage';

function Guest() {
  return (
    <Router>
      <GuestHeader/>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/profile" element={<AuthenticationPage/>} />  // change later fr

      </Routes>
    </Router>
  );
}

export default Guest;