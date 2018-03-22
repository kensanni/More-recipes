import { EDIT_RECIPE_REQUEST, EDIT_RECIPE_SUCCESSFUL, EDIT_RECIPE_ERROR, EDIT_RECIPE_STATUS } from '../actions/editRecipeAction';

const initialState = {
  isEdited: false,
  recipeData: {},
  editRecipeStatus: {
    status: null,
    message: null
  },
  errorMessage: ''
};

/**
 * @description edit recipes reducer
 *
 * @param {object} state - default application state
 * @param {object} action - action dispatched
 *
 * @return {Object} - Object containg new state
 */
const editRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_RECIPE_STATUS:
      return {
        ...state,
        editRecipeStatus: {
          status: action.status,
          message: action.message,
        },
      };
    case EDIT_RECIPE_REQUEST:
      return {
        ...initialState,
        isEdited: action.isEdited,
      };
    case EDIT_RECIPE_SUCCESSFUL:
      return {
        ...state,
        isEdited: action.isEdited,
        recipeData: action.recipeData,
        errorMessage: ''
      };
    case EDIT_RECIPE_ERROR:
      return {
        ...state,
        isEdited: action.isEdited,
        responseMessage: '',
        recipeData: {},
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};

export default editRecipeReducer;
