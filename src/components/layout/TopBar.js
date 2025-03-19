// src/components/layout/TopBar.js
import React from 'react';
import { FaPhone } from 'react-icons/fa';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-container">
        <div className="call-now">
          <FaPhone className="phone-icon" />
          <a href="tel:6027370348">(602) 737-0348</a>
        </div>
        <div className="quote-button">
          <a href="/quote" className="quote-link">
            Get A Free Quote<br/>
            Click Here!
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;