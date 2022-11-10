import React, { useState } from 'react';
import Header from '../Components/Header';
import { mapItensMeals, mapItensDrinks } from '../helpers/mapItemsDone';

function DoneRecipes() {
  const [showCopy, setShowCopy] = useState(false);
  const [filter, setFilter] = useState('all');
  const findNone = 'Nenhuma Receita Concluida!';

  const doneItensLocal = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  // const doneItensLocal = JSON.parse(localStorage.getItem('doneRecipes'));

  console.log(showCopy);
  const filterButtons = ({ target }) => {
    const { name } = target;
    if (name === 'all') setFilter('all');
    if (name === 'meals') setFilter('meals');
    if (name === 'drinks') setFilter('drinks');
  };

  const showItens = (infoFiltro) => {
    if (infoFiltro === 'all') {
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
          Drinkss
        </button>
      </div>
      {showItens(filter)}
    </div>
  );
}

export default DoneRecipes;

// silvio
