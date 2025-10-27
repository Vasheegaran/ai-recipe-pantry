import React, { createContext, useReducer, useContext } from 'react';

// Create context
const AppContext = createContext();

// Initial state
const initialState = {
  pantryItems: [],
  recipes: [],
  generatedRecipes: [],
  loading: false,
  error: null,
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_PANTRY_ITEMS':
      return { ...state, pantryItems: action.payload };
    case 'ADD_PANTRY_ITEM':
      return { ...state, pantryItems: [...state.pantryItems, action.payload] };
    case 'UPDATE_PANTRY_ITEM':
      return {
        ...state,
        pantryItems: state.pantryItems.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case 'DELETE_PANTRY_ITEM':
      return {
        ...state,
        pantryItems: state.pantryItems.filter(item => item._id !== action.payload),
      };
    case 'SET_RECIPES':
      return { ...state, recipes: action.payload };
    case 'SET_GENERATED_RECIPES':
      return { ...state, generatedRecipes: action.payload };
    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};