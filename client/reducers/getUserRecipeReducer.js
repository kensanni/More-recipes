import { filter } from 'lodash';
import { GET_USER_RECIPE_REQUEST, GET_USER_RECIPE_SUCCESSFUL, GET_USER_RECIPE_ERROR } from '../actions/getUserRecipeAction';
import { DELETE_RECIPE_SUCCESSFUL } from '../actions/deleteRecipeAction';
import { ADD_RECIPE_SUCCESSFUL } from '../actions/addRecipeAction';

const initialState = {
  isFetched: false,
  recipeData: [],
  errorMessage: '',
  page: 0,
  isFetching: true,
};

/**
 * @description get user recipes reducer
 *
 * @param {object} state - default application state
 *
 * @param {object} action - action dispatched
 *
 * @return {Object} - Object containg new state
 */
const getUserRecipeReducer = (state = initialState, action) => {
  const {
    isFetched, recipeData, errorMessage, newRecipeData, page, count, isFetching
  } = action;

  const newRecipe = [];
  if (newRecipeData) {
    state.recipeData.map((recipe) => {
      newRecipe.push(recipe);
    });
    newRecipe.push(newRecipeData);
  }

  switch (action.type) {
    case GET_USER_RECIPE_REQUEST:
      return {
        ...state,
        isFetched,
        isFetching,
        recipeData: [],
        errorMessage: ''
      };
    case GET_USER_RECIPE_SUCCESSFUL:
      return {
        ...state,
        isFetched,
        isFetching,
        recipeData,
        errorMessage: '',
        page,
        count
      };
    case GET_USER_RECIPE_ERROR:
      return {
        ...state,
        isFetched,
        recipeData: [],
        errorMessage,
        isFetching
      };
    case DELETE_RECIPE_SUCCESSFUL:
      return {
        ...state,
        isFetched: true,
        recipeData: filter(state.recipeData, recipe => recipe.id !== action.recipeId),
        errorMessage: ''
      };
    case ADD_RECIPE_SUCCESSFUL:
      return {
        ...state,
        isFetched: true,
        recipeData: newRecipe,
        errorMessage: ''
      };
    default:
      return state;
  }
};

export default getUserRecipeReducer;
