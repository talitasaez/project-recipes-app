import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecipesProvider from './Context/recipesProvider';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

import './App.css';

function App() {
  return (
    <div className="container">
      <RecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Recipes } />
            <Route exact path="/drinks" component={ Recipes } />
            <Route path="/meals/:id" component={ RecipeDetails } />
            <Route path="/drinks/:id" component={ RecipeDetails } />
            <Route path="/meals/:id-da-receita/in-progress" />
            <Route path="/drinks/:id-da-receita/in-progress" />
            <Route path="/done-recipes" component={ DoneRecipes } />
            <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
        </BrowserRouter>
      </RecipesProvider>
    </div>
  );
}

export default App;
