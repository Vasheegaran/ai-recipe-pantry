import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { pantryAPI } from '../../services/api.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import PantryItem from './PantryItem.jsx';
import AddIngredient from './AddIngredient.jsx';

const PantryList = () => {
  const { state, dispatch } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const fetchPantryItems = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await pantryAPI.getAll();
      dispatch({ type: 'SET_PANTRY_ITEMS', payload: response.data.data });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to fetch pantry items' 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleAddItem = async (itemData) => {
    try {
      const response = await pantryAPI.create(itemData);
      dispatch({ type: 'ADD_PANTRY_ITEM', payload: response.data.data });
      setShowAddForm(false);
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to add pantry item' 
      });
    }
  };

  const handleUpdateItem = async (id, itemData) => {
    try {
      const response = await pantryAPI.update(id, itemData);
      dispatch({ type: 'UPDATE_PANTRY_ITEM', payload: response.data.data });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to update pantry item' 
      });
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await pantryAPI.delete(id);
      dispatch({ type: 'DELETE_PANTRY_ITEM', payload: id });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to delete pantry item' 
      });
    }
  };

  if (state.loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>📦 My Pantry</h2>
        <button 
          style={styles.addButton}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add Ingredient'}
        </button>
      </div>

      {showAddForm && (
        <AddIngredient 
          onAdd={handleAddItem}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {state.error && (
        <div style={styles.error}>
          {state.error}
          <button 
            style={styles.closeError}
            onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
          >
            ×
          </button>
        </div>
      )}

      <div style={styles.pantryGrid}>
        {state.pantryItems.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Your pantry is empty</p>
            <p>Add some ingredients to get started!</p>
          </div>
        ) : (
          state.pantryItems.map(item => (
            <PantryItem
              key={item._id}
              item={item}
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
            />
          ))
        )}
      </div>

      {state.pantryItems.length > 0 && (
        <div style={styles.stats}>
          <p>Total items: {state.pantryItems.length}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  addButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeError: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  pantryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: '#7f8c8d',
    gridColumn: '1 / -1',
  },
  stats: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  },
};

export default PantryList;