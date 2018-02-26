export const GET_POPULAR_RECIPE_REQUEST = 'GET_POPULAR_RECIPE_REQUEST';
export const GET_POPULAR_RECIPE_SUCCESSFUL = 'GET_POPULAR_RECIPE_SUCCESSFUL';
export const GET_POPULAR_RECIPE_ERROR = 'GET_POPULAR_RECIPE_ERROR';

export const getPopularRecipeRequest = () => ({
  type: GET_POPULAR_RECIPE_REQUEST,
  isFetched: false
});
export const getPopularRecipeSuccess = popularRecipesData => ({
  type: GET_POPULAR_RECIPE_SUCCESSFUL,
  isFetched: true,
  popularRecipesData
});
export const getPopularRecipeError = errorMessage => ({
  type: GET_POPULAR_RECIPE_ERROR,
  isFetched: false,
  errorMessage
});
