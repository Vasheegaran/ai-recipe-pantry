import React from 'react';
import { AppProvider } from './context/AppContext.jsx';
import Header from './components/common/Header.jsx';
import Dashboard from './pages/Dashboard.jsx';
import './styles/App.css';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header />
        <main>
          <Dashboard />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;