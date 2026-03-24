import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiUploadCloud, FiAlertCircle } from 'react-icons/fi';
import API from '../../api/axios';

const StudentDashboard = () => {
  const navigate = useNavigate();
  // const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myFees, setMyFees] = useState([]);

  useEffect(() => {
    const fetchMyFees = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        const res = await API.get('/api/finance/my-fees', {params : {email:email}});
        setMyFees(res.data);
      } catch (err) {
        console.error("Error loading fees");
      } finally {
        setLoading(false);
      }
    };
    fetchMyFees();
  }, []);

  const totalPending = myFees
    .filter(f => f.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleInstantPay = async (feeId) => {
    if (!window.confirm("Are you sure you want to proceed with the payment?")) return;
    try {
      await API.post(`/api/finance/pay/${feeId}`);
      alert("Payment Successful!");
    
      setMyFees(prevFees => prevFees.map(fee => 
        fee._id === feeId ? { ...fee, status: 'Paid', paymentDate: new Date() } : fee
       )
      );
    } 
    catch (err) {
      alert("Payment failed: " + (err.response?.data?.message || "Server Error"));
    }
  };

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       setLoading(true);
  //       const [statsRes, assignRes] = await Promise.all([
  //         API.get('/api/student/stats'),
  //       ]);

  //       setStudentData(statsRes.data);
  //     } catch (err) {
  //       setError("Failed to load dashboard data. Please try again later.");
  //       console.error("Dashboard Fetch Error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  // const stats = studentData ? [
  //   { title: "My Attendance", value: `${studentData.attendance}%`, fill: `${studentData.attendance}%`, color: "#10b981" },
  //   { title: "Pending Assignments", value: studentData.pendingCount, fill: "40%", color: "#f59e0b" },
  //   { title: "Upcoming Tests", value: studentData.testCount, fill: "20%", color: "#ef4444" },
  //   { title: "Unread Notices", value: studentData.noticeCount, fill: "60%", color: "#3b82f6" }
  // ] : [];

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

          <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex justify-between items-center border-l-4 border-red-500">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold">Total Pending Fees</p>
                  <h3 className="text-2xl font-bold text-gray-800">₹{totalPending.toLocaleString('en-IN')}</h3>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all">
                  Pay All
                </button>
              </div>

              {/* Individual Fee Cards */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 mb-[-14px]">Payment History & Dues</h3>
                {myFees.filter(fee => fee.status === 'Pending').length > 0 ? (
                  myFees.filter(fee => fee.status === 'Pending').map((fee) => (
                <div key={fee._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center border border-gray-100">
                  <div>
                    <p className="font-bold text-gray-800">Sem / Admission Fee</p>
                    <p className="font-semibold text-lg text-gray-500">₹{fee.amount}</p>
                  </div>
              
                  <div className="flex flex-col items-end justify-center gap-1">      
                    <p className="text-xs text-red-500">Due Date: {new Date(fee.dueDate).toLocaleDateString()}</p>
                    {fee.status === 'Pending' && (
                      <button onClick={() => handleInstantPay(fee._id)} 
                      className="text-blue-500 bg-blue-100 rounded py-1 px-3 font-bold hover:bg-blue-200 text-md">
                        Pay
                      </button>
                    )}
                  </div>
                </div>
                ))
               ) : (
                <div className="bg-green-50 p-8 rounded-xl border border-green-200 text-center">
                  <p className="text-green-600 font-bold text-lg">No Pending Dues! 🎉</p>
                  <p className="text-green-500 text-sm">Your account is fully up to date.</p>
                </div>
               )}
              </div>
            </div>
          </div>

          {/* Stats Grid */} 
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
          </div> */}

        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;