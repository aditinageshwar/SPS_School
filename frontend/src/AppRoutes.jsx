import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentRegister from './pages/auth/StudentRegister';

// Dashboards
import SuperAdminDashboard from './pages/operations-admin/SuperAdminDashboard';
import StudentAdminDashboard from './pages/operations-admin/StudentAdminDashboard';
import FinanceAdminDashboard from './pages/operations-admin/FinanceAdminDashboard';
import OperationsAdminDashboard from './pages/operations-admin/OperationsAdminDashboard';
import AcademicAdminDashboard from './pages/operations-admin/AcademicAdminDashboard';
// Teacher
import TeacherDashboard from './pages/operations-admin/TeacherDashboard';
import TeacherAttendanceMark from './pages/operations-admin/TeacherAttendanceMark';
import TeacherApplicationReview from './pages/operations-admin/TeacherApplicationReview';
import TeacherAssignments from "./pages/operations-admin/TeacherAssignments";
import TeacherMyClasses from "./pages/operations-admin/TeacherMyClasses";

// Student
import StudentDashboard from './pages/operations-admin/StudentDashboard';
import StudentProfile from './pages/operations-admin/StudentProfile';
import StudentAttendance from './pages/operations-admin/StudentAttendance';
import Application from './pages/operations-admin/Application';
import StudentAssignments from './pages/operations-admin/StudentAssignments';

// Academic Admin Pages
import ManageTeachers from "./pages/ManageTeachers";
import ManageSubjects from "./pages/ManageSubjects";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-register" element={<StudentRegister />} />

        {/* Super Admin */}
        <Route path="/super-admin" element={<SuperAdminDashboard />} />

        {/* ✅ ACADEMIC ADMIN (SIMPLE ROUTES) */}
        {/* ✅ ACADEMIC ADMIN (FIXED NESTED ROUTES) */}
<Route path="/academic-admin" element={<AcademicAdminDashboard />}>

  {/* Default Dashboard Page */}
  <Route index element={<div />} />

  {/* Child Pages */}
  <Route path="manage-teachers" element={<ManageTeachers />} />
  <Route path="manage-subjects" element={<ManageSubjects />} />

</Route>
        {/* Other Dashboards */}
        <Route path="/student-admin" element={<StudentAdminDashboard />} />
        <Route path="/finance-admin" element={<FinanceAdminDashboard />} />
        <Route path="/operations-admin" element={<OperationsAdminDashboard />} />

        {/* Teacher */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/attendanceMark" element={<TeacherAttendanceMark />} />
        <Route path="/teacher/application" element={<TeacherApplicationReview />} />
        <Route path="/teacher/assignments" element={<TeacherAssignments />} />
        <Route path="/teacher/myclasses" element={<TeacherMyClasses />} />

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/application" element={<Application />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;