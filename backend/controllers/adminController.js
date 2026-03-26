const User = require("../models/User");
const Fee = require("../models/Fee");
const Student = require("../models/Student");

exports.getDashboard = async (req, res) => {
  try {

    // 🔢 Counts
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTeachers = await User.countDocuments({ role: "teacher" });

    const totalFees = await Fee.countDocuments();

    // 💰 Paid & Pending
    const paidFees = await Fee.countDocuments({ status: "Paid" });
    const pendingFees = await Fee.countDocuments({ status: { $ne: "Paid" } });

    // 💵 Total Amount Calculation
    const fees = await Fee.find();

    const totalAmount = fees.reduce((sum, f) => sum + f.amount, 0);
    const collectedAmount = fees
      .filter(f => f.status === "Paid")
      .reduce((sum, f) => sum + f.amount, 0);

    res.json({
      totalStudents,
      totalTeachers,
      totalFees,
      paidFees,
      pendingFees,
      totalAmount,
      collectedAmount
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};