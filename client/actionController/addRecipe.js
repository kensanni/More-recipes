import axios from 'axios';
import miniToastr from 'mini-toastr';
import { addRecipeRequest, addRecipeError, addRecipeSuccess } from '../actions/addRecipeAction';

const URL = '/api/v1';

/**
 * @description action creator for adding recipe
 *
 * @param {recipeData} recipeData
 *
 * @returns {undefinded} redux action to be dispatch to the store
 */
export default function addRecipe(recipeData) {
  return (dispatch) => {
    dispatch(addRecipeRequest(recipeData));
    axios.post(`${URL}/recipes`, recipeData)
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
