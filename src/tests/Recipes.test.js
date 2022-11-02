import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithContextAndRouter from '../helpers/renderWithContextAndRouter';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import goatMeals from '../../cypress/mocks/goatMeals';
import App from '../App';

describe('Testa a página de Receitas', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(goatMeals),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals),
      });

    await act(() => {
      renderWithContextAndRouter(<App />, '/meals');
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

  test('Testa se renderiza o primeiro card de receitas', () => {
    const cardTitle = screen.getByRole('heading', {
      name: /corba/i,
    });
    expect(cardTitle).toBeInTheDocument();
  });

  test('Testa se retorna as categorias', async () => {
    const categoryBtn = screen.getByRole('button', { name: /goat/i });
    expect(categoryBtn).toBeInTheDocument();

    userEvent.click(categoryBtn);

    const title = await screen.findByRole('heading', { name: /mbuzi choma \(roasted goat\)/i });
    expect(title).toBeInTheDocument();

    userEvent.click(categoryBtn);
    const cardTitle = await screen.findByRole('heading', {
      name: /corba/i,
    });
    expect(cardTitle).toBeInTheDocument();
  });

  test('Testa o funcionamento do botão All', () => {
    const allCategoryBtn = screen.getByRole('button', { name: /all/i });
    expect(allCategoryBtn).toBeInTheDocument();
    userEvent.click(allCategoryBtn);

    const cardTitle = screen.getByRole('heading', {
      name: /corba/i,
    });
    expect(cardTitle).toBeInTheDocument();
  });
});
