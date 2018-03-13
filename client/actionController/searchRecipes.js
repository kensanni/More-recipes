import fetch from 'isomorphic-fetch';

/**
 * @description action to search for recipes on the app
 *
 * @param {string} recipe
 *
 * @returns {object} return an object containing search result
 */
export default function searchRecipe(recipe) {
  return fetch(`/api/v1/search?recipe=${recipe}`)
    .then(response => response.json())
    .then(json => ({ options: json.searchResult }))
    .catch(error => error);
}
