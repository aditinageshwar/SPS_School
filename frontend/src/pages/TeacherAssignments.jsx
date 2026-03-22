import Sidebar from "../components/Sidebar";
import React, { useState } from "react";

const TeacherAssignments = () => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    class: "",
    section: "",
    dueDate: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    setOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      
      {/* ✅ SIDEBAR */}
      <Sidebar />

      {/* ✅ RIGHT CONTENT */}
      <div style={styles.container}>
        
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Assignments</h1>
            <p style={styles.subtitle}>Manage and create assignments</p>
          </div>

          <button style={styles.createBtn} onClick={() => setOpen(true)}>
            + Create Assignment
          </button>
        </div>

        {/* CARD */}
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th>Title</th>
                <th>Class</th>
                <th>Section</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr style={styles.row}>
                <td>Algebra Worksheet</td>
                <td>8</td>
                <td>A</td>
                <td>26 Mar</td>
                <td>
                  <span style={styles.badgePending}>Pending</span>
                </td>
              </tr>

              <tr style={styles.row}>
                <td>Science Project</td>
                <td>7</td>
                <td>B</td>
                <td>28 Mar</td>
                <td>
                  <span style={styles.badgeDone}>Submitted</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {open && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <h3>Create Assignment</h3>

              <input
                name="title"
                placeholder="Assignment Title"
                onChange={handleChange}
                style={styles.input}
              />

              <div style={styles.rowFlex}>
                <input
                  name="class"
                  placeholder="Class"
                  onChange={handleChange}
                  style={styles.input}
                />
                <input
                  name="section"
                  placeholder="Section"
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <input
                type="date"
                name="dueDate"
                onChange={handleChange}
                style={styles.input}
              />

              <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                style={styles.input}
              />

              <div style={styles.buttonRow}>
                <button style={styles.cancelBtn} onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button style={styles.submitBtn} onClick={handleSubmit}>
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TeacherAssignments;

const styles = {
  container: {
    flex: 1,
    padding: "30px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },
  title: {
  fontSize: "28px",
  fontWeight: "700",
  color: "#111827",
  marginBottom: "5px",
},

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  subtitle: {
    color: "#6b7280",
    fontSize: "14px",
  },

  createBtn: {
    background: "#2563eb",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
  },

  card: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  thead: {
    textAlign: "left",
    color: "#6b7280",
  },

  row: {
    borderTop: "1px solid #eee",
  },

  badgePending: {
    background: "#fef3c7",
    color: "#92400e",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
  },

  badgeDone: {
    background: "#d1fae5",
    color: "#065f46",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
  },

  modal: {
    background: "white",
    padding: "25px",
    width: "420px",
    margin: "100px auto",
    borderRadius: "12px",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

  rowFlex: {
    display: "flex",
    gap: "10px",
  },

  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  cancelBtn: {
    padding: "8px 14px",
    border: "1px solid #ddd",
    background: "white",
    borderRadius: "6px",
  },

  submitBtn: {
    padding: "8px 14px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
};