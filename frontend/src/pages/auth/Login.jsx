import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/api/auth/login', credentials);

      // ✅ SAFE DATA EXTRACTION (important fix)
      const role = response.data.role || response.data.user?.role;
      const name = response.data.name || response.data.user?.name;
      const email = response.data.email || response.data.user?.email;

      // ✅ STORE DATA
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', role);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);

      // ✅ CORRECT ROLE-BASED ROUTES (fixed)
      const rolePaths = {
        "super-admin": "/super-admin",
  "academic-admin": "/academic-admin",
  "student-admin": "/student-admin",
  "finance-admin": "/finance-admin",
  "teacher": "/teacher",
  "student": "/student"
      };

      navigate(rolePaths[role] || '/');

    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">SPS School ERP</div>
        <p>Sign in to your account</p>
        
        {error && (
          <div style={{
            color: '#ef4444',
            backgroundColor: '#fee2e2',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '13px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="admin@sps.edu"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Verifying..." : "Secure Login"}
          </button>
        </form>

        <div className="auth-toggle-text">
          Don't have an account?{' '}
          <span
            className="auth-toggle-link"
            onClick={() => navigate('/register')}
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;