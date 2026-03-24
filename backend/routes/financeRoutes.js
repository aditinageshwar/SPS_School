const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const financeController = require("../controllers/financeController");

// 🔥 Finance Admin → create fee
router.post(
  "/create-fee",
  auth,
  role("FINANCE_ADMIN", "SUPER_ADMIN"),
  financeController.createFee
);

// 🔥 Student → view fees
router.get(
  "/my-fees",
  auth,
  role("STUDENT"),
  financeController.getMyFees
);

// 🔥 Student → pay fee
router.put(
  "/pay/:id",
  auth,
  role("STUDENT"),
  financeController.payFee
);

module.exports = router;