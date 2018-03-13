import miniToastr from 'mini-toastr';
import instance from '../Helpers/helper';
import { deleteRecipeRequest, deleteRecipeSuccessful, deleteRecipeError } from '../actions/deleteRecipeAction';

/**
 * @description action creator for deleting recipe
 *
 * @param {number} recipeId
 *
 * @returns {void} action to be dispatch to the store
 */
export default function deleteRelete(recipeId) {
  return (dispatch) => {
    dispatch(deleteRecipeRequest(recipeId));
    instance.delete(`/recipes/${recipeId}`)
      .then((recipe) => {
        const { message } = recipe.data;
        dispatch(deleteRecipeSuccessful(message, recipeId));
        miniToastr.init();
        miniToastr.success(message);
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(deleteRecipeError(errors[0].message));
      });
  };
}
