import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Context/recipesContext';
import getRecipes from '../helpers/getRecipes';

export default function SearchBar() {
  const { displayRecipes,
    setDisplayRecipes, searchValue,
    enableSearch, setSearchValue } = useContext(RecipesContext);
  const [type, setType] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;

  const createAlertNoRecipes = () => {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const createFirstLetterAlert = () => {
    if (type === 'first-letter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const setSearch = async () => {
    createFirstLetterAlert();
    const recipes = await getRecipes(type, searchValue, pathname);
    if (recipes === null) {
      createAlertNoRecipes();
    } else {
      setDisplayRecipes(recipes);
    }
  };

  useEffect(() => {
    const redirectTo = (path) => {
      if (path === '/meals') history.push(`/meals/${displayRecipes[0].idMeal}`);
      else history.push(`/drinks/${displayRecipes[0].idDrink}`);
    };
    if (displayRecipes.length === 1 && (searchValue && type)) {
      redirectTo(pathname);
    } else if (displayRecipes.meals === null) {
      createAlertNoRecipes();
    }
  }, [displayRecipes, pathname, history, searchValue, type]);

  return (
    <div>
      {
        enableSearch
    && (
      <form>
        <input
          data-testid="search-input"
          type="text"
          onChange={ (e) => setSearchValue(e.target.value) }
          value={ searchValue }
          className="header-search-bar"
          placeholder="Procurar por..."
        />

        <div className="header-radios">
          <label htmlFor="ingredient">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              name="search-section"
              id="ingredient"
              onChange={ (e) => setType(e.target.id) }
            />
            Ingredient
          </label>
          <label htmlFor="name">
            <input
              data-testid="name-search-radio"
              type="radio"
              name="search-section"
              id="name"
              onChange={ (e) => setType(e.target.id) }
            />
            Name
          </label>
          <label htmlFor="first-letter">
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              name="search-section"
              id="first-letter"
              onChange={ (e) => setType(e.target.id) }
            />
            First letter
          </label>
        </div>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => setSearch() }
          className="header-search-button"
        >
          Search
        </button>
      </form>
    )
      }
    </div>
  );
}
