// src/components/Auth/Signup.js
import React, { useState } from 'react';
import { styles } from '../../styles/styles';
import { authAPI } from '../../services/api';

function Signup({ onSignupSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    emailid: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authAPI.signup(formData);
      if (result.success) {
        onSignupSuccess();
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
        <h2 style={{ ...styles.title, textAlign: 'center', marginBottom: '32px' }}>
          Create Account
        </h2>

        {error && <div style={{ ...styles.alert, ...styles.alertError }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={formData.emailid}
              onChange={(e) => setFormData({ ...formData, emailid: e.target.value })}
              style={styles.input}
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '16px', color: '#6b7280' }}>
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: '#4f46e5',
              fontWeight: '500',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;