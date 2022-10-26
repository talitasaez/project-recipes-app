import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [teste] = useState();
  return (
    <RecipesContext.Provider value={ teste }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
