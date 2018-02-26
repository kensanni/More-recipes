import { GET_POPULAR_RECIPE_REQUEST, GET_POPULAR_RECIPE_SUCCESSFUL, GET_POPULAR_RECIPE_ERROR } from '../actions/getPopularRecipeAction';
import { INCREMENT_UPVOTE, DECREMENT_UPVOTE } from '../actions/upvoteRecipeAction';
import { INCREMENT_DOWNVOTE, DECREMENT_DOWNVOTE } from '../actions/downvoteRecipeAction';
import { FAVORITE_RECIPE_SUCCESSFUL } from '../actions/favoriteRecipeAction';


const initialState = [{
  isFetched: false,
  popularRecipesData: [],
  errorMessage: ''
}];
/**
 * @description recipe reducer
 * @param {object} state - default application state
 * @param {object} action - response from the api
 * @return {Object} - Object containg new state
 */
const getPopularRecipeReducer = (state = initialState, action) => {
  const { isFetched, popularRecipesData, errorMessage } = action;
  switch (action.type) {
    case GET_POPULAR_RECIPE_REQUEST:
      return [{
        isFetched,
        popularRecipesData: [],
        errorMessage: ''
      },
      ...state
      ];
    case GET_POPULAR_RECIPE_SUCCESSFUL:
      return [{
        isFetched,
        popularRecipesData,
        errorMessage: ''
      },
      ...state
      ];
    case GET_POPULAR_RECIPE_ERROR:
      return [{
        isFetched,
        popularRecipesData: [],
        errorMessage
      },
      ...state
      ];
    case INCREMENT_UPVOTE:
      return [{
        isFetched: state[0].isFetched,
        errorMessage: state[0].errorMessage,
        popularRecipesData: state[0].popularRecipesData.map((recipe) => {
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
        popularRecipesData: state[0].popularRecipesData.map((recipe) => {
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
        popularRecipesData: state[0].popularRecipesData.map((recipe) => {
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
        popularRecipesData: state[0].popularRecipesData.map((recipe) => {
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
    case FAVORITE_RECIPE_SUCCESSFUL:
      return [{
        isFetched: state[0].isFetched,
        errorMessage: state[0].errorMessage,
        popularRecipesData: state[0].popularRecipesData.map((recipe) => {
          if (recipe.id === action.recipeId) {
            return {
              ...recipe,
              favorites: recipe.favorites
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

export default getPopularRecipeReducer;
