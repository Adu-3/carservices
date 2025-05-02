import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from './components/Guest/Homepage';
import Login from './components/Guest/authentication';
import User from './User';

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/user/login', credentials);
      setAuthToken(response.data.token);
      localStorage.setItem('authToken', response.data.token);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage/>} />
        <Route 
          path="/login" 
          element={
            authToken ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        
        {/* Protected user dashboard */}
        <Route 
          path="/dashboard" 
          element={
            authToken ? (
              <User onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;