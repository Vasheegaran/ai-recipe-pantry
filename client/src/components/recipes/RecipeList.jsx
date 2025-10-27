import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { recipesAPI } from '../../services/api.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import RecipeCard from './RecipeCard.jsx';

const RecipeList = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await recipesAPI.getAll();
      dispatch({ type: 'SET_RECIPES', payload: response.data.data });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to fetch recipes' 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  if (state.loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>🍳 My Recipes</h2>
      </div>

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

      <div style={styles.recipesGrid}>
        {state.recipes.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No recipes yet</p>
            <p>Generate some recipes using the AI generator!</p>
          </div>
        ) : (
          state.recipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        )}
      </div>

      {state.recipes.length > 0 && (
        <div style={styles.stats}>
          <p>Total recipes: {state.recipes.length}</p>
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
    marginBottom: '2rem',
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
  recipesGrid: {
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

export default RecipeList;