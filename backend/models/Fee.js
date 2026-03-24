const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["PENDING", "PAID"],
    default: "PENDING"
  },
  dueDate: {
    type: Date,
    required: true
  },
  paymentDate: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model("Fee", feeSchema);