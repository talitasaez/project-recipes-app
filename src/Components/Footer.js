import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  return (
    <nav data-testid="footer" className="main-footer">
      <Link to="/meals">
        <img src={ mealIcon } alt={ mealIcon } data-testid="meals-bottom-btn" />
      </Link>
      <Link to="/drinks">
        <img src={ drinkIcon } alt={ drinkIcon } data-testid="drinks-bottom-btn" />
      </Link>
    </nav>
  );
}
export default Footer;
