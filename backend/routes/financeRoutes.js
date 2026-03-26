// const express = require("express");
// const router = express.Router();

// const auth = require("../middleware/authMiddleware");
// const role = require("../middleware/roleMiddleware");

// const financeController = require("../controllers/financeController");

// router.post("/create-fee", auth, role("finance-admin"), financeController.createFee);
// router.get("/all", auth, role("finance-admin"), financeController. getAllFees);
// router.get("/my-fees", auth, role("student"), financeController.getMyFees);
// router.post("/pay/:feeId", auth, role("student"), financeController.payFee);

// module.exports = router;
const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const financeController = require("../controllers/financeController");

// 🔥 SUPER_ADMIN + FINANCE_ADMIN → manage fees
router.post(
  "/create-fee",
  auth,
  role("FINANCE_ADMIN", "SUPER_ADMIN"),
  financeController.createFee
);

router.get(
  "/all",
  auth,
  role("FINANCE_ADMIN", "SUPER_ADMIN"),
  financeController.getAllFees
);

// ✅ Student → unchanged
router.get(
  "/my-fees",
  auth,
  role("STUDENT"),
  financeController.getMyFees
);

router.post(
  "/pay/:feeId",
  auth,
  role("STUDENT"),
  financeController.payFee
);
router.put(
  "/update/:feeId",
  auth,
  role("FINANCE_ADMIN", "SUPER_ADMIN"),
  financeController.updateFee
);
router.delete(
  "/delete/:feeId",
  auth,
  role("FINANCE_ADMIN", "SUPER_ADMIN"),
  financeController.deleteFee
);

module.exports = router;