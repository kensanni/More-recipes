import axios from 'axios';
import { deleteRecipeRequest, deleteRecipeSuccessful, deleteRecipeError } from '../actions/deleteRecipeAction';

const URL = '/api/v1';

/**
 * @description delete recipe's action
 * @param {*} recipeId
 * @return {*} Redux action to be dispatch to the store
 */
export default function deleteReleteReducer(recipeId) {
  return (dispatch) => {
    dispatch(deleteRecipeRequest(recipeId));
    axios.post(`${URL}/recipes/${recipeId}`)
      .then((recipe) => {
        const { message } = recipe.data;
        dispatch(deleteRecipeSuccessful(message));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(deleteRecipeError(errors[0].message));
      });
  };
}
