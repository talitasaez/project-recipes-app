import React from 'react';
import Header from '../Components/Header';

function FavoriteRecipes() {
  return (
    <>
      <Header title="Favorite Recipes" icons={ { profile: true, search: false } } />
      <p>Fav</p>
      <div>
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
      </div>
      <div>
        <p
          data-testid={ `${index}-horizontal-image` }
          // src={ imgSrc }
          // alt={ nameRecipe }
        />
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          Categoria Receita
        </h4>
        <h3 data-testid={ `${index}-horizontal-name` }>
          Nome Da Receita
        </h3>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
        >
          Favoritar
        </button>
      </div>

    </>
  );
}

export default FavoriteRecipes;
