// src/services/customerService.js
import axios from 'axios';

export const getCustomers = async () => {
  const response = await axios.get('/api/customers');
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await axios.get(`/api/customers/${id}`);
  return response.data;
};

export const createCustomer = async (customerData) => {
  const response = await axios.post('/api/customers', customerData);
  return response.data;
};

export const updateCustomer = async (id, customerData) => {
  const response = await axios.put(`/api/customers/${id}`, customerData);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axios.delete(`/api/customers/${id}`);
  return response.data;
};

export const searchCustomers = async (query) => {
  const response = await axios.get(`/api/customers/search?query=${query}`);
  return response.data;
};