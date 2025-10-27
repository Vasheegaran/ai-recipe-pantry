import React, { useState } from 'react';

const AddIngredient = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.quantity && formData.unit && formData.category) {
      onAdd({
        ...formData,
        quantity: parseFloat(formData.quantity)
      });
      setFormData({ name: '', quantity: '', unit: '', category: '' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={styles.formContainer}>
      <h3>Add New Ingredient</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Ingredient name (e.g., flour, milk)"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div style={styles.quantityRow}>
          <input
            style={styles.quantityInput}
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            step="0.1"
            min="0"
            required
          />
          <input
            style={styles.unitInput}
            type="text"
            name="unit"
            placeholder="Unit (e.g., cups, grams)"
            value={formData.unit}
            onChange={handleChange}
            required
          />
        </div>
        <input
          style={styles.input}
          type="text"
          name="category"
          placeholder="Category (e.g., baking, dairy)"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <div style={styles.actions}>
          <button type="submit" style={styles.submitButton}>
            Add to Pantry
          </button>
          <button type="button" style={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    border: '1px solid #e1e8ed',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
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
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  unitInput: {
    width: '120px',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
  },
  submitButton: {
    flex: 2,
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default AddIngredient;