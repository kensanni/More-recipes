import { GET_RECIPE_REQUEST, GET_RECIPE_SUCCESSFUL, GET_RECIPE_ERROR } from '../actions/getRecipeAction';
<<<<<<< HEAD
import { INCREMENT_UPVOTE, DECREMENT_UPVOTE } from '../actions/upvoteRecipeAction';
import { INCREMENT_DOWNVOTE, DECREMENT_DOWNVOTE } from '../actions/downVoteRecipeAction';
=======
import { INCREMENT_UPVOTE, DECREMENT_UPVOTE, INCREMENT_DOWNVOTE, DECREMENT_DOWNVOTE } from '../actions/upvoteRecipeAction';
>>>>>>> cd5298ec5bca43ab7a5c82c8f754efb162e38264

const initialState = [{
  isFetched: false,
  recipeData: {},
  errorMessage: ''
}];
/**
 * @description sign reducer
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
        isFetched: false,
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
          if (recipe.id !== action.recipeId) {
            return recipe;
          }

          return {
            ...recipe,
            upvotes: recipe.upvotes + 1
          };
        })
      },
      ...state
      ];
    case DECREMENT_UPVOTE:
      return [{
        isFetched: state[0].isFetched,
        errorMessage: state[0].errorMessage,
        recipeData: state[0].recipeData.map((recipe) => {
          if (recipe.id !== action.recipeId) {
            return recipe;
          }

          return {
            ...recipe,
            upvotes: recipe.upvotes - 1
          };
        })
      },
      ...state
      ];
    case INCREMENT_DOWNVOTE:
      return [{
        isFetched: state[0].isFetched,
        errorMessage: state[0].errorMessage,
        recipeData: state[0].recipeData.map((recipe) => {
          if (recipe.id !== action.recipeId) {
            return recipe;
          }

          return {
            ...recipe,
            downvotes: recipe.downvotes + 1
          };
        })
      },
      ...state
      ];
    case DECREMENT_DOWNVOTE:
      return [{
        isFetched: state[0].isFetched,
        errorMessage: state[0].errorMessage,
        recipeData: state[0].recipeData.map((recipe) => {
          if (recipe.id !== action.recipeId) {
            return recipe;
          }

          return {
            ...recipe,
            downvotes: recipe.downvotes - 1
          };
        })
      },
      ...state
      ];
    default:
      return state;
  }
};

export default recipeReducer;
