const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  status: String
});

module.exports = mongoose.model("Fee", feeSchema);