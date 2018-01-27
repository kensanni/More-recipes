import axios from 'axios';
import Helper from '../Helpers/helper';
<<<<<<< HEAD
import { decrementUpvote } from '../actions/upvoteRecipeAction';
=======
>>>>>>> cd5298ec5bca43ab7a5c82c8f754efb162e38264
import { downvoteRecipeRequest, decrementDownvote, incrementDownvote, downvoteRecipeSuccess, downvoteRecipeError } from '../actions/downVoteRecipeAction';

const URL = '/api/v1';

/**
 * @description downvote recipe's action
 * @param {*} recipeId
 * @return {*} Redux action to be dispatch to the store
 */
export default function downvoteRecipe(recipeId) {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    Helper.setAuthorizationToken(token);
    dispatch(downvoteRecipeRequest(recipeId));
    axios.post(`${URL}/recipes/${recipeId}/downvote`)
      .then((recipe) => {
<<<<<<< HEAD
        const { message, upvoteStatus } = recipe.data;
        if (upvoteStatus === 'upvoted') {
          dispatch(decrementUpvote(recipeId));
        }
=======
        const { message } = recipe.data;
>>>>>>> cd5298ec5bca43ab7a5c82c8f754efb162e38264
        if (message === 'Recipe downvote successfully removed') {
          dispatch(decrementDownvote(recipeId));
        } else {
          dispatch(incrementDownvote(recipeId));
        }
        dispatch(downvoteRecipeSuccess(message));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(downvoteRecipeError(errors[0].message));
      });
  };
}
