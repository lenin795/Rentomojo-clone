// src/components/Contracts/ContractForm.js
import React from 'react';
import { styles } from '../../styles/styles';

function ContractForm({ formData, setFormData, onSubmit, onCancel, loading, isEditing }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div style={styles.card}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937' }}>
        {isEditing ? 'Edit Contract' : 'Create New Contract'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Subscription ID</label>
            <input
              type="text"
              required
              value={formData.subscriptionId}
              onChange={(e) => setFormData({ ...formData, subscriptionId: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Deposit Amount</label>
            <input
              type="number"
              required
              min="0"
              value={formData.deposit}
              onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Start Date</label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>End Date</label>
            <input
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Signature URL</label>
            <input
              type="url"
              value={formData.signatureURL}
              onChange={(e) => setFormData({ ...formData, signatureURL: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={{ display: 'flex', gap: '24px', paddingTop: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={formData.renewalAllowed}
                onChange={(e) => setFormData({ ...formData, renewalAllowed: e.target.checked })}
                style={styles.checkbox}
              />
              <span style={styles.label}>Renewal Allowed</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={formData.tdsApplicable}
                onChange={(e) => setFormData({ ...formData, tdsApplicable: e.target.checked })}
                style={styles.checkbox}
              />
              <span style={styles.label}>TDS Applicable</span>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              flex: 1,
              opacity: loading ? 0.6 : 1
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#4338ca')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4f46e5')}
          >
            {loading ? 'Saving...' : isEditing ? 'Update Contract' : 'Create Contract'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={styles.buttonSecondary}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#f3f4f6')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContractForm;