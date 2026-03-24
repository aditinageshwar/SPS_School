const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const financeController = require("../controllers/financeController");

router.post("/create-fee", auth, role("finance-admin"), financeController.createFee);
router.get("/all", auth, role("finance-admin"), financeController. getAllFees);
router.get("/my-fees", auth, role("student"), financeController.getMyFees);
router.post("/pay/:feeId", auth, role("student"), financeController.payFee);

module.exports = router;