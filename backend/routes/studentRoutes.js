const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

router.get("/profile/:email", studentController.getStudent);
router.post("/link-profile", studentController.linkStudentProfile);
module.exports = router;