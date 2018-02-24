import { GET_RECIPE_REQUEST, GET_RECIPE_SUCCESSFUL, GET_RECIPE_ERROR } from '../actions/getRecipeAction';

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
    default:
      return state;
  }
};

export default recipeReducer;
