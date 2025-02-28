// src/components/routing/AdminRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Check if user is admin or manager
  if (user && (user.role === 'admin' || user.role === 'manager')) {
    return children;
  }
  
  // If user is not admin, redirect to dashboard
  return <Navigate to="/access-denied" />;
};

export default AdminRoute;