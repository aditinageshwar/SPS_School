const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  class: String,
  section: String,
  rollNumber: Number
});

module.exports = mongoose.model("Student", studentSchema);