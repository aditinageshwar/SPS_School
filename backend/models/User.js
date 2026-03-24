const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  phone: { 
    type: String,
    required: [true, "Phone number is required"]
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    lowercase: true,
    enum: {
      values: ['student', 'teacher', 'admin', 'finance-admin'],
      message: '{VALUE} is not a supported role' // Better error message for your console
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);