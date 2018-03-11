import instance from '../Helpers/helper';
import { favoriteRecipeRequest, favoriteRecipeSuccess, favoriteRecipeError } from '../actions/favoriteRecipeAction';

/**
 * @description action controller for favoriting a recipe
 *
 * @param {recipeId} recipeId
 *
 * @returns {undefined} Redux action to be dispatch to the store
 */
export default function favoriteRecipe(recipeId) {
  return (dispatch) => {
    dispatch(favoriteRecipeRequest(recipeId));
    instance.post(`/recipes/${recipeId}/favorites`)
      .then((recipe) => {
        const { message, type: favoriteType } = recipe.data;
        dispatch(favoriteRecipeSuccess(recipeId, message, favoriteType));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(favoriteRecipeError(errors[0].message));
      });
  };
}
