const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  partNumber: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  minimumQuantity: { type: Number, default: 5 },
  location: String, // Where the part is stored
  supplier: {
    name: String,
    contactInfo: String,
    website: String
  },
  lastOrderDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Inventory = mongoose.model('inventory', inventorySchema);
module.exports = Inventory;