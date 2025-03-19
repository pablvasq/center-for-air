// src/components/layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <h3 className="footer-heading">Center for Air</h3>
            <p className="footer-about">
              Providing top-quality HVAC services to Phoenix and surrounding areas. 
              Our skilled technicians are available 24/7 for all your heating and 
              cooling needs.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links">
              <li><Link to="/cooling">AC Repair</Link></li>
              <li><Link to="/cooling/installation">AC Installation</Link></li>
              <li><Link to="/heating">Heating Services</Link></li>
              <li><Link to="/plumbing">Plumbing</Link></li>
              <li><Link to="/maintenance">Maintenance Plans</Link></li>
              <li><Link to="/emergency">Emergency Services</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <FaPhoneAlt className="contact-icon" />
                <div>
                  <p>AZ: (602) 737-0348</p>
                  <p>NV: (702) 818-0284</p>
                </div>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <p>info@centerforair.com</p>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <p>123 Main Street<br />Phoenix, AZ 85001</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Center for Air. All Rights Reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;