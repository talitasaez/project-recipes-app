import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeCard(props) {
  const { recipe, index } = props;
  const { strMealThumb, strMeal, strDrink, strDrinkThumb, idMeal, idDrink } = recipe;
  let nameRecipe = 'meal';
  let imgSrc = strMealThumb;
  const history = useHistory();
  const path = history.location.pathname;

  if (path.includes('/meals')) {
    nameRecipe = strMeal;
    imgSrc = strMealThumb;
  } else {
    nameRecipe = strDrink;
    imgSrc = strDrinkThumb;
  }

  return (
    <Link to={ path === '/meals' ? `/meals/${idMeal}` : `/drinks/${idDrink}` }>
      <div className="card-container" data-testid={ `${index}-recipe-card` }>
        <h3 data-testid={ `${index}-card-name` }>
          {nameRecipe}
        </h3>
        <img src={ imgSrc } alt={ nameRecipe } data-testid={ `${index}-card-img` } />
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
}.isRequired;

export default RecipeCard;
