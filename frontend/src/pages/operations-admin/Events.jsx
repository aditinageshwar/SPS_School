import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "../../styles/events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({title: "", description: "", date: "", location: ""});

  const fetchEvents = async () => {
    try {
      const res = await API.get("/api/events/all");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const editEvent = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.split("T")[0],
      location: event.location
    });
    setEditingId(event._id);
  };

  const deleteEvent = async (id) => {
    try {
      await API.delete(`/api/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/api/events/${editingId}`,form);
        setEditingId(null);
      } else {
        await API.post("/api/events/create", form);
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
                      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 active:scale-95"
                      onClick={() => editEvent(e)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-200 transition-all duration-200 active:scale-95"
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