import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import '../styles/RecipeInProgress.css';

function RecipeInProgressCard(props) {
  const { id } = useParams();
  const history = useHistory();
  const path = history.location.pathname;
  const { recipe, srcVideo } = props;
  const [listaIngredientes, setListaIngredientes] = useState([]);
  const [shareAlert, setShareAlert] = useState(false);
  const [ingredientsChecked, setIngredientsChecked] = useState([]);

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

  useEffect(() => {
    const ingredients = Object.fromEntries(
      Object.entries(recipe).filter(
        ([key, value]) => key.includes('Ingredient') && value !== '' && value !== null,
      ),
    );
    const measures = Object.fromEntries(
      Object.entries(recipe).filter(
        ([key, value]) => key.includes('Measure') && value !== '' && value !== null,
      ),
    );
    let lista = [];
    const tamanhoLista = Object.values(ingredients).length;

    for (let i = 0; i < tamanhoLista; i += 1) {
      lista = [
        ...lista, `${Object.values(measures)[i]} ${Object.values(ingredients)[i]}`];
    }
    setListaIngredientes(lista);
  }, [recipe]);

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
  const handleChangeChecked = (e) => {
    const addChecked = e;
    setIngredientsChecked([...ingredientsChecked, addChecked]);
    console.log(addChecked);
  };

  const handleIngredientsClass = (a) => {
    const includeClass = ingredientsChecked.some((element) => element === a);
    return includeClass;
    // console.log(includeClass);
  };

  return (
    <div>
      <h1 data-testid="recipe-title">{ nameRecipe }</h1>
      <h2 data-testid="recipe-category">{ recipeCategory }</h2>
      <img data-testid="recipe-photo" src={ imgSrc } alt={ nameRecipe } />
      <h3> Ingredientes </h3>
      <div>
        {listaIngredientes.map((ingredient, index) => (
          <div data-testid={ `${index}-ingredient-step` } key={ index }>
            <label
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-step` }
              className={ handleIngredientsClass ? 'checked' : 'notChecked' }
            >
              {ingredient}
              <input
                data-testid={ `${index}-ingredient-name-and-measure` }
                type="checkbox"
                id={ ingredient }
                onChange={ (() => handleChangeChecked(ingredient)) }
              />
            </label>
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

RecipeInProgressCard.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default RecipeInProgressCard;
