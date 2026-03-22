import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

const StudentAttendance = () => {
  const records = [
    { date: "2026-03-20", day: "Friday", status: "Present" },
    { date: "2026-03-19", day: "Thursday", status: "Present" },
    { date: "2026-03-18", day: "Wednesday", status: "Absent" },
    { date: "2026-03-17", day: "Tuesday", status: "Present" },
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Attendance Record</h1>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
              <span className="text-slate-500 text-sm">Overall: </span>
              <span className="text-green-600 font-black">92%</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Day</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{row.date}</td>
                    <td className="px-6 py-4 text-slate-500">{row.day}</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-2 font-bold ${row.status === 'Present' ? 'text-green-600' : 'text-red-500'}`}>
                        {row.status === 'Present' ? <FiCheckCircle /> : <FiXCircle />} {row.status}
                      </span>
                    </td>
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
export default StudentAttendance;