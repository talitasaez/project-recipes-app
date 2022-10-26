const createEndPointForFoods = (type, value) => {
  if (type === 'ingredient') {
    return (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
  }
  if (type === 'name') {
    return (`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
  }
  if (type === 'category') {
    return ('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  }
  if (type === 'byCategory') {
    return (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
  }
  return (`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
};

const createEndPointForDrinks = (type, value) => {
  if (type === 'ingredient') {
    return (`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`);
  }
  if (type === 'name') {
    return (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
  }
  if (type === 'category') {
    return ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  }
  if (type === 'byCategory') {
    return (`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail${value}`);
  }
  return (`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`);
};

const getRecipes = async (type, value, path) => {
  console.log('type:', type, 'path:', path, 'value', value);
  try {
    const endpoint = path === '/meals'
      ? createEndPointForFoods(type, value)
      : createEndPointForDrinks(type, value);
    console.log(endpoint);
    const request = await fetch(endpoint);
    const response = await request.json();
    return path === '/meals' ? response.meals : response.drinks;
  } catch (e) {
    return null;
  }
};

export default getRecipes;
