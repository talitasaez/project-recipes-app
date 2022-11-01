import React from 'react';
import Header from '../Components/Header';

function DoneRecipes() {
  const doneItensLocal = JSON.parse(localStorage.getItem('doneRecipes'));

  const showItens = (infoFiltro) => {
    if (infoFiltro === undefined) {
      return doneItensLocal !== null ? (
        <div>
          {
            doneItensLocal
              .map((element, index) => (
                element.type === 'food' ? (
                  mapItensFood(element, index, setShowCopy)
                ) : mapItensDrinks(element, index, setShowCopy)))
          }
        </div>
      ) : <h4>{ findNone }</h4>;
    }
    if (infoFiltro === 'food') {
      return doneItensLocal !== null ? (
        <div>
          {
            doneItensLocal
              .filter(
                (element) => (element.type === 'food'),
              )
              .map((element, index) => (
                mapItensFood(element, index, setShowCopy)
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
    <>
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
          name="food"
          data-testid="filter-by-meals-btn"
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

    </>
  );
}

export default DoneRecipes;
