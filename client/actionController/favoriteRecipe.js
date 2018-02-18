import axios from 'axios';
import Helper from '../Helpers/helper';
import { favoriteRecipeRequest, favoriteRecipeSuccess, favoriteRecipeError } from '../actions/favoriteRecipeAction';

const URL = '/api/v1';

/**
 * @description action controller for favoriting a recipe
 *
 * @param {recipeId} recipeId
 *
 * @returns {undefined} Redux action to be dispatch to the store
 */
export default function favoriteRecipe(recipeId) {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    Helper.setAuthorizationToken(token);
    dispatch(favoriteRecipeRequest(recipeId));
    axios.post(`${URL}/recipes/${recipeId}/favorites`)
      .then((recipe) => {
        const { message } = recipe.data;
        dispatch(favoriteRecipeSuccess(message));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(favoriteRecipeError(errors[0].message));
      });
  };
}
