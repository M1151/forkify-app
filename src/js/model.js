import { getJson, sendJs0n, AJAX } from './helpers';
import { RES_PER_PAGE, API_URL, KEY } from './config.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resPerPage: RES_PER_PAGE,
  },
  bookMarks: [],
};

// state.recipe = { name: 'mahmoud', Lname: 'ali' };
//

const createRecipe = function (data) {
  if (!data || !data.data || !data.data.recipe)
    throw new Error('Invalid recipe data received from API');
  let { recipe } = data.data;
  return {
    id: recipe.id,
    publisher: recipe.publisher,
    url: recipe.source_url,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    cookingTime: recipe.cooking_time,
    title: recipe.title,
    servings: recipe.servings,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    console.log(data);

    if (data.status === 'fail') {
      throw new Error(data.message);
    }

    state.recipe = createRecipe(data);
    if (state.bookMarks.some(rec => rec.id === state.recipe.id)) {
      state.recipe.bookMarked = true;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearch = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    if (data.status === 'error') throw new Error(data.message);

    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        publisher: rec.publisher,
        image: rec.image_url,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPageContent = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.resPerPage;
  const end = page * state.search.resPerPage;

  return state.search.result.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });
  state.recipe.servings = newServings;
};

const saveBookMarks = function () {
  localStorage.setItem('BookMarks', JSON.stringify(state.bookMarks));
};

const retrieveBookMarks = function () {
  const storage = JSON.parse(localStorage.getItem('BookMarks'));
  if (!storage) return;
  state.bookMarks = storage;
};

export const addToBookMarks = function (recipe) {
  recipe.bookMarked = true;
  state.bookMarks.push(recipe);
  saveBookMarks();
};

export const removeFromBookMarks = function (recipe) {
  recipe.bookMarked = false;
  state.bookMarks = state.bookMarks.filter(rec => rec.id !== recipe.id);
  saveBookMarks();
};

export const addRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error('Please Follow The Format in Igredients :)');

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const sentRecipe = {
      cooking_time: newRecipe.cookingTime,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      servings: newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, sentRecipe);
    const recipe = createRecipe(data);
    state.recipe = recipe;
    addToBookMarks(recipe);
  } catch (err) {
    throw err;
  }
};

retrieveBookMarks();
