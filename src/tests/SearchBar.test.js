import React from 'react';
import { screen, waitForElementToBeRemoved, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Recipes from '../pages/Recipes';

const lupa = 'search-top-btn';
const inputText = 'search-input';
const btnSearch = 'exec-search-btn';
const searchRadioSelector = 'name-search-radio';

describe('testing the Search Bar component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should test the alert of first letter filter', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    await waitFor(() => {
      const searchBtn = screen.getByTestId(lupa);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(inputText);
      const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
      userEvent.click(firstLetterRadio);
      const execSearch = screen.getByTestId(btnSearch);
      userEvent.type(searchInput, 'c');
      userEvent.click(execSearch);
      expect(window.alert).toBeCalled();
    });
  });

  it('should test if have no recipes', async () => {
    jest.spyOn(global, 'alert');
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    await waitFor(() => {
      screen.findByTestId('0-recipe-card');
    });
    const searchBtn = screen.getByTestId(lupa);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(inputText);
    const nameSearchRadio = screen.getByTestId(searchRadioSelector);
    userEvent.click(nameSearchRadio);
    const execSearch = screen.getByTestId(btnSearch);
    userEvent.type(searchInput, 'xablau');
    userEvent.click(execSearch);
    await waitFor(() => {
      waitForElementToBeRemoved(() => screen.getByTestId('0-recipe-card'));
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('should test the alert if recipes have length 12', async () => {
    const { history } = renderWithRouter(<Recipes />);
    history.push('/meals');
    await waitFor(() => {
      const searchBtn = screen.getByTestId(lupa);
      userEvent.click(searchBtn);
    });
    const searchInput = screen.getByTestId(inputText);
    const nameSearchRadio = screen.getByTestId(searchRadioSelector);
    userEvent.click(nameSearchRadio);
    const execSearch = screen.getByTestId(btnSearch);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearch);
    const inputFirstLetter = screen.getByText(/first letter/i);
    expect(inputFirstLetter).toBeInTheDocument();
    userEvent.click(inputFirstLetter);
    const unexpectedCard = screen.queryByTestId('12-recipe-card');
    expect(unexpectedCard).toBeNull();
  });

  it('should test the function which redirects in case of one element', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    await waitFor(() => {
      const searchBtn = screen.getByTestId(lupa);
      userEvent.click(searchBtn);
    });
    const searchInput = screen.getByTestId(inputText);
    const nameSearchRadio = screen.getByTestId(searchRadioSelector);
    userEvent.click(nameSearchRadio);
    const execSearch = screen.getByTestId(btnSearch);
    userEvent.type(searchInput, 'Corba');
    userEvent.click(execSearch);
    await waitFor(() => {
      const linkCorba = screen.getByRole('heading', {
        name: /corba/i,
      });
      userEvent.click(linkCorba);
    });
    // waitForElementToBeRemoved(() => screen.getByTestId('page-title'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals/52977');
  });

  test('Procurando por 1 letra e colocando mais de 1', async () => {
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    await waitFor(() => {
      const searchBtn = screen.getByTestId(lupa);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(inputText);
      const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
      userEvent.click(firstLetterRadio);
      const execSearch = screen.getByTestId(btnSearch);
      userEvent.type(searchInput, 'ba');
      userEvent.click(execSearch);
      expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
    });
  });

  test('Testa se ao clicar em drink, abre o drink normalmente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    await waitFor(() => {
      const searchBtn = screen.getByTestId(lupa);
      userEvent.click(searchBtn);
    });
    const searchInput = screen.getByTestId(inputText);
    const nameSearchRadio = screen.getByTestId(searchRadioSelector);
    userEvent.click(nameSearchRadio);
    const execSearch = screen.getByTestId(btnSearch);
    userEvent.type(searchInput, 'A1');
    userEvent.click(execSearch);
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/drinks/17222');
    });
  });
});
// usar global alert no lugar de window.
