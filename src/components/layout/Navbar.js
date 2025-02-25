// src/components/layout/Navbar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link to="/customers" className="nav-link">Customers</Link>
      </li>
      <li className="nav-item">
        <Link to="/jobs" className="nav-link">Jobs</Link>
      </li>
      {user && (user.role === 'admin' || user.role === 'manager') && (
        <li className="nav-item">
          <Link to="/users" className="nav-link">Users</Link>
        </li>
      )}
      <li className="nav-item">
        <button onClick={onLogout} className="nav-link logout-btn">
          Logout
        </button>
      </li>
    </>
  );

  const guestLinks = (
    <li className="nav-item">
      <Link to="/login" className="nav-link">Login</Link>
    </li>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Center for Air
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;