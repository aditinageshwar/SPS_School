import React from 'react';
import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName') || 'User';
  const userRole = localStorage.getItem('role') || 'Guest';
  const shortName = userName.split(' ')[0];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="nav-welcome">
        Welcome, <span className="font-bold text-blue-800">{userName}</span>
        <span className="ml-1 text-xs bg-slate-100 px-1 py-1 rounded text-slate-500 uppercase tracking-tighter">
          ({userRole})
        </span>
      </div>

      <div className="nav-actions flex items-center">
        <button className="icon-btn" title="Notifications">
          <FiBell />
        </button>
        
        <div className="user-profile flex items-center gap-2 ml-4">
          <div className="avatar bg-blue-100 text-blue-600 p-2 rounded-full">
            <FiUser size={18}/>
          </div>
          <span className="font-medium text-slate-700">{shortName}</span>
        </div>

        {/* Logout Action Button */}
        <button 
          className="icon-btn logout-trigger" 
          onClick={handleLogout} 
          title="Logout"
          style={{ color: 'var(--danger)', marginLeft: '15px', borderLeft: '1px solid #E5E7EB', paddingLeft: '15px' }}
        >
          <FiLogOut size={20}/>
        </button>
      </div>
    </header>
  );
};

export default Navbar;