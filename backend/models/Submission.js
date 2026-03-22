const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  assignmentId: mongoose.Schema.Types.ObjectId,
  studentId: mongoose.Schema.Types.ObjectId,
  fileUrl: String,
  submittedAt: Date
});

module.exports = mongoose.model("Submission", submissionSchema);