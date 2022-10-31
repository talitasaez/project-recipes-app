import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Recipes from '../pages/Recipes';

const searchTopBtn = 'search-top-btn';
const searchInputLiteral = 'search-input';
const execSearchBtn = 'exec-search-btn';
const searchRadioSelector = 'name-search-radio';

describe('testing the Search Bar component', () => {
  it('should test the alert of first letter filter', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(searchInputLiteral);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterRadio);
    const execSearch = screen.getByTestId(execSearchBtn);
    userEvent.type(searchInput, 'c');
    userEvent.click(execSearch);
    expect(window.alert).toBeCalled();
  });
  it('should test if have no recipes', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await screen.findByTestId('0-recipe-card');
    const searchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(searchInputLiteral);
    const nameSearchRadio = screen.getByTestId(searchRadioSelector);
    userEvent.click(nameSearchRadio);
    const execSearch = screen.getByTestId(execSearchBtn);
    userEvent.type(searchInput, 'no recipes was finded');
    userEvent.click(execSearch);
    await waitForElementToBeRemoved(() => screen.getByTestId('0-recipe-card'));
    expect(window.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
  it('should test the alert if recipes have length 12', async () => {
    const { history } = renderWithRouter(<Recipes />);
    history.push('/foods');
    const expectedCard = await screen.findByTestId('11-recipe-card');
    const searchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(searchInputLiteral);
    const nameSearchRadio = screen.getByTestId(searchRadioSelector);
    userEvent.click(nameSearchRadio);
    const execSearch = screen.getByTestId(execSearchBtn);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearch);
    const inputFirstLetter = screen.getByText(/first letter/i);
    expect(inputFirstLetter).toBeInTheDocument();
    userEvent.click(inputFirstLetter);
    const mealsFirtsLetter = screen.getByRole('img', {
      name: /lamb tomato and sweet spices/i,
    });
    expect(mealsFirtsLetter).toBeInTheDocument();
    const unexpectedCard = screen.queryByTestId('12-recipe-card');
    expect(expectedCard).toBeInTheDocument();
    expect(unexpectedCard).toBeNull();
  });
  it('should test the function which redirects in case of one element', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(searchInputLiteral);
    const nameSearchRadio = screen.getByTestId(searchRadioSelector);
    userEvent.click(nameSearchRadio);
    const execSearch = screen.getByTestId(execSearchBtn);
    userEvent.type(searchInput, 'Corba');
    userEvent.click(execSearch);
    await waitForElementToBeRemoved(() => screen.getByTestId('page-title'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods/52977');
  });
});
