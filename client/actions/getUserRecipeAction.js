export const GET_USER_RECIPE_REQUEST = 'GET_USER_RECIPE_REQUEST';
export const GET_USER_RECIPE_SUCCESSFUL = 'GET_USER_RECIPE_SUCCESSFUL';
export const GET_USER_RECIPE_ERROR = 'GET_USER_RECIPE_ERROR';

export const getUserRecipeRequest = () => ({
  type: GET_USER_RECIPE_REQUEST,
  isFetched: false
});
export const getUserRecipeSuccessful = recipeData => ({
  type: GET_USER_RECIPE_SUCCESSFUL,
  isFetched: true,
  recipeData
});
export const getUserRecipeError = errorMessage => ({
  type: GET_USER_RECIPE_ERROR,
  isFetched: false,
  errorMessage
});
