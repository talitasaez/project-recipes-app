import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SearchBar from '../Components/SearchBar';
import RecipeCard from '../Components/RecipeCard';
import RecipesContext from '../Context/recipesContext';
import getRecipes from '../helpers/getRecipes';

import './Recipes.css';

function Recipes() {
  const { displayRecipes, setDisplayRecipes } = useContext(RecipesContext);
  const [categoryList, setCategoryList] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(false);
  const history = useHistory();
  const path = history.location.pathname;
  const numberCategory = 5;
  const numberRecipes = 12;

  useEffect(() => {
    async function fetchData() {
      const recipes = await getRecipes('name', '', path);
      if (recipes) setDisplayRecipes(recipes);
      else setDisplayRecipes([]);

      const categorys = await getRecipes('category', '', path);
      if (categorys) setCategoryList(categorys);
      else setCategoryList([]);
    }
    fetchData();
  }, [path, setDisplayRecipes]);

  const handleAllCategorys = async () => {
    const recipes = await getRecipes('name', '', path);
    if (recipes) setDisplayRecipes(recipes);
    else setDisplayRecipes([]);
  };

  const handleCategoryChanger = async (categoryName) => {
    if (toggleCategory === false) {
      const recipes = await getRecipes('byCategory', categoryName, path);
      if (recipes) setDisplayRecipes(recipes);
      else setDisplayRecipes([]);
    } else {
      handleAllCategorys();
    }

    setToggleCategory(!toggleCategory);
  };

  const titleToHeader = path === '/meals' ? 'Meals' : 'Drinks';
  return (
    <main>
      <Header title={ titleToHeader } />
      <div className="recipes-container">
        <SearchBar />
        <div className="category-list-container">
          { categoryList.filter((_, index) => index < numberCategory)
            .map((category, index) => {
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
            onClick={ handleAllCategorys }
          >
            All
          </button>
        </div>
        <section>
          { displayRecipes.filter((_, index) => index < numberRecipes)
            .map((recipe, index) => (
              <RecipeCard
                key={ index }
                recipe={ recipe }
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
