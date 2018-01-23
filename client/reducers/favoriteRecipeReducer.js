import { FAVORITE_RECIPE_REQUEST, FAVORITE_RECIPE_SUCCESSFUL, FAVORITE_RECIPE_ERROR } from '../actions/favoriteRecipeAction';

const initialState = [{
  isFavorited: false,
  recipeId: null,
  responseMessage: '',
  errorMessage: ''
}];

const favoriteRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_RECIPE_REQUEST:
      return [{
        recipeId: action.recipeId,
        isFavorited: false,
        responseMessage: '',
        errorMessage: ''
      }];
    case FAVORITE_RECIPE_SUCCESSFUL:
      return [{
        recipeId: action.recipeId,
        isFavorited: true,
        responseMessage: action.responseMessage,
        errorMessage: ''
      }];
    case FAVORITE_RECIPE_ERROR:
      return [{
        recipeId: action.recipeId,
        isFavorited: false,
        responseMessage: '',
        errorMessage: action.errorMessage
      }];
    default:
      return state;
  }
};

export default favoriteRecipeReducer;
