export const GET_RECIPE_REQUEST = 'GET_RECIPE_REQUEST';
export const GET_RECIPE_SUCCESSFUL = 'GET_RECIPE_SUCCESSFUL';
export const GET_RECIPE_ERROR = 'GET_RECIPE_ERROR';

export const getRecipeRequest = () => ({
  type: GET_RECIPE_REQUEST,
  isFetched: false
});
export const getRecipeSuccess = recipeData => ({
  type: GET_RECIPE_SUCCESSFUL,
  isFetched: true,
  recipeData
});
export const getRecipeError = errorMessage => ({
  type: GET_RECIPE_ERROR,
  isFetched: false,
  errorMessage
});
