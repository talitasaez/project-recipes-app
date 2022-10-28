import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Header from '../Components/Header';

describe('testing the Header component', () => {
  it('should test if the pieces of header are in the document', () => {
    renderWithRouter(<Header title="Foods" />);
    const expectedTitle = screen.getByTestId('page-title');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(expectedTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  it('should test the profile button', () => {
    const { history } = renderWithRouter(<Header title="Foods" />);
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });
  it('should test the search button', () => {
    renderWithRouter(<Header title="Foods" />);
    const searchBtn = screen.getByTestId('search-top-btn');
    const searchInputLiteral = 'search-input';
    expect(screen.queryByTestId(searchInputLiteral)).toBeNull();
    userEvent.click(searchBtn);
    expect(screen.queryByTestId(searchInputLiteral)).toBeInTheDocument();
    const searchInput = screen.getByTestId(searchInputLiteral);
    userEvent.type(searchInput, searchInputLiteral);
    expect(searchInput).toHaveAttribute('value', searchInputLiteral);
  });
});
