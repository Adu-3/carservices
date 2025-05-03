import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Updated import paths
import GuestHeader from './components/Guest/GuestHeader';
import AuthenticationPage from './components/Guest/authentication';
import GuestHomePage from './components/Guest/GuestHomePage';
import HomePage from './components/Guest/Homepage';

function Guest() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default Guest;