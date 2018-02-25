import { GET_RECIPE_REQUEST, GET_RECIPE_SUCCESSFUL, GET_RECIPE_ERROR } from '../actions/getRecipeAction';
import { INCREMENT_UPVOTE, DECREMENT_UPVOTE } from '../actions/upvoteRecipeAction';
import { INCREMENT_DOWNVOTE, DECREMENT_DOWNVOTE } from '../actions/downvoteRecipeAction';

const initialState = [{
  isFetched: false,
  recipeData: {},
  errorMessage: ''
}];
/**
 * @description recipe reducer
 * @param {object} state - default application state
 * @param {object} action - response from the api
 * @return {Object} - Object containg new state
 */
const recipeReducer = (state = initialState, action) => {
  const { isFetched, recipeData, errorMessage } = action;
  switch (action.type) {
    case GET_RECIPE_REQUEST:
      return [{
        isFetched,
        recipeData: {},
        errorMessage: ''
      },
      ...state
      ];
    case GET_RECIPE_SUCCESSFUL:
      return [{
        isFetched,
        recipeData,
        errorMessage: ''
      },
      ...state
      ];
    case GET_RECIPE_ERROR:
      return [{
        isFetched,
        recipeData: {},
        errorMessage
      },
      ...state
      ];
    case INCREMENT_UPVOTE:
      return [{
        isFetched: state[0].isFetched,
        errorMessage: state[0].errorMessage,
        recipeData: state[0].recipeData.map((recipe) => {
          if (recipe.id === action.recipeId) {
            return {
              ...recipe,
              upvotes: recipe.upvotes + 1
            };
          }
          return recipe;
        })
      },
      ...state
      ];
    case DECREMENT_UPVOTE:
      return [{
        isFetched: state[0].isFetched,
        errorMessage: state[0].errorMessage,
        recipeData: state[0].recipeData.map((recipe) => {
          if (recipe.id === action.recipeId) {
            return {
              ...recipe,
              upvotes: recipe.upvotes - 1
            };
          }
          return recipe;
        })
      },
      ...state
      ];
    case INCREMENT_DOWNVOTE:
      return [{
        isFetched: state[0].isFetched,
        errorMessage: state[0].errorMessage,
        recipeData: state[0].recipeData.map((recipe) => {
          if (recipe.id === action.recipeId) {
            return {
              ...recipe,
              downvotes: recipe.downvotes + 1
            };
          }
          return recipe;
        })
      },
      ...state
      ];
    case DECREMENT_DOWNVOTE:
      return [{
        isFetched: state[0].isFetched,
        errorMessage: state[0].errorMessage,
        recipeData: state[0].recipeData.map((recipe) => {
          if (recipe.id === action.recipeId) {
            return {
              ...recipe,
              downvotes: recipe.downvotes - 1
            };
          }
          return recipe;
        })
      },
      ...state
      ];
    default:
      return state;
  }
};

export default recipeReducer;
