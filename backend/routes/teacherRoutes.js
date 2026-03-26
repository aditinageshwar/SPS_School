const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const Assignment = require("../models/Assignment");

router.post("/assignment", auth, role("TEACHER"), async (req, res) => {

  const assignment = new Assignment({
    ...req.body,
    teacherId: req.user.id
  });

  await assignment.save();

  res.json(assignment);

});
const teacherController = require("../controllers/teacherController");

// ✅ SUPER_ADMIN → create teacher
router.post(
  "/create-teacher",
  auth,
  role("super-admin"),
  teacherController.createTeacher
);

module.exports = router;