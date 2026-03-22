import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiCheckSquare } from 'react-icons/fi';

const OperationsAdminDashboard = () => {
  const stats = [
    { title: "Active Classes", value: "48", fill: "100%", color: "var(--primary)" },
    { title: "Infrastructure Tasks", value: "7", fill: "35%", color: "var(--warning)" },
    { title: "Upcoming Events", value: "3", fill: "60%", color: "var(--success)" },
    { title: "Active Notices", value: "5", fill: "20%", color: "var(--danger)" }
  ];

  const tasks = [
    { title: "Library AC Repair", department: "Maintenance", priority: "High", status: "In Progress" },
    { title: "Annual Sports Day Setup", department: "Events", priority: "Medium", status: "Planned" }
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <h1>Operations & Infrastructure</h1>
              <p style={{color: 'var(--text-muted)'}}>Manage classes, events, and notices.</p>
            </div>
            <button className="btn-primary"><FiCheckSquare /> Post Notice</button>
          </div>

          <div className="cards-grid">
            {stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <span className="stat-title">{stat.title}</span><span className="stat-value">{stat.value}</span>
                <div className="stat-indicator"><div className="indicator-fill" style={{ width: stat.fill, backgroundColor: stat.color }}></div></div>
              </div>
            ))}
          </div>

          <div className="table-container">
            <h3>Infrastructure & Event Tasks</h3>
            <table className="data-table">
              <thead>
                <tr><th>Task Title</th><th>Department</th><th>Priority</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {tasks.map((t, i) => (
                  <tr key={i}>
                    <td>{t.title}</td><td>{t.department}</td><td>{t.priority}</td>
                    <td><span className="badge management">{t.status}</span></td>
                    <td><button className="action-btn">Update Status</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
export default OperationsAdminDashboard;