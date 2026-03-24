const Fee = require("../models/Fee");

// 🔥 Finance Admin → create fee
exports.createFee = async (req, res) => {
  try {
    const { studentId, amount, dueDate } = req.body;

    const fee = new Fee({
      studentId,
      amount,
      dueDate
    });

    await fee.save();

    res.status(201).json({ message: "Fee created", fee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔥 Student → view own fees
exports.getMyFees = async (req, res) => {
  try {
    const fees = await Fee.find({ studentId: req.user.id });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔥 Student → pay fee
exports.payFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      {
        status: "PAID",
        paymentDate: new Date()
      },
      { new: true }
    );

    res.json({ message: "Fee paid", fee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};