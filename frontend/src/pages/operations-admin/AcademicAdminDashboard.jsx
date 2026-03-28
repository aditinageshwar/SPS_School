import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const AcademicAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalSubjects: 0,
    totalClasses: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/academic-admin/dashboard-stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Total Teachers", value: stats.totalTeachers, color: "var(--primary)" },
    { title: "Active Subjects", value: stats.totalSubjects, color: "var(--success)" },
    { title: "Classes", value: stats.totalClasses, color: "var(--warning)" },
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <h1>Academic Management</h1>
              <p style={{ color: 'var(--text-muted)' }}>Manage teachers, subjects, classes and academic structure.</p>
            </div>
          </div>

          <div className="cards-grid">
            {statCards.map((stat, i) => (
              <div className="stat-card" key={i}>
                <span className="stat-title">{stat.title}</span>
                <span className="stat-value">{loading ? '...' : stat.value}</span>
                <div className="stat-indicator">
                  <div className="indicator-fill" style={{ width: '75%', backgroundColor: stat.color }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Overview Content */}
          <div className="overview-section">
            <div className="quick-info" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              <div className="info-card" style={{ backgroundColor: 'var(--card-bg)', padding: '15px', borderRadius: '8px' }}>
                <h4>Quick Summary</h4>
                <p>Total Teachers: <strong>{stats.totalTeachers}</strong></p>
                <p>Total Subjects: <strong>{stats.totalSubjects}</strong></p>
                <p>Total Classes: <strong>{stats.totalClasses}</strong></p>
              </div>
              <div className="info-card" style={{ backgroundColor: 'var(--card-bg)', padding: '15px', borderRadius: '8px' }}>
                <h4>System Status</h4>
                <p>All systems operational</p>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AcademicAdminDashboard;