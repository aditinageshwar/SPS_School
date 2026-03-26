// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();
// const app = express();
// console.log("✅ Event routes loaded...");
// app.use(cors({
//   origin: "http://localhost:3000", 
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());
// connectDB();

// app.get("/", (req, res) => {
//   res.send("SPS School Backend Running");
// });

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/teacher", require("./routes/teacherRoutes"));

// app.use("/api/student", require("./routes/studentRoutes"));
// app.use("/api/attendance", require("./routes/attendanceRoutes"));
// app.use("/api/assignment", require("./routes/assignmentRoutes"));
// app.use("/api/application", require("./routes/applicationRoutes"));
// app.use("/api/finance", require("./routes/financeRoutes"));
// app.use("/api/events", require("./routes/eventRoutes"));
// app.use("/api/super-admin", require("./routes/superAdminRoutes"));


// const PORT = process.env.PORT || 5000;
// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// ✅ DB CONNECT
connectDB();

// ✅ MIDDLEWARES
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("SPS School Backend Running 🚀");
});

// ✅ ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/teacher", require("./routes/teacherRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/assignment", require("./routes/assignmentRoutes"));
app.use("/api/application", require("./routes/applicationRoutes"));
app.use("/api/finance", require("./routes/financeRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));

// 🔥 SUPER ADMIN DASHBOARD (NEW)
app.use("/api/admin", require("./routes/adminRoutes"));

// ❌ REMOVE THIS (if not used)
// app.use("/api/super-admin", require("./routes/superAdminRoutes"));

// ✅ SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});