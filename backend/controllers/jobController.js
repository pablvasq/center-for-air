// backend/controllers/jobController.js
const Job = require('../models/Job');

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({})
      .populate('customer', 'name email phone')
      .populate('assignedTo', 'name')
      .populate('createdBy', 'name');
      
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('customer', 'name email phone address equipment')
      .populate('assignedTo', 'name email phone')
      .populate('createdBy', 'name')
      .populate('partsUsed.part', 'name partNumber price');
    
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create job
exports.createJob = async (req, res) => {
  try {
    const { 
      customer, 
      title, 
      description, 
      jobType,
      priority,
      equipment,
      assignedTo,
      scheduledDateTime,
      estimatedDuration
    } = req.body;
    
    const job = await Job.create({
      customer,
      title,
      description,
      jobType,
      priority: priority || 'medium',
      equipment,
      assignedTo,
      scheduledDateTime,
      estimatedDuration,
      createdBy: req.user.id
    });
    
    const populatedJob = await Job.findById(job._id)
      .populate('customer', 'name')
      .populate('assignedTo', 'name')
      .populate('createdBy', 'name');
    
    res.status(201).json(populatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    const { 
      title, 
      description, 
      status, 
      priority,
      assignedTo,
      scheduledDateTime,
      estimatedDuration,
      notes
    } = req.body;
    
    job.title = title || job.title;
    job.description = description || job.description;
    job.status = status || job.status;
    job.priority = priority || job.priority;
    job.assignedTo = assignedTo || job.assignedTo;
    job.scheduledDateTime = scheduledDateTime || job.scheduledDateTime;
    job.estimatedDuration = estimatedDuration || job.estimatedDuration;
    job.notes = notes || job.notes;
    
    // If status is changed to completed, add completion date
    if (status === 'completed' && job.status !== 'completed') {
      job.completedAt = Date.now();
    }
    
    const updatedJob = await job.save();
    
    const populatedJob = await Job.findById(updatedJob._id)
      .populate('customer', 'name')
      .populate('assignedTo', 'name')
      .populate('createdBy', 'name');
    
    res.json(populatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    await Job.deleteOne({ _id: job._id });
    
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add parts used to job
exports.addPartsUsed = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    const { part, quantity, costEach } = req.body;
    
    job.partsUsed.push({
      part,
      quantity,
      costEach
    });
    
    const updatedJob = await job.save();
    
    const populatedJob = await Job.findById(updatedJob._id)
      .populate('customer', 'name')
      .populate('assignedTo', 'name')
      .populate('partsUsed.part', 'name partNumber price');
    
    res.json(populatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark job as complete
exports.completeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    const { actualDuration, notes, images, signature, invoiceAmount } = req.body;
    
    job.status = 'completed';
    job.actualDuration = actualDuration || job.actualDuration;
    job.notes = notes || job.notes;
    job.completedAt = Date.now();
    
    if (images && images.length > 0) {
      job.images = images;
    }
    
    if (signature) {
      job.signature = signature;
    }
    
    if (invoiceAmount) {
      job.invoiceAmount = invoiceAmount;
    }
    
    const updatedJob = await job.save();
    
    const populatedJob = await Job.findById(updatedJob._id)
      .populate('customer', 'name')
      .populate('assignedTo', 'name')
      .populate('partsUsed.part', 'name partNumber price');
    
    res.json(populatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get jobs for a technician
exports.getTechnicianJobs = async (req, res) => {
  try {
    const { technicianId, status } = req.query;
    
    const query = { assignedTo: technicianId };
    
    if (status) {
      query.status = status;
    }
    
    const jobs = await Job.find(query)
      .populate('customer', 'name address phone')
      .sort({ 'scheduledDateTime.startTime': 1 });
    
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get jobs for a customer
exports.getCustomerJobs = async (req, res) => {
  try {
    const { customerId } = req.params;
    
    const jobs = await Job.find({ customer: customerId })
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 });
    
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};