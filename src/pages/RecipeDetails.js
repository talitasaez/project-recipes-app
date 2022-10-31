import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import getRecipes from '../helpers/getRecipes';
import RecipeDetailCard from '../Components/RecipeDetailCard';

function RecipeDetails() {
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

  const { idMeal, idDrink } = details;

  return (
    <div>
      <RecipeDetailCard recipe={ details } srcVideo={ srcVideo } />
      <Link
        to={
          path.includes('/meals')
            ? `/meals/${idMeal}/in-progress` : `/drinks/${idDrink}/in-progress`
        }
      >
        <button type="button" data-testid="start-recipe-btn">
          Start Recipe
        </button>
      </Link>
    </div>
  );
}

export default RecipeDetails;
