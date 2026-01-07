// src/components/Contracts/ContractList.js
import React from 'react';
import { Plus, FileText } from 'lucide-react';
import { styles } from '../../styles/styles';
import ContractCard from './ContractCard';

function ContractList({ contracts, loading, isAdmin, onCreateNew, onEdit, onDelete }) {
  if (loading) {
    return (
      <div style={styles.emptyState}>
        <div
          style={{
            display: 'inline-block',
            width: '48px',
            height: '48px',
            border: '4px solid #e5e7eb',
            borderTopColor: '#4f46e5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
        <p style={{ marginTop: '16px', color: '#6b7280' }}>Loading contracts...</p>
        <style>
          {`@keyframes spin { to { transform: rotate(360deg); } }`}
        </style>
      </div>
    );
  }

  if (contracts.length === 0) {
    return (
      <div style={{ ...styles.card, ...styles.emptyState }}>
        <FileText size={64} color="#9ca3af" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          No contracts yet
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          Create your first rental contract to get started
        </p>
        <button
          onClick={onCreateNew}
          style={{
            ...styles.button,
            width: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#4338ca')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4f46e5')}
        >
          <Plus size={20} />
          Create Contract
        </button>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>My Contracts</h2>
        <button
          onClick={onCreateNew}
          style={{
            ...styles.button,
            width: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#4338ca')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4f46e5')}
        >
          <Plus size={20} />
          New Contract
        </button>
      </div>

      <div>
        {contracts.map((contract) => (
          <ContractCard
            key={contract._id}
            contract={contract}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}

export default ContractList;