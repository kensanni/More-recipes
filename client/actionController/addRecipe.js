import miniToastr from 'mini-toastr';
import instance from '../Helpers/helper';
import { addRecipeRequest, addRecipeError, addRecipeSuccess } from '../actions/addRecipeAction';

/**
 * @description action creator for adding recipe
 *
 * @param {recipeData} recipeData
 *
 * @returns {void} redux action to be dispatch to the store
 */
export default function addRecipe(recipeData) {
  return (dispatch) => {
    dispatch(addRecipeRequest(recipeData));
    instance.post('/recipes', recipeData)
      .then((res) => {
        const { message, data } = res.data;
        dispatch(addRecipeSuccess(message, data));
        miniToastr.init();
        miniToastr.success(message);
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(addRecipeError(errors[0].message));
      });
  };
}
