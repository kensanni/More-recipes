import { filter } from 'lodash';
import { GET_USER_RECIPE_REQUEST, GET_USER_RECIPE_SUCCESSFUL, GET_USER_RECIPE_ERROR } from '../actions/getUserRecipeAction';
import { DELETE_RECIPE_SUCCESSFUL } from '../actions/deleteRecipeAction';
import { ADD_RECIPE_SUCCESSFUL } from '../actions/addRecipeAction';

const initialState = [{
  isFetched: false,
  recipeData: [],
  errorMessage: ''
}];

/**
 * @description get user recipes reducer
 *
 * @param {object} state - default application state
 *
 * @param {object} action - response from the api
 *
 * @return {Object} - Object containg new state
 */
const getUserRecipeReducer = (state = initialState, action) => {
  const {
    isFetched, recipeData, errorMessage, newRecipeData
  } = action;
  const newRecipe = [];
  if (newRecipeData) {
    state[0].recipeData.map((recipe) => {
      newRecipe.push(recipe);
    });
    newRecipe.push(newRecipeData);
  }
  switch (action.type) {
    case GET_USER_RECIPE_REQUEST:
      return [{
        isFetched,
        recipeData: [],
        errorMessage: ''
      },
      ...state
      ];
    case GET_USER_RECIPE_SUCCESSFUL:
      return [{
        isFetched,
        recipeData,
        errorMessage: ''
      },
      ...state
      ];
    case GET_USER_RECIPE_ERROR:
      return [{
        isFetched,
        recipeData: [],
        errorMessage
      },
      ...state
      ];
    case DELETE_RECIPE_SUCCESSFUL:
      return [{
        isFetched: true,
        recipeData: filter(state[0].recipeData, recipe => recipe.id !== action.recipeId),
        errorMessage: ''
      },
      ...state
      ];
    case ADD_RECIPE_SUCCESSFUL:
      return [{
        isFetched: true,
        recipeData: newRecipe,
        errorMessage: ''
      },
      ...state
      ];
    default:
      return state;
  }
};

export default getUserRecipeReducer;
