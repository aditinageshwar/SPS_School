const Application = require("../models/Application");

exports.sendApplication = async (req, res) => {
  const app = new Application(req.body);
  await app.save();
  res.json(app);
};

exports.approveApplication = async (req, res) => {
  const app = await Application.findByIdAndUpdate(
    req.params.id,
    { status: "APPROVED" },
    { new: true }
  );
  res.json(app);
};