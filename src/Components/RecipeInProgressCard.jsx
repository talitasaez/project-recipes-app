import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';

function RecipeInProgressCard(props) {
  const { id } = useParams();
  const history = useHistory();
  const path = history.location.pathname;
  const { recipe, srcVideo } = props;
  const [listaIngredientes, setListaIngredientes] = useState([]);
  const [shareAlert, setShareAlert] = useState(false);
  // const [checked, setChecked] = useState([]);

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

  // const handleIngredientClick = (i) => {
  //   const newPush = i[1];
  //   setChecked([...checked, newPush]);
  // };
  // const handleClassName = (a) => {
  //   const isDone = checked.some((e) => e === a[1]);
  //   return isDone;
  // };

  return (
    <div>
      <h1 data-testid="recipe-title">{ nameRecipe }</h1>
      <h2 data-testid="recipe-category">{ recipeCategory }</h2>
      <img data-testid="recipe-photo" src={ imgSrc } alt={ nameRecipe } />
      <h3> Ingredientes </h3>
      <div>
        {listaIngredientes.map((ingredient, index) => (
          // const trueFa = handleClassName(i);
          <div data-testid={ `${index}-ingredient-step` } key={ index }>
            <label
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              {ingredient}
              <input
                data-testid={ `${index}-ingredient-name-and-measure` }
                type="checkbox"
                id={ ingredient }
              />
              {/* {`${i[1]} ${measures[index][1] || ''}`} */}
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
