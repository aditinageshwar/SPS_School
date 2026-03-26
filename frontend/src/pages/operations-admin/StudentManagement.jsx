// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/events.css";

// const StudentManagement = () => {
//   const [students, setStudents] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: ""
//   });

//   const token = localStorage.getItem("token");

//   // 🔥 FETCH STUDENTS
//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/super-admin/students",
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       setStudents(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   // 🔥 ADD STUDENT (SUPER ADMIN API)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         "http://localhost:5000/api/super-admin/create-student",
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       alert("Student Added Successfully ✅");

//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         password: ""
//       });

//       fetchStudents();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // 🟥 DELETE STUDENT
//   const deleteStudent = async (id) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/super-admin/delete-student/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       alert("Student Deleted ❌");
//       fetchStudents();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>🎓 Student Management</h2>

//       {/* 🔵 FORM */}
//       <div className="card">
//         <h3>Add Student</h3>

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
//             Add Student
//           </button>
//         </form>
//       </div>

//       {/* 🟣 TABLE */}
//       <div className="card">
//         <h3>All Students</h3>

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
//             {students.map((s) => (
//               <tr key={s._id}>
//                 <td>{s.name}</td>
//                 <td>{s.email}</td>
//                  <td>{s.phone}</td>

//                 <td>
//                   <div className="action-buttons">
//                     <button
//                       className="btn-delete"
//                       onClick={() => deleteStudent(s._id)}
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

// export default StudentManagement;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../styles/events.css";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const token = localStorage.getItem("token");

  // 🔥 FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/super-admin/students",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔥 ADD STUDENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/super-admin/create-student",
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Student Added Successfully ✅");

      setForm({
        name: "",
        email: "",
        phone: "",
        password: ""
      });

      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  // 🟥 DELETE STUDENT
  const deleteStudent = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/super-admin/delete-student/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Student Deleted ❌");
      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="dashboard-container">
          <h2>🎓 Student Management</h2>

          {/* 🔵 FORM */}
          <div className="card">
            <h3>Add Student</h3>

            <form onSubmit={handleSubmit} className="form-grid">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />

              <button className="btn-primary">
                Add Student
              </button>
            </form>
          </div>

          {/* 🟣 TABLE */}
          <div className="card">
            <h3>All Students</h3>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-delete"
                          onClick={() => deleteStudent(s._id)}
                        >
                          🗑 Delete
                        </button>
                      </div>
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

export default StudentManagement;