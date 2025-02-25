// backend/scripts/initProductionDb.js
const mongoose = require('mongoose');
require('dotenv').config();

// Import all models
const User = require('../models/User');
const Customer = require('../models/Customer');
const Job = require('../models/Job');
const Inventory = require('../models/Inventory');
const Schedule = require('../models/Schedule');

async function initializeProductionDb() {
    try {
        // Connect to production database
        const connectionString = process.env.PROD_MONGODB_URI;
        console.log('Connecting to:', connectionString);
        
        await mongoose.connect(connectionString);
        console.log('Connected to production database');
        
        // Create initial admin user
        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@centerforair.com',
            password: 'CB_G-Ju_Z2.r5aP', // You should hash this in production
            role: 'admin'
        });
        
        // Save admin user and log the result
        const savedAdmin = await adminUser.save();
        console.log('Admin user created:', savedAdmin._id);
        
        // Create a sample customer
        const sampleCustomer = new Customer({
            name: 'Sample Customer',
            email: 'customer@example.com',
            phone: '555-123-4567',
            address: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zipCode: '12345'
            }
        });
        
        const savedCustomer = await sampleCustomer.save();
        console.log('Sample customer created:', savedCustomer._id);
        
        // Create a sample inventory item
        const samplePart = new Inventory({
            name: 'Air Filter',
            description: 'Standard HVAC air filter',
            category: 'Filters',
            partNumber: 'AF-100',
            price: 29.99,
            cost: 15.50,
            quantity: 50
        });
        
        const savedPart = await samplePart.save();
        console.log('Sample inventory item created:', savedPart._id);
        
        // Create a sample job
        const sampleJob = new Job({
            customer: savedCustomer._id,
            title: 'Initial System Inspection',
            description: 'Complete HVAC system inspection and maintenance',
            jobType: 'inspection',
            assignedTo: savedAdmin._id,
            scheduledDateTime: {
                startTime: new Date(),
                endTime: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours later
            },
            createdBy: savedAdmin._id
        });
        
        const savedJob = await sampleJob.save();
        console.log('Sample job created:', savedJob._id);
        
        // Create a sample schedule
        const sampleSchedule = new Schedule({
            technician: savedAdmin._id,
            job: savedJob._id,
            startTime: new Date(),
            endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours later
            createdBy: savedAdmin._id
        });
        
        const savedSchedule = await sampleSchedule.save();
        console.log('Sample schedule created:', savedSchedule._id);
        
        console.log('All collections initialized successfully');
        
        // List all collections in the database to verify
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections in database:', collections.map(c => c.name));
        
    } catch (error) {
        console.error('Error initializing production database:', error);
    } finally {
        // Close the connection
        await mongoose.disconnect();
        console.log('Database connection closed');
    }
}

// Run the initialization
initializeProductionDb();