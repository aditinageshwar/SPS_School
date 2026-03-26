const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const controller = require("../controllers/superAdminController");

// 🔥 SUPER ADMIN ONLY
router.post("/create-teacher", auth, role("SUPER_ADMIN"), controller.createTeacher);
router.delete("/delete-teacher/:id", auth, role("SUPER_ADMIN"), controller.deleteTeacher);

router.post("/create-student", auth, role("SUPER_ADMIN"), controller.createStudent);
router.get(
  "/teachers",
  auth,
  role("super-admin"),
  controller.getTeachers
);
router.delete(
  "/delete-student/:id",
  auth,
  role("super-admin"),
  controller.deleteStudent
);
router.get("/students", auth, role("super-admin"), controller.getStudents);
module.exports = router;
