import instance from '../Helpers/helper';
import { getFavoriteRecipeRequest, getFavoriteRecipeSuccessful, getFavoriteRecipeError } from '../actions/getFavoriteRecipeAction';

/**
 * @description action creator for adding recipe
 *
 * @param {number} userId
 *
 * @param {number} page
 *
 * @returns {void} action to be dispatch to the store
 */
export default function getFavoriteRecipe(userId, page) {
  return (dispatch) => {
    dispatch(getFavoriteRecipeRequest());
    instance.get(`/users/${userId}/favorites?page=${page}`)
      .then((favoriteRecipe) => {
        const { data } = favoriteRecipe;
        const { pages, count } = favoriteRecipe.data;
        dispatch(getFavoriteRecipeSuccessful(data, pages, count));
      })
      .catch((errors) => {
        dispatch(getFavoriteRecipeError(errors[0].message));
      });
  };
}
