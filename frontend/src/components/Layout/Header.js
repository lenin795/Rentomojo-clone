// src/components/Layout/Header.js
import React from 'react';
import { FileText, User, Shield, LogOut } from 'lucide-react';
import { styles } from '../../styles/styles';

function Header({ user, onLogout }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.headerLeft}>
          <FileText size={32} color="#4f46e5" />
          <h1 style={styles.title}>Rental Contracts</h1>
        </div>

        <div style={styles.headerRight}>
          {user?.role === 'admin' && (
            <span style={{ ...styles.badge, ...styles.badgeAdmin }}>
              <Shield size={16} />
              Admin
            </span>
          )}
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#374151' }}>
            <User size={16} />
            {user?.username || 'User'}
          </span>
          <button
            onClick={onLogout}
            style={{
              ...styles.iconButton,
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#fee2e2')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;