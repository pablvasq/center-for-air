// src/pages/Home/HomePage.js
import React, { useState } from 'react';
import './HomePage.css';
import HeroSection from '../../pages/Home/HeroSection';
import ServiceSchedulingModal from './ServiceSchedulingModal';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section className="services-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>We provide comprehensive HVAC solutions to keep your home or business comfortable in every season.</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">❄️</div>
              <h3>Installation</h3>
              <p>Expert installation of HVAC systems with proper sizing for optimal performance.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Repair</h3>
              <p>Fast, reliable repairs to get your system back up and running quickly.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📅</div>
              <h3>Maintenance</h3>
              <p>Regular maintenance to prevent breakdowns and extend the life of your HVAC system.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🔍</div>
              <h3>Inspection</h3>
              <p>Thorough inspections to identify potential issues before they become problems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Why Choose Center for Air?</h2>
            <p>We're committed to providing the highest quality service and customer satisfaction.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>Experienced Technicians</h3>
              <p>Our certified technicians have years of experience in HVAC installation and repairs.</p>
            </div>
            
            <div className="feature-card">
              <h3>24/7 Emergency Service</h3>
              <p>We're available around the clock for emergency repairs when you need us most.</p>
            </div>
            
            <div className="feature-card">
              <h3>Satisfaction Guaranteed</h3>
              <p>We stand behind our work with a 100% satisfaction guarantee on all services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header light">
            <h2>What Our Customers Say</h2>
            <p>Don't just take our word for it. Here's what our satisfied customers have to say about our services.</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Center for Air saved the day when our AC stopped working during a heatwave. Their technician was professional, prompt, and fixed the issue quickly."</p>
              <p className="customer-name">- Michael Johnson</p>
            </div>
            
            <div className="testimonial-card">
              <p>"We've been using Center for Air for our business HVAC needs for years. Their maintenance program has saved us thousands in potential repairs."</p>
              <p className="customer-name">- Sarah Williams</p>
            </div>
            
            <div className="testimonial-card">
              <p>"The team at Center for Air installed our new system and were knowledgeable, clean, and respectful of our home. Highly recommend!"</p>
              <p className="customer-name">- David Thompson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-container">
            <div className="cta-content">
              <h2>Ready to breathe easier?</h2>
              <p>Contact us today to schedule a service or get a free quote for your HVAC needs.</p>
            </div>
            <button className="btn primary-btn" onClick={openModal}>Contact Us</button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <div className="section-container">
          <div className="contact-grid">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <p className="contact-label">Call Us</p>
                <p className="contact-detail">(555) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <div>
                <p className="contact-label">Business Hours</p>
                <p className="contact-detail">Mon-Fri: 8am-6pm, Sat: 9am-2pm</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <p className="contact-label">Our Location</p>
                <p className="contact-detail">123 Main St, Anytown, CA 12345</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scheduling Modal */}
      <ServiceSchedulingModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default HomePage;