import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');
  const accountType = localStorage.getItem('accountType');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && accountType !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
