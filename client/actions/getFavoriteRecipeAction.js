export const GET_FAVORITE_RECIPE_REQUEST = 'GET_FAVORITE_RECIPE_REQUEST';
export const GET_FAVORITE_RECIPE_SUCCESSFUL = 'GET_FAVORITE_RECIPE_SUCCESSFUL';
export const GET_FAVORITE_RECIPE_ERROR = 'GET_FAVORITE_RECIPE_ERROR';

export const getFavoriteRecipeRequest = () => ({
  type: GET_FAVORITE_RECIPE_REQUEST,
  isFetched: false
});
export const getFavoriteRecipeSuccessful = (recipeData, page) => ({
  type: GET_FAVORITE_RECIPE_SUCCESSFUL,
  isFetched: true,
  recipeData,
  page
});
export const getFavoriteRecipeError = errorMessage => ({
  type: GET_FAVORITE_RECIPE_ERROR,
  errorMessage,
  isFetched: false
});
