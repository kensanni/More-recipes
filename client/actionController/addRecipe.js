import miniToastr from 'mini-toastr';
import instance from '../Helpers/helper';
import { addRecipeRequest, addRecipeError, addRecipeSuccess } from '../actions/addRecipeAction';

/**
 * @description action creator for adding recipe
 *
 * @param {object} recipeData
 *
 * @returns {void} action to be dispatch to the store
 */
export default function addRecipe(recipeData) {
  return (dispatch) => {
    dispatch(addRecipeRequest(recipeData));
    return instance.post('/recipes', recipeData)
      .then((res) => {
        const { message, data } = res.data;
        dispatch(addRecipeSuccess(message, data));
        $('#exampleModal').modal('toggle');
        miniToastr.init();
        miniToastr.success(message);
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(addRecipeError(errors[0].message));
      });
  };
}
