import axios from 'axios';
import Helper from '../Helpers/helper';
import { decrementUpvote } from '../actions/upvoteRecipeAction';

import { downvoteRecipeRequest, decrementDownvote, incrementDownvote, downvoteRecipeSuccess, downvoteRecipeError } from '../actions/downVoteRecipeAction';

const URL = '/api/v1';

/**
 * @description action creator for downvoting a recipe
 *
 * @param {recipeId} recipeId
 *
 * @return {undefined} Redux action to be dispatch to the store
 */
export default function downvoteRecipe(recipeId) {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    Helper.setAuthorizationToken(token);
    dispatch(downvoteRecipeRequest(recipeId));
    axios.post(`${URL}/recipes/${recipeId}/downvote`)
      .then((recipe) => {
        const { message, upvoteStatus } = recipe.data;
        if (upvoteStatus === 'upvoted') {
          dispatch(decrementUpvote(recipeId));
        }
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
