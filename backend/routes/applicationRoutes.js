const express = require("express");
const router = express.Router();

const controller = require("../controllers/applicationController");

router.post("/send", controller.sendApplication);
router.put("/approve/:id", controller.approveApplication);

module.exports = router;