import miniToastr from 'mini-toastr';
import instance from '../Helpers/helper';
import { editRecipeRequest, editRecipeSuccess, editRecipeError, editRecipeStatus } from '../actions/editRecipeAction';

export const SET_EDIT_RECIPE_ID = 'SET_EDIT_RECIPE_ID';

export const setEditRecipeIdAction = recipeId => dispatch => dispatch({
  type: SET_EDIT_RECIPE_ID,
  recipeId
});

/**
 * @description action creator for editing recipe
 *
 * @param {number} recipeId
 *
 * @param {object} recipeData
 *
 * @returns {void} action to be dispatch to the store
 */
export default function editRecipe(recipeId, recipeData) {
  return (dispatch) => {
    dispatch(editRecipeRequest(recipeId, recipeData));
    instance.put(`/recipes/${recipeId}`, recipeData)
      .then(() => {
        dispatch(editRecipeSuccess(recipeId, recipeData));
        dispatch(editRecipeStatus(true, null));
        $('#editModal').modal('toggle');
        miniToastr.init();
        miniToastr.success('Recipe successfully edited');
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(editRecipeError(errors[0].message));
        dispatch(editRecipeStatus(false, errors[0].message));
      });
  };
}
