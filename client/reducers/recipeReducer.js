import { GET_RECIPE_REQUEST, GET_RECIPE_SUCCESSFUL, GET_RECIPE_ERROR } from '../actions/getRecipeAction';
import { INCREMENT_UPVOTE, DECREMENT_UPVOTE } from '../actions/upvoteRecipeAction';
import { INCREMENT_DOWNVOTE, DECREMENT_DOWNVOTE } from '../actions/downvoteRecipeAction';
import { FAVORITE_RECIPE_SUCCESSFUL } from '../actions/favoriteRecipeAction';

const initialState = {
  isFetched: false,
  recipeData: [],
  errorMessage: '',
  page: 0
};
/**
 * @description get all recipes reducer
 *
 * @param {object} state - default application state
 * @param {object} action - response from the api
 *
 * @return {Object} - Object containg new state
 */
const recipeReducer = (state = initialState, action) => {
  const {
    isFetched, recipeData, errorMessage, page
  } = action;
  switch (action.type) {
    case GET_RECIPE_REQUEST:
      return {
        ...state,
        isFetched,
        recipeData: [],
        errorMessage: ''
      };
    case GET_RECIPE_SUCCESSFUL:
      return {
        ...state,
        isFetched,
        recipeData,
        errorMessage: '',
        page,
      };
    case GET_RECIPE_ERROR:
      return {
        ...state,
        isFetched,
        recipeData: [],
        errorMessage
      };
    default:
      return state;
  }
};

export default recipeReducer;
