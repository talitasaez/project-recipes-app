import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './recipesContext';

function RecipesProvider({ children }) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  // const verifyBtn = () => {
  //   const regex = /\S+@\S+\.\S+/;
  //   const minLength = 6;
  //   const verifyEmail = email && regex.test(email);
  //   const verifyPassword = password.length >= minLength;
  //   const emailAndPassword = verifyEmail && verifyPassword;
  //   setBtnIsDisabled(!(emailAndPassword));
  // };

  // useEffect(() => {
  //   verifyBtn();
  // }, [email, password]);

  // const handleChangeEmail = ({ target }) => {
  //   setEmail(target.value);
  // };

  // const handleChangePassword = ({ target }) => {
  //   setPassword(target.value);
  // };

  // const contexto = useMemo(() => ({
  //   email,
  //   password,
  //   handleChangeEmail,
  //   handleChangePassword,
  //   verifyBtn,
  //   btnIsDisabled,
  // }), [email, password, handleChangeEmail,
  //   handleChangePassword, verifyBtn, btnIsDisabled]);

  return (
    <RecipesContext.Provider>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
