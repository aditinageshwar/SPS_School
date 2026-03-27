import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../styles/events.css";
import API from "../../api/axios";

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({name: "", email: "", phone: "", password: ""});

  const fetchTeachers = async () => {
    const res = await API.get("/api/super-admin/teachers");
    setTeachers(res.data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("api/super-admin/create-teacher", form);
    alert("Teacher created successfully");
    setForm({ name: "", email: "", phone: "", password: "" });
    fetchTeachers();
  };

  const deleteTeacher = async (id) => {
    await API.delete(`/api/super-admin/delete-teacher/${id}`);
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