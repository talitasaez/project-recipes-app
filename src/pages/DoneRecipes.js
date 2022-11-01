import React, { useState } from 'react';
import Header from '../Components/Header';
import { mapItensMeals, mapItensDrinks } from '../helpers/mapItemsDone';

function DoneRecipes() {
  const [filter, setFilter] = useState();
  const findNone = 'Nenhuma Receita Concluida!';

  const doneItensLocal = JSON.parse(localStorage.getItem('doneRecipes'));

  const filterButtons = ({ target }) => {
    const { name } = target;
    if (name === 'all') setFilter();
    if (name === 'meals') setFilter('meals');
    if (name === 'drinks') setFilter('drinks');
  };

  const showItens = (infoFiltro) => {
    if (infoFiltro === undefined) {
      return doneItensLocal !== null ? (
        <div>
          {
            doneItensLocal
              .map((element, index) => (
                element.type === 'meals' ? (
                  mapItensMeals(element, index, setShowCopy)
                ) : mapItensDrinks(element, index, setShowCopy)))
          }
        </div>
      ) : <h4>{ findNone }</h4>;
    }
    if (infoFiltro === 'meals') {
      return doneItensLocal !== null ? (
        <div>
          {
            doneItensLocal
              .filter(
                (element) => (element.type === 'meals'),
              )
              .map((element, index) => (
                mapItensMeals(element, index, setShowCopy)
              ))
          }
        </div>
      ) : <h4>{ findNone }</h4>;
    }
    if (infoFiltro === 'drinks') {
      return doneItensLocal !== null ? (
        <div>
          {
            doneItensLocal
              .filter(
                (element) => (element.type === 'drink'),
              )
              .map((element, index) => (mapItensDrinks(element, index, setShowCopy)))
          }
        </div>
      ) : <h4>{ findNone }</h4>;
    }
  };

  return (
    <div className="done-recipes-container">
      <Header title="Done Recipes" icons={ { profile: true, search: false } } />
      <div className="done-recipes-buttons">
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ filterButtons }
        >
          All
        </button>
        <button
          type="button"
          name="meals"
          data-testid="filter-by-meal-btn"
          onClick={ filterButtons }
        >
          Meals
        </button>
        <button
          type="button"
          name="drinks"
          data-testid="filter-by-drink-btn"
          onClick={ filterButtons }
        >
          Drinks
        </button>
      </div>
      {showItens(filter)}
    </div>
  );
}

export default DoneRecipes;
