import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { FiDollarSign } from 'react-icons/fi';

const FinanceAdminDashboard = () => {
  const stats = [
    { title: "Total Collection", value: "₹45.2L", fill: "85%", color: "var(--success)" },
    { title: "Pending Fees", value: "₹2.1L", fill: "25%", color: "var(--danger)" },
    { title: "Active Structures", value: "12", fill: "60%", color: "var(--primary)" },
    { title: "Recent Payments", value: "84", fill: "40%", color: "var(--warning)" }
  ];

  const transactions = [
    { receipt: "REC-8901", student: "Aarav Patel", amount: "₹15,000", status: "Paid" },
    { receipt: "REC-8902", student: "Rahul Verma", amount: "₹12,500", status: "Pending" }
  ];

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
            <button className="btn-primary"><FiDollarSign /> Record Payment</button>
          </div>

          <div className="cards-grid">
            {stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <span className="stat-title">{stat.title}</span><span className="stat-value">{stat.value}</span>
                <div className="stat-indicator"><div className="indicator-fill" style={{ width: stat.fill, backgroundColor: stat.color }}></div></div>
              </div>
            ))}
          </div>

          <div className="table-container">
            <h3>Recent Fee Transactions</h3>
            <table className="data-table">
              <thead>
                <tr><th>Receipt No.</th><th>Student Name</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i}>
                    <td>{tx.receipt}</td><td>{tx.student}</td><td>{tx.amount}</td>
                    <td><span className={tx.status === 'Paid' ? 'badge approved' : 'badge pending'}>{tx.status}</span></td>
                    <td><button className="action-btn">Generate Invoice</button></td>
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
export default FinanceAdminDashboard;