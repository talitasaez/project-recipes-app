import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import RecipeDetailCard from '../Components/RecipeDetailCard';
import Recomendations from '../Components/Recomendations';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import getRecipes from '../helpers/getRecipes';

function RecipeDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [srcVideo, setSrcVideo] = useState('');
  const [startOrContinueBtn, setStartOrContinueBtn] = useState('Start Recipe');
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
    idMeal,
    idDrink,
  } = details;

  let mealOrDrink = '';
  if (path.includes('/meals')) {
    mealOrDrink = 'meals';
  } else {
    mealOrDrink = 'drinks';
  }

  // CÓDIGO PROVISÓRIO ENQUANTO NÃO TEM O BOTÃO DE CONTINUAR RECEITA //

  localStorage
    .setItem('inProgressRecipes', JSON
      .stringify({ meals: { 52771: [] }, drinks: { 178319: [] } }));

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(localStorage, 'inProgressRecipes')) {
      const storageProgressRecipes = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      if (storageProgressRecipes[mealOrDrink][id]) {
        setStartOrContinueBtn('Continue Recipe');
      } else {
        setStartOrContinueBtn('Start Recipe');
      }
    }
  }, [id, mealOrDrink]);

  // CÓDIGO PROVISÓRIO ENQUANTO NÃO TEM O BOTÃO DE FINALIZAR RECEITA //

  localStorage.setItem('doneRecipes', JSON.stringify([]));
  const doneStorage = JSON.parse(localStorage.getItem('doneRecipes'));

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

  return (
    <div>
      <RecipeDetailCard recipe={ details } srcVideo={ srcVideo } />
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
        ;
      </button>
      <Recomendations />

      {!doneStorage
        .find((r) => r.id === details.meals[0].idMeal || details.drinks[0].idDrink)
        && (
          <Link
            to={
              path.includes('/meals')
                ? `/meals/${idMeal}/in-progress` : `/drinks/${idDrink}/in-progress`
            }
          >
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="btn-start-recipe"
            >
              { startOrContinueBtn}
            </button>
          </Link>)}

    </div>
  );
}

export default RecipeDetails;
