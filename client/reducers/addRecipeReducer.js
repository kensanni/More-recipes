import { ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESSFUL, ADD_RECIPE_ERROR } from '../actions/addRecipeAction';

const initialState = {
  isAdded: false,
  recipeData: [],
  responseMessage: '',
  errorMessage: ''
};

/**
 * @description add recipe reducer
 *
 * @param {object} state - default application state
 *
 * @param {object} action - action dispatched
 *
 * @return {Object} - Object containg new state
 */

const addRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPE_REQUEST:
      return {
        ...state,
        isAdded: action.isAdded,
        recipeData: [],
        responseMessage: '',
        errorMessage: ''
      };
    case ADD_RECIPE_SUCCESSFUL:
      return {
        ...state,
        isAdded: action.isAdded,
        recipeData: [],
        responseMessage: action.responseMessage,
        errorMessage: ''
      };
    case ADD_RECIPE_ERROR:
      return {
        ...state,
        isAdded: action.isAdded,
        recipeData: [],
        responseMessage: '',
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default addRecipeReducer;
