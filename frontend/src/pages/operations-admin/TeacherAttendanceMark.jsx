import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import API from '../../api/axios';
import { FiSave, FiSearch, FiCheck, FiX, FiLoader } from 'react-icons/fi';

const TeacherAttendanceMark = () => {
    const [filters, setFilters] = useState({ className: '', section: '', date: new Date().toISOString().split('T')[0] });
    const [students, setStudents] = useState([]);
    const [attendanceList, setAttendanceList] = useState({}); 
    const [loading, setLoading] = useState(false);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await API.get('/api/attendance/list', {
              params: {
                className: filters.className,
                section: filters.section
              }
           });
            setStudents(res.data);
            const initialStatus = {};
            res.data.forEach(s => initialStatus[s._id] = 'Present');
            setAttendanceList(initialStatus);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (id, status) => {
        setAttendanceList(prev => ({ ...prev, [id]: status }));
    };

    const submitAttendance = async () => {
        const data = Object.keys(attendanceList).map(id => ({
            studentId: id,
            status: attendanceList[id]
        }));
        try {
            await API.post('/api/attendance/bulkSubmit', { attendanceData: data, date: filters.date });
            alert("Attendance recorded successfully!");
        } catch (err) {
            alert("Error saving attendance");
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Navbar />
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>
                    
                    {/* Filters Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-3xl shadow-sm mb-8">
                        <input type="date" name="date" className="!text-slate-900 bg-white border border-slate-200 px-4 rounded-xl" value={filters.date} onChange={handleFilterChange} required/>
                        <input type="text" name="className" placeholder="Class (e.g. 8th)" className=" !text-slate-900 bg-white border border-slate-200 px-4 rounded-xl" value={filters.className} onChange={handleFilterChange} required/>
                        <input type="text" name="section" placeholder="Section (e.g. A)" className="!text-slate-900 bg-white border border-slate-200 px-4 rounded-xl" value={filters.section} onChange={handleFilterChange} required/>
                        <button onClick={fetchStudents} disabled={loading} className="login-btn flex items-center justify-center gap-2">
                            {loading ? <FiLoader className="animate-spin" /> : <FiSearch />}
                            Fetch List
                        </button>
                    </div>

                    {students.length > 0 && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
                                    <tr>
                                        <th className="px-6 py-4">Roll No</th>
                                        <th className="px-6 py-4">Student Name</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {students.map((student) => (
                                        <tr key={student._id}>
                                            <td className="px-6 py-4 font-bold">{student.rollNumber}</td>
                                            <td className="px-6 py-4">{student.user?.name}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <button 
                                                        onClick={() => handleStatusChange(student._id, 'Present')}
                                                        className={`p-2 rounded-lg ${attendanceList[student._id] === 'Present' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}
                                                    >
                                                        <FiCheck />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleStatusChange(student._id, 'Absent')}
                                                        className={`p-2 rounded-lg ${attendanceList[student._id] === 'Absent' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'}`}
                                                    >
                                                        <FiX />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-6 bg-slate-50 border-t flex justify-center">
                                <button onClick={submitAttendance} className="login-btn !w-1/2 flex items-center justify-center gap-2">
                                    <FiSave /> Save Attendance
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TeacherAttendanceMark;