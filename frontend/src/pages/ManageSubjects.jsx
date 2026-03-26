import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageSubjects = () => {
  // ✅ Empty initial state (backend se aayega data)
  const [subjects, setSubjects] = useState([]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", classes: "" });

  // ✅ FETCH DATA FROM BACKEND
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/subjects");
      setSubjects(res.data);
    } catch (err) {
      console.log("Error fetching subjects:", err);
    }
  };

  // ✅ SEARCH FILTER
  const filteredSubjects = subjects.filter((sub) =>
    sub.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ ADD / UPDATE
  const handleSubmit = async () => {
    if (!form.name || !form.classes) return alert("Fill all fields");

    try {
      if (editId) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/subjects/${editId}`,
          form
        );
      } else {
        // ADD
        await axios.post(
          "http://localhost:5000/api/subjects",
          form
        );
      }

      fetchSubjects(); // refresh data
      setForm({ name: "", classes: "" });
      setEditId(null);
      setShowModal(false);
    } catch (err) {
      console.log("Error saving subject:", err);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/subjects/${id}`
        );
        fetchSubjects();
      } catch (err) {
        console.log("Error deleting subject:", err);
      }
    }
  };

  // ✅ EDIT
  const handleEdit = (sub) => {
    setForm({ name: sub.name, classes: sub.classes });
    setEditId(sub._id); // 🔥 IMPORTANT (_id from backend)
    setShowModal(true);
  };

  return (
    <div className="manage-container">

      {/* STYLE */}
      <style>{`
        .manage-container {
          padding: 20px;
          width: 100%;
          background: #f5f6fa;
          min-height: 100vh;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .header h2 {
          font-size: 22px;
          color: #333;
        }

        .add-btn {
          background: #2f6fed;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
        }

        .update-btn {
          background: #f4a62a;
          color: white;
          border: none;
          padding: 6px 10px;
          margin-right: 6px;
          border-radius: 5px;
          cursor: pointer;
        }

        .delete-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .search-box {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          margin-bottom: 15px;
          border-radius: 6px;
        }

        .table-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #eef1f7;
        }

        th, td {
          padding: 12px;
          text-align: left;
        }

        tr {
          border-top: 1px solid #eee;
        }

        .modal {
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

        .modal-box {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 300px;
        }

        .modal-box input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <h2>Manage Subjects</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Subject
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Subject Name</th>
              <th>Classes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((sub, index) => (
              <tr key={sub._id}>
                <td>{index + 1}</td>
                <td>{sub.name}</td>
                <td>{sub.classes}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleEdit(sub)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(sub._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>{editId ? "Update Subject" : "Add Subject"}</h3>

            <input
              type="text"
              placeholder="Subject Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Classes"
              value={form.classes}
              onChange={(e) =>
                setForm({ ...form, classes: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleSubmit} className="add-btn">
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubjects;