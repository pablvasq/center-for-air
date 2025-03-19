// src/components/layout/Header.js
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { FaPhone, FaChevronDown, FaBars } from 'react-icons/fa';
import TopBar from './TopBar';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // When closing menu, also reset active dropdown
    if (isMenuOpen) {
      setActiveItem(null);
    }
  };

  const toggleDropdown = (index) => {
    setActiveItem(activeItem === index ? null : index);
  };

  const onLogout = () => {
    logout();
  };
  
  // Handle scroll events to hide/show top bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down - hide top bar
        setShowTopBar(false);
      } else {
        // Scrolling up - show top bar
        setShowTopBar(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* <TopBar isVisible={showTopBar} /> */}
      <header className={`site-header ${showTopBar ? 'with-top-bar' : ''}`}>
        <div className="header-container">
          {/* Logo section */}
          <div className="logo-section">
            <Link to="/" className="logo-link">
              <img 
                src="/images/logo.png" 
                alt="Center for Air Logo" 
                className="header-logo" 
              />
            </Link>
          </div>
          
          {/* Mobile menu toggle button */}
          <button 
            className="menu-toggle" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            <FaBars className="menu-icon-bars" />
          </button>
          
          {/* Navigation section */}
          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <li className={`nav-item dropdown ${activeItem === 0 ? 'active' : ''}`}>
                <div className="nav-link" onClick={() => toggleDropdown(0)}>
                  Locations <FaChevronDown className="dropdown-icon" />
                </div>
                <div className="dropdown-content">
                  <Link to="/locations/phoenix">Phoenix</Link>
                  <Link to="/locations/scottsdale">Scottsdale</Link>
                  <Link to="/locations/mesa">Mesa</Link>
                </div>
              </li>
              <li className={`nav-item dropdown ${activeItem === 1 ? 'active' : ''}`}>
                <div className="nav-link" onClick={() => toggleDropdown(1)}>
                  Heating <FaChevronDown className="dropdown-icon" />
                </div>
                <div className="dropdown-content">
                  <Link to="/heating/installation">Installation</Link>
                  <Link to="/heating/repair">Repair</Link>
                  <Link to="/heating/maintenance">Maintenance</Link>
                </div>
              </li>
              <li className={`nav-item dropdown ${activeItem === 2 ? 'active' : ''}`}>
                <div className="nav-link" onClick={() => toggleDropdown(2)}>
                  Cooling <FaChevronDown className="dropdown-icon" />
                </div>
                <div className="dropdown-content">
                  <Link to="/cooling/installation">Installation</Link>
                  <Link to="/cooling/repair">Repair</Link>
                  <Link to="/cooling/maintenance">Maintenance</Link>
                </div>
              </li>
              <li className={`nav-item dropdown ${activeItem === 3 ? 'active' : ''}`}>
                <div className="nav-link" onClick={() => toggleDropdown(3)}>
                  Plumbing <FaChevronDown className="dropdown-icon" />
                </div>
                <div className="dropdown-content">
                  <Link to="/plumbing/installation">Installation</Link>
                  <Link to="/plumbing/repair">Repair</Link>
                  <Link to="/plumbing/maintenance">Maintenance</Link>
                </div>
              </li>
              <li className={`nav-item dropdown ${activeItem === 4 ? 'active' : ''}`}>
                <div className="nav-link" onClick={() => toggleDropdown(4)}>
                  Home Comfort <FaChevronDown className="dropdown-icon" />
                </div>
                <div className="dropdown-content">
                  <Link to="/home-comfort/air-quality">Air Quality</Link>
                  <Link to="/home-comfort/thermostats">Thermostats</Link>
                  <Link to="/home-comfort/duct-cleaning">Duct Cleaning</Link>
                </div>
              </li>
              <li className={`nav-item dropdown ${activeItem === 5 ? 'active' : ''}`}>
                <div className="nav-link" onClick={() => toggleDropdown(5)}>
                  About Us <FaChevronDown className="dropdown-icon" />
                </div>
                <div className="dropdown-content">
                  <Link to="/about/our-team">Our Team</Link>
                  <Link to="/about/testimonials">Testimonials</Link>
                  <Link to="/about/careers">Careers</Link>
                </div>
              </li>
            </ul>
          </nav>
          
          {/* Book Now button - desktop only */}
          <div className="desktop-book-now">
            <a href="/schedule" className="book-now-btn">Book Now!</a>
          </div>
        </div>

                {/* Contact section */}
                {/* <div className="contact-section">
          <div className="phone-numbers">
            <div className="phone-item">
              <span className="phone-label">AZ:</span>
              <a href="tel:6027370348" className="phone-link">
                <FaPhone className="phone-icon" /> (602) 737-0348
              </a>
            </div>
            <div className="phone-item">
              <span className="phone-label">NV:</span>
              <a href="tel:7028180284" className="phone-link">
                <FaPhone className="phone-icon" /> (702) 818-0284
              </a>
            </div>
          </div>
        </div> */}

        {/* Login/Logout functionality for authenticated users */}
        {isAuthenticated && (
          <div className="auth-links">
            <span className="welcome-text">Welcome, {user?.name}</span>
            <Link to="/dashboard" className="dashboard-link">Dashboard</Link>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </header>
    </>
  );
};        



export default Header;