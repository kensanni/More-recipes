import axios from 'axios';
import { downvoteRecipeRequest, downvoteRecipeSuccess, downvoteRecipeError } from '../actions/downVoteRecipeAction';

const URL = '/api/v1';

/**
 * @description downvote recipe's action
 * @param {*} recipe
 * @return {*} Redux action to be dispatch to the store
 */
export default function downvoteRecipe(recipe) {
  return (dispatch) => {
    dispatch(downvoteRecipeRequest(recipe));
    axios.post(`${URL}/recipes/:recipeId/favorites`, recipe);
  };
}
