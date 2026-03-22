const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  teacherId: mongoose.Schema.Types.ObjectId,
  type: String,
  message: String,
  status: {
    type: String,
    default: "PENDING"
  }
});

module.exports = mongoose.model("Application", applicationSchema);