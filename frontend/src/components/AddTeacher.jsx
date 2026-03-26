import React, { useState } from "react";

const AddTeacher = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    classes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/manage-teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        classes: form.classes.split(",")
      })
    });

    alert("Teacher Added!");
    refresh(); // table reload
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="subject" placeholder="Subject" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="classes" placeholder="Classes (comma)" onChange={handleChange} />

      <button type="submit">Add Teacher</button>
    </form>
  );
};

export default AddTeacher;