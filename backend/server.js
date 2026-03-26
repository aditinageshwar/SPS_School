const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const manageSubjectRoutes = require("./routes/manageSubjectRoutes");

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("SPS School Backend Running");
});

// Existing Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/teacher", require("./routes/teacherRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/assignment", require("./routes/assignmentRoutes"));
app.use("/api/application", require("./routes/applicationRoutes"));
app.use("/api/finance", require("./routes/financeRoutes"));

// ✅ NEW ROUTES
app.use("/api/manage-teachers", require("./routes/manageTeacherRoutes"));
app.use("/api/subjects", manageSubjectRoutes); // ✅ only ONE line

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});