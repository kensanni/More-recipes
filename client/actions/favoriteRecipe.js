export const FAVORITE_RECIPE_REQUEST = 'FAVORITE_RECIPE_REQUEST';
export const FAVORITE_RECIPE_SUCCESSFUL = 'FAVORITE_RECIPE_SUCCESSFUL';
export const FAVORITE_RECIPE_ERROR = 'FAVORITE_RECIPE_ERROR ';

export const favoriteRecipeRequest = recipe => ({
  type: FAVORITE_RECIPE_REQUEST,
  recipe,
  isFavorited: false
});
export const favoriteRecipeSuccess = recipe => ({
  type: FAVORITE_RECIPE_SUCCESSFUL,
  recipe,
  isFavorited: true
});
export const favoriteRecipeError = errorMessage => ({
  type: FAVORITE_RECIPE_ERROR,
  errorMessage,
  isFavorited: false
});
