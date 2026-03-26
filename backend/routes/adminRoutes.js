const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const adminController = require("../controllers/adminController");

// 🔥 SUPER_ADMIN Dashboard
router.get(
  "/dashboard",
  auth,
  role("SUPER_ADMIN"),
  adminController.getDashboard
);

module.exports = router;