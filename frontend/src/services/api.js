// src/services/api.js
const API_URL = 'http://localhost:5000';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Auth APIs
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.message);
      return { success: true, token: data.message };
    }
    return { success: false, error: data.error || 'Login failed' };
  },

  signup: async (userData) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (response.ok) {
      return { success: true };
    }
    return { success: false, error: 'Signup failed - user may already exist' };
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

// Contract APIs
export const contractAPI = {
  getMyContracts: async () => {
    const response = await fetch(`${API_URL}/db/my`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch contracts');
  },

  getAllContracts: async () => {
    const response = await fetch(`${API_URL}/db`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch contracts');
  },

  createContract: async (contractData) => {
    console.log('🚀 Sending contract data:', contractData);
    console.log('🔑 Token:', getToken());
    
    const response = await fetch(`${API_URL}/db`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(contractData)
    });
    
    console.log('📡 Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success:', data);
      return { success: true, data };
    }
    
    const error = await response.json();
    console.error('❌ Error response:', error);
    return { success: false, error: error.error || 'Failed to create contract' };
  },

  updateContract: async (id, contractData) => {
    const response = await fetch(`${API_URL}/db/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(contractData)
    });
    if (response.ok) {
      return { success: true, data: await response.json() };
    }
    return { success: false, error: 'Failed to update contract' };
  },

  deleteContract: async (id) => {
    const response = await fetch(`${API_URL}/db/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    if (response.ok) {
      return { success: true };
    }
    return { success: false, error: 'Failed to delete contract' };
  }
};