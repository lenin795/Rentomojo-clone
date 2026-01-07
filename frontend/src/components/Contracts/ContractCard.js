// src/components/Contracts/ContractCard.js
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { styles } from '../../styles/styles';

function ContractCard({ contract, isAdmin, onEdit, onDelete }) {
  return (
    <div
      style={styles.contractCard}
      onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)')}
      onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
            Contract #{contract._id.slice(-6)}
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Subscription: {contract.subscriptionId}
          </p>
        </div>
        {isAdmin && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onEdit(contract)}
              style={{ ...styles.iconButton, color: '#2563eb' }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#dbeafe')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => onDelete(contract._id)}
              style={{ ...styles.iconButton, color: '#dc2626' }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#fee2e2')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      <div style={styles.grid}>
        <div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Deposit</p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
            ₹{contract.deposit}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Start Date</p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
            {new Date(contract.startDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>End Date</p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
            {new Date(contract.endDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Status</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            {contract.renewalAllowed && (
              <span style={{ ...styles.badge, ...styles.badgeGreen }}>Renewable</span>
            )}
            {contract.tdsApplicable && (
              <span style={{ ...styles.badge, ...styles.badgeBlue }}>TDS</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractCard;