import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiUserPlus } from 'react-icons/fi';
import API from '../../api/axios';
import Admissions from './Admission';
import StudentProfiles from './StudentProfiles';
import ClassAllocation from './ClassAllocation';
import Promotions from './Promotions';

const StudentAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState([
    { title: "Total Enrolled", value: "0", fill: "0%", color: "var(--primary)" },
    { title: "New Admissions", value: "0", fill: "0%", color: "var(--success)" },
    { title: "Unresolved Admissions", value: "0", fill: "0%", color: "var(--warning)" },
    { title: "Unallocated Students", value: "0", fill: "0%", color: "var(--danger)" }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get('/api/admin/student-admin/dashboard-stats');

      const data = response.data.data;
      const totalStudents = data.totalStudents || 0;
      const pendingAdmissions = data.pendingAdmissions || 0;
      const unresolvedAdmissions = data.unresolvedAdmissions || 0;
      const unallocatedStudents = data.unallocatedStudents || 0;

      // Calculate fill percentages (max 100%)
      const maxStudents = Math.max(totalStudents, 100); // Use at least 100 as baseline
      const totalFill = Math.min((totalStudents / maxStudents) * 100, 100);
      const admissionsFill = Math.min((pendingAdmissions / Math.max(totalStudents, 1)) * 100, 100);
      const unresolvedFill = Math.min((unresolvedAdmissions / Math.max(totalStudents, 1)) * 100, 100);
      const unallocatedFill = Math.min((unallocatedStudents / Math.max(totalStudents, 1)) * 100, 100);

      setStats([
        {
          title: "Total Enrolled",
          value: totalStudents.toLocaleString(),
          fill: `${totalFill}%`,
          color: "var(--primary)"
        },
        {
          title: "New Admissions",
          value: pendingAdmissions.toLocaleString(),
          fill: `${admissionsFill}%`,
          color: "var(--success)"
        },
        {
          title: "Unresolved Admissions",
          value: unresolvedAdmissions.toLocaleString(),
          fill: `${unresolvedFill}%`,
          color: "var(--warning)"
        },
        {
          title: "Unallocated Students",
          value: unallocatedStudents.toLocaleString(),
          fill: `${unallocatedFill}%`,
          color: "var(--danger)"
        }
      ]);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'admissions', label: 'Admissions', icon: '📋' },
    { id: 'profiles', label: 'Student Profiles', icon: '👥' },
    { id: 'allocation', label: 'Class Allocation', icon: '🎓' },
    { id: 'promotions', label: 'Promotions', icon: '⬆️' }
  ];

  // Refresh stats when switching to dashboard tab
  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardStats();
    }
  }, [activeTab]);

  const renderContent = () => {
    switch(activeTab) {
      case 'admissions':
        return <Admissions />;
      case 'profiles':
        return <StudentProfiles />;
      case 'allocation':
        return <ClassAllocation />;
      case 'promotions':
        return <Promotions />;
      case 'dashboard':
      default:
        return (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <div>
                <h1>Student Management</h1>
                <p style={{color: 'var(--text-muted)'}}>Manage admissions, profiles, allocations, and promotions.</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn-secondary"
                  onClick={fetchDashboardStats}
                  disabled={loading}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  {loading ? '🔄 Refreshing...' : '🔄 Refresh Stats'}
                </button>
                <button className="btn-primary" onClick={() => setActiveTab('admissions')}>
                  <FiUserPlus /> New Admission
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                padding: '15px',
                backgroundColor: '#f8d7da',
                color: '#721c24',
                border: '1px solid #f5c6cb',
                borderRadius: '4px',
                marginBottom: '20px'
              }}>
                ⚠️ {error}
              </div>
            )}

            <div className="cards-grid">
              {stats.map((stat, i) => (
                <div className="stat-card" key={i}>
                  <span className="stat-title">{stat.title}</span>
                  <span className="stat-value">{loading ? '...' : stat.value}</span>
                  <div className="stat-indicator">
                    <div
                      className="indicator-fill"
                      style={{
                        width: loading ? '0%' : stat.fill,
                        backgroundColor: stat.color,
                        transition: 'width 0.3s ease'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-links" style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {menuItems.filter(item => item.id !== 'dashboard').map(item => (
                <div
                  key={item.id}
                  style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: '1px solid #dee2e6',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setActiveTab(item.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e7f3ff';
                    e.currentTarget.style.borderColor = '#007bff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                    e.currentTarget.style.borderColor = '#dee2e6';
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>{item.icon}</div>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        
        {/* Tab Navigation */}
        <div style={{ 
          borderBottom: '2px solid #dee2e6', 
          overflowX: 'auto',
          backgroundColor: '#f8f9fa',
          padding: '0 20px'
        }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: activeTab === item.id ? '#007bff' : 'transparent',
                  color: activeTab === item.id ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px 4px 0 0',
                  cursor: 'pointer',
                  fontWeight: activeTab === item.id ? 'bold' : 'normal',
                  fontSize: '14px',
                  marginTop: '10px',
                  marginBottom: '0px'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ backgroundColor: '#fff' }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
export default StudentAdminDashboard;