import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiSend } from 'react-icons/fi';

const LeaveApplication = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert("Application Submitted Successfully!");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="p-8 max-w-4xl">
          <h1 className="text-2xl font-bold mb-2">Apply for Leave</h1>
          <p className="text-slate-500 mb-8">Submit your request for review by the class teacher.</p>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">From Date</label>
                <input type="date" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">To Date</label>
                <input type="date" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 ring-blue-500 outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Reason for Leave</label>
              <textarea 
                rows="4" 
                placeholder="Briefly explain the reason..." 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 ring-blue-500 outline-none resize-none"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              {loading ? "Submitting..." : "Submit Application"} <FiSend />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
export default LeaveApplication;