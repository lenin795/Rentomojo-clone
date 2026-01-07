// src/styles/styles.js
export const styles = {
  body: {
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f9fafb'
  },
  loginContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  loginBox: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    padding: '40px',
    width: '100%',
    maxWidth: '450px'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderBottom: '1px solid #e5e7eb',
    padding: '20px'
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  buttonSecondary: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#4f46e5',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  alert: {
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px'
  },
  alertError: {
    backgroundColor: '#fee2e2',
    border: '1px solid #fca5a5',
    color: '#991b1b'
  },
  alertSuccess: {
    backgroundColor: '#d1fae5',
    border: '1px solid #6ee7b7',
    color: '#065f46'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px'
  },
  main: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '24px',
    marginBottom: '24px'
  },
  contractCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '24px',
    marginBottom: '16px',
    transition: 'box-shadow 0.2s'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500'
  },
  badgeAdmin: {
    backgroundColor: '#e0e7ff',
    color: '#4338ca'
  },
  badgeGreen: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: '4px 8px',
    fontSize: '12px'
  },
  badgeBlue: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '4px 8px',
    fontSize: '12px'
  },
  iconButton: {
    padding: '8px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    backgroundColor: 'transparent'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px'
  }
};