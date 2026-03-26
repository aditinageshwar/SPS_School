import React, { useEffect, useState } from "react";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    classes: ""
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // 🔹 Fetch teachers
  const fetchTeachers = () => {
    fetch("http://localhost:5000/api/manage-teachers")
      .then((res) => res.json())
      .then((data) => setTeachers(data.data || data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // 🔹 Delete teacher
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/manage-teachers/${id}`, {
      method: "DELETE",
    });

    setTeachers(teachers.filter((t) => t._id !== id));
  };

  // 🔹 Form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 ADD + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editMode
      ? `http://localhost:5000/api/manage-teachers/${editId}`
      : "http://localhost:5000/api/manage-teachers";

    const method = editMode ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        classes: form.classes.split(","),
      }),
    });

    alert(editMode ? "Teacher Updated!" : "Teacher Added!");

    setShowForm(false);
    setEditMode(false);
    setEditId(null);

    setForm({
      name: "",
      subject: "",
      email: "",
      classes: ""
    });

    fetchTeachers();
  };

  return (
    <>
      <style>{`
        .manage-container {
          display: flex;
        }

        .content {
          flex: 1;
          padding: 20px;
          background: #f5f7fb;
          min-height: 100vh;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .buttons button {
          margin-left: 10px;
          padding: 8px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }

        .add {
          background: #2563eb;
          color: white;
        }

        .delete {
          background: #dc2626;
          color: white;
        }

        .update {
          background: #f59e0b;
          color: white;
        }
          .edit,.update, .delete-btn{
          padding:6px 12px;
          min-width:80px;
          text-align:center;
          }

          td button{
           margin-right:8px;
          }

          td button:last-child{
           margin-right:0;
          }

        .table-container {
          margin-top: 20px;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .search {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f1f5f9;
        }

        th, td {
          padding: 12px;
          text-align: left;
        }

        tr {
          border-bottom: 1px solid #e5e7eb;
        }
        
        .delete-btn {
          background: #dc2626;
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }

        /* POPUP SAME STYLE */
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 300px;
        }

        .popup-content input {
          width: 100%;
          margin-bottom: 10px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .popup-buttons {
          display: flex;
          justify-content: space-between;
        }

        .popup-buttons button {
          padding: 6px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .popup-buttons button:first-child {
          background: #2563eb;
          color: white;
        }

        .popup-buttons button:last-child {
          background: #dc2626;
          color: white;
        }
      `}</style>

      <div className="manage-container">
        <div className="content">
          <div className="header">
            <h2>Manage Teachers</h2>

            <div className="buttons">
              <button
                className="add"
                onClick={() => {
                  setShowForm(true);
                  setEditMode(false);
                }}
              >
                + Add Teacher
              </button>

              {/* <button className="delete">Delete Teacher</button>
              <button className="update">Update Teacher</button> */}
            </div>
          </div>

          <div className="table-container">
            <input type="text" placeholder="Search..." className="search" />

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Classes</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {teachers.map((t, index) => (
                  <tr key={t._id}>
                    <td>{index + 1}</td>
                    <td>{t.name}</td>
                    <td>{t.subject}</td>
                    <td>{Array.isArray(t.classes) ? t.classes.join(", ") : t.classes}</td>

                    <td>
                      <button
                        className="update"
                        onClick={() => {
                          setShowForm(true);
                          setEditMode(true);
                          setEditId(t._id);
                          setForm({
                            name: t.name,
                            subject: t.subject,
                            email: t.email,
                            classes: Array.isArray(t.classes)
                              ? t.classes.join(", ")
                              : t.classes
                          });
                        }}
                      >
                        Update
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(t._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <h3>{editMode ? "Update Teacher" : "Add Teacher"}</h3>

            <form onSubmit={handleSubmit}>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
              <input name="classes" value={form.classes} onChange={handleChange} placeholder="Classes" />

              <div className="popup-buttons">
                <button type="submit">
                  {editMode ? "Update" : "Save"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageTeachers;