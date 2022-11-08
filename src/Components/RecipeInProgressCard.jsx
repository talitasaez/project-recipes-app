import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import '../styles/RecipesInProgress.css';

function RecipeInProgressCard(props) {
  const { id } = useParams();
  const history = useHistory();
  const path = history.location.pathname;
  const { recipe, srcVideo } = props;
  const [listaIngredientes, setListaIngredientes] = useState([]);
  const [shareAlert, setShareAlert] = useState(false);
  // const [ingredientsChecked, setIngredientsChecked] = useState([]);
  const mealsOrDrinks = path.includes('/meals') ? 'meals' : 'drinks';
  const [inProgress, setInProgress] = useState({});
  const INNITIAL_STATE = {
    drinks: {},
    meals: {},
  };

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
  // falta arrumar lint linha 75 e fazer testes
  useEffect(() => {
    const localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
      ? JSON.parse(localStorage.getItem('inProgressRecipes'))
      : INNITIAL_STATE;
    setInProgress(localStorageInProgress);
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }, [inProgress]);

  const handleChangeChecked = ({ target }) => {
    const { checked } = target;
    const salvar = target.parentNode.innerText;
    const prev = inProgress[mealsOrDrinks][id]
      ? inProgress[mealsOrDrinks][id]
      : [];
    if (checked) {
      target.parentNode.className = 'checked';
      const listIngredientsChecked = [...prev, salvar];
      setInProgress({
        ...inProgress,
        [mealsOrDrinks]: {
          [id]: listIngredientsChecked,
        },
      });
    } else {
      target.parentNode.className = 'notChecked';
      const notListChecked = inProgress[mealsOrDrinks][id]
        .filter((ingredient) => ingredient !== salvar);
      setInProgress({
        ...inProgress,
        [mealsOrDrinks]: {
          [id]: notListChecked,
        },
      });
    }
  };

  const handleCheckedIn = (ingredient) => {
    if (inProgress[mealsOrDrinks][id]) {
      return inProgress[mealsOrDrinks][id].includes(ingredient);
    }
    return false;
  };
  console.log(listaIngredientes);
  return (
    <div>
      <h1 data-testid="recipe-title">{ nameRecipe }</h1>
      <h2 data-testid="recipe-category">{ recipeCategory }</h2>
      <img data-testid="recipe-photo" src={ imgSrc } alt={ nameRecipe } />
      <h3> Ingredientes </h3>
      <div>
        { listaIngredientes.map((ingredient, index) => (
          <label
            key={ index }
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            className={ `${handleCheckedIn(ingredient) ? 'checked' : 'notChecked'}` }
          >
            {ingredient}
            <input
              // data-testid={ `${index}-ingredient-name-and-measure` }
              type="checkbox"
              checked={ handleCheckedIn(ingredient) }
              // id={ ingredient }
              onClick={ handleChangeChecked }
              defaultChecked={ () => handleCheckedIn(ingredient) }
            />
          </label>

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
