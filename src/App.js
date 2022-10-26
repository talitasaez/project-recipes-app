import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecipesProvider from './Context/recipesProvider';
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
