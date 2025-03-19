// src/components/home/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1>The Most Reliable AC Repair & 24/7 Emergency Services in Phoenix</h1>
          
          <p>
          When the heat hits, we show up fast, fix it right, and keep it fair—no gimmicks, no surprises. Day or night, we’ve got you.
          </p>
          
          <p>
            Call us today or use our online scheduler to request an AC service near you.
          </p>
          
          <div className="hero-buttons">
            <Link to="/schedule" className="btn primary-btn">Schedule Service</Link>
            <Link to="/emergency" className="btn secondary-btn">24/7 Emergency</Link>
          </div>
        </div>
        
        <div className="hero-promo">
          <div className="promo-card">
            <h2>AC TUNE-UP SPECIAL</h2>
            <div className="price">
              <span className="dollar">$</span>
              <span className="amount">17</span>
              <span className="cents">.75</span>
            </div>
            <p className="promo-subtitle">KEEP YOUR AC RUNNING SMOOTHLY!</p>
            <Link to="/special" className="promo-button">CALL FOR DETAILS</Link>
            <p className="promo-disclaimer">*Not valid with any other offers or coupons</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;