// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// User login - Public
router.post('/login', login);

// Get current user profile - Private
router.get('/me', protect, getMe);

// Public registration endpoint - doesn't require token
router.post('/register', async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      
      console.log('Registration attempt for email:', email);
      
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        console.log('User already exists with email:', email);
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create user with default role (technician)
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'technician', // Default role for all self-registrations
        phone: phone || '',
        active: true
      });
      
      console.log('User created successfully:', user._id);
      console.log('MongoDB connection:', mongoose.connection.db.databaseName);
      console.log('Collection:', mongoose.connection.db.collection('users').collectionName);
      
      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'defaultsecret', {
        expiresIn: '30d'
      });
      
      console.log('Token generated successfully');
      
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
    } catch (error) {
      console.error('Registration Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
module.exports = router;