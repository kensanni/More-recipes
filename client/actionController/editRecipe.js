import instance from '../Helpers/helper';
import { editRecipeRequest, editRecipeSuccesful, editRecipeError } from '../actions/editRecipeAction';

/**
 * @description action creator for editing recipe
 *
 * @param {recipeId} recipeId
 *
 * @param {recipeData} recipeData
 *
 * @returns {undefined} Redux action to be dispatch to the store
 */
export default function editRecipe(recipeId, recipeData) {
  return (dispatch) => {
    dispatch(editRecipeRequest(recipeId, recipeData));
    instance.put(`/recipes/${recipeId}`, recipeData)
      .then((recipe) => {
        const { message } = recipe.data;
        dispatch(editRecipeSuccesful(message));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(editRecipeError(errors[0].message));
      });
  };
}
