import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import EventCalendar from '../../components/EventCalendar';
import { FiPlus } from 'react-icons/fi';


const SuperAdminDashboard = () => {
  const stats = [
    { title: "Total Department Admins", value: "8", fill: "80%", color: "var(--primary)" },
    { title: "Active Sessions", value: "1,204", fill: "60%", color: "var(--success)" },
    { title: "System Alerts", value: "2", fill: "10%", color: "var(--danger)" },
    { title: "Database Load", value: "45%", fill: "45%", color: "var(--warning)" }
  ];

  const admins = [
    { name: "Rajesh Kumar", role: "Operations Admin", status: "Active" },
    { name: "Anita Sharma", role: "Academic Admin", status: "Active" },
    { name: "Vikram Singh", role: "Finance Admin", status: "Active" }
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="dashboard-container">
          
          {/* Header */}
          <div className="dashboard-header">
            <div>
              <h1>Super Admin Control Panel</h1>
              <p style={{color: 'var(--text-muted)'}}>Manage departments and system overview.</p>
            </div>
            <button className="btn-primary"><FiPlus style={{ marginRight: '5px' }}/> Create Admin</button>
          </div>

          {/* Stats Cards */}
          <div className="cards-grid">
            {stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <span className="stat-title">{stat.title}</span>
                <span className="stat-value">{stat.value}</span>
                <div className="stat-indicator">
                  <div className="indicator-fill" style={{ width: stat.fill, backgroundColor: stat.color }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Data Table */}
          <div className="table-container">
            <h3>Department Admins</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th><th>Role</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, i) => (
                  <tr key={i}>
                    <td>{admin.name}</td>
                    <td>{admin.role}</td>
                    <td><span className="badge approved">{admin.status}</span></td>
                    <td>
                      <button className="action-btn">Edit</button>
                      <button className="action-btn delete">Revoke</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calendar Bottom Section */}
          <div className="bottom-grid">
            <EventCalendar />
          </div>

        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;