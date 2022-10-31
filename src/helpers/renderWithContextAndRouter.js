import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import RecipesProvider from '../Context/recipesProvider';
import RecipesContext from '../Context/recipesContext';

const renderWithContextAndRouter = (component) => {
  const history = createBrowserHistory();
  return {
    history,
    ...render(
      <RecipesProvider value={ RecipesContext }>
        <Router history={ history }>
          {component}
        </Router>
      </RecipesProvider>,
    ),
  };
};

export default renderWithContextAndRouter;
