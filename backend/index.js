const express = require('express');
const path = require('path'); // Add this line to import the path module
const app = express();
const userRoutes = require('./routes/userRoutes');
const { run, client } = require('./config/mongo');

async function init() {
    try {
        await run(); // Wait for MongoDB connection to be established
        console.log("MongoDB connected:", client.db().databaseName); // Log the database name

        app.use(express.json());
        app.use('/api/users', userRoutes);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

init();