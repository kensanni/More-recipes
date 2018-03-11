import { GET_FAVORITE_RECIPE_REQUEST, GET_FAVORITE_RECIPE_SUCCESSFUL, GET_FAVORITE_RECIPE_ERROR } from '../actions/getFavoriteRecipeAction';

const initialState = {
  isFetched: false,
  recipeData: [],
  errorMessage: '',
  page: 0
};

const getFavoriteRecipeReducer = (state = initialState, action) => {
  const {
    isFetched, recipeData, errorMessage, page, count
  } = action;
  switch (action.type) {
    case GET_FAVORITE_RECIPE_REQUEST:
      return {
        ...state,
        isFetched,
        recipeData: [],
        errorMessage: ''
      };
    case GET_FAVORITE_RECIPE_SUCCESSFUL:
      return {
        ...state,
        isFetched,
        recipeData,
        errorMessage: '',
        page,
        count
      };
    case GET_FAVORITE_RECIPE_ERROR:
      return {
        ...state,
        isFetched,
        recipeData: [],
        errorMessage,
      };
    default:
      return state;
  }
};

export default getFavoriteRecipeReducer;
