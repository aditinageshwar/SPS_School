import axios from "axios";

const BASE_URL = "http://localhost:5000/api/manage-teachers";

// GET all teachers
export const getTeachers = () => axios.get(BASE_URL);

// ADD teacher
export const addTeacher = (data) => axios.post(BASE_URL, data);

// UPDATE teacher
export const updateTeacher = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);

// DELETE teacher
export const deleteTeacher = (id) =>
  axios.delete(`${BASE_URL}/${id}`);