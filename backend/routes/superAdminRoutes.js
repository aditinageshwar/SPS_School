const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createAdmin,
  getAdmins,
  deleteAdmin
} = require("../controllers/superAdminController");

// 🔥 ONLY SUPER ADMIN

router.post(
  "/create-admin",
  auth,
  role("super-admin"),
  createAdmin
);

router.get(
  "/admins",
  auth,
  role("super-admin"),
  getAdmins
);

router.delete(
  "/admin/:id",
  auth,
  role("super-admin"),
  deleteAdmin
);

module.exports = router;