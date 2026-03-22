import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiEdit3 } from 'react-icons/fi';
import { Link } from "react-router-dom";

<Link to="/teacher/assignments">Assignments</Link>
const TeacherDashboard = () => {
  const stats = [
    { title: "Classes Today", value: "5", fill: "80%", color: "var(--primary)" },
    { title: "Assignments to Grade", value: "24", fill: "40%", color: "var(--warning)" },
    { title: "Average Attendance", value: "92%", fill: "92%", color: "var(--success)" },
    { title: "Pending Applications", value: "3", fill: "15%", color: "var(--danger)" }
  ];

  const applications = [
    { student: "Amit Kumar", type: "Sick Leave", date: "14 March 2026", status: "Review Needed" },
    { student: "Neha Sharma", type: "Late Submission", date: "12 March 2026", status: "Approved" }
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <h1>Teacher Portal</h1>
              <p style={{color: 'var(--text-muted)'}}>Manage attendance, notes, and assignments.</p>
            </div>
            <button className="btn-primary"><FiEdit3 /> Create Assignment</button>
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
            <h3>Student Leave & Applications</h3>
            <table className="data-table">
              <thead>
                <tr><th>Student Name</th><th>Application Type</th><th>Date</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {applications.map((app, i) => (
                  <tr key={i}>
                    <td>{app.student}</td><td>{app.type}</td><td>{app.date}</td>
                    <td><span className={app.status === 'Approved' ? 'badge approved' : 'badge review'}>{app.status}</span></td>
                    <td><button className="action-btn">Review</button></td>
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
export default TeacherDashboard;