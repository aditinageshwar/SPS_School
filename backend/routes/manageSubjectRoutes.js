const express = require("express");
const router = express.Router();

const {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject
} = require("../controllers/manageSubjectController");

// Routes
router.get("/", getSubjects);
router.post("/", createSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

module.exports = router;