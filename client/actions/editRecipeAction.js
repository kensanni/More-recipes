// Action Types
export const EDIT_RECIPE_REQUEST = 'EDIT_RECIPE_REQUEST';
export const EDIT_RECIPE_SUCCESSFUL = 'EDIT_RECIPE_SUCCESSFUL';
export const EDIT_RECIPE_ERROR = 'EDIT_RECIPE_ERROR';
export const EDIT_RECIPE_STATUS = 'EDIT_RECIPE_STATUS';

// Action Type
export const editRecipeRequest = (recipeId, recipeData) => ({
  type: EDIT_RECIPE_REQUEST,
  recipeId,
  recipeData,
  isEdited: false
});

export const editRecipeSuccess = (recipeId, recipeData) => ({
  type: EDIT_RECIPE_SUCCESSFUL,
  isEdited: true,  
  recipeData,
  recipeId,
});

export const editRecipeError = errorMessage => ({
  type: EDIT_RECIPE_ERROR,
  errorMessage,
  isEdited: false
});

export const editRecipeStatus = (status, message) => ({
  type: EDIT_RECIPE_STATUS,
  status,
  message
});
