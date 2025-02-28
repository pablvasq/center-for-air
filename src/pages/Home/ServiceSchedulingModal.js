// src/pages/Home/ServiceSchedulingModal.js
import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaRegClock, FaCalendarAlt, FaTools, FaInfoCircle, FaCheck, FaSnowflake, FaWrench, FaSearch, FaUserAlt } from 'react-icons/fa';

const ServiceSchedulingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    urgency: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    description: '',
    availableDates: [],
    availableTimes: []
  });

  // Generate next 7 days for date selection
  const [nextSevenDays, setNextSevenDays] = useState([]);
  
  useEffect(() => {
    const days = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date,
        formatted: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    
    setNextSevenDays(days);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUrgencySelect = (urgency) => {
    setFormData(prev => ({ ...prev, urgency }));
    if (urgency === 'emergency') {
      setStep('emergency');
    } else {
      setStep(2);
    }
  };

  const handleServiceSelect = (serviceType) => {
    setFormData(prev => ({ ...prev, serviceType }));
    setStep(3);
  };

  const handleDateToggle = (date) => {
    setFormData(prev => {
      const availableDates = [...prev.availableDates];
      const formattedDate = date.formatted;
      
      if (availableDates.includes(formattedDate)) {
        return { 
          ...prev, 
          availableDates: availableDates.filter(d => d !== formattedDate)
        };
      } else {
        return { 
          ...prev, 
          availableDates: [...availableDates, formattedDate]
        };
      }
    });
  };

  const handleTimeToggle = (time) => {
    setFormData(prev => {
      const availableTimes = [...prev.availableTimes];
      
      if (availableTimes.includes(time)) {
        return { 
          ...prev, 
          availableTimes: availableTimes.filter(t => t !== time)
        };
      } else {
        return { 
          ...prev, 
          availableTimes: [...availableTimes, time]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the data to your backend
    console.log('Form submitted:', formData);
    // Move to confirmation step
    setStep(5);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Modal content */}
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-600">Schedule Your Service</h2>
            {step !== 'emergency' && step !== 5 && (
              <p className="text-gray-600">Step {step} of 4</p>
            )}
          </div>

          {/* Progress bar */}
          {step !== 'emergency' && step !== 5 && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          )}

          {/* Step 1: Urgency */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">How soon do you need service?</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleUrgencySelect('emergency')}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-red-50 transition-colors border-red-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3">
                      <FaPhoneAlt />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-red-600">Emergency (Today)</p>
                      <p className="text-sm text-gray-500">I need immediate help</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button 
                  onClick={() => handleUrgencySelect('urgent')}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-orange-50 transition-colors border-orange-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mr-3">
                      <FaRegClock />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-orange-600">Urgent (1-2 Days)</p>
                      <p className="text-sm text-gray-500">It's important but not an emergency</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button 
                  onClick={() => handleUrgencySelect('standard')}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 transition-colors border-blue-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                      <FaCalendarAlt />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-blue-600">Standard (This Week)</p>
                      <p className="text-sm text-gray-500">I can wait a few days</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button 
                  onClick={() => handleUrgencySelect('maintenance')}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-green-50 transition-colors border-green-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3">
                      <FaTools />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-green-600">Maintenance (Flexible)</p>
                      <p className="text-sm text-gray-500">Routine service or inspection</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>
          )}

          {/* Emergency Contact Information */}
          {step === 'emergency' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mx-auto mb-4">
                <FaPhoneAlt size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Emergency Service</h3>
              <p className="mb-6 text-gray-600">For fastest service, please call us directly:</p>
              <a 
                href="tel:555-123-4567" 
                className="inline-block bg-red-500 text-white py-3 px-6 rounded-lg font-semibold text-lg mb-4 hover:bg-red-600 transition-colors"
              >
                <FaPhoneAlt className="inline mr-2" />
                (555) 123-4567
              </a>
              <p className="text-sm text-gray-500 mt-4">Our emergency line is available 24/7</p>
              <button 
                onClick={() => setStep(2)} 
                className="mt-6 text-blue-600 hover:underline"
              >
                Continue with online form instead
              </button>
            </div>
          )}

          {/* Step 2: Service Details (now with buttons instead of dropdown) */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">What service do you need?</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleServiceSelect('installation')}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 transition-colors border-blue-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                      <FaSnowflake />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-blue-600">Installation</p>
                      <p className="text-sm text-gray-500">New system setup or replacement</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button 
                  onClick={() => handleServiceSelect('repair')}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 transition-colors border-blue-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                      <FaWrench />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-blue-600">Repair</p>
                      <p className="text-sm text-gray-500">Fix issues with your existing system</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button 
                  onClick={() => handleServiceSelect('maintenance')}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 transition-colors border-blue-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                      <FaTools />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-blue-600">Maintenance</p>
                      <p className="text-sm text-gray-500">Regular service and tune-up</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button 
                  onClick={() => handleServiceSelect('inspection')}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 transition-colors border-blue-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                      <FaSearch />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-blue-600">Inspection</p>
                      <p className="text-sm text-gray-500">System evaluation and diagnostics</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
              
              <div className="mt-6">
                <textarea
                  placeholder="Please describe your issue or service needs in more detail (optional)"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Time Preferences with Date Boxes */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">When are you available?</h3>
              
              {/* Date Selection - Next 7 days */}
              <div className="mb-6">
                <p className="text-gray-700 mb-2">Select the dates that work for you:</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {nextSevenDays.map((day, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateToggle(day)}
                      className={`p-2 rounded-lg text-center border transition-colors ${
                        formData.availableDates.includes(day.formatted)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <p className="text-xs">{day.formatted.split(',')[0]}</p>
                      <p className="font-bold">{day.date.getDate()}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Time Selection */}
              <div className="mb-6">
                <p className="text-gray-700 mb-2">Select the times that work for you:</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleTimeToggle('morning')}
                    className={`flex items-center p-3 rounded-lg border transition-colors ${
                      formData.availableTimes.includes('morning')
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full ${
                      formData.availableTimes.includes('morning')
                        ? 'bg-white bg-opacity-20'
                        : 'bg-blue-100'
                      } flex items-center justify-center mr-3 ${
                      formData.availableTimes.includes('morning')
                        ? 'text-white'
                        : 'text-blue-500'
                      }`}>
                      <span>☀️</span>
                    </div>
                    <span>Morning<br /><span className="text-xs">8am-12pm</span></span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleTimeToggle('afternoon')}
                    className={`flex items-center p-3 rounded-lg border transition-colors ${
                      formData.availableTimes.includes('afternoon')
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full ${
                      formData.availableTimes.includes('afternoon')
                        ? 'bg-white bg-opacity-20'
                        : 'bg-blue-100'
                      } flex items-center justify-center mr-3 ${
                      formData.availableTimes.includes('afternoon')
                        ? 'text-white'
                        : 'text-blue-500'
                      }`}>
                      <span>🌞</span>
                    </div>
                    <span>Afternoon<br /><span className="text-xs">12pm-4pm</span></span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleTimeToggle('evening')}
                    className={`flex items-center p-3 rounded-lg border transition-colors ${
                      formData.availableTimes.includes('evening')
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full ${
                      formData.availableTimes.includes('evening')
                        ? 'bg-white bg-opacity-20'
                        : 'bg-blue-100'
                      } flex items-center justify-center mr-3 ${
                      formData.availableTimes.includes('evening')
                        ? 'text-white'
                        : 'text-blue-500'
                      }`}>
                      <span>🌆</span>
                    </div>
                    <span>Evening<br /><span className="text-xs">4pm-7pm</span></span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleTimeToggle('anytime')}
                    className={`flex items-center p-3 rounded-lg border transition-colors ${
                      formData.availableTimes.includes('anytime')
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full ${
                      formData.availableTimes.includes('anytime')
                        ? 'bg-white bg-opacity-20'
                        : 'bg-blue-100'
                      } flex items-center justify-center mr-3 ${
                      formData.availableTimes.includes('anytime')
                        ? 'text-white'
                        : 'text-blue-500'
                      }`}>
                      <span>⏰</span>
                    </div>
                    <span>Anytime<br /><span className="text-xs">8am-7pm</span></span>
                  </button>
                </div>
              </div>
              
              <div className="mt-2 bg-blue-50 p-4 rounded-lg flex mb-6">
                <FaInfoCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="mb-1">Please select at least one date and time preference.</p>
                  <p>We'll contact you to confirm your appointment.</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (formData.availableDates.length > 0 && formData.availableTimes.length > 0) {
                      setStep(4);
                    } else {
                      alert("Please select at least one date and time option");
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Customer Information (moved to the end) */}
          {step === 4 && (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="address">Service Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit Request
                </button>
              </div>
            </form>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500 mx-auto mb-4">
                <FaCheck size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Service Request Received!</h3>
              <p className="mb-6 text-gray-600">
                Thank you for choosing Center for Air. We'll contact you within 2 business hours to confirm your appointment.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <p className="text-sm text-gray-500 mb-1">Service Type:</p>
                <p className="font-medium text-gray-800 mb-3">
                  {formData.serviceType.charAt(0).toUpperCase() + formData.serviceType.slice(1)}
                </p>
                
                <p className="text-sm text-gray-500 mb-1">Available Dates:</p>
                <p className="font-medium text-gray-800 mb-3">
                  {formData.availableDates.join(', ')}
                </p>
                
                <p className="text-sm text-gray-500 mb-1">Available Times:</p>
                <p className="font-medium text-gray-800">
                  {formData.availableTimes.map(time => {
                    if (time === 'morning') return 'Morning (8am-12pm)';
                    if (time === 'afternoon') return 'Afternoon (12pm-4pm)';
                    if (time === 'evening') return 'Evening (4pm-7pm)';
                    if (time === 'anytime') return 'Anytime (8am-7pm)';
                    return time;
                  }).join(', ')}
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSchedulingModal;