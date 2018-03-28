import { FAVORITE_RECIPE_REQUEST, FAVORITE_RECIPE_SUCCESSFUL, FAVORITE_RECIPE_ERROR } from '../actions/favoriteRecipeAction';

const initialState = {
  isFavorited: false,
  recipeId: null,
  responseMessage: '',
  errorMessage: ''
};
/**
 * @description favorite recipes reducer
 *
 * @param {object} state - default application state
 * @param {object} action - action dispatched
 *
 * @return {Object} - Object containg new state
 */
const favoriteRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_RECIPE_REQUEST:
      return {
        ...state,
        recipeId: action.recipeId,
        isFavorited: false,
        responseMessage: '',
        errorMessage: ''
      };
    case FAVORITE_RECIPE_SUCCESSFUL:
      return {
        ...state,
        recipeId: action.recipeId,
        favoriteType: action.favoriteType,
        isFavorited: true,
        responseMessage: action.responseMessage,
        errorMessage: ''
      };
    case FAVORITE_RECIPE_ERROR:
      return {
        ...state,
        recipeId: null,
        isFavorited: false,
        responseMessage: '',
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};

export default favoriteRecipeReducer;
