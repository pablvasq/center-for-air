// backend/controllers/userController.js

const User = require('../models/User');

async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        console.log(users); // Log the result to see what is being returned
        res.json(users);
    } catch (error) {
        console.error(error); // Make sure to log any errors
        res.status(500).json({ message: "Failed to retrieve users." });
    }
}


module.exports = {
    getAllUsers
};
