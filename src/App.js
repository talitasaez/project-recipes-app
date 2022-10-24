import React from 'react';
import './App.css';
import Login from './pages/Login';
import RecipesProvider from './Context/recipesProvider';

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
