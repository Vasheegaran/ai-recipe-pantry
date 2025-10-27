import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div style={styles.card}>
      {recipe.image && (
        <img 
          src={recipe.image} 
          alt={recipe.title}
          style={styles.image}
        />
      )}
      <div style={styles.content}>
        <h3 style={styles.title}>{recipe.title}</h3>
        
        <div style={styles.meta}>
          <span style={styles.metaItem}>⏱️ {recipe.cookingTime} min</span>
          <span style={styles.metaItem}>👥 {recipe.servings} servings</span>
          <span style={styles.metaItem}>📊 {recipe.difficulty}</span>
        </div>

        <div style={styles.ingredients}>
          <h4>Ingredients:</h4>
          <ul style={styles.ingredientList}>
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <li key={index} style={styles.ingredient}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
            {recipe.ingredients.length > 3 && (
              <li style={styles.moreIngredients}>
                +{recipe.ingredients.length - 3} more...
              </li>
            )}
          </ul>
        </div>

        <div style={styles.source}>
          <small>Source: {recipe.source}</small>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    border: '1px solid #e1e8ed',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  content: {
    padding: '1.5rem',
  },
  title: {
    margin: '0 0 1rem 0',
    fontSize: '1.2rem',
    color: '#2c3e50',
  },
  meta: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  metaItem: {
    fontSize: '0.8rem',
    color: '#7f8c8d',
  },
  ingredients: {
    marginBottom: '1rem',
  },
  ingredientList: {
    margin: '0.5rem 0 0 0',
    paddingLeft: '1rem',
  },
  ingredient: {
    fontSize: '0.9rem',
    marginBottom: '0.25rem',
    color: '#555',
  },
  moreIngredients: {
    fontSize: '0.8rem',
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  source: {
    borderTop: '1px solid #eee',
    paddingTop: '0.5rem',
    color: '#95a5a6',
  },
};

export default RecipeCard;