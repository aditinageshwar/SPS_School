import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiUploadCloud, FiAlertCircle } from 'react-icons/fi';
import API from '../../api/axios';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, assignRes] = await Promise.all([
          API.get('/api/student/stats'),
          API.get('/api/student/assignments')
        ]);

        setStudentData(statsRes.data);
        setAssignments(assignRes.data);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = studentData ? [
    { title: "My Attendance", value: `${studentData.attendance}%`, fill: `${studentData.attendance}%`, color: "#10b981" },
    { title: "Pending Assignments", value: studentData.pendingCount, fill: "40%", color: "#f59e0b" },
    { title: "Upcoming Tests", value: studentData.testCount, fill: "20%", color: "#ef4444" },
    { title: "Unread Notices", value: studentData.noticeCount, fill: "60%", color: "#3b82f6" }
  ] : [];

 if(loading) 
  return <div className="loading-spinner">Loading your portal...</div>;

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="dashboard-container p-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2 border border-red-100">
              <FiAlertCircle /> {error}
            </div>
          )}

          <div className="dashboard-header flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Student Dashboard</h1>
              <p className="text-slate-500 text-sm">Welcome back! Here is your academic progress.</p>
            </div>
            <button onClick={() => navigate('/student/assignments')} 
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">
              <FiUploadCloud /> Submit Assignment
            </button>
          </div>

          {/* Stats Grid */} 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100" key={i}>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</span>
                  <span className="text-2xl font-black text-slate-800">{stat.value}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000" 
                    style={{ width: stat.fill, backgroundColor: stat.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Assignments Table */}
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50">
              <h3 className="text-lg font-bold text-slate-800">Recent Assignments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Topic</th>
                    <th className="px-6 py-4">Deadline</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {assignments.length > 0 ? assignments.map((task, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">{task.subject}</td>
                      <td className="px-6 py-4 text-slate-600">{task.topic}</td>
                      <td className="px-6 py-4 text-slate-500">{new Date(task.deadline).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          task.status === 'Submitted' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 font-bold text-sm hover:underline">View Details</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-slate-400">No recent assignments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;