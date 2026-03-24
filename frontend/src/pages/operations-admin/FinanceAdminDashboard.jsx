import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiDollarSign, FiX } from 'react-icons/fi';
import API from "../../api/axios";

const FinanceAdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({studentId: '', amount: '', dueDate: '', status: 'Pending'});

  const [students, setStudents] = useState([]); 
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({ className: '', section: '' });

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await API.get('/api/student/all-students');
      setStudents(res.data);
    };
    fetchStudents();
  }, []);

  // Update list whenever Class or Section filter changes
  useEffect(() => {
    let result = students;
    if (filters.className) result = result.filter(s => s.className === filters.className);
    if (filters.section) result = result.filter(s => s.section === filters.section);
    if (!filters.className && !filters.section) {
       setFilteredStudents([]); 
    } 
    else {
      setFilteredStudents(result);
    }
  }, [filters, students]);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await API.get('/api/finance/all');
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching fees:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFee = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/finance/create-fee', formData);
      setShowModal(false);
      setFormData({ studentId: '', amount: '', dueDate: '', status: 'Pending' });
      fetchFees(); 
      alert("Fee record created successfully!");
    } catch (err) {
      alert("Error creating fee: " + err.response?.data?.message || err.message);
    }
  };

  // --- Dynamic Stats Calculation ---
  const calculateStats = () => {
   const rawPaid = transactions
    .filter(tx => tx.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

    const displayPaid = rawPaid >= 100000 ? `₹${(rawPaid / 100000).toFixed(1)}L` : `₹${rawPaid.toLocaleString('en-IN')}`;

    const rawPending = transactions
      .filter(tx => tx.status === 'Pending')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const displayPending = rawPending >= 100000 ? `₹${(rawPending / 100000).toFixed(1)}L` : `₹${rawPending.toLocaleString('en-IN')}`;

    const totalExpected = rawPaid + rawPending;

    const recentPaymentsCount = transactions.filter(tx => {
      const thirtyDaysAgo = new Date(); 
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);                          //for last 30 days
      return tx.status === 'Paid' && new Date(tx.paymentDate) > thirtyDaysAgo;
    }).length;

    return [
      { 
        title: "Total Collection", 
        value: displayPaid, 
        fill: `${totalExpected > 0 ? Math.round((rawPaid / totalExpected) * 100) : 0}%`, 
        color: "var(--success)" 
      },
      { 
        title: "Pending Fees", 
        value: displayPending,
        fill: `${totalExpected > 0 ? Math.round((rawPending / totalExpected) * 100) : 0}%`,
        color: "var(--danger)" 
      },
      { 
        title: "Active Students", 
        value: [...new Set(transactions.map(t => t.studentId?._id))].length, 
        fill: "5%", 
        color: "var(--primary)" 
      },
      { 
        title: "Recent (30 day)", 
        value: recentPaymentsCount, 
        fill: "5%", 
        color: "var(--warning)" 
      }
    ];
  };

  const stats = calculateStats();

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <h1>Finance Dashboard</h1>
              <p style={{color: 'var(--text-muted)'}}>Manage fee structures and collections.</p>
            </div>
            <button className="btn-primary" onClick={() => setShowModal(true)}><FiDollarSign /> Create Pending Fees </button>
          </div>

          <div className="cards-grid">
            {stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <span className="stat-title">{stat.title}</span>
                <span className="stat-value">{stat.value}</span>
                <div className="stat-indicator">
                  <div className="indicator-fill" style={{ width: stat.fill, backgroundColor: stat.color }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="table-container">
            <h3>Recent Fee Transactions</h3>
            {loading ? (
              <p>Loading transactions...</p>
            ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Receipt No.</th>
                  <th>Student Name</th>
                  <th>Student Roll No.</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id}>
                    <td>{tx._id.slice(-8)}</td>
                    <td>{tx.studentId?.user?.name}</td>
                    <td>{tx.studentId?.rollNumber}</td>
                    <td>{tx.amount} ₹</td>
                    <td><span className={tx.status === 'Paid' ? 'badge approved' : 'badge pending'}>{tx.status}</span></td>
                    <th>{tx.paymentDate}</th>
                    <td><button className="action-btn">Generate Invoice</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        </div>

        {/* Create Fee Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Create Fee Record</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <FiX size={24} />
                </button>
              </div>
              
              <form onSubmit={handleCreateFee} className="space-y-5">
                {/* Step 1: Filter by Class & Section */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Class</label>
                  <select 
                    className="w-full p-2 border rounded-lg bg-gray-50"
                    onChange={(e) => setFilters({...filters, className: e.target.value})}
                  >
                    <option value="">All Classes</option>
                    <option value="12th">12th</option>
                    <option value="11th">11th</option>
                    <option value="10th">10th</option>
                    <option value="9th">9th</option>
                    <option value="8th">8th</option>
                    <option value="7th">7th</option>
                    <option value="6th">6th</option>
                    <option value="5th">5th</option>
                    <option value="4th">4th</option>
                    <option value="3rd">3rd</option>
                    <option value="2nd">2nd</option>
                    <option value="1st">1st</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Section</label>
                  <select 
                    className="w-full p-2 border rounded-lg bg-gray-50"
                    onChange={(e) => setFilters({...filters, section: e.target.value})}
                  >
                    <option value="">All Sections</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>
              </div>

              {/* Step 2: Select Student from Filtered List */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase">Student Roll No.</label>
                <select 
                  required
                  disabled={filteredStudents.length === 0}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${filteredStudents.length === 0 ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                  value={formData.studentId}
                >
                  <option value="">RollNo...</option>
                  {filteredStudents.map(s => (
                    <option key={s._id} value={s._id}>
                      {s.rollNumber} 
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-blue-600 mt-1">
                  Showing {filteredStudents.length} students in this category.
                </p>
              </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                    <input 
                      type="number" required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.amount} 
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input 
                      type="date" required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.dueDate} 
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                  >
                    Generate Fee
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default FinanceAdminDashboard;