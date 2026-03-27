const User = require("../models/User");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

exports.createTeacher = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "teacher"
    });

    await teacher.save();
    res.status(201).json({message: "Teacher created successfully", teacher});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id);

    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher deleted successfully" });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "student"
    });

    await student.save();
    res.status(201).json({message: "Student created successfully",student});
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user || user.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    await Student.findOneAndDelete({ user: userId });
    await User.findByIdAndDelete(userId);
    res.json({ message: "Student fully deleted (User + Profile)" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};