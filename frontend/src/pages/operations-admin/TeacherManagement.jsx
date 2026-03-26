// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/events.css";

// const TeacherManagement = () => {
//   const [teachers, setTeachers] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: ""
//   });

//   const token = localStorage.getItem("token");

//   // 🔥 FETCH TEACHERS
//   const fetchTeachers = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/super-admin/teachers",
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       setTeachers(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   // 🔥 ADD TEACHER
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         "http://localhost:5000/api/super-admin/create-teacher",
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       alert("Teacher Added Successfully ✅");

//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         password: ""
//       });

//       fetchTeachers();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // 🟥 DELETE TEACHER
//   const deleteTeacher = async (id) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/super-admin/delete-teacher/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       alert("Teacher Deleted ❌");
//       fetchTeachers();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>👨‍🏫 Teacher Management</h2>

//       {/* 🔵 FORM */}
//       <div className="card">
//         <h3>Add Teacher</h3>

//         <form onSubmit={handleSubmit} className="form-grid">
//           <input
//             type="text"
//             placeholder="Name"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//             required
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//             required
//           />

//           <input
//             type="text"
//             placeholder="Phone"
//             value={form.phone}
//             onChange={(e) =>
//               setForm({ ...form, phone: e.target.value })
//             }
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//             required
//           />

//           <button className="btn-primary">
//             Add Teacher
//           </button>
//         </form>
//       </div>

//       {/* 🟣 TABLE */}
//       <div className="card">
//         <h3>All Teachers</h3>

//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th style={{ textAlign: "center" }}>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {teachers.map((t) => (
//               <tr key={t._id}>
//                 <td>{t.name}</td>
//                 <td>{t.email}</td>
//                 <td>{t.phone}</td>

//                 <td>
//                   <div className="action-buttons">
//                     <button
//                       className="btn-delete"
//                       onClick={() => deleteTeacher(t._id)}
//                     >
//                       🗑 Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//       </div>
//     </div>
//   );
// };

// export default TeacherManagement;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../styles/events.css";

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const token = localStorage.getItem("token");

  const fetchTeachers = async () => {
    const res = await axios.get("http://localhost:5000/api/super-admin/teachers", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTeachers(res.data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/super-admin/create-teacher",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setForm({ name: "", email: "", phone: "", password: "" });
    fetchTeachers();
  };

  const deleteTeacher = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/super-admin/delete-teacher/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTeachers();
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="dashboard-container">
          <h2>👨‍🏫 Teacher Management</h2>

          <div className="card">
            <h3>Create Teacher</h3>

            <form onSubmit={handleSubmit} className="form-grid">
              <input placeholder="Name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />

              <input placeholder="Email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />

              <input placeholder="Phone" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />

              <input type="password" placeholder="Password" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} />

              <button className="btn-primary">Create Teacher</button>
            </form>
          </div>

          <div className="card">
            <h3>All Teachers</h3>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {teachers.map((t) => (
                  <tr key={t._id}>
                    <td>{t.name}</td>
                    <td>{t.email}</td>
                    <td>{t.phone}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => deleteTeacher(t._id)}
                      >
                        🗑 Delete
                      </button>
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

export default TeacherManagement;