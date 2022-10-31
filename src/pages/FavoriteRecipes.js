import React from 'react';
import Header from '../Components/Header';

function FavoriteRecipes() {
  return (
    <Header title="Favorite Recipes" icons={ { profile: true, search: false } } />
  );
}

export default FavoriteRecipes;
