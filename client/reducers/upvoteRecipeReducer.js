import { UPVOTE_RECIPE_REQUEST, UPVOTE_RECIPE_SUCCESSFUL, UPVOTE_RECIPE_ERROR } from '../actions/upvoteRecipeAction';

const initialState = {
  isUpvoted: false,
  recipeId: null,
  responseMessage: '',
  errorMessage: ''
};
/**
 * @description upvote recipe reducer
 *
 * @param {object} state - default application state
 * @param {object} action - response from the api
 *
 * @return {Object} - Object containg new state
 */
const upvoteRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPVOTE_RECIPE_REQUEST:
      return {
        ...state,
        recipeId: action.recipeId,
        isUpvoted: action.isUpvoted,
        responseMessage: '',
        errorMessage: '',
      };
    case UPVOTE_RECIPE_SUCCESSFUL:
      return {
        ...state,
        recipeId: action.recipeId,
        isUpvoted: action.isUpvoted,
        responseMessage: action.responseMessage,
        errorMessage: '',
      };
    case UPVOTE_RECIPE_ERROR:
      return {
        ...state,
        recipeId: null,
        isUpvoted: action.isUpvoted,
        responseMessage: '',
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default upvoteRecipeReducer;
