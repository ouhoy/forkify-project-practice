import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import pagination from './views/pagination';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) module.hot.accept();
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
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    searchView.clearInput();
    resultsView.render(model.getSearchResultsPage(1));

    // Render initial pagination button

    pagination.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = goToPage => {
  // 1) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 1) Render new Pagination buttons
  pagination.render(model.state.search);
};

const controlSevings = function (newServings) {
  // Update the recipe servings (in state)

  model.updateServings(newServings);

  // Update the view
  const { recipe } = model.state;

  // 2) Rendering recipe
  recipeView.render(recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipies);
  searchView.addHandlerSearch(controlSearchResults);
  pagination.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlSevings);
};
init();
