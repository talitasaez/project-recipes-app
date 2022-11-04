import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeDetailCard(props) {
  const { id } = useParams();
  const history = useHistory();
  const path = history.location.pathname;
  const { recipe, srcVideo } = props;

  const [shareAlert, setShareAlert] = useState(false);

  const {
    strMeal,
    strMealThumb,
    strDrink,
    strDrinkThumb,
    strCategory,
    strAlcoholic,
    strInstructions,
  } = recipe;

  let nameRecipe = '';
  let imgSrc = '';
  let recipeCategory = '';
  let mealOrDrink = '';

  const ingredients = Object.fromEntries(
    Object.entries(recipe).filter(
      ([key, value]) => key.includes('Ingredient') && value !== '',
    ),
  );

  const measures = Object.fromEntries(
    Object.entries(recipe).filter(
      ([key, value]) => key.includes('Measure') && value !== ' ',
    ),
  );

  if (path.includes('/meals')) {
    nameRecipe = strMeal;
    imgSrc = strMealThumb;
    recipeCategory = strCategory;
    mealOrDrink = 'meals';
  } else {
    nameRecipe = strDrink;
    imgSrc = strDrinkThumb;
    recipeCategory = strAlcoholic;
    mealOrDrink = 'drinks';
  }

  return (
    <div>
      <h1 data-testid="recipe-title">{ nameRecipe }</h1>
      <h2 data-testid="recipe-category">{ recipeCategory }</h2>
      <img data-testid="recipe-photo" src={ imgSrc } alt={ nameRecipe } />
      <h3> Ingredientes </h3>
      <div>
        {Object.values(ingredients).map((ingredient, index) => (
          <div data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {ingredient}
          </div>
        ))}
      </div>
      <div>
        {Object.values(measures).map((measure, index) => (
          <div data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {measure}
          </div>
        ))}
      </div>
      <p data-testid="instructions">
        {' '}
        {strInstructions}
      </p>
      {
        path.includes('/meals')
        && <iframe
          data-testid="video"
          width="250"
          height="205"
          src={ `https://www.youtube.com/embed/${srcVideo.split('v=')[1]}` }
          title="YouTube video player"
          allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      }
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(`http://localhost:3000/${mealOrDrink}/${id}`);
          setShareAlert(true);
        } }
      >
        Compartilhar
      </button>
      { shareAlert && <p>Link copied!</p> }
    </div>
  );
}

RecipeDetailCard.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default RecipeDetailCard;
