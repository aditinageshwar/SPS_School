import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }

    setLoading(true);
    try {
      const response = await API.post('/api/auth/register', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        password: formData.password
      });

      // --- LOGIC FOR LINKING ---
      if (formData.role === 'student') {
        alert('Account created! Now, please complete your student profile.');
        navigate('/student-register', { state: { email: formData.email } });
      } else {
        alert('Registration successful!');
        navigate('/login');
      }
    } 
    catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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

        <p style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '30px' }}>
          Create your portal account
        </p>

        <form onSubmit={handleRegister}>
          {/* 2-Column Row for Names */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="firstName" className="form-control" placeholder="John" onChange={handleChange} value={formData.firstName} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" className="form-control" placeholder="Doe" onChange={handleChange} value={formData.lastName} required />
            </div>
          </div>

          {/* 2-Column Row for Contact Info */}
          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" className="form-control" placeholder="john@example.com" onChange={handleChange} value={formData.email} required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" className="form-control" placeholder="+91 98765 43210" onChange={handleChange} value={formData.phone} required />
            </div>
          </div>

          <div className="form-group">
            <label>Applying For (Role)</label>
            <select className="form-control" name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select a role...</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher / Faculty</option>
            </select>
          </div>

          {/* 2-Column Row for Passwords */}
          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" className="form-control" placeholder="••••••••" onChange={handleChange} value={formData.password} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" className="form-control" placeholder="••••••••" onChange={handleChange} value={formData.confirmPassword} required />
            </div>
          </div>

          <button type="submit" className="login-btn" style={{ marginTop: '20px' }} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-toggle-text">
          Already have an account?
          <span className="auth-toggle-link" onClick={() => navigate('/login')}>
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;