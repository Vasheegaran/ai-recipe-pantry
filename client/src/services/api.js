import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Pantry API calls
export const pantryAPI = {
  getAll: () => api.get('/pantry'),
  getById: (id) => api.get(`/pantry/${id}`),
  create: (data) => api.post('/pantry', data),
  update: (id, data) => api.put(`/pantry/${id}`, data),
  delete: (id) => api.delete(`/pantry/${id}`),
};

// Recipes API calls
export const recipesAPI = {
  getAll: () => api.get('/recipes'),
  getById: (id) => api.get(`/recipes/${id}`),
  create: (data) => api.post('/recipes', data),
  update: (id, data) => api.put(`/recipes/${id}`, data),
  delete: (id) => api.delete(`/recipes/${id}`),
};

// AI API calls
export const aiAPI = {
  generateRecipes: (ingredients, number = 5) => 
    api.post('/ai/generate-recipes', { ingredients, number }),
  saveRecipe: (recipeData) => 
    api.post('/ai/save-recipe', { spoonacularRecipe: recipeData }),
};

export default api;