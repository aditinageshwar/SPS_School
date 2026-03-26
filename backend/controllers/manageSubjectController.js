const Subject = require("../models/manageSubjects");

// ✅ GET all subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADD subject
exports.createSubject = async (req, res) => {
  try {
    const { name, classes } = req.body;

    if (!name || !classes) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newSubject = new Subject({ name, classes });
    const saved = await newSubject.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE subject
exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Subject.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE subject
exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Subject.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};