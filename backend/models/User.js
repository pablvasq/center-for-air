// backend/models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,           // Matches the name field
    email: String,          // Matches the email field
    password: String        // Matches the password field
    // Add any additional fields as required
});

const User = mongoose.model('users', userSchema);
module.exports = User;
