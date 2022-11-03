import React from 'react';
import { screen, act } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithContextAndRouter from '../helpers/renderWithContextAndRouter';

import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('<RecipeDetails.test />', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    await act(() => {
      renderWithContextAndRouter(<App />, '/meals/52771');
    });
  });

  test('Testa se renderiza o título da Receita correto', () => {
    const cardTitle = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    expect(cardTitle).toBeInTheDocument();
  });

  test('Testa o botão de favoritar', () => {
    const favBtn = screen.getByRole('img', { name: /not favorite/i });
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);

    const favPressedBtn = screen.getByRole('img', { name: /favorite/i });
    expect(favPressedBtn).toBeInTheDocument();
    userEvent.click(favPressedBtn);

    expect(expect(favBtn).toBeInTheDocument());
  });

  test('Testa o botão aparece o botão Continue Recipe', () => {
    const startRecipebtn = screen.getByTestId('start-recipe-btn');
    expect(startRecipebtn).toBeInTheDocument();
  });

  describe('Testa página com um Drink', () => {
    beforeEach(async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneDrink),
      });
      await act(() => {
        renderWithContextAndRouter(<App />, '/drinks/178319');
      });
    });
    test('Testa se aparece o título correto', () => {
      const cardTitle = screen.getByRole('heading', { name: /aquamarine/i });
      expect(cardTitle).toBeInTheDocument();
    });
  });
});
