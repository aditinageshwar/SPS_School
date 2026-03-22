const Submission = require("../models/Submission");

exports.submitAssignment = async (req, res) => {
  const submission = new Submission(req.body);
  await submission.save();
  res.json(submission);
};