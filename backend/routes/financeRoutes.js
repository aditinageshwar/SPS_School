const express = require("express");
const router = express.Router();

const financeController = require("../controllers/financeController");

router.post("/create", financeController.createFee);
router.get("/list", financeController.getFees);

module.exports = router;