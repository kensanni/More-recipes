// Action Types
export const GET_RECIPE_DETAILS_REQUEST = 'GET_RECIPE_DETAILS_REQUEST';
export const GET_RECIPE_DETAILS_SUCCESSFUL = 'GET_RECIPE_DETAILS_SUCCESSFUL';
export const GET_RECIPE_DETAILS_ERROR = 'GET_RECIPE_DETAILS_ERROR';

// Action Type
export const getRecipeDetailsRequest = recipeId => ({
  type: GET_RECIPE_DETAILS_REQUEST,
  recipeId,
  isFetched: false
});

export const getRecipeDetailsSuccessful = recipeDetails => ({
  type: GET_RECIPE_DETAILS_SUCCESSFUL,
  recipeDetails,
  isFetched: true
});

export const getRecipeDetailsError = errorMessage => ({
  type: GET_RECIPE_DETAILS_ERROR,
  errorMessage,
  isFetched: false
});
