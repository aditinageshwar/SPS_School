// const express = require("express");
// const router = express.Router();

// const studentController = require("../controllers/studentController");

// router.get("/all-students", studentController.getAllStudents);
// router.get("/profile/:email", studentController.getStudent);
// router.post("/link-profile", studentController.linkStudentProfile);
// module.exports = router;
const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

// 🔥 ADD THESE (NEW)
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ✅ (No restriction change — same as before)
router.get("/all-students", studentController.getAllStudents);

// ✅ (No restriction change — same as before)
router.get("/profile/:email", studentController.getStudent);

// 🔥 ONLY CHANGE → SUPER_ADMIN can add student
router.post(
  "/link-profile",
  auth,
  role("SUPER_ADMIN"),
  studentController.linkStudentProfile
);
router.delete(
  "/delete/:id",
  auth,
  role("SUPER_ADMIN"),
  studentController.deleteStudent
);

module.exports = router;