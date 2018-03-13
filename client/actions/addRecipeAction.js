// Action Types
export const ADD_RECIPE_REQUEST = 'ADD_RECIPE_REQUEST';
export const ADD_RECIPE_SUCCESSFUL = 'ADD_RECIPE_SUCCESSFUL';
export const ADD_RECIPE_ERROR = 'ADD_RECIPE_ERROR';

// Actions
export const addRecipeRequest = recipeData => ({
  type: ADD_RECIPE_REQUEST,
  recipeData,
  isAdded: false
});

export const addRecipeSuccess = (responseMessage, newRecipeData) => ({
  type: ADD_RECIPE_SUCCESSFUL,
  responseMessage,
  newRecipeData,
  isAdded: true
});

export const addRecipeError = errorMessage => ({
  type: ADD_RECIPE_ERROR,
  errorMessage,
  isAdded: false
});
