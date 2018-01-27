import axios from 'axios';
import Helper from '../Helpers/helper';
import { decrementDownvote } from './../actions/downVoteRecipeAction';

import { upvoteRecipeRequest, upvoteRecipeSuccess, upvoteRecipeError, incrementUpvote, decrementUpvote } from '../actions/upvoteRecipeAction';

const URL = '/api/v1';
/**
 * @description action controller for upvoting recipes
 * @param {*} recipeId  recipe to be upvoted
 * @return {object} Redux action to be dispatched to the store
 */
export default function upvoteRecipe(recipeId) {
  const token = window.localStorage.getItem('token');
  return (dispatch) => {
    Helper.setAuthorizationToken(token);
    dispatch(upvoteRecipeRequest(recipeId));
    axios.post(`${URL}/recipes/${recipeId}/upvote`)
      .then((recipe) => {
        const { message, downvoteStatus } = recipe.data;
        if (downvoteStatus === 'downvoted') {
          dispatch(decrementDownvote(recipeId));
        }
        if (message === 'Recipe upvote successfully removed') {
          dispatch(decrementUpvote(recipeId));
        } else {
          dispatch(incrementUpvote(recipeId));
        }
        dispatch(upvoteRecipeSuccess(message));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(upvoteRecipeError(errors[0].message));
      });
  };
}
