// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  getTechnicians
} = require('../controllers/userController');
const { protect, admin, authorize } = require('../middleware/auth');

router.get('/', protect, admin, getAllUsers);
router.get('/technicians', protect, getTechnicians);
router.get('/:id', protect, getUserById);
router.post('/', protect, admin, createUser);
router.put('/:id', protect, authorize('admin', 'manager'), updateUser);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;