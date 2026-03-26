import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiBookOpen } from 'react-icons/fi';
import { Outlet, useLocation } from "react-router-dom";

const AcademicAdminDashboard = () => {
  const location = useLocation();

  // 👉 Check if we are on sub-route
  const isSubRoute = location.pathname !== "/academic-admin";

  const stats = [
    { title: "Total Teachers", value: "145", fill: "90%", color: "var(--primary)" },
    { title: "Active Subjects", value: "32", fill: "75%", color: "var(--success)" },
    { title: "Classes Assigned", value: "84", fill: "100%", color: "var(--warning)" },
    { title: "Pending Reports", value: "5", fill: "20%", color: "var(--danger)" }
  ];

  const teachers = [
    { name: "Priya Desai", subject: "Mathematics", classes: "10A, 10B", status: "Assigned" },
    { name: "Ravi Verma", subject: "Science", classes: "9C", status: "Pending" }
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        {/* 🔥 AGAR SUB ROUTE HAI → CHILD PAGE SHOW KARO */}
        {isSubRoute ? (
          <Outlet />
        ) : (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <div>
                <h1>Academic Overview</h1>
                <p style={{color: 'var(--text-muted)'}}>
                  Manage teachers, subjects, and timetables.
                </p>
              </div>
              <button className="btn-primary">
                <FiBookOpen /> Assign Class
              </button>
            </div>

            <div className="cards-grid">
              {stats.map((stat, i) => (
                <div className="stat-card" key={i}>
                  <span className="stat-title">{stat.title}</span>
                  <span className="stat-value">{stat.value}</span>
                  <div className="stat-indicator">
                    <div
                      className="indicator-fill"
                      style={{ width: stat.fill, backgroundColor: stat.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="table-container">
              <h3>Teacher Allocation Roster</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Teacher Name</th>
                    <th>Subject</th>
                    <th>Classes</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t, i) => (
                    <tr key={i}>
                      <td>{t.name}</td>
                      <td>{t.subject}</td>
                      <td>{t.classes}</td>
                      <td>
                        <span className={t.status === 'Assigned' ? 'badge approved' : 'badge pending'}>
                          {t.status}
                        </span>
                      </td>
                      <td>
                        {/* ❌ remove timetable button */}
                        <button className="action-btn">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AcademicAdminDashboard;