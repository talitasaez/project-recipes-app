import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

describe('Testa DoneRecipes', () => {
  test('Testa se está renderizando corretamente', async () => {
    renderWithRouter(<DoneRecipes />);
    await waitFor(() => {
      const btnProfile = screen.getByTestId('profile-top-btn');
      expect(btnProfile).toBeInTheDocument();
    });
    const title = screen.getByRole('heading', {
      name: /done recipes/i,
    });
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(title).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();
    expect(btnMeals).toBeInTheDocument();
  });
  test('testa funcionalidades dos botões', async () => {
    renderWithRouter(<DoneRecipes />);
    await waitFor(() => {
      const btnProfile = screen.getByTestId('profile-top-btn');
      expect(btnProfile).toBeInTheDocument();
    });
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(btnDrinks);
    await waitFor(() => {
      const drinkFilter = screen.getByText(/aquamarine/i);
      expect(drinkFilter).toBeInTheDocument();
    });
    userEvent.click(btnAll);
    const mealsAll = screen.getByText(/spicy arrabiata penne/i);
    const drinkFilter = screen.getByText(/aquamarine/i);
    expect(mealsAll).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
  });
});
