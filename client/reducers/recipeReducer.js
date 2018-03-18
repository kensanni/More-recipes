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
    case INCREMENT_UPVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeData: state.recipeData.map((recipe) => {
          if (recipe.id === action.recipeId) {
            return {
              ...recipe,
              upvotes: recipe.upvotes + 1
            };
          }
          return recipe;
        })
      };
    case DECREMENT_UPVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        recipeData: state.recipeData.map((recipe) => {
          if (recipe.id === action.recipeId) {
            return {
              ...recipe,
              upvotes: recipe.upvotes - 1
            };
          }
          return recipe;
        })
      };
    case INCREMENT_DOWNVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        recipeData: state.recipeData.map((recipe) => {
          if (recipe.id === action.recipeId) {
            return {
              ...recipe,
              downvotes: recipe.downvotes + 1
            };
          }
          return recipe;
        })
      };
    case DECREMENT_DOWNVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        recipeData: state.recipeData.map((recipe) => {
          if (recipe.id === action.recipeId) {
            return {
              ...recipe,
              downvotes: recipe.downvotes - 1
            };
          }
          return recipe;
        })
      };
    case FAVORITE_RECIPE_SUCCESSFUL:
      return {
        ...state,
        recipeData: state.recipeData.map((recipe) => {
          if (recipe.id === action.recipeId) {
            return {
              ...recipe,
              favorites: (
                action.favoriteType === 1
                  ? recipe.favorites + 1
                  : recipe.favorites - 1
              )
            };
          }
          return recipe;
        })
      };
    default:
      return state;
  }
};

export default recipeReducer;
