// backend/controllers/customerController.js
const Customer = require('../models/Customer');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, equipment, notes } = req.body;
    
    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
      equipment: equipment || [],
      notes
    });
    
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    const { name, email, phone, address, notes } = req.body;
    
    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;
    customer.notes = notes || customer.notes;
    customer.updatedAt = Date.now();
    
    const updatedCustomer = await customer.save();
    
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    await Customer.deleteOne({ _id: customer._id });
    
    res.json({ message: 'Customer removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add equipment to customer
exports.addEquipment = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    const { type, model, serialNumber, installDate, notes } = req.body;
    
    customer.equipment.push({
      type,
      model,
      serialNumber,
      installDate: installDate ? new Date(installDate) : undefined,
      notes
    });
    
    customer.updatedAt = Date.now();
    
    const updatedCustomer = await customer.save();
    
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update equipment
exports.updateEquipment = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    const equipment = customer.equipment.id(req.params.equipmentId);
    
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    
    const { type, model, serialNumber, installDate, lastService, notes } = req.body;
    
    equipment.type = type || equipment.type;
    equipment.model = model || equipment.model;
    equipment.serialNumber = serialNumber || equipment.serialNumber;
    equipment.installDate = installDate ? new Date(installDate) : equipment.installDate;
    equipment.lastService = lastService ? new Date(lastService) : equipment.lastService;
    equipment.notes = notes || equipment.notes;
    
    customer.updatedAt = Date.now();
    
    const updatedCustomer = await customer.save();
    
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search customers
exports.searchCustomers = async (req, res) => {
  try {
    const { query } = req.query;
    
    const customers = await Customer.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
        { 'address.street': { $regex: query, $options: 'i' } },
        { 'address.city': { $regex: query, $options: 'i' } },
        { 'address.zipCode': { $regex: query, $options: 'i' } }
      ]
    });
    
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};