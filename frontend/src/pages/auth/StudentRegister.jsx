import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { FiArrowRight } from 'react-icons/fi';

const StudentRegister = () => {
  const location = useLocation();  
  const navigate = useNavigate();

  const emailFromReg = location.state?.email || "";  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: emailFromReg, className: '', section: '', rollNumber: '', dob: '', address: ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/student/link-profile', formData);
      alert('Student profile completed! Please login to continue.');
      navigate('/login');
    } 
    catch (err) {
      alert(err.response?.data?.message || "Error linking profile");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="register-card">
        <div className="login-logo">SPS School ERP</div>

        {error && (
          <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <h3 style={{ color: '#f8fafc', fontSize: '18px', marginBottom: '10px' }}>Academic Details</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '30px' }}>
          Finalize your profile for: <span style={{color: '#3b82f6'}}>{emailFromReg}</span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* 2-Column Row for Class and Section */}
          <div className="form-row">
            <div className="form-group">
              <label>Current Class</label>
              <input type="text" name="className" className="form-control" placeholder="8th" onChange={handleChange} value={formData.className} required />
            </div>
            <div className="form-group">
              <label>Section</label>
              <input type="text" name="section" className="form-control" placeholder="A" onChange={handleChange} value={formData.section} required />
            </div>
          </div>

          {/* 2-Column Row for Roll Number and DOB */}
          <div className="form-row">
            <div className="form-group">
              <label>Roll Number</label>
              <input type="text" name="rollNumber" className="form-control" placeholder="58" onChange={handleChange} value={formData.rollNumber} required />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dob" className="form-control" onChange={handleChange} value={formData.dob} required />
            </div>
          </div>

          {/* Full Width for Address */}
          <div className="form-group">
            <label>Permanent Address</label>
            <textarea 
                name="address" 
                className="form-control" 
                placeholder="Enter your full residential address..." 
                style={{ height: '80px', paddingTop: '10px', resize: 'none' }}
                onChange={handleChange} 
                value={formData.address}
                required 
            ></textarea>
          </div>

          <button type="submit" className="login-btn" style={{ marginTop: '20px' }} disabled={loading}>
            {loading ? "Saving Details..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;