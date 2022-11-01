import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Context from '../Context/recipesContext';

export default function Header({ title, icons }) {
  const history = useHistory();
  const { setEnableSearch } = useContext(Context);

  const createProfileIcon = () => (
    <button type="button" onClick={ () => history.push('/profile') }>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profile-icon" />
    </button>
  );
  const createSearchIcon = () => (
    <button
      type="button"
      data-testid="lupa"
      onClick={ () => setEnableSearch((prev) => !prev) }
    >
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="profile-icon"
      />
    </button>);

  return (
    <header className="main-header">
      <h1 data-testid="page-title">{ title }</h1>
      <div className="header-buttons-container">
        {
          icons.profile && createProfileIcon()
        }
        {
          icons.search && createSearchIcon()
        }
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icons: PropTypes.shape({
    profile: PropTypes.bool,
    search: PropTypes.bool,
  }),
};

Header.defaultProps = {
  icons: { profile: true, search: true },
};
