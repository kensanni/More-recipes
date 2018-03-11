import instance from '../Helpers/helper';
import { getRecipeDetailsRequest, getRecipeDetailsError, getRecipeDetailsSuccessful } from '../actions/getRecipeDetailsAction';

/**
 * @description action creator for getting recipe details
 *
 * @param {recipeId} recipeId
 *
 * @returns {void} redux action to be dispatch to the store
 */
export default function getRecipeDetails(recipeId) {
  return (dispatch) => {
    dispatch(getRecipeDetailsRequest(recipeId));
    instance.get(`/recipes/${recipeId}`)
      .then((res) => {
        const { recipeData } = res.data;
        dispatch(getRecipeDetailsSuccessful(recipeData));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(getRecipeDetailsError(errors[0].message));
      });
  };
}
