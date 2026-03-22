const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  const attendance = new Attendance(req.body);
  await attendance.save();
  res.json(attendance);
};

exports.getAttendance = async (req, res) => {
  const records = await Attendance.find({ studentId: req.params.id });
  res.json(records);
};