const User = require("../models/User");
const bcrypt = require("bcryptjs");

// 🔥 CREATE ADMIN
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const allowedRoles = [
      "academic-admin",
      "student-admin",
      "finance-admin",
      "operations-admin"
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid admin role" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });

    await admin.save();

    res.status(201).json({
      message: "Admin created",
      admin
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 GET ALL ADMINS
exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({
      role: { $in: [
        "academic-admin",
        "student-admin",
        "finance-admin",
        "operations-admin"
      ]}
    });

    res.json(admins);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 DELETE ADMIN
exports.deleteAdmin = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};