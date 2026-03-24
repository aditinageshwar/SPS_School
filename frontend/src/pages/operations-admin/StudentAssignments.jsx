import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { FiUpload, FiSend, FiFileText, FiLink } from 'react-icons/fi';

const StudentAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [selectedAsg, setSelectedAsg] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [formData, setFormData] = useState({ answer: "", fileUrl: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                
                const [asgRes, subRes] = await Promise.all([
                    API.get(`/api/assignment/all?email=${userEmail}`),
                    API.get(`/api/assignment/my-submissions?email=${userEmail}`) 
                ]);

                setAssignments(asgRes.data);
                setSubmissions(subRes.data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchData();
    }, []);

    const pendingAssignments = assignments.filter(asg => 
        !submissions.some(sub => sub.assignment === asg._id)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const userEmail = localStorage.getItem('userEmail');
            await API.post('/api/assignment/submit', { 
                ...formData, 
                assignment: selectedAsg._id, 
                userEmail 
            });
            alert("Success!");
            setSubmissions([...submissions, { assignment: selectedAsg._id }]);
            setSelectedAsg(null);
            setFormData({ answer: "", fileUrl: "" });
        } 
        catch (err) {
            alert(err.response?.data?.message || "Submission failed");
        } 
        finally { 
            setSubmitting(false); 
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-black text-slate-800 mb-6">Pending Assignments</h1>
            
            <div className="grid gap-4">
            {pendingAssignments.length > 0 ? (
              pendingAssignments.map((asg) => (
              <div key={asg._id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-lg text-slate-900">{asg.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-2">{asg.instructions}</p>
                
                  {/* Due Date Section */}
                  <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-red-50 text-red-600 rounded-full w-fit">
                    <span className="uppercase tracking-wider">Due:</span>
                    <span>{new Date(asg.dueDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })}
                    </span>
                  </div>
                </div>

                <button onClick={() => setSelectedAsg(asg)}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
                >
                  Submit
                </button>
              </div>
              ))) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                        <p className="text-slate-400 font-bold">All caught up! No pending assignments 🎉</p>
                    </div>
              )}
            </div>

            {/* SUBMISSION MODAL */}
            {selectedAsg && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-lg rounded-[40px] p-10 shadow-2xl">
                        <div className="mb-6">
                           <div className="flex justify-between items-start mb-2">
                            <h3 className="text-2xl font-black text-slate-800 leading-tight ml-2"> {selectedAsg.title} </h3>
                            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"> Assignment </span>
                           </div>
                
                           <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-4">
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Teacher's Instructions</p>
                            <p className="text-slate-600 text-sm leading-relaxed"> {selectedAsg.instructions || "No specific instructions provided."} </p>
                           </div>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Your Answer</label>
                                <textarea 
                                    required
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl h-40 focus:ring-2 ring-blue-500/20 outline-none"
                                    placeholder="Type your summary or notes here..."
                                    value={formData.answer}
                                    onChange={(e) => setFormData({...formData, answer: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">File URL</label>
                                <div className="relative">
                                    <FiLink className="absolute left-4 top-4 text-slate-400" />
                                    <input 
                                        required
                                        type="url"
                                        className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 ring-blue-500/20 outline-none"
                                        placeholder="https://drive.google.com/..."
                                        value={formData.fileUrl}
                                        onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setSelectedAsg(null)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold">Cancel</button>
                                <button disabled={submitting} type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                                    {submitting ? "Uploading..." : "Submit Work"} <FiSend />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentAssignments;