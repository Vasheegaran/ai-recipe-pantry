import React, { useState } from 'react';

const PantryItem = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    category: item.category
  });

  const handleSave = () => {
    onUpdate(item._id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: item.category
    });
    setIsEditing(false);
  };

  return (
    <div style={styles.card}>
      {isEditing ? (
        <div style={styles.editForm}>
          <input
            style={styles.input}
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            placeholder="Ingredient name"
          />
          <div style={styles.quantityRow}>
            <input
              style={styles.quantityInput}
              type="number"
              value={editData.quantity}
              onChange={(e) => setEditData({ ...editData, quantity: parseFloat(e.target.value) })}
              placeholder="Qty"
            />
            <input
              style={styles.unitInput}
              value={editData.unit}
              onChange={(e) => setEditData({ ...editData, unit: e.target.value })}
              placeholder="Unit"
            />
          </div>
          <input
            style={styles.input}
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            placeholder="Category"
          />
          <div style={styles.editActions}>
            <button style={styles.saveButton} onClick={handleSave}>
              Save
            </button>
            <button style={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div style={styles.header}>
            <h3 style={styles.name}>{item.name}</h3>
            <div style={styles.actions}>
              <button 
                style={styles.editBtn}
                onClick={() => setIsEditing(true)}
              >
                ✏️
              </button>
              <button 
                style={styles.deleteBtn}
                onClick={() => onDelete(item._id)}
              >
                🗑️
              </button>
            </div>
          </div>
          <div style={styles.details}>
            <p><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p style={styles.date}>
              Added: {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  name: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#2c3e50',
    textTransform: 'capitalize',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  editBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  details: {
    color: '#555',
  },
  date: {
    fontSize: '0.8rem',
    color: '#999',
    marginTop: '0.5rem',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  quantityRow: {
    display: 'flex',
    gap: '0.5rem',
  },
  quantityInput: {
    flex: 1,
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  unitInput: {
    width: '80px',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  editActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default PantryItem;