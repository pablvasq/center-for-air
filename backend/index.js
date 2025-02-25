const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const jobRoutes = require('./routes/jobRoutes');

async function init() {
    try {
        // Choose connection string based on environment
        const connectionString = process.env.NODE_ENV === 'production' 
            ? process.env.PROD_MONGODB_URI 
            : process.env.DEV_MONGODB_URI;
            
        // Connect to MongoDB
        await mongoose.connect(connectionString);
        console.log(`MongoDB connected successfully to ${process.env.NODE_ENV} database!`);

        // Middleware
        app.use(cors());
        app.use(express.json());
        
        // Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/users', userRoutes);
        app.use('/api/customers', customerRoutes);
        app.use('/api/jobs', jobRoutes);

        // Health check route
        app.get('/health', (req, res) => {
            res.status(200).json({ 
                status: 'ok', 
                message: 'Server is running',
                environment: process.env.NODE_ENV
            });
        });

        // Start server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`));
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit on connection failure
    }
}

init();