import { MSG_APPESRING_SECS } from './config.js';
import * as model from './model.js';
import SearchResultsView from './views/ searchResultsView.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookMarkView from './views/bookMarkView.js';
import addRecipeView from './views/addRecipeView.js';

// const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1).split('%')[0];

    recipeView.renderSpinner();

    SearchResultsView.update(model.getSearchResultsPageContent());
    //load recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //render recipe
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError(err);
    console.log(err);
  }
};

const controlSearch = async function () {
  try {
    SearchResultsView.renderSpinner();

    const query = searchView.getQuery();

    await model.loadSearch(query);
    SearchResultsView.render(model.getSearchResultsPageContent());

    paginationView.render(model.state.search);
  } catch (err) {
    SearchResultsView.renderError(err);
  }
};

const controlPagination = function (gotoPage) {
  SearchResultsView.render(model.getSearchResultsPageContent(gotoPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe);
};

const controlBookMarks = function () {
  if (model.state.recipe.bookMarked)
    model.removeFromBookMarks(model.state.recipe);
  else model.addToBookMarks(model.state.recipe);
  bookMarkView.render(model.state.bookMarks);

  recipeView.update(model.state.recipe);
};

const controlRenderingBookMarks = function () {
  bookMarkView.render(model.state.bookMarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    // render spinner
    addRecipeView.renderSpinner();

    // upload new recipe
    await model.addRecipe(newRecipe);

    // update the page url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // render the bookmarks recipes
    bookMarkView.render(model.state.bookMarks);

    // render a message
    addRecipeView.renderMessage('Your Recipe Was Succesfully Uploaded');

    // hide the form after atime
    setTimeout(function () {
      addRecipeView._toggleHiddenClasses();
      // render the uploaded  recipe
      recipeView.render(model.state.recipe);
    }, MSG_APPESRING_SECS * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
    setTimeout(function () {
      addRecipeView._toggleHiddenClasses();
    }, MSG_APPESRING_SECS * 1000);
  }
};

//publisher--subscriber consept in ===> mvc
const init = function () {
  recipeView.recipeRenderHandler(controlRecipe);
  recipeView.servingsChangeHandler(controlServings);
  recipeView.bookMarksHandler(controlBookMarks);
  searchView.SearchRenderHandler(controlSearch);
  paginationView.paginationBtnHandler(controlPagination);
  bookMarkView.bookMarksRenderHandler(controlRenderingBookMarks);
  addRecipeView.addUploadHandler(controlUploadRecipe);
  // bookMarkView.renderBookMarksHandler(controlRenderingBookMarks)
};
init();
