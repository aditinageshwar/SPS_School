
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../../components/Sidebar';
// import Navbar from '../../components/Navbar';

// const SuperAdminDashboard = () => {
//   const navigate = useNavigate();

//   const modules = [
//     {
//       title: "Manage Teachers",
//       desc: "Add / Delete Teachers",
//       path: "/teachers"
//     },
//     {
//       title: "Manage Students",
//       desc: "Add / Delete Students",
//       path: "/students"
//     },
//     {
//       title: "Manage Fees",
//       desc: "Create / Update Fees",
//       path: "/finance"
//     },
//     {
//       title: "Manage Events",
//       desc: "Create / Update Events",
//       path: "/operations-admin"
//     }
//   ];

//   return (
//     <div className="app-layout">
//       <Sidebar />

//       <main className="main-content">
//         <Navbar />

//         <div className="dashboard-container">

//           {/* Header */}
//           <div className="dashboard-header">
//             <div>
//               <h1>Super Admin Control Panel</h1>
//               <p style={{ color: 'var(--text-muted)' }}>
//                 Manage all system modules easily.
//               </p>
//             </div>
//           </div>

//           {/* 🔥 MODULE CARDS */}
//           <div className="cards-grid">
//             {modules.map((item, i) => (
//               <div
//                 className="stat-card"
//                 key={i}
//                 onClick={() => navigate(item.path)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <span className="stat-title">{item.title}</span>
//                 <span className="stat-value">→</span>

//                 <div className="stat-indicator">
//                   <div
//                     className="indicator-fill"
//                     style={{
//                       width: "100%",
//                       backgroundColor: "var(--primary)"
//                     }}
//                   ></div>
//                 </div>

//                 <p style={{ marginTop: "10px", color: "gray" }}>
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// };

// export default SuperAdminDashboard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Manage Teachers",
      desc: "Add / Delete Teachers",
      path: "/teachers"
    },
    {
      title: "Manage Students",
      desc: "Add / Delete Students",
      path: "/students"
    },
    {
      title: "Manage Fees",
      desc: "Create / Update Fees",
      path: "/finance-admin"   // ✅ FIXED
    },
    {
      title: "Manage Events",
      desc: "Create / Update Events",
      path: "/operations-admin"
    }
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
                key={i}
                onClick={() =>
                  navigate(item.path, { state: { from: "super-admin" } })
                }
                style={{ cursor: "pointer" }}
              >
                <span className="stat-title">{item.title}</span>
                <span className="stat-value">→</span>

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