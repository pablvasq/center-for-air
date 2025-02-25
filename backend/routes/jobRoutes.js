// backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getAllJobs, 
  getJobById, 
  createJob, 
  updateJob, 
  deleteJob,
  addPartsUsed,
  completeJob,
  getTechnicianJobs,
  getCustomerJobs
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getAllJobs);
router.get('/technician', protect, getTechnicianJobs);
router.get('/customer/:customerId', protect, getCustomerJobs);
router.get('/:id', protect, getJobById);
router.post('/', protect, authorize('admin', 'manager'), createJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, authorize('admin', 'manager'), deleteJob);
router.post('/:id/parts', protect, addPartsUsed);
router.put('/:id/complete', protect, completeJob);

module.exports = router;