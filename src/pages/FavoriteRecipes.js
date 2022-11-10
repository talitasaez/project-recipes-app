import React from 'react';
import FavoriteRecipeCard from '../Components/FavoriteRecipeCard';
import Header from '../Components/Header';

function FavoriteRecipes() {
  const favoriteItens = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favoriteItens);
  return (
    <div>
      <Header title="Favorite Recipes" icons={ { profile: true, search: false } } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      { favoriteItens
        && favoriteItens.map((recipe, index) => (
          <FavoriteRecipeCard index={ index } recipe={ recipe } key={ index } />
        ))}
    </div>
  );
}

export default FavoriteRecipes;
