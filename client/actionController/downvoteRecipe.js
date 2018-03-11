import instance from '../Helpers/helper';
import { decrementUpvote } from '../actions/upvoteRecipeAction';
import { downvoteRecipeRequest, decrementDownvote, incrementDownvote, downvoteRecipeSuccess, downvoteRecipeError } from '../actions/downvoteRecipeAction';

/**
 * @description action creator for downvoting a recipe
 *
 * @param {recipeId} recipeId
 *
 * @return {undefined} Redux action to be dispatch to the store
 */
export default function downvoteRecipe(recipeId) {
  return (dispatch) => {
    dispatch(downvoteRecipeRequest(recipeId));
    instance.post(`/recipes/${recipeId}/downvote`)
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
