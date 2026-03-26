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
      values: [
        'super-admin',
        'academic-admin',
        'student-admin',
        'finance-admin',
        'operations-admin',
        'teacher',
        'student'
      ],
      message: '{VALUE} is not a supported role'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);