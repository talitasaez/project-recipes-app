import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeDetailCard(props) {
  const history = useHistory();
  const path = history.location.pathname;
  const { recipe, srcVideo } = props;

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
  } else {
    nameRecipe = strDrink;
    imgSrc = strDrinkThumb;
    recipeCategory = strAlcoholic;
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
    </div>
  );
}

RecipeDetailCard.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default RecipeDetailCard;
