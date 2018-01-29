export const ADD_RECIPE_REQUEST = 'ADD_RECIPE_REQUEST';
export const ADD_RECIPE_SUCCESSFUL = 'ADD_RECIPE_SUCCESSFUL';
export const ADD_RECIPE_ERROR = 'ADD_RECIPE_ERROR';

export const addRecipeRequest = recipeData => ({
  type: ADD_RECIPE_REQUEST,
  recipeData,
  isAdded: false
});
export const addRecipeSuccess = responseMessage => ({
  type: ADD_RECIPE_SUCCESSFUL,
  responseMessage,
  isAdded: true
});
export const addRecipeError = errorMessage => ({
  type: ADD_RECIPE_ERROR,
  errorMessage,
  isAdded: false
});
