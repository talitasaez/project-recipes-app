import React from 'react';

function login() {
  return (
    <form>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          id="email"
          type="email"
        />
      </label>
      <label htmlFor="password">
        <input
          data-testid="password-input"
          id="password"
          type="password"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Enter
      </button>
    </form>
  );
}

export default login;
