import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiSettings, FiBookOpen, FiCalendar, FiFileText, FiUser,
  FiUserPlus, FiDollarSign, FiCheckSquare, FiEdit3, FiMail, FiLock 
} from 'react-icons/fi';

const Sidebar = () => {
  const userRole = localStorage.getItem('role') || 'Guest';

  const sidebarMenus = {
    'super-admin': [
      { path: '/super-admin', name: 'System Overview', icon: <FiHome /> },
      { path: '/manage/finance-admin', name: 'Finance Admin', icon: <FiDollarSign /> },
      { path: '/manage/academic-admin', name: 'Academic Admin', icon: <FiBookOpen /> },
      { path: '/manage/student-admin', name: 'Student Admin', icon: <FiUsers /> },
      { path: '/manage/operations-admin', name: 'Operations Admin', icon: <FiSettings /> },
      { path: '/teachers', name: 'Manage Teachers', icon: <FiUserPlus /> },
      { path: '/students', name: 'Manage Students', icon: <FiUsers /> },
      { path: '/forgot-password', name: 'Update Password', icon: <FiLock/>},
      { path: '/update-username', name: 'Update Username', icon: <FiUser/>}
    ],
    'academic-admin': [
      { path: '/academic-admin', name: 'Dashboard', icon: <FiHome /> },
      { path: '/academic-admin/teachers', name: 'Teacher Management', icon: <FiUsers /> },
      { path: '/academic-admin/subjects', name: 'Subjects', icon: <FiBookOpen /> },
      { path: '/academic-admin/classes', name: 'Classes Management', icon: <FiCalendar /> },
      { path: '/forgot-password', name: 'Update Password', icon: <FiLock/>}
    ],
    'student-admin': [
      { path: '/student-admin', name: 'Dashboard', icon: <FiHome /> },
      { path: '/forgot-password', name: 'Update Password', icon: <FiLock/>}
    ],
    'finance-admin': [
      { path: '/finance-admin', name: 'Finance Home', icon: <FiHome /> },
      { path: '/forgot-password', name: 'Update Password', icon: <FiLock/>}
    ],
    'operations-admin': [
      { path: '/operations-admin', name: 'Operations Home', icon: <FiHome /> },
      { path: '/forgot-password', name: 'Update Password', icon: <FiLock/>}
    ],
    'teacher': [
      { path: '/teacher', name: 'My Dashboard', icon: <FiHome /> },
      { path: '/teacher/myclasses', name: 'My Classes', icon: <FiUsers /> },
      { path: '/teacher/attendanceMark', name: 'Attendance Entry', icon: <FiCheckSquare /> },
      { path: '/teacher/assignments', name: 'Assignments', icon: <FiEdit3 /> },
      { path: '/teacher/application', name: 'Review Applications', icon: <FiFileText /> },
      { path: '/forgot-password', name: 'Update Password', icon: <FiLock/>}
    ],
    'student': [
      { path: '/student', name: 'My Dashboard', icon: <FiHome /> },
      { path: '/student/profile', name: 'My Profile', icon: <FiUsers /> },
      { path: '/student/attendance', name: 'Attendance', icon: <FiCheckSquare /> },
      { path: '/student/application', name: 'Application', icon: <FiMail /> },
      { path: '/forgot-password', name: 'Update Password', icon: <FiLock/>}
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