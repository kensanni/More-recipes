import { GET_USER_FAVORITE_RECIPE_REQUEST, GET_USER_FAVORITE_RECIPE_SUCCESSFUL, GET_USER_FAVORITE_RECIPE_ERROR } from '../actions/getUserFavoriteRecipeAction';

const initialState = [{
  isFetched: false,
  recipeData: [],
  errorMessage: ''
}];

/**
 * @description get user favorite recipes reducer
 * @param {object} state - default application state
 * @param {object} action - response from the api
 * @return {object} - Object containing new state
 */
const getUserFavoriteRecipeReducer = (state = initialState, action) => {
  const { isFetched, recipeData, errorMessage } = action;
  switch (action.type) {
    case GET_USER_FAVORITE_RECIPE_REQUEST:
      return [{
        isFetched,
        recipeData: {},
        errorMessage: ''
      },
      ...state
      ];
    case GET_USER_FAVORITE_RECIPE_SUCCESSFUL:
      return [{
        isFetched,
        recipeData,
        errorMessage: ''
      },
      ...state
      ];
    case GET_USER_FAVORITE_RECIPE_ERROR:
      return [{
        isFetched,
        recipeData: {},
        errorMessage: ''
      },
      ...state
      ];
    default:
      return state;
  }
};

export default getUserFavoriteRecipeReducer;
