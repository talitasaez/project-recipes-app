import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [searchValue, setSearchValue] = useState('');
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [enableSearch, setEnableSearch] = useState(false);

  const contextValue = useMemo(() => ({ searchValue,
    setSearchValue,
    displayRecipes,
    setDisplayRecipes,
    enableSearch,
    setEnableSearch }), [searchValue, displayRecipes, enableSearch]);

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
