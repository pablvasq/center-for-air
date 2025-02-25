// backend/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getAllCustomers, 
  getCustomerById, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer,
  addEquipment,
  updateEquipment,
  searchCustomers
} = require('../controllers/customerController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAllCustomers);
router.get('/search', protect, searchCustomers);
router.get('/:id', protect, getCustomerById);
router.post('/', protect, createCustomer);
router.put('/:id', protect, updateCustomer);
router.delete('/:id', protect, deleteCustomer);
router.post('/:id/equipment', protect, addEquipment);
router.put('/:customerId/equipment/:equipmentId', protect, updateEquipment);

module.exports = router;