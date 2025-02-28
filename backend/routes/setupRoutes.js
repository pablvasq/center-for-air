// backend/routes/setupRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Check if setup is required
router.get('/status', async (req, res) => {
  try {
    // Check if any admin exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    res.json({
      isSetupComplete: !!adminExists
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Initialize system with first admin
router.post('/initialize', async (req, res) => {
  try {
    // Check if any admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      return res.status(400).json({ message: 'System is already set up' });
    }
    
    const { companyName, adminName, adminEmail, adminPassword, phone } = req.body;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    
    // Create admin user
    const admin = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      phone: phone || '',
      active: true
    });
    
    await admin.save();
    
    // Here you could also save company settings to a separate collection if needed
    
    res.status(201).json({ message: 'Setup completed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;