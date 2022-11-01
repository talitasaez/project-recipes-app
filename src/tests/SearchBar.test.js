import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const magnifier = screen.findByTestId('lupa');
const inputText = screen.findByTestId('search-input');
const searchIngredient = screen.findByText(/ingredient/i);
const searchName = screen.findByText(/name/i);
const searchLetter = screen.findByText(/first letter/i);
const btnSearch = screen.findByRole('button', {
  name: /search/i,
});

describe('Testa os inputs radio "ingredients"', () => {
  beforeEach(() => {
    global.alert = jest.fn().mockResolvedValueOnce('Sorry, we haven\'t found any recipes for these filters.');
  });
  it('should test the alert of first letter filter', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email :/i,
    });
    const inputPassword = screen.getByLabelText(/senha :/i);
    const btnEnter = screen.getByRole('button', {
      name: /enter/i,
    });
    const email = 'Cloridrato@metilfenidato.com';
    const password = '1234567';
    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);
    expect(btnEnter).toBeEnabled();
    userEvent.click(btnEnter);
    const { location: { pathname } } = history;
    setTimeout(() => {
      expect(pathname).toBe('/meals');
    }, 3000);
    history.push('/meals');
    userEvent.click(magnifier);
    userEvent.type(inputText, ('XABLAU'));
    userEvent.click(searchIngredient);
    userEvent.click(btnSearch);
    expect(global.alert).tohave();
  });

  it('Testa os input radio "name"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    userEvent.click(magnifier);
    userEvent.click(searchName);
    userEvent.type(inputText, ('a'));
    userEvent.click(btnSearch);
    expect(window.alert).toBeCalled();
  });

  it('Testa os input radio "firts letter"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    userEvent.click(magnifier);
    userEvent.click(searchLetter);
    userEvent.type(inputText, ('a'));
    userEvent.click(btnSearch);
    expect(window.alert).toBeCalled();
  });

  it('Testa os drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    userEvent.click(magnifier);
    userEvent.type(inputText, ('apple'));
    userEvent.click(searchIngredient);
    userEvent.click(btnSearch);
    const textDrink = screen.getByRole('heading', {
      name: /apple berry smoothie/i,
    });
    expect(textDrink).toBeInTheDocument();
  });

  it('testa se estão sendo renderizados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    expect(magnifier).toBeInTheDocument();
    expect(inputText).toBeInTheDocument();
    expect(searchIngredient).toBeInTheDocument();
    expect(searchLetter).toBeInTheDocument();
    expect(searchName).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });
});
