import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helper';
export const state = {
  search: {
    query: '',
    results: [],
  },
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    let { recipe } = data.data;
    state.recipe = recipe;
  } catch (err) {
    throw new Error(err);
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    let { recipes } = data.data;
    state.search.results = recipes;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
