import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { aiAPI } from '../../services/api.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

const RecipeGenerator = () => {
  const { state, dispatch } = useApp();
  const [ingredients, setIngredients] = useState('');
  const [numberOfRecipes, setNumberOfRecipes] = useState(5);

  const handleGenerateRecipes = async () => {
    if (!ingredients.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter some ingredients' });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(item => item);
      
      const response = await aiAPI.generateRecipes(ingredientsArray, numberOfRecipes);
      dispatch({ type: 'SET_GENERATED_RECIPES', payload: response.data.data.generatedRecipes });
    } catch (error) {
      if (error.response?.status === 402) {
        dispatch({ 
          type: 'SET_ERROR', 
          payload: 'API quota exceeded. Please try again later.' 
        });
      } else {
        dispatch({ 
          type: 'SET_ERROR', 
          payload: 'Failed to generate recipes' 
        });
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleSaveRecipe = async (recipe) => {
    try {
      await aiAPI.saveRecipe(recipe);
      alert('Recipe saved successfully!');
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to save recipe' 
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>🤖 AI Recipe Generator</h2>
        <p>Enter ingredients you have, and AI will suggest recipes!</p>
      </div>

      <div style={styles.generatorForm}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Ingredients (comma separated):
          </label>
          <textarea
            style={styles.textarea}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., chicken, rice, vegetables, spices"
            rows="3"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Number of recipes to generate:
          </label>
          <select
            style={styles.select}
            value={numberOfRecipes}
            onChange={(e) => setNumberOfRecipes(parseInt(e.target.value))}
          >
            <option value={3}>3 recipes</option>
            <option value={5}>5 recipes</option>
            <option value={10}>10 recipes</option>
          </select>
        </div>

        <button 
          style={styles.generateButton}
          onClick={handleGenerateRecipes}
          disabled={state.loading}
        >
          {state.loading ? 'Generating...' : 'Generate Recipes'}
        </button>
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

      {state.loading && <LoadingSpinner />}

      {state.generatedRecipes.length > 0 && (
        <div style={styles.results}>
          <h3>Generated Recipes ({state.generatedRecipes.length})</h3>
          <div style={styles.recipesGrid}>
            {state.generatedRecipes.map((recipe, index) => (
              <div key={index} style={styles.recipeCard}>
                {recipe.image && (
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    style={styles.recipeImage}
                  />
                )}
                <div style={styles.recipeContent}>
                  <h4>{recipe.title}</h4>
                  <div style={styles.recipeMeta}>
                    <span>⏱️ {recipe.readyInMinutes} min</span>
                    <span>👥 {recipe.servings} servings</span>
                    <span>✅ {recipe.usedIngredientCount} ingredients used</span>
                  </div>
                  <button 
                    style={styles.saveButton}
                    onClick={() => handleSaveRecipe(recipe)}
                  >
                    Save Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
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
    textAlign: 'center',
    marginBottom: '2rem',
  },
  generatorForm: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    resize: 'vertical',
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  generateButton: {
    backgroundColor: '#9b59b6',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
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
  results: {
    marginTop: '2rem',
  },
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    border: '1px solid #e1e8ed',
  },
  recipeImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  recipeContent: {
    padding: '1.5rem',
  },
  recipeMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    margin: '1rem 0',
    fontSize: '0.9rem',
    color: '#7f8c8d',
  },
  saveButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    width: '100%',
  },
};

export default RecipeGenerator;