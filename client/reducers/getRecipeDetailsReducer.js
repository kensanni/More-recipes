import { GET_RECIPE_DETAILS_REQUEST, GET_RECIPE_DETAILS_SUCCESSFUL, GET_RECIPE_DETAILS_ERROR } from '../actions/getRecipeDetailsAction';
import { INCREMENT_UPVOTE, DECREMENT_UPVOTE } from '../actions/upvoteRecipeAction';
import { INCREMENT_DOWNVOTE, DECREMENT_DOWNVOTE } from '../actions/downvoteRecipeAction';
import { FAVORITE_RECIPE_SUCCESSFUL } from '../actions/favoriteRecipeAction';
import { ADD_REVIEWS_SUCCESSFUL } from '../actions/addReviewsAction';

const initialState = {
  isFetched: false,
  recipeDetails: {},
  recipeDetailStatus: null,
  errorMessage: ''
};

/**
 * @description get recipe details reducer
 *
 * @param {object} state - default application state
 *
 * @param {object} action - action dispatched
 *
 * @return {Object} - Object containg new state
 */
const getRecipeDetailsReducer = (state = initialState, action) => {
  const {
    isFetched, recipeDetails, errorMessage, review, username
  } = action;

  const reviewied = { review, username };

  switch (action.type) {
    case GET_RECIPE_DETAILS_REQUEST:
      return {
        ...state,
        isFetched,
        recipeDetails: {},
        recipeDetailStatus: 'fetching',
        errorMessage: '',

      };
    case GET_RECIPE_DETAILS_SUCCESSFUL:
      return {
        ...state,
        isFetched,
        recipeDetails,
        recipeDetailStatus: 'fetched',
        errorMessage: ''
      };
    case GET_RECIPE_DETAILS_ERROR:
      return {
        ...state,
        isFetched,
        recipeDetails: {},
        recipeDetailStatus: 'error',
        errorMessage
      };
    case INCREMENT_UPVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeDetails: {
          ...state.recipeDetails,
          upvotes: state.recipeDetails.upvotes + 1
        }
      };
    case DECREMENT_UPVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeDetails: {
          ...state.recipeDetails,
          upvotes: state.recipeDetails.upvotes - 1
        }
      };
    case INCREMENT_DOWNVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeDetails: {
          ...state.recipeDetails,
          downvotes: state.recipeDetails.downvotes + 1
        }
      };
    case DECREMENT_DOWNVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeDetails: {
          ...state.recipeDetails,
          downvotes: state.recipeDetails.downvotes - 1
        }
      };
    case FAVORITE_RECIPE_SUCCESSFUL:
      return {
        ...state,
        recipeDetails: {
          ...state.recipeDetails,
          favorites: (
            action.favoriteType === 1
              ? state.recipeDetails.favorites + 1
              : state.recipeDetails.favorites - 1
          )
        }
      };
    case ADD_REVIEWS_SUCCESSFUL:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeDetails: {
          ...state.recipeDetails,
          Reviews: [...state.recipeDetails.Reviews, reviewied]
        }
      };
    default:
      return state;
  }
};

export default getRecipeDetailsReducer;
