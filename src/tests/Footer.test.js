import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Recipes from '../pages/Recipes';

describe('Footer', () => {
  it('Testa se há o redirecionamento para a lista de comidas ao clicar no ícone de comidas;', () => {
    const { history } = renderWithRouter(<Recipes />);
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsIcon);
    const { location: { pathname } } = history;
    setTimeout(() => {
      expect(pathname).toBe('/meals');
    }, 3000);
  });
  it('Testa se está sendo renderizado nas telas', () => {
    const { history } = renderWithRouter(<Recipes />);
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const drinkImage = screen.getByRole('img', {
      name: /\/static\/media\/drinkicon\.efc0d3c156e5da73e44a826c8d67b142\.svg/i,
    });
    const mealsImage = screen.getByRole('img', {
      name: /\/static\/media\/mealicon\.40029e7f1422ba5a1bf1c10fa4f59030\.svg/i,
    });
    userEvent.click(drinkIcon);
    const { location: { pathname } } = history;
    setTimeout(() => {
      expect(pathname).toBe('/drinks');
    }, 3000);
    const cointainerIcon = screen.getByTestId('footer');
    expect(mealsIcon).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
    expect(cointainerIcon).toBeInTheDocument();
    expect(drinkImage).toBeInTheDocument();
    expect(mealsImage).toBeInTheDocument();
  });
});
