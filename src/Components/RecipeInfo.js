import React, { useState } from 'react';

export default function RecipeInfo({ recipeData }) {
  const [filterIngredientes, setFilterIngredientes] = useState([]);

  const ingredients = Object.fromEntries(
    Object.entries(recipeData).filter(
      ([key, value]) => key.includes('Ingredient') && value !== '',
    ),
  );
  setFilterIngredientes(ingredients);

  const { strMealThumb, strMeal, strCategory, strInstructions } = recipeData;
  return (
    <div>
      {/* //   <img data-testid="recipe-photo" src={  } alt={ nameRecipe } /> */}
      {/* {Object.values(ingredients).map((ingredient, index) => (  */}
      {/* <div data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {ingredient}
          </div>
        ))} */}
      {/* {Object.values(measures).map((measure, index) => (
          <div data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {measure}
          </div>
        ))} */}
    </div>
  );
}
