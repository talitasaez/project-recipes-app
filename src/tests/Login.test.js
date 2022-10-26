import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';

describe('Testa pagagina de login', () => {
  test('Testa se login é renderizado corretamente', () => {
    render(<Login />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email :/i,
    });
    const emailText = screen.getByText(/email :/i);
    const inputPassword = screen.getByLabelText(/senha :/i);
    const passwordText = screen.getByText(/senha :/i);
    const btnEnter = screen.getByRole('button', {
      name: /enter/i,
    });
    expect(inputEmail).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(passwordText).toBeInTheDocument();
    expect(btnEnter).toBeInTheDocument();
  });
  test('Testa se é possível digitar nos inputs e pressionar o botão de "Enter"', () => {
    const { history } = render(<Login />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email :/i,
    });
    const inputPassword = screen.getByLabelText(/senha :/i);
    const btnEnter = screen.getByRole('button', {
      name: /enter/i,
    });
    expect(btnEnter).toBeDisabled();
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
  });
});
