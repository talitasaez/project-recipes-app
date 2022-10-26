import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function RecipeCard(props) {
  const { recipe, index } = props;
  const { strMealThumb, strMeal, strDrink, strDrinkThumb } = recipe;
  let nameRecipe = 'meal';
  let imgSrc = strMealThumb;
  const history = useHistory();
  const path = history.location.pathname;

  if (path === '/meals') {
    nameRecipe = strMeal;
    imgSrc = strMealThumb;
  } else {
    nameRecipe = strDrink;
    imgSrc = strDrinkThumb;
  }

  return (
    <div id="card-container">
      <h3 data-testid={ `${index}-card-img` }>
        {nameRecipe}
      </h3>
      <img src={ imgSrc } alt={ nameRecipe } />
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
}.isRequired;

export default RecipeCard;
