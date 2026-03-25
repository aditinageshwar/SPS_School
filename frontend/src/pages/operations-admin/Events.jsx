import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: ""
  });

  const token = localStorage.getItem("token");

  // 🔥 fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🟡 EDIT EVENT
  const editEvent = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.split("T")[0],
      location: event.location
    });
    setEditingId(event._id);
  };

  // 🟥 DELETE EVENT
  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 CREATE + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/events/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/events/create",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setForm({ title: "", description: "", date: "", location: "" });
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>🎉 Event Management</h2>

      {/* 🔵 FORM */}
      <div className="card">
        <h3>{editingId ? "Update Event" : "Create Event"}</h3>

        <form onSubmit={handleSubmit} className="form-grid">
          <input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <button className="btn-primary">
            {editingId ? "Update Event" : "Create Event"}
          </button>
        </form>
      </div>

      {/* 🟣 TABLE */}
      <div className="card">
        <h3>All Events</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((e) => (
              <tr key={e._id}>
                <td>{e.title}</td>
                <td>{new Date(e.date).toLocaleDateString()}</td>
                <td>{e.location}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => editEvent(e)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => deleteEvent(e._id)}
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
  );
};

export default Events;