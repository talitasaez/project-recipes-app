import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipesProvider from './Context/recipesProvider';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <RecipesProvider>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Recipes } />
        </RecipesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
