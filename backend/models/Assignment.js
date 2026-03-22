const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({

  classId: Number,
  title: String,
  dueDate: Date,
  teacherId: mongoose.Schema.Types.ObjectId

});

module.exports = mongoose.model("Assignment", assignmentSchema);