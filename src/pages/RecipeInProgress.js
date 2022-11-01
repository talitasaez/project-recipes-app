import React, { useEffect, useState } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
import RecipeInfo from '../Components/RecipeInfo';
// import getRecipes from '../helpers/getRecipes';
// import PropTypes from 'prop-types';
// import RecipeDetailCard from '../Components/RecipeDetailCard';

function RecipeInProgress({ match }) {
  const [details, setDetails] = useState({});
  const { path } = match;
  const pathName = path.slice(0, 6);

  const DB = pathName === '/meals' ? 'meal' : 'cocktail';

  useEffect(() => {
    async function fetchData() {
      const detailsToRender = await fetch(`https://www.the${DB}db.com/api/json/v1/1/lookup.php?i=${value}`);
      const data = await detailsToRender.json();
      console.log(data);
      // setDetails(detailsToRender[0]);
    }
    fetchData();
  }, [DB]);

  return (

    <div>

      <h3> Ingredientes </h3>
      <div>
        <RecipeInfo recipeData={ details } />

      </div>
      <div />

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
