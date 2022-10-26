import React from 'react';
// import RecipesContext from '../Context/recipesContext';

function RecipeInProgress() {
  return (

    <div>

      <img data-testid="recipe-photo" src="" alt="" />

      <h2 data-testid="recipe-title"> Título </h2>

      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>

      <h3 data-testid="recipe-category">
        Texto Categoria
      </h3>

      <p data-testid="instructions">Instruções</p>

      <button
        type="button"
        data-testid="finish-recipe-btn"

      >
        Finalizar
      </button>

    </div>
  );
}

export default RecipeInProgress;
