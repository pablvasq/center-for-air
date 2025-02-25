// src/services/jobService.js
import axios from 'axios';

export const getJobs = async () => {
  const response = await axios.get('/api/jobs');
  return response.data;
};

export const getJobById = async (id) => {
  const response = await axios.get(`/api/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await axios.post('/api/jobs', jobData);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await axios.put(`/api/jobs/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await axios.delete(`/api/jobs/${id}`);
  return response.data;
};

export const completeJob = async (id, completionData) => {
  const response = await axios.put(`/api/jobs/${id}/complete`, completionData);
  return response.data;
};

export const getTechnicianJobs = async (technicianId, status) => {
  const response = await axios.get(`/api/jobs/technician?technicianId=${technicianId}${status ? `&status=${status}` : ''}`);
  return response.data;
};

export const getCustomerJobs = async (customerId) => {
  const response = await axios.get(`/api/jobs/customer/${customerId}`);
  return response.data;
};