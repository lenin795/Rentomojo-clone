import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000';

export default function RentalContractApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('auth');
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auth states
  const [authMode, setAuthMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [authForm, setAuthForm] = useState({ username: '', password: '', name: '', emailid: '' });

  // Contract states
  const [contractForm, setContractForm] = useState({
    userId: '',
    subscriptionId: '',
    deposit: '',
    startDate: '',
    endDate: '',
    renewalAllowed: true,
    
    tdsApplicable: false
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch contracts
  const fetchContracts = async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/db`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setContracts(Array.isArray(data) ? data : []);
        setSuccess('Contracts loaded successfully!');
      } else if (response.status === 401) {
        setError('Session expired. Please login again');
        handleLogout();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch contracts');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
    setLoading(false);
  };

  // Handle auth
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = authMode === 'signin' ? '/auth/signin' : '/auth/signup';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Authentication failed');
      } else {
        if (authMode === 'signin') {
          const receivedToken = data.message;
          setToken(receivedToken);
          setCurrentUser(authForm.username);
          setIsLoggedIn(true);
          setActiveTab('contracts');
          setSuccess('Logged in successfully!');
          setAuthForm({ username: '', password: '', name: '', emailid: '' });
        } else {
          setSuccess('Account created! Please sign in.');
          setAuthMode('signin');
          setAuthForm({ username: '', password: '', name: '', emailid: '' });
        }
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
    setLoading(false);
  };

  // Handle contract CRUD
  const handleCreateContract = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validate form
    if (!contractForm.userId || !contractForm.subscriptionId || !contractForm.deposit || !contractForm.startDate || !contractForm.endDate) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/db`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(contractForm)
      });

      if (response.ok) {
        const data = await response.json();
        setContracts([...contracts, data]);
        setSuccess('Contract created successfully!');
        resetContractForm();
        setActiveTab('contracts');
      } else if (response.status === 401) {
        setError('Session expired. Please login again');
        handleLogout();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create contract');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
    setLoading(false);
  };

  const handleUpdateContract = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    // if (!contractForm.userId || !contractForm.subscriptionId || !contractForm.deposit || !contractForm.startDate || !contractForm.endDate) {
    //   setError('Please fill all required fields');
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(`${API_BASE_URL}/db/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(contractForm)
      });

      if (response.ok) {
        const data = await response.json();
        setContracts(contracts.map(c => c._id === editingId ? data : c));
        setSuccess('Contract updated successfully!');
        resetContractForm();
        setActiveTab('contracts');
      } else if (response.status === 401) {
        setError('Session expired. Please login again');
        handleLogout();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update contract');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
    setLoading(false);
  };

  const handleDeleteContract = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contract?')) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${API_BASE_URL}/db/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setContracts(contracts.filter(c => c._id !== id));
        setSuccess('Contract deleted successfully!');
      } else if (response.status === 401) {
        setError('Session expired. Please login again');
        handleLogout();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete contract');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
    setLoading(false);
  };

  const startEdit = (contract) => {
    setEditingId(contract._id);
    setContractForm({
      userId: contract.userId,
      subscriptionId: contract.subscriptionId,
      deposit: contract.deposit,
      startDate: contract.startDate?.split('T')[0],
      endDate: contract.endDate?.split('T')[0],
      renewalAllowed: contract.renewalAllowed,
      signatureURL: contract.signatureURL,
      tdsApplicable: contract.tdsApplicable
    });
  };

  const resetContractForm = () => {
    setEditingId(null);
    setContractForm({
      userId: '',
      subscriptionId: '',
      deposit: '',
      startDate: '',
      endDate: '',
      renewalAllowed: true,
      
      tdsApplicable: false
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setCurrentUser(null);
    setActiveTab('auth');
    setContracts([]);
  };

  useEffect(() => {
    if (isLoggedIn && activeTab === 'contracts') {
      fetchContracts();
    }
  }, [isLoggedIn, activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess('');
      setError('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [success, error]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
      {/* Header */}
      <nav className="navbar navbar-dark bg-primary shadow">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">🏠 RentalHub</span>
          {isLoggedIn && (
            <div className="d-flex align-items-center gap-3">
              <span className="text-white">Welcome, <strong>{currentUser}</strong></span>
              <button
                onClick={handleLogout}
                className="btn btn-danger btn-sm d-flex align-items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="container mt-4">
        {/* Alerts */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success}
            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
          </div>
        )}

        {!isLoggedIn ? (
          // Auth Section
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow">
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">
                    {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
                  </h2>

                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={authForm.username}
                      onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
                      required
                    />
                  </div>

                  {authMode === 'signup' && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={authForm.name}
                          onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={authForm.emailid}
                          onChange={(e) => setAuthForm({...authForm, emailid: e.target.value})}
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        value={authForm.password}
                        onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                        required
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAuth}
                    disabled={loading}
                    className="btn btn-primary w-100 mb-3"
                  >
                    {loading ? 'Processing...' : (authMode === 'signin' ? 'Sign In' : 'Sign Up')}
                  </button>

                  <p className="text-center text-muted">
                    {authMode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                    <button
                      onClick={() => {
                        setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                        setAuthForm({ username: '', password: '', name: '', emailid: '' });
                      }}
                      className="btn btn-link p-0"
                    >
                      {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Contracts Section
          <div>
            <div className="mb-4 d-flex gap-2">
              <button
                onClick={() => setActiveTab('contracts')}
                className={`btn ${activeTab === 'contracts' ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                View Contracts
              </button>
              <button
                onClick={() => {
                  setActiveTab('create');
                  resetContractForm();
                }}
                className={`btn d-flex align-items-center gap-2 ${activeTab === 'create' ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                <Plus size={18} /> {editingId ? 'Edit Contract' : 'New Contract'}
              </button>
            </div>

            {activeTab === 'create' && (
              <div className="card shadow mb-4">
                <div className="card-body">
                  <h3 className="card-title mb-4">
                    {editingId ? 'Edit Contract' : 'Create New Contract'}
                  </h3>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">User ID</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="User ID"
                        value={contractForm.userId}
                        onChange={(e) => setContractForm({...contractForm, userId: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Subscription ID</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subscription ID"
                        value={contractForm.subscriptionId}
                        onChange={(e) => setContractForm({...contractForm, subscriptionId: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Deposit</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Deposit"
                        value={contractForm.deposit}
                        onChange={(e) => setContractForm({...contractForm, deposit: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={contractForm.startDate}
                        onChange={(e) => setContractForm({...contractForm, startDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={contractForm.endDate}
                        onChange={(e) => setContractForm({...contractForm, endDate: e.target.value})}
                        required
                      />
                    </div>
                    
                    
                    <div className="col-md-6 mb-3">
                      <div className="form-check mt-4">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="renewal"
                          checked={contractForm.renewalAllowed}
                          onChange={(e) => setContractForm({...contractForm, renewalAllowed: e.target.checked})}
                        />
                        <label className="form-check-label" htmlFor="renewal">
                          Renewal Allowed
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-check mt-4">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="tds"
                          checked={contractForm.tdsApplicable}
                          onChange={(e) => setContractForm({...contractForm, tdsApplicable: e.target.checked})}
                        />
                        <label className="form-check-label" htmlFor="tds">
                          TDS Applicable
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        onClick={editingId ? handleUpdateContract : handleCreateContract}
                        disabled={loading}
                        className="btn btn-success w-100 mb-2"
                      >
                        {loading ? 'Processing...' : (editingId ? 'Update Contract' : 'Create Contract')}
                      </button>
                      {editingId && (
                        <button
                          onClick={resetContractForm}
                          className="btn btn-secondary w-100"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="card shadow">
                <div className="card-body p-0">
                  {loading ? (
                    <div className="p-4 text-center">Loading...</div>
                  ) : contracts.length === 0 ? (
                    <div className="p-4 text-center text-muted">No contracts found</div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>User ID</th>
                            <th>Subscription ID</th>
                            <th>Deposit</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Renewal</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contracts.map((contract) => (
                            <tr key={contract._id}>
                              <td>{contract.userId}</td>
                              <td>{contract.subscriptionId}</td>
                              <td>₹{contract.deposit}</td>
                              <td>{new Date(contract.startDate).toLocaleDateString()}</td>
                              <td>{new Date(contract.endDate).toLocaleDateString()}</td>
                              <td>{contract.renewalAllowed ? '✓' : '✗'}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    startEdit(contract);
                                    setActiveTab('create');
                                  }}
                                  className="btn btn-sm btn-info me-2"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteContract(contract._id)}
                                  className="btn btn-sm btn-danger"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}