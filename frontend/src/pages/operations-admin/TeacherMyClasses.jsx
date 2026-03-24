import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiSearch, FiBook, FiClock, FiCalendar } from 'react-icons/fi';

const TeacherMyClasses = () => {
    const [search, setSearch] = useState("");

    const classes = [
        { subject: "Mathematics", class: "Class 8 - A", time: "9:00 AM - 9:45 AM", assignment: "Worksheet on Algebra", due: "26 March 2026" },
        { subject: "Science", class: "Class 7 - B", time: "10:00 AM - 10:45 AM", assignment: "Chapter 5 Worksheet", due: "25 March 2026" },
        { subject: "English", class: "Class 6 - C", time: "11:00 AM - 11:45 AM", assignment: "Essay on My Best Friend", due: "27 March 2026" },
        { subject: "Mathematics", class: "Class 9 - B", time: "12:15 PM - 1:00 PM", assignment: "Geometry Test", due: "28 March 2026" },
        { subject: "Science", class: "Class 7 - A", time: "1:15 PM - 2:00 PM", assignment: "", due: "" },
    ];

    const filtered = classes.filter((c) =>
        c.subject.toLowerCase().includes(search.toLowerCase()) ||
        c.class.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Navbar />

                <div className="p-8">
                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">My Classes</h1>
                            <p className="text-slate-500 text-sm">View and manage your scheduled classes.</p>
                        </div>

                        <div className="relative group">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search subject or class..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-72 outline-none focus:ring-2 ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* TABLE CARD */}
                    <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                        <th className="px-8 py-5">Subject</th>
                                        <th className="px-8 py-5">Class & Section</th>
                                        <th className="px-8 py-5">Time</th>
                                        <th className="px-8 py-5">Upcoming Assignment</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filtered.length > 0 ? (
                                        filtered.map((c, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-5 font-bold text-slate-700">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                                            <FiBook size={16} />
                                                        </div>
                                                        {c.subject}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-slate-600 font-medium">{c.class}</td>
                                                <td className="px-8 py-5 text-slate-500">
                                                    <div className="flex items-center gap-2">
                                                        <FiClock className="text-slate-300" />
                                                        {c.time}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    {c.assignment ? (
                                                        <div className="bg-blue-50/80 border border-blue-100 p-3 rounded-2xl max-w-xs">
                                                            <p className="text-xs font-bold text-blue-700 truncate">{c.assignment}</p>
                                                            <div className="flex items-center gap-1 mt-1 text-[10px] text-blue-500 font-medium">
                                                                <FiCalendar size={10} />
                                                                Due: {c.due}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-slate-400 italic font-medium">
                                                            No assignments
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-20 text-center text-slate-400">
                                                No classes found matching your search.
                                            </td>
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

export default TeacherMyClasses;