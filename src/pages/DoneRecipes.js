import React from 'react';
import Header from '../Components/Header';

function DoneRecipes() {
  return (
    <Header title="Done Recipes" icons={ { profile: true, search: false } } />
  );
}

export default DoneRecipes;
