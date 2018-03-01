import { GET_FAVORITE_RECIPE_REQUEST, GET_FAVORITE_RECIPE_SUCCESSFUL, GET_FAVORITE_RECIPE_ERROR } from '../actions/getFavoriteRecipeAction';

const initialState = [{
  isFetched: false,
  recipeData: [],
  errorMessage: ''
}];

const getFavoriteRecipeReducer = (state = initialState, action) => {
  const {
    isFetched, recipeData, errorMessage
  } = action;
  switch (action.type) {
    case GET_FAVORITE_RECIPE_REQUEST:
      return [{
        isFetched,
        recipeData: {},
        errorMessage: ''
      },
      ...state
      ];
    case GET_FAVORITE_RECIPE_SUCCESSFUL:
      return [{
        isFetched,
        recipeData,
        errorMessage: ''
      },
      ...state
      ];
    case GET_FAVORITE_RECIPE_ERROR:
      return [{
        isFetched,
        recipeData: {},
        errorMessage,
      },
      ...state
      ];
    default:
      return state;
  }
};

export default getFavoriteRecipeReducer;
