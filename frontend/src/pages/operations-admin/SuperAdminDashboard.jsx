import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const modules = [
    { title: "Manage Teachers", desc: "View Teachers", path: "/teachers"},
    { title: "Manage Students", desc: "View Students", path: "/students"},
    { title: "Manage Finance Admin", desc: "Add / Delete Finance Admin", path: "/manage/finance-admin" },
    { title: "Manage Academic Admin", desc: "Add / Delete Academic Admin", path: "/manage/academic-admin" },
    { title: "Manage Student Admin", desc: "Add / Delete Student Admin", path: "/manage/student-admin" },
    { title: "Manage Operations Admin", desc: "Add / Delete Operations Admin", path: "/manage/operations-admin" },  

    { title: "Manage Fees", desc: "Create / Update Fees", path: "/finance-admin"   },
    { title: "Manage Events", desc: "Create / Update Events", path: "/operations-admin"}
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />

        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <h1>Super Admin Control Panel</h1>
              <p style={{ color: 'var(--text-muted)' }}>
                Manage all system modules easily.
              </p>
            </div>
          </div>

          <div className="cards-grid">
            {modules.map((item, i) => (
              <div
                className="stat-card"
                style={{ 
                  cursor: "pointer",
                  boxShadow: "10 20px 40px rgba(0,0,0,0.12)", 
                  padding: "25px",
                  borderRadius: "15px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  backgroundColor: "#fff",
                  border: "1px solid #eee"
                }}
                key={i}
                onClick={() =>
                  navigate(item.path, { state: { from: "super-admin" } })
                }
              >
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="stat-title">{item.title}</span>
                  <span className="stat-value" style={{ fontSize: '20px' }}>→</span>
               </div>

                <div className="stat-indicator">
                  <div
                    className="indicator-fill"
                    style={{
                      width: "100%",
                      backgroundColor: "var(--primary)"
                    }}
                  ></div>
                </div>

                <p style={{ marginTop: "10px", color: "gray" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;