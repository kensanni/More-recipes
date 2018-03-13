// Action Types
export const GET_USER_RECIPE_REQUEST = 'GET_USER_RECIPE_REQUEST';
export const GET_USER_RECIPE_SUCCESSFUL = 'GET_USER_RECIPE_SUCCESSFUL';
export const GET_USER_RECIPE_ERROR = 'GET_USER_RECIPE_ERROR';

// Action Type
export const getUserRecipeRequest = () => ({
  type: GET_USER_RECIPE_REQUEST,
  isFetched: false,
  isFetching: true,
});

export const getUserRecipeSuccessful = (recipeData, page, count) => ({
  type: GET_USER_RECIPE_SUCCESSFUL,
  isFetched: true,
  isFetching: false,
  recipeData,
  page,
  count
});

export const getUserRecipeError = errorMessage => ({
  type: GET_USER_RECIPE_ERROR,
  isFetched: false,
  isFetching: false,
  errorMessage
});
