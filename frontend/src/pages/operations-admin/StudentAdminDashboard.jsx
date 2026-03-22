import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiUserPlus } from 'react-icons/fi';

const StudentAdminDashboard = () => {
  const stats = [
    { title: "Total Enrolled", value: "2,450", fill: "85%", color: "var(--primary)" },
    { title: "New Admissions", value: "120", fill: "40%", color: "var(--success)" },
    { title: "Profile Updates Pending", value: "18", fill: "15%", color: "var(--warning)" },
    { title: "Unallocated Students", value: "0", fill: "0%", color: "var(--danger)" }
  ];

  const students = [
    { id: "SPS-2026-01", name: "Aarav Patel", grade: "10th", status: "Enrolled" },
    { id: "SPS-2026-02", name: "Riya Singh", grade: "8th", status: "Pending Profile" }
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <h1>Student Management</h1>
              <p style={{color: 'var(--text-muted)'}}>Manage admissions, profiles, and allocations.</p>
            </div>
            <button className="btn-primary"><FiUserPlus /> Add New Student</button>
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
            <h3>Recent Admissions</h3>
            <table className="data-table">
              <thead>
                <tr><th>Student ID</th><th>Name</th><th>Grade/Class</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i}>
                    <td>{s.id}</td><td>{s.name}</td><td>{s.grade}</td>
                    <td><span className={s.status === 'Enrolled' ? 'badge approved' : 'badge pending'}>{s.status}</span></td>
                    <td><button className="action-btn">View Profile</button></td>
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
export default StudentAdminDashboard;