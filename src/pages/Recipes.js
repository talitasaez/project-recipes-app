import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipeCard from '../Components/RecipeCard';
import RecipesContext from '../Context/recipesContext';
import getRecipes from '../helpers/getRecipes';

import './Recipes.css';

function Recipes() {
  const { displayRecipes, setDisplayRecipes } = useContext(RecipesContext);
  const [categoryList, setCategoryList] = useState([]);
  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    async function fetchData() {
      const recipes = await getRecipes('name', '', path);
      const maxLength = 12;
      if (recipes) setDisplayRecipes(recipes.slice(0, maxLength));
      else setDisplayRecipes([]);

      const categorys = await getRecipes('category', '', path);
      const maxLengthCategorys = 5;
      if (categorys) setCategoryList(recipes.slice(0, maxLengthCategorys));
      else setCategoryList([]);
    }
    fetchData();
  }, [path, setDisplayRecipes]);

  const handleCategoryChanger = async (categoryName) => {
    const recipes = await getRecipes('byCategory', categoryName, path);
    const maxLength = 12;
    if (recipes) setDisplayRecipes(recipes.slice(0, maxLength));
    else setDisplayRecipes([]);
  };

  const titleToHeader = path === '/meals' ? 'Meals' : 'Drinks';

  return (
    <main>
      <Header title={ titleToHeader } />
      <div className="recipes-container">
        <div className="category-list-container">
          { categoryList.map((category, index) => {
            const categoryName = category.strCategory;
            return (
              <button
                key={ index }
                data-testid={ `${categoryName}-category-filter` }
                type="button"
                onClick={ () => { handleCategoryChanger(categoryName); } }
              >
                {categoryName}
              </button>
            );
          }) }
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => { } }
          >
            All
          </button>
        </div>
        <section>
          { displayRecipes.map((recipe, index) => (
            <RecipeCard
              key={ index }
              recipe={ recipe }
              data-testid={ `${index}-recipe-card` }
              index={ index }
            />
          )) }
        </section>
      </div>
      <Footer />
    </main>
  );
}

export default Recipes;
