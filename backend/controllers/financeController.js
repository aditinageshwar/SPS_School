const Fee = require("../models/Fee");

exports.createFee = async (req, res) => {
  const fee = new Fee(req.body);
  await fee.save();
  res.json(fee);
};

exports.getFees = async (req, res) => {
  const fees = await Fee.find();
  res.json(fees);
};