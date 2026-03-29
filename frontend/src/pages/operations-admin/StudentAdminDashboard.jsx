import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiUserPlus , FiX, FiEyeOff, FiEye} from 'react-icons/fi';
import API from '../../api/axios';
import Admissions from './Admission';
import StudentProfiles from './StudentProfiles';
import ClassAllocation from './ClassAllocation';
import Promotions from './Promotions';

const StudentAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPassword, setShowPassword] = useState(false);
  const [stats, setStats] = useState([
    { title: "Total Enrolled", value: "0", fill: "0%", color: "var(--primary)" },
    { title: "New Admissions", value: "0", fill: "0%", color: "var(--success)" },
    { title: "Unresolved Admissions", value: "0", fill: "0%", color: "var(--warning)" },
    { title: "Unallocated Students", value: "0", fill: "0%", color: "var(--danger)" }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    className: '',
    section: '',
    rollNumber: '',
    address: '',
    dob: ''
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const handleAdmissionSubmit = async (e) => {
    e.preventDefault();
    
      // Password Validation Regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^\+91\d{10}$/;

    if (!phoneRegex.test(newStudent.phone)) {
      alert("Phone number must start with +91 followed by 10 digits (e.g., +919876543210)");
      return;
    }

    if (!passwordRegex.test(newStudent.password)) {
      alert("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
      return; 
    }

    try {
      setSubmitting(true);
      await API.post('/api/admin/student-admin/create-student', newStudent);
      alert("Student Admission Successful!");
      setShowModal(false); 
      setNewStudent({ name: '', email: '', phone: '', password: '', className: '', section: '',  rollNumber: '', address: '', dob: '' });
      fetchDashboardStats(); 
    } catch (err) {
      alert(err.response?.data?.message || "Error during admission");
    } finally {
      setSubmitting(false);
    }
  };

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
                <button className="flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all shadow-sm bg-indigo-600 text-white" 
                  onClick={() => setShowModal(true)}>
                  <FiUserPlus /> 
                  <span> New Admission </span>
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

        {/* Admission Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[100vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
              <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Student Admission Form</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <FiX size={24} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleAdmissionSubmit} className="px-8 py-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Full Name</label>
                    <input type="text" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Email</label>
                    <input type="email" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Phone</label>
                    <input 
                      type="text" 
                      required 
                      maxLength={13}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none" 
                      value={newStudent.phone} 
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Password</label>
                    <div className='relative'>
                      <input 
                        type={showPassword ? "text" : "password"}
                        required 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none" 
                        value={newStudent.password} 
                        onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })} 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-gray-500"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select required className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" value={newStudent.className} onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}>
                    <option value="">Select Class</option>
                    {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>Class {i + 1}</option>)}
                  </select>
                  <select required className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" value={newStudent.section} onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}>
                    <option value="">Section</option>
                    {['A', 'B', 'C', 'D'].map(sec => <option key={sec} value={sec}>{sec}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Roll Number</label>
                    <input type="text" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none" value={newStudent.rollNumber} onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Date of Birth</label>
                    <input type="date" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none" value={newStudent.dob} onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Address</label>
                  <textarea rows="3" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none resize-none" value={newStudent.address} onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}></textarea>
                </div>

                <button type="submit" disabled={submitting} className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70">
                  {submitting ? 'Admitting...' : '🚀 Finalize Admission'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentAdminDashboard;