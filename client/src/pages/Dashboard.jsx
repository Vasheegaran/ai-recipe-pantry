import React, { useState } from 'react';
import PantryList from '../components/pantry/PantryList.jsx';
import RecipeList from '../components/recipes/RecipeList.jsx';
import RecipeGenerator from '../components/ai/RecipeGenerator.jsx';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('pantry');

  const tabs = [
    { id: 'pantry', label: '📦 Pantry', component: <PantryList /> },
    { id: 'recipes', label: '🍳 Recipes', component: <RecipeList /> },
    { id: 'generator', label: '🤖 AI Generator', component: <RecipeGenerator /> },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.tabNavigation}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            style={{
              ...styles.tabButton,
              ...(activeTab === tab.id ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.tabContent}>
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#ecf0f1',
  },
  tabNavigation: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e1e8ed',
    padding: '0 1rem',
    display: 'flex',
    gap: '0',
  },
  tabButton: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
    transition: 'all 0.3s',
  },
  activeTab: {
    borderBottom: '3px solid #3498db',
    color: '#3498db',
    fontWeight: 'bold',
  },
  tabContent: {
    padding: '0',
  },
};

export default Dashboard;