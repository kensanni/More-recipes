import { DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESSFUL, DELETE_RECIPE_ERROR } from '../actions/deleteRecipeAction';

const initialState = {
  isDeleted: false,
  errorMessage: '',
  recipeId: null,
  responseMessage: ''
};

/**
 * @description delete recipe reducer
 *
 * @param {object} state - default application state
 *
 * @param {object} action - action dispatched
 *
 * @return {Object} - Object containg new state
 */
const deleteRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_RECIPE_REQUEST:
      return {
        ...state,
        isDeleted: action.isDeleted,
        deletedRecipe: action.deletedRecipe,
        errorMessage: '',
        responseMessage: '',
        recipeId: null,
      };
    case DELETE_RECIPE_SUCCESSFUL:
      return {
        ...state,
        isDeleted: action.isDeleted,
        responseMessage: action.responseMessage,
        recipeId: action.recipeId,
        errorMessage: '',
      };
    case DELETE_RECIPE_ERROR:
      return {
        ...state,
        isDeleted: action.isDeleted,
        errorMessage: action.errorMessage,
        responseMessage: '',
        recipeId: null,
      };
    default:
      return state;
  }
};

export default deleteRecipeReducer;
