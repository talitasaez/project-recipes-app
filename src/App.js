import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecipesProvider from './Context/recipesProvider';
import './App.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div className="container">
      <RecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/meals" component={ Recipes } />
            <Route path="/drinks" component={ Recipes } />
          </Switch>
        </BrowserRouter>
      </RecipesProvider>
    </div>
  );
}

export default App;
