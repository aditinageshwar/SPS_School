const ManageTeacher = require("../models/ManageTeacher");

// ✅ ADD Teacher
exports.addTeacher = async (req, res) => {
  try {
    const teacher = new ManageTeacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET All Teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await ManageTeacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE Teacher
exports.updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await ManageTeacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE Teacher
exports.deleteTeacher = async (req, res) => {
  try {
    await ManageTeacher.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};