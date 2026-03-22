import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const TeacherMyClasses = () => {
  const [search, setSearch] = useState("");

  const classes = [
    {
      subject: "Mathematics",
      class: "Class 8 - A",
      time: "9:00 AM - 9:45 AM",
      assignment: "Worksheet on Algebra",
      due: "26 March 2024",
    },
    {
      subject: "Science",
      class: "Class 7 - B",
      time: "10:00 AM - 10:45 AM",
      assignment: "Chapter 5 Worksheet",
      due: "25 March 2024",
    },
    {
      subject: "English",
      class: "Class 6 - C",
      time: "11:00 AM - 11:45 AM",
      assignment: "Essay on My Best Friend",
      due: "27 March 2024",
    },
    {
      subject: "Mathematics",
      class: "Class 9 - B",
      time: "12:15 PM - 1:00 PM",
      assignment: "Geometry Test",
      due: "28 March 2024",
    },
    {
      subject: "Science",
      class: "Class 7 - A",
      time: "1:15 PM - 2:00 PM",
      assignment: "",
      due: "",
    },
  ];

  const filtered = classes.filter((c) =>
    c.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>My Classes</h1>
            <p style={styles.subtitle}>
              View and manage your scheduled classes.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
        </div>

        {/* TABLE CARD */}
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th>Subject</th>
                <th>Class & Section</th>
                <th>Time</th>
                <th>Upcoming Assignment</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} style={styles.row}>
                  <td>{c.subject}</td>
                  <td>{c.class}</td>
                  <td>{c.time}</td>

                  <td>
                    {c.assignment ? (
                      <div style={styles.assignmentBox}>
                        <strong>{c.assignment}</strong>
                        <p style={styles.due}>Due, {c.due}</p>
                      </div>
                    ) : (
                      <span style={{ color: "#9ca3af" }}>
                        No upcoming assignments
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherMyClasses;

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

  search: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
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

  assignmentBox: {
    background: "#e0f2fe",
    padding: "8px",
    borderRadius: "8px",
  },

  due: {
    fontSize: "12px",
    color: "#6b7280",
    margin: 0,
  },
};