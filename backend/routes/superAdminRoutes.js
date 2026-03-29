const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const controller = require("../controllers/superAdminController");

router.get("/teachers", auth, role("super-admin"), controller.getTeachers);
router.post("/create-teacher", auth, role("super-admin"), controller.createTeacher);
router.delete("/delete-teacher/:id", auth, role("super-admin"), controller.deleteTeacher);
router.post("/create-student", auth, role("super-admin"), controller.createStudent);
router.delete("/delete-student/:id", auth, role("super-admin"), controller.deleteStudent);
router.get("/students", auth, role("super-admin"), controller.getStudents);

router.get('/role/:role', auth, role("super-admin"), controller.getAdminsByRole);
router.post('/create-admin', auth, role("super-admin"), controller.createSpecializedAdmin);
router.delete('/delete-admin/:id', auth, role("super-admin"), controller.deleteAdmin);

module.exports = router;