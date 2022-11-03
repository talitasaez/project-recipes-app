import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa o Profile', () => {
  test('Testa se a pagina está sendo renderizada corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    await waitFor(() => {
      const title = screen.getByRole('heading', {
        name: /profile/i,
      });
      expect(title).toBeInTheDocument();
    });
    const email = screen.getByTestId('profile-email');
    const btnDoneRecipes = screen.getByRole('button', {
      name: /done recipes/i,
    });
    const btnFavoriteRecipes = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    const btnLogout = screen.getByRole('button', {
      name: /logout/i,
    });
    expect(email).toBeInTheDocument();
    expect(btnDoneRecipes).toBeInTheDocument();
    expect(btnFavoriteRecipes).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  });
  test('testa localStorage', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    await waitFor(() => {
      const btnDoneRecipes = screen.getByRole('button', {
        name: /done recipes/i,
      });
      expect(btnDoneRecipes).toBeInTheDocument();
    });
    const btnLogout = screen.getByRole('button', {
      name: /logout/i,
    });
    userEvent.click(btnLogout);
    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(''));
  });
});
