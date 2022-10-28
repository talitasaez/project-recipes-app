import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Footer', () => {
  it('Testa se há o redirecionamento para a lista de comidas ao clicar no ícone de comidas', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByPlaceholderText(/insira sua senha\.\.\./i);
    const loginBtn = screen.getByRole('button', { name: /enter/i });
    expect(loginBtn).toHaveProperty('disabled', true);
    userEvent.type(emailInput, 'tester@test.com');
    userEvent.type(passInput, 'senhagrande');
    expect(loginBtn).toHaveProperty('disabled', false);
    userEvent.click(loginBtn);
    const footerFoods = screen.getByTestId('meals-bottom-btn');
    userEvent.click(footerFoods);
  });
  it('Testa se há o redirecionamento para a lista de bebidas ao clicar no ícone de bebidas', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByPlaceholderText(/insira sua senha\.\.\./i);
    const loginBtn = screen.getByRole('button', { name: /enter/i });
    expect(loginBtn).toHaveProperty('disabled', true);
    userEvent.type(emailInput, 'tester@test.com');
    userEvent.type(passInput, 'senhagrande');
    expect(loginBtn).toHaveProperty('disabled', false);
    userEvent.click(loginBtn);
    const footerDrinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(footerDrinks);
  });
});
