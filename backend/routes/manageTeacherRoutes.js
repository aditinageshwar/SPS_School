const express = require("express");
const router = express.Router();

const {
  addTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher
} = require("../controllers/manageTeacherController");

// Routes
router.post("/", addTeacher);
router.get("/", getAllTeachers);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;