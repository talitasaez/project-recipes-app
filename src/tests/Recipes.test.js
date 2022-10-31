import React from 'react';
import { screen, act } from '@testing-library/react';
import renderWithContextAndRouter from '../helpers/renderWithContextAndRouter';
import Recipes from '../pages/Recipes';
import { meals } from '../../cypress/mocks/meals';

describe('Testa a página de Receitas', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));
    await act(() => {
      const { history } = renderWithContextAndRouter(<Recipes />);
      history.push('/meals');
    });
  });

  test('Testa se é feita requisição a API ', () => {
    expect(fetch).toBeCalled();
  });

  test('Testa se renderiza o título correto', () => {
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Meals');
  });

  test('Testa se renderiza o título correto', () => {
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
});
