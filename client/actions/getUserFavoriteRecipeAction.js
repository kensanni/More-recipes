export const GET_USER_FAVORITE_RECIPE_REQUEST = 'GET_USER_FAVORITE_RECIPE_REQUEST';
export const GET_USER_FAVORITE_RECIPE_SUCCESSFUL = 'GET_USER_FAVORITE_RECIPE_SUCCESSFUL';
export const GET_USER_FAVORITE_RECIPE_ERROR = 'GET_USER_FAVORITE_RECIPE_ERROR';

export const getUserFavoriteRecipeRequest = () => ({
  type: GET_USER_FAVORITE_RECIPE_REQUEST,
  isFetched: false
});

export const getUserFavoriteRecipeSuccessful = recipeData => ({
  type: GET_USER_FAVORITE_RECIPE_SUCCESSFUL,
  isFetched: true,
  recipeData
});

export const getUserFavoriteRecipeError = errorMessage => ({
  type: GET_USER_FAVORITE_RECIPE_ERROR,
  isFetched: false,
  errorMessage
});
