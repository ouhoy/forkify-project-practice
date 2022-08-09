import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipies = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // 1) Loading recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(recipe);
  } catch (e) {
    recipeView.renderError();
    throw new Error(e);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    searchView.clearInput();
  } catch (err) {
    throw err;
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipies);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
