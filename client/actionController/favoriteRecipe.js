import instance from '../Helpers/helper';
import { favoriteRecipeRequest, favoriteRecipeSuccess, favoriteRecipeError } from '../actions/favoriteRecipeAction';

/**
 * @description action creator for favoriting a recipe
 *
 * @param {number} recipeId
 *
 * @returns {void} action to be dispatch to the store
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
