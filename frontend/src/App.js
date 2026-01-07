// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Header from './components/Layout/Header';
import ContractList from './components/Contracts/ContractList';
import ContractForm from './components/Contracts/ContractForm';
import { authAPI, contractAPI } from './services/api';
import { styles } from './styles/styles';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setCurrentView('contracts');
    }
  }, []);

  const [contractForm, setContractForm] = useState({
    subscriptionId: '',
    deposit: '',
    startDate: '',
    endDate: '',
    renewalAllowed: true,
    signatureURL: '',
    tdsApplicable: false
  });

  useEffect(() => {
    if (user) {
      fetchContracts();
    }
  }, [user]); // Fetch when user is set

  useEffect(() => {
    if (token) {
      // Decode token to get user info
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ username: payload.username, role: payload.role });
      } catch (err) {
        console.error('Invalid token:', err);
        handleLogout();
      }
    }
  }, [token]);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const fetchContracts = async () => {
    if (!user) return; // Wait for user to be set
    setLoading(true);
    setError('');
    try {
      const data = user.role === 'admin' 
        ? await contractAPI.getAllContracts()
        : await contractAPI.getMyContracts();
      setContracts(data);
    } catch (err) {
      setError('Failed to fetch contracts');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setCurrentView('contracts');
  };

  const handleSignupSuccess = () => {
    setSuccess('Account created! Please login.');
    setCurrentView('login');
  };

  const handleLogout = () => {
    authAPI.logout();
    setToken(null);
    setUser(null);
    setContracts([]);
    setCurrentView('login');
  };

  const handleCreateContract = async () => {
    setError('');
    setLoading(true);

    console.log('📝 Creating contract with data:', contractForm);

    // Validate required fields
    if (!contractForm.subscriptionId || !contractForm.deposit || !contractForm.startDate || !contractForm.endDate) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const result = await contractAPI.createContract(contractForm);
      console.log('📦 Create result:', result);
      
      if (result.success) {
        setSuccess('Contract created successfully!');
        resetForm();
        fetchContracts();
        setCurrentView('contracts');
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('❌ Create error:', err);
      setError('Error creating contract');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateContract = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await contractAPI.updateContract(editingId, contractForm);
      if (result.success) {
        setSuccess('Contract updated successfully!');
        setEditingId(null);
        resetForm();
        fetchContracts();
        setCurrentView('contracts');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error updating contract');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContract = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contract?')) return;

    setError('');
    setLoading(true);

    try {
      const result = await contractAPI.deleteContract(id);
      if (result.success) {
        setSuccess('Contract deleted successfully!');
        fetchContracts();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error deleting contract');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (contract) => {
    setEditingId(contract._id);
    setContractForm({
      subscriptionId: contract.subscriptionId,
      deposit: contract.deposit,
      startDate: contract.startDate.split('T')[0],
      endDate: contract.endDate.split('T')[0],
      renewalAllowed: contract.renewalAllowed,
      signatureURL: contract.signatureURL || '',
      tdsApplicable: contract.tdsApplicable
    });
    setCurrentView('form');
  };

  const resetForm = () => {
    setContractForm({
      subscriptionId: '',
      deposit: '',
      startDate: '',
      endDate: '',
      renewalAllowed: true,
      signatureURL: '',
      tdsApplicable: false
    });
    setEditingId(null);
  };

  const handleCancelForm = () => {
    resetForm();
    setCurrentView('contracts');
  };

  // Render views
  if (!token && currentView === 'login') {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={() => setCurrentView('signup')}
      />
    );
  }

  if (!token && currentView === 'signup') {
    return (
      <Signup
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={() => setCurrentView('login')}
      />
    );
  }

  return (
    <div style={styles.body}>
      <Header user={user} onLogout={handleLogout} />

      <main style={styles.main}>
        {error && <div style={{ ...styles.alert, ...styles.alertError }}>{error}</div>}
        {success && <div style={{ ...styles.alert, ...styles.alertSuccess }}>{success}</div>}

        {currentView === 'form' && (
          <ContractForm
            formData={contractForm}
            setFormData={setContractForm}
            onSubmit={editingId ? handleUpdateContract : handleCreateContract}
            onCancel={handleCancelForm}
            loading={loading}
            isEditing={!!editingId}
          />
        )}

        {currentView === 'contracts' && (
          <ContractList
            contracts={contracts}
            loading={loading}
            isAdmin={user?.role === 'admin'}
            onCreateNew={() => setCurrentView('form')}
            onEdit={startEdit}
            onDelete={handleDeleteContract}
          />
        )}
      </main>
    </div>
  );
}

export default App;