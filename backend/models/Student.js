const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  className: { type: String, required: true },
  section: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  address: { type: String },
  dob: { type: Date, required: true }
});

module.exports = mongoose.model("Student", studentSchema);