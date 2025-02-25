const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Update the GET route to use the getAllUsers function from the userController
router.get('/', userController.getAllUsers);

module.exports = router;