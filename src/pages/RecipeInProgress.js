import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import getRecipes from '../helpers/getRecipes';
import RecipeDetailCard from '../Components/RecipeDetailCard';

function RecipeInProgress() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  // const [srcVideo, setSrcVideo] = useState('');
  const history = useHistory();
  const path = history.location.pathname;
  const SIX = 6;
  const deleteIdFromPath = path.substring(0, SIX);

  useEffect(() => {
    async function fetchData() {
      const detailsToRender = await getRecipes('details', id, deleteIdFromPath);
      setDetails(detailsToRender[0]);
      if (path.includes('/meals')) {
        setSrcVideo(detailsToRender[0]);
      }
    }
    fetchData();
  }, [deleteIdFromPath, id, path]);

  const { idMeal, idDrink } = details;
  return (

  
  
)

export default RecipeInProgress;
