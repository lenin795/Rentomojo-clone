// src/components/Auth/Login.js
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { styles } from '../../styles/styles';
import { authAPI } from '../../services/api';

function Login({ onLoginSuccess, onSwitchToSignup }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authAPI.login(formData);
      if (result.success) {
        setSuccess('Login successful!');
        setTimeout(() => onLoginSuccess(result.token), 500);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <FileText size={48} color="#4f46e5" style={{ margin: '0 auto' }} />
        </div>
        <h2 style={{ ...styles.title, textAlign: 'center', marginBottom: '32px' }}>
          Rental Contracts
        </h2>

        {error && <div style={{ ...styles.alert, ...styles.alertError }}>{error}</div>}
        {success && <div style={{ ...styles.alert, ...styles.alertSuccess }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#4338ca')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4f46e5')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '16px', color: '#6b7280' }}>
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            style={{
              background: 'none',
              border: 'none',
              color: '#4f46e5',
              fontWeight: '500',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;