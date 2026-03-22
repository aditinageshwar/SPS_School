import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public & Authentication Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentRegister from './pages/auth/StudentRegister';

// Dashboard Pages
import SuperAdminDashboard from './pages/operations-admin/SuperAdminDashboard';
import AcademicAdminDashboard from './pages/operations-admin/AcademicAdminDashboard';
import StudentAdminDashboard from './pages/operations-admin/StudentAdminDashboard';
import FinanceAdminDashboard from './pages/operations-admin/FinanceAdminDashboard';
import OperationsAdminDashboard from './pages/operations-admin/OperationsAdminDashboard';
import TeacherDashboard from './pages/operations-admin/TeacherDashboard';
import StudentDashboard from './pages/operations-admin/StudentDashboard';
import StudentProfile from './pages/operations-admin/StudentProfile';
import StudentAttendance from './pages/operations-admin/StudentAttendance';
import LeaveApplication from './pages/operations-admin/LeaveApplication';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-register" element={<StudentRegister />} />
        
        {/* Secure Role-Based Dashboard Routes */}
        <Route path="/super-admin" element={<SuperAdminDashboard />} />
        <Route path="/academic-admin" element={<AcademicAdminDashboard />} />
        <Route path="/student-admin" element={<StudentAdminDashboard />} />
        <Route path="/finance-admin" element={<FinanceAdminDashboard />} />
        <Route path="/operations-admin" element={<OperationsAdminDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/leave" element={<LeaveApplication />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;