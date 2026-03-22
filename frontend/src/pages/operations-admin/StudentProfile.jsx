import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiLoader, FiBookOpen, FiGrid } from 'react-icons/fi';
import API from '../../api/axios';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail'); 
        const response = await API.get(`/api/student/profile/${userEmail}`);
        setStudent(response.data);
      } 
      catch (err) {
        setError("Could not load profile details.");
        console.error(err);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <FiLoader className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-blue-600 h-32"></div>
            <div className="px-8 pb-8">
              <div className="relative -top-12 flex items-end gap-6">
                <div className="w-32 h-32 rounded-3xl bg-slate-200 border-4 border-white flex items-center justify-center text-slate-400 shadow-lg">
                  <FiUser size={64} />
                </div>
                <div className="pb-4">
                  <h2 className="text-3xl font-black text-slate-800">{student.user?.name}</h2>
                  <p className="text-blue-600 font-bold">Roll No: {student.rollNumber}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Personal Details</h3>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <FiBookOpen className="text-blue-500" />
                    <div><p className="text-xs text-slate-500">Class</p><p className="font-bold">{student.className}</p></div>
                  </div>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <FiGrid className="text-blue-500" />
                    <div><p className="text-xs text-slate-500">Section</p><p className="font-bold">{student.section}</p></div>
                  </div>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <FiCalendar className="text-blue-500" />
                    <div><p className="text-xs text-slate-500">Date of Birth</p><p className="font-bold">{new Date(student.dob).toLocaleDateString('en-GB')}</p></div>
                  </div>
                  
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Contact Information</h3>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <FiMail className="text-blue-500" />
                    <div><p className="text-xs text-slate-500">Email</p><p className="font-bold">{student.user?.email}</p></div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <FiPhone className="text-blue-500" />
                    <div><p className="text-xs text-slate-500">Mobile Number</p><p className="font-bold">{student.user?.phone}</p></div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <FiMapPin className="text-blue-500" />
                    <div><p className="text-xs text-slate-500">Address</p><p className="font-bold">{student.address}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default StudentProfile;