import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiShield, FiUsers, FiSettings, FiActivity, 
  FiBookOpen, FiCalendar, FiFileText, FiUserPlus, FiList, 
  FiTrendingUp, FiDollarSign, FiCreditCard, FiAlertCircle, 
  FiPieChart, FiTool, FiTruck, FiBell, FiCheckSquare, 
  FiUploadCloud, FiEdit3, FiAward, FiMail, FiClipboard  
} from 'react-icons/fi';

const Sidebar = () => {
  const userRole = localStorage.getItem('role') || 'Guest';

  const sidebarMenus = {
    '/super-admin': [
      { path: '/super-admin', name: 'System Overview', icon: <FiHome /> },
      // { path: '#role-management', name: 'Role Management', icon: <FiShield /> },
      // { path: '#system-logs', name: 'System Logs', icon: <FiActivity /> },
      // { path: '#global-settings', name: 'Global Settings', icon: <FiSettings /> }
    ],
    'academic-admin': [
      { path: '/academic-admin', name: 'Dashboard', icon: <FiHome /> },
      { path: '/academic-admin/teachers', name: 'Teacher Management', icon: <FiUsers /> },
      { path: '/academic-admin/subjects', name: 'Subjects', icon: <FiBookOpen /> },
      { path: '/academic-admin/classes', name: 'Classes Management', icon: <FiCalendar /> }
    ],
    '/student-admin': [
      { path: '/student-admin', name: 'Dashboard', icon: <FiHome /> },
      // { path: '/student-admin/admissions', name: 'Admissions', icon: <FiClipboard /> },
      // { path: '#profiles', name: 'Student Profiles', icon: <FiUsers /> },
      // { path: '#allocation', name: 'Class Allocation', icon: <FiList /> },
      // { path: '#promotions', name: 'Promotions', icon: <FiTrendingUp /> }
    ],
    '/finance-admin': [
      { path: '/finance-admin', name: 'Finance Home', icon: <FiHome /> },
      // { path: '#structures', name: 'Fee Structures', icon: <FiDollarSign /> },
      // { path: '#collection', name: 'Fee Collection', icon: <FiCreditCard /> },
      // { path: '#defaulters', name: 'Defaulters List', icon: <FiAlertCircle /> },
      // { path: '#payroll', name: 'Payroll & Expenses', icon: <FiPieChart /> }
    ],
    '/operations-admin': [
      { path: '/operations-admin', name: 'Operations Home', icon: <FiHome /> },
      // { path: '#infrastructure', name: 'Infrastructure', icon: <FiTool /> },
      // { path: '#transport', name: 'Transport Management', icon: <FiTruck /> },
      // { path: '#events', name: 'Events Calendar', icon: <FiCalendar /> },
      // { path: '#notice-board', name: 'Notice Board', icon: <FiBell /> }
    ],
    'teacher': [
      { path: '/teacher', name: 'My Dashboard', icon: <FiHome /> },
      { path: '/teacher/myclasses', name: 'My Classes', icon: <FiUsers /> },
      { path: '/teacher/attendanceMark', name: 'Attendance Entry', icon: <FiCheckSquare /> },
      { path: '/teacher/assignments', name: 'Assignments', icon: <FiEdit3 /> },
      { path: '/teacher/application', name: 'Review Applications', icon: <FiFileText /> },
    ],
    'student': [
      { path: '/student', name: 'My Dashboard', icon: <FiHome /> },
      { path: '/student/profile', name: 'My Profile', icon: <FiUsers /> },
      { path: '/student/attendance', name: 'Attendance', icon: <FiCheckSquare /> },
      { path: '/student/application', name: 'Application', icon: <FiMail /> }
    ]
  };
  const currentMenu = sidebarMenus[userRole] || [];

  const getMenuTitle = () => {
    const titles = {
      'admin': 'SUPER ADMIN',
      'academic-admin': 'ACADEMIC ADMIN',
      'teacher': 'TEACHER PORTAL',
      'student': 'STUDENT PORTAL',
      'guest': 'SPS ERP'
    };
    return titles[userRole] || 'MAIN MENU';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon bg-white text-blue-600 p-1.5 rounded-lg mr-2 inline-flex">
          <FiSettings size={18} />
        </div>
        SPS School ERP
      </div>
      
      <ul className="sidebar-menu">
        <li style={{ padding: '15px 24px 5px', fontSize: '12px', color: '#6B7280', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {getMenuTitle()}
        </li>
        
        {currentMenu.length > 0 ? (
         currentMenu.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}
          >
            <span className="nav-icon"> {link.icon} </span>
            <span>{link.name}</span>
          </NavLink>
        ))
        ) : (<div className="p-6 text-xs text-slate-500">No menu items available for this role.</div>
      )}
      </ul>
    </aside>
  );
};

export default Sidebar;