import { DOWNVOTE_RECIPE_REQUEST, DOWNVOTE_RECIPE_SUCCESSFUL, DOWNVOTE_RECIPE_ERROR } from '../actions/downvoteRecipeAction';

const initialState = {
  isDownvoted: false,
  recipeId: null,
  responseMessage: '',
  errorMessage: ''
};

/**
 * @description downvote recipe reducer
 *
 * @param {object} state - default application state
 * @param {object} action - action dispatched
 *
 * @return {Object} - Object containg new state
 */
const downvoteRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOWNVOTE_RECIPE_REQUEST:
      return {
        ...state,
        recipeId: action.recipeId,
        isDownvoted: action.isDownvoted,
        responseMessage: '',
        errorMessage: '',
      };
    case DOWNVOTE_RECIPE_SUCCESSFUL:
      return {
        recipeId: action.recipeId,
        isDownvoted: action.isDownvoted,
        responseMessage: action.responseMessage,
        errorMessage: '',
      };
    case DOWNVOTE_RECIPE_ERROR:
      return {
        ...state,
        recipeId: action.recipeId,
        isDownvoted: action.isDownvoted,
        responseMessage: '',
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default downvoteRecipeReducer;
