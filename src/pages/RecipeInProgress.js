import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import RecipeInfo from '../Components/RecipeInfo';
// import PropTypes from 'prop-types';
import getRecipes from '../helpers/getRecipes';
import RecipeInProgressCard from '../Components/RecipeInProgressCard';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [srcVideo, setSrcVideo] = useState('');
  const history = useHistory();
  const path = history.location.pathname;
  const SIX = 6;
  const deleteIdFromPath = path.substring(0, SIX);

  useEffect(() => {
    async function fetchData() {
      const detailsToRender = await getRecipes('details', id, deleteIdFromPath);
      setDetails(detailsToRender[0]);
      if (path.includes('/meals')) {
        setSrcVideo(detailsToRender[0].strYoutube);
      }
    }
    fetchData();
  }, [deleteIdFromPath, id, path]);

  function favOrNot() {
    const getFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavs !== null) {
      return getFavs.some((fav) => fav.id === id);
    }
    return false;
  }

  const [favorited, setFavorited] = useState(
    favOrNot(),
  );
  const {
    strMeal,
    strMealThumb,
    strDrink,
    strDrinkThumb,
    strCategory,
    strAlcoholic,
    strArea,
  } = details;

  let mealOrDrink = '';
  if (path.includes('/meals')) {
    mealOrDrink = 'meals';
  } else {
    mealOrDrink = 'drinks';
  }

  const handleFav = useCallback(() => {
    const objToFav = mealOrDrink === 'meals' ? {
      id,
      type: mealOrDrink.substring(0, mealOrDrink.length - 1),
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    } : {
      id,
      type: mealOrDrink.substring(0, mealOrDrink.length - 1),
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    const getFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(getFavs
        .filter((fav) => fav.id !== id)));
      setFavorited(false);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([objToFav]));
      setFavorited(true);
    }
  }, [favorited,
    id,
    mealOrDrink,
    strAlcoholic, strArea, strCategory, strDrink, strDrinkThumb, strMeal, strMealThumb]);

  // const recipein = Object.fromEntries(
  //   Object.entries(details).filter(
  //     ([key, value]) => key.includes('Ingredient') && value !== '' && value !== null,
  //   ),
  // );

  // const handlefavoriteall = () => {
  //   const getFavorite = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const ingredients = getFavorite[mealOrDrink][id];
  //   if (ingredients) {
  //     const totalIngredients = Object.values(recipein);
  //     const comparacao = (ingredients.length === totalIngredients.length);
  //     console.log(ingredients.length);
  //     return !comparacao;
  //   }
  //   return true;
  // };

  return (

    <div>
      <RecipeInProgressCard recipe={ details } srcVideo={ srcVideo } />

      <button
        type="button"
        onClick={ handleFav }
        data-testid="favorite-btn"
        src={ favorited ? blackHeartIcon : whiteHeartIcon }
      >
        {favorited ? (
          <img src={ blackHeartIcon } alt="favorite" />
        ) : (
          <img src={ whiteHeartIcon } alt="not favorite" />
        )}
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        // className="btn-start-recipe"
        // disabled={ handlefavoriteall() }
      >
        Finalizar
      </button>

    </div>
  );
}

// RecipeInProgress.propTypes = {
//   listaIngredientes: PropTypes.arrayOf,
// }.isRequired;

export default RecipeInProgress;
