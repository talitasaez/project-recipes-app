import React from 'react';

import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipeCard(props) {
  const { recipe, index } = props;
  console.log(recipe);
  const {
    type,
    name,
    image,
    alcoholicOrNot,
    category,
    nationality,
  } = recipe;

  const categoryOrAlcohol = type === 'meal' ? category : alcoholicOrNot;

  return (
    <div>
      <h3 data-testid={ `${index}-horizontal-name` }>
        { name }
      </h3>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ image }
        alt={ name }
      />
      <h4 data-testid={ `${index}-horizontal-top-text` }>
        { `${nationality} - ${categoryOrAlcohol}` }
      </h4>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
      >
        <img
          src={ shareIcon }
          alt="share-button"
        />
      </button>
      <button
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
      >
        <img
          src={ blackHeartIcon }
          alt="favorite-button"
        />
      </button>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default FavoriteRecipeCard;
