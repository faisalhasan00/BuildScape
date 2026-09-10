import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Lock, User, Shield, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Logo } from '../Navbar/Logo';

export const AdminLogin = ({ onClose }) => {
  const { loginAdmin } = useCms();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('buildscape2009');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = loginAdmin(username, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="admin-login-card">
      <div className="admin-login-header">
        <Logo variant="dark" height={50} />
        <div className="admin-login-badge mt-3">
          <Shield size={14} className="text-warning" />
          <span>Executive CMS Portal</span>
        </div>
        <h3 className="mt-2 text-dark font-weight-bold">Admin Sign In</h3>
        <p className="text-muted small">Manage website content, testimonials, media, and customer leads.</p>
      </div>

      {error && (
        <div className="admin-error-box">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-login-form">
        <div className="form-group mb-3">
          <label className="admin-label">Username</label>
          <div className="input-with-icon">
            <User size={16} className="input-icon" />
            <input
              type="text"
              className="admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username (e.g. admin)"
              required
            />
          </div>
        </div>

        <div className="form-group mb-4">
          <label className="admin-label">Password</label>
          <div className="input-with-icon">
            <Lock size={16} className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <small className="form-text text-muted">Default credentials: <code>admin</code> / <code>buildscape2009</code></small>
        </div>

        <div className="d-flex gap-2">
          <button type="button" className="btn-cancel-admin w-50" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-submit-admin w-50">
            Access Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};
