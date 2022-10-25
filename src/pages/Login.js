import React, { useEffect, useState, useCallback } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const verifyBtn = useCallback(() => {
    const regex = /\S+@\S+\.\S+/;
    const minLength = 6;
    const verifyEmail = email && regex.test(email);
    const verifyPassword = password.length > minLength;
    const emailAndPassword = verifyEmail && verifyPassword;
    setBtnIsDisabled(!(emailAndPassword));
  }, [email, password]);
  const user = { email };
  localStorage.setItem('user', JSON.stringify(user));

  useEffect(() => {
    verifyBtn();
  }, [email, password, btnIsDisabled, verifyBtn]);

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = (({ target }) => {
    setPassword(target.value);
  });

  return (
    <form>
      <label htmlFor="email">
        Email :
        <input
          data-testid="email-input"
          id="email"
          type="email"
          placeholder="Digite seu email..."
          value={ email }
          onChange={ handleChangeEmail }
        />
      </label>
      <label htmlFor="password">
        Senha :
        <input
          data-testid="password-input"
          id="password"
          type="password"
          placeholder="Digite sua senha..."
          value={ password }
          onChange={ handleChangePassword }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ btnIsDisabled }
        onClick={ verifyBtn }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
