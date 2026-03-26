const mongoose = require("mongoose");

const manageTeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  classes: [
    {
      type: String
    }
  ],
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("ManageTeacher", manageTeacherSchema);