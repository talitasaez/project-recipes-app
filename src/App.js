import React from 'react';
import RecipesProvider from './Context/recipesProvider';
import './App.css';
import Login from './pages/Login';

function App() {
  return (
    <div className="container">
      <RecipesProvider>
        <Login />
      </RecipesProvider>
    </div>
  );
}

export default App;
