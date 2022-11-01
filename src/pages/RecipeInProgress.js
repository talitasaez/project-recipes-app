import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import RecipeInfo from '../Components/RecipeInfo';
import getRecipes from '../helpers/getRecipes';
// import PropTypes from 'prop-types';
import RecipeDetailCard from '../Components/RecipeDetailCard';

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
  console.log(details);
  return (

    <div>
      <RecipeDetailCard recipe={ details } srcVideo={ srcVideo } />
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
