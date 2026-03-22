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

module.exports = router;