import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiSend, FiFileText } from 'react-icons/fi';
import API from '../../api/axios'; 

const Application = () => {
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem('userEmail');
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    description: '',
    startDate: '',
    endDate: '',
    email: email
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/api/application/send', formData);
      alert("Application Submitted Successfully!");
      setFormData({ type: '', subject: '', description: '', startDate: '', endDate: '' });
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="p-8 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FiFileText className="text-blue-600" /> New Application
            </h1>
            <p className="text-slate-500">Submit requests for certificates, leave, or other academic needs.</p>
          </header>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
            
            {/* Application Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Application Type</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 ring-blue-500 outline-none appearance-none cursor-pointer"
              >
                <option value="Leave">Leave Application</option>
                <option value="Bonafide">Bonafide Certificate</option>
                <option value="Fee Extension">Fee Extension Request</option>
                <option value="Document">Document Request (Marksheet/TC)</option>
                <option value="Other">Other Request</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Subject</label>
              <input 
                type="text" 
                name="subject"
                placeholder="e.g., Request for Semester Marksheet"
                required 
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 ring-blue-500 outline-none" 
              />
            </div>

            {/* Optional Dates - Only relevant for certain types */}
            {formData.type === 'Leave' && (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">From Date</label>
                  <input type="date" name="startDate" onChange={handleChange} required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 ring-blue-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">To Date</label>
                  <input type="date" name="endDate" onChange={handleChange} required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 ring-blue-500 outline-none" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Description / Reason</label>
              <textarea 
                name="description"
                rows="5" 
                placeholder="Details of your request..." 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 ring-blue-500 outline-none resize-none"
                required
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Send Application"} <FiSend />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Application;