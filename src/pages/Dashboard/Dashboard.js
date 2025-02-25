// src/pages/Dashboard/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalJobs: 0,
    pendingJobs: 0,
    completedJobs: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const customersRes = await axios.get('/api/customers');
        const jobsRes = await axios.get('/api/jobs');
        
        const pendingJobs = jobsRes.data.filter(job => 
          job.status === 'pending' || job.status === 'scheduled' || job.status === 'in-progress'
        );
        const completedJobs = jobsRes.data.filter(job => 
          job.status === 'completed'
        );
        
        setStats({
          totalCustomers: customersRes.data.length,
          totalJobs: jobsRes.data.length,
          pendingJobs: pendingJobs.length,
          completedJobs: completedJobs.length
        });
        
        // Get recent jobs
        const sortedJobs = [...jobsRes.data].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ).slice(0, 5);
        
        setRecentJobs(sortedJobs);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome {user && user.name}</p>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Customers</h3>
          <p className="stat-number">{stats.totalCustomers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Jobs</h3>
          <p className="stat-number">{stats.totalJobs}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Jobs</h3>
          <p className="stat-number">{stats.pendingJobs}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Jobs</h3>
          <p className="stat-number">{stats.completedJobs}</p>
        </div>
      </div>
      
      <h2>Recent Jobs</h2>
      <div className="recent-jobs">
        {recentJobs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map(job => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.customer.name}</td>
                  <td>{job.status}</td>
                  <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recent jobs</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;