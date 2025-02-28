// src/App.js - with Navbar on all pages
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/layout/Navbar';

// Pages
import Login from './pages/Auth/Login';
import InitialSetup from './pages/Auth/InitialSetup';
import Dashboard from './pages/Dashboard/Dashboard';
import HomePage from './pages/Home/HomePage';
import UserManagement from './pages/Admin/UserManagement';

// Private Route components
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

// Context
import { AuthProvider } from './context/auth/AuthContext';

// Set axios defaults
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar rendered outside of Routes so it appears on all pages */}
        <Navbar />
        
        <div className="app-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/setup" element={<InitialSetup />} />
            
            {/* Private routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            
            {/* Admin routes */}
            <Route 
              path="/admin/users" 
              element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              } 
            />
          </Routes>
        </div>
        
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};

export default App;