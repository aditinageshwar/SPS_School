// import React from "react";
// import Sidebar from '../../components/Sidebar';
// import Navbar from '../../components/Navbar';

// const AcademicAdminHome = () => {

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userName = user?.name || "User";

//   return (
//     <div style={{ display: "flex" }}>
      
//       {/* ✅ Sidebar */}
//       <Sidebar />

//       {/* ✅ Main Content */}
//       <div style={{ flex: 1 }}>
        
//         {/* ✅ Navbar */}
//         <Navbar />

//         <div className="home-container">

//           <style>{`
//             .home-container {
//               padding: 20px;
//               background: #f5f6fa;
//               min-height: 100vh;
//             }

//             .hero {
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//               background: linear-gradient(90deg, #f7e7d9, #dce8ff);
//               padding: 25px;
//               border-radius: 12px;
//               margin-bottom: 20px;
//             }

//             .hero-text h2 {
//               font-size: 24px;
//             }

//             .hero-text span {
//               color: #2f6fed;
//               font-weight: bold;
//             }

//             .quote {
//               margin-top: 10px;
//               padding-left: 10px;
//               border-left: 3px solid #2f6fed;
//               font-style: italic;
//             }

//             .hero img {
//               width: 180px;
//             }

//             .about-box {
//               background: white;
//               padding: 20px;
//               border-radius: 10px;
//               margin-bottom: 20px;
//             }

//             .about-content {
//               display: flex;
//               gap: 25px;
//               align-items: center;
//             }

//             .about-content img {
//               width: 320px;
//               border-radius: 10px;
//             }

//             .cards {
//               display: flex;
//               gap: 20px;
//             }

//             .card {
//               flex: 1;
//               background: white;
//               padding: 20px;
//               border-radius: 10px;
//             }
//           `}</style>

//           {/* HERO */}
//           <div className="hero">
//             <div className="hero-text">
//               <h2>
//                 Welcome back, <span>{userName}</span>!
//               </h2>
//               <p>Academic Administrator • Leading Excellence in Education</p>

//               <div className="quote">
//                 “Education is the foundation of progress.”
//               </div>
//             </div>

//             <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" />
//           </div>

//           {/* ABOUT */}
//           <div className="about-box">
//             <h3>About Academic Administration</h3>

//             <div className="about-content">
//               <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" />

//               <div>
//                 <p>
//                   Academic Administration manages all academic operations,
//                   ensuring quality education and smooth coordination.
//                 </p>

//                 <ul>
//                   <li>✔ Managing teachers</li>
//                   <li>✔ Subject allocation</li>
//                   <li>✔ Performance tracking</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* CARDS */}
//           <div className="cards">
//             <div className="card">
//               <h4>Key Responsibilities</h4>
//               <ul>
//                 <li>Teacher management</li>
//                 <li>Subject planning</li>
//               </ul>
//             </div>

//             <div className="card">
//               <h4>Vision</h4>
//               <p>Build a strong academic system.</p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AcademicAdminHome;