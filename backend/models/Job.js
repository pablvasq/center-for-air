const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  customer: { 
    type: Schema.Types.ObjectId, 
    ref: 'customers', 
    required: true 
  },
  title: { type: String, required: true },
  description: String,
  jobType: { 
    type: String, 
    enum: ['installation', 'repair', 'maintenance', 'inspection'],
    required: true
  },
  status: { 
    type: String, 
    enum: ['pending', 'scheduled', 'in-progress', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'emergency'], 
    default: 'medium' 
  },
  equipment: { 
    type: Schema.Types.ObjectId, 
    ref: 'customers.equipment' 
  },
  assignedTo: { 
    type: Schema.Types.ObjectId, 
    ref: 'users' 
  },
  scheduledDateTime: {
    startTime: Date,
    endTime: Date
  },
  estimatedDuration: Number, // in minutes
  actualDuration: Number,    // in minutes
  partsUsed: [{
    part: { type: Schema.Types.ObjectId, ref: 'inventory' },
    quantity: Number,
    costEach: Number
  }],
  notes: String,
  images: [String], // URLs to images
  signature: String, // URL to customer signature
  createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
  invoiceAmount: Number,
  isPaid: { type: Boolean, default: false }
});

const Job = mongoose.model('jobs', jobSchema);
module.exports = Job;