const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createTeacher = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "teacher"
    });

    await teacher.save();

    res.status(201).json({
      message: "Teacher created successfully",
      teacher
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};