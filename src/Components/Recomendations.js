import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import getRecipes from '../helpers/getRecipes';
import './Recomendations.css';

function Recomendations() {
  const [recomendations, setRecomendations] = useState([]);
  const [count, setCount] = useState(1);
  const history = useHistory();
  const path = history.location.pathname;
  let newPath = '';

  if (path.includes('/meals')) {
    newPath = '/drinks';
  } else {
    newPath = '/meals';
  }

  useEffect(() => {
    async function fetchData() {
      const recipes = await getRecipes('name', '', newPath);
      const maxLength = 6;
      if (recipes) setRecomendations(recipes.slice(0, maxLength));
      else setRecomendations([]);
    }
    fetchData();
  }, [newPath]);

  return (
    <section className="main-recomendations">
      <h2>
        Recomendações
      </h2>
      <section className="carousel">
        { recomendations.map((item, index) => {
          if (index > count) {
            return (
              <div
                key={ item.idMeal || item.idDrink }
                className="carousel_item"
                data-testid={ `${index}-recommendation-card` }
                style={ { display: 'none' } }
              >
                <img
                  src={ item.strMealThumb || item.strDrinkThumb }
                  alt={ item.strMeal || item.strDrink }
                />
                <p
                  data-testid={ `${index}-recommendation-title` }
                >
                  { item.strMeal || item.strDrink }
                </p>
              </div>
            );
          }
          if (index <= count && index > (count - 2)) {
            return (
              <div
                key={ item.idMeal || item.idDrink }
                className="carousel_item"
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  src={ item.strMealThumb || item.strDrinkThumb }
                  alt={ item.strMeal || item.strDrink }
                />
                <p
                  data-testid={ `${index}-recommendation-title` }
                >
                  { item.strMeal || item.strDrink }
                </p>
              </div>
            );
          }
          return '';
        }) }
      </section>
      <div className="indicators">
        <button type="button" onClick={ () => setCount(count - 2) }>
          {'<'}
        </button>
        <button type="button" onClick={ () => setCount(count + 2) }>
          {'>'}
        </button>
      </div>
    </section>
  );
}

export default Recomendations;
