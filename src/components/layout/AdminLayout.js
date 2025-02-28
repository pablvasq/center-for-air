// src/components/layout/AdminLayout.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaTools, FaChartLine, FaSignOutAlt, FaCog } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { path: '/admin/dashboard', icon: <FaChartLine />, label: 'Dashboard' },
    { path: '/admin/service-requests', icon: <FaCalendarAlt />, label: 'Service Requests' },
    { path: '/admin/technicians', icon: <FaUsers />, label: 'Technicians' },
    { path: '/admin/customers', icon: <FaUsers />, label: 'Customers' },
    { path: '/admin/equipment', icon: <FaTools />, label: 'Equipment' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-900 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold">Center for Air</h1>
          ) : (
            <h1 className="text-xl font-bold">CFA</h1>
          )}
          <button onClick={toggleSidebar} className="ml-auto text-white">
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className="mt-8">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center py-3 px-4 hover:bg-blue-800 transition-colors ${
                    location.pathname === item.path ? 'bg-blue-700' : ''
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4">
          <Link
            to="/logout"
            className="flex items-center py-2 px-4 hover:bg-blue-800 text-red-300 transition-colors"
          >
            <FaSignOutAlt />
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Top Bar */}
        <header className="bg-white shadow">
          <div className="py-4 px-6">
            <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          </div>
        </header>
        
        {/* Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;