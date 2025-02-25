const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  technician: { 
    type: Schema.Types.ObjectId, 
    ref: 'users', 
    required: true 
  },
  job: { 
    type: Schema.Types.ObjectId, 
    ref: 'jobs'
  },
  type: {
    type: String,
    enum: ['job', 'leave', 'training', 'unavailable'],
    default: 'job'
  },
  title: String, // Only used for non-job events
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  allDay: { type: Boolean, default: false },
  notes: String,
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Schedule = mongoose.model('schedules', scheduleSchema);
module.exports = Schedule;