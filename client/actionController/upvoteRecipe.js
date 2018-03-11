import instance from '../Helpers/helper';
import { decrementDownvote } from './../actions/downvoteRecipeAction';

import { upvoteRecipeRequest, upvoteRecipeSuccess, upvoteRecipeError, incrementUpvote, decrementUpvote } from '../actions/upvoteRecipeAction';

/**
 * @description action controller for upvoting recipes
 *
 * @param {number} recipeId  recipe to be upvoted
 *
 * @return {void} action to be dispatched to the store
 */
export default function upvoteRecipe(recipeId) {
  return (dispatch) => {
    dispatch(upvoteRecipeRequest(recipeId));
    instance.post(`/recipes/${recipeId}/upvote`)
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
