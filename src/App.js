import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Admin from './Admin';
import User from './User';
import Guest from './Guest';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/user/*" element={
          <ProtectedRoute requiredRole="user">
            <User />
          </ProtectedRoute>
        } />
        <Route path="/*" element={<Guest />} />
      </Routes>
    </Router>
  );
}

export default App;
