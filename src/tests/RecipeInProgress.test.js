import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import RecipeInProgress from '../pages/RecipeInProgress';

describe('Testa RecipeInProgress', () => {
  test('Testa se está renderizando corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals/53060');
    await waitFor(() => {
      const btnStartRecipe = screen.getByRole('button', {
        name: /start recipe/i,
      });
      userEvent.click(btnStartRecipe);
      const videoRecipe = screen.getByTestId('video');
      expect(videoRecipe).toBeInTheDocument();
    });
    const ingredients = screen.getByRole('heading', {
      name: /ingredientes/i,
    });
    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const imgRecipe = screen.getByTestId('recipe-photo');
    const instructions = screen.getByTestId('instructions');
    const btnShare = screen.getByTestId('share-btn');
    const btnFinish = screen.getByTestId('finish-recipe-btn');
    const btnFavorite = screen.getByTestId('favorite-btn');
    expect(ingredients).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(imgRecipe).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
    expect(btnFinish).toBeInTheDocument();
    await waitFor(() => {
      const checkboxOne = screen.getByTestId('0-ingredient-name-and-measure');
      userEvent.click(checkboxOne);
    });
    const checkboxTwo = screen.getByTestId('1-ingredient-name-and-measure');
    const checkboxThree = screen.getByTestId('2-ingredient-name-and-measure');
    const checkboxFour = screen.getByTestId('3-ingredient-name-and-measure');
    const checkboxFive = screen.getByTestId('4-ingredient-name-and-measure');
    const checkboxSix = screen.getByTestId('5-ingredient-name-and-measure');
    userEvent.click(checkboxTwo);
    userEvent.click(checkboxThree);
    userEvent.click(checkboxFour);
    userEvent.click(checkboxFive);
    userEvent.click(checkboxSix);
    expect(checkboxOne).toBeChecked();
    expect(checkboxTwo).toBeChecked();
    expect(checkboxThree).toBeChecked();
    expect(checkboxFour).toBeChecked();
    expect(checkboxFive).toBeChecked();
    expect(checkboxSix).toBeChecked();
  });
  it('Testa caso LocalStorage', async () => {
    const value = [{ id: '13501', type: 'drink' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(value));

    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(value));

    renderWithRouter(<RecipeInProgress />);

    await waitFor(() => expect(screen.getByRole('heading', {
      name: /ingredientes/i,
    })).toBeInTheDocument());

    expect(localStorage.getItem).toHaveBeenCalled();
  });
  // it('Testa caso não tenha LocalStorage', async () => {
  //   jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
  //     .mockReturnValue(JSON.stringify(''));

  //   renderWithRouterAndContext(<App />, '/animal');

  //   await waitFor(() => expect(screen.getByText('DOGS VS CATS')).toBeInTheDocument());

  //   expect(global.alert).toHaveBeenCalledTimes(1);

  //   screen.getByText('não existe email');

  //   expect(localStorage.getItem).toHaveBeenCalled();
  // });
});
