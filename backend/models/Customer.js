const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  type: { type: String, required: true }, // AC unit, furnace, etc.
  model: String,
  serialNumber: String,
  installDate: Date,
  lastService: Date,
  notes: String
});

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  equipment: [equipmentSchema],
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Customer = mongoose.model('customers', customerSchema);
module.exports = Customer;