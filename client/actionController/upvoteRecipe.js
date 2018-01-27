import axios from 'axios';
import Helper from '../Helpers/helper';
<<<<<<< HEAD
import { decrementDownvote } from './../actions/downVoteRecipeAction';
=======
>>>>>>> cd5298ec5bca43ab7a5c82c8f754efb162e38264
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
<<<<<<< HEAD
        const { message, downvoteStatus } = recipe.data;
        if (downvoteStatus === 'downvoted') {
          dispatch(decrementDownvote(recipeId));
        }
=======
        const { message } = recipe.data;
>>>>>>> cd5298ec5bca43ab7a5c82c8f754efb162e38264
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
