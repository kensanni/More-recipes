import axios from 'axios';
import { editRecipeRequest, editRecipeSuccesful, editRecipeError } from '../actions/editRecipeAction';

const URL = '/api/v1';

/**
 * @description edit recipe's action
 * @param {*} recipeId
 * @return {*} Redux action to be dispatch to the store
 */
export default function editRecipe(recipeId, recipeData) {
  return (dispatch) => {
    dispatch(editRecipeRequest(recipeId, recipeData));
    console.log("recipeId", recipeId, recipeData);
    axios.put(`${URL}/recipes/${recipeId}`, recipeData)
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
