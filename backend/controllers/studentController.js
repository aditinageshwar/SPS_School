const Student = require("../models/Student");
const User = require('../models/User');

exports.getStudent = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = await Student.findOne({ user: user._id })
      .populate('user', 'name email phone');
  
    if (!profile) {
      return res.status(404).json({ message: "Profile details not found" });
    }
    res.status(200).json(profile);

  } catch (error) {
    console.error("Fetch Profile Error:", error.message);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

exports.linkStudentProfile = async (req, res) => {
  try {
    const { email, className, section, rollNumber, dob, address } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found with this email. Please register as a user first." });
    }

    const existingProfile = await Student.findOne({ user: user._id });
    if (existingProfile) {
      return res.status(400).json({ message: "Student profile already exists for this user." });
    }

    // 3. Create the profile linked to the User's ID
    const newProfile = new Student({
      user: user._id,      // This is the Foreign Key
      className,
      section,
      rollNumber,
      dob,
      address
    });

    await newProfile.save();

    res.status(201).json({ 
      success: true, 
      message: `Profile linked successfully to ${user.name}`,
      profile: newProfile 
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};