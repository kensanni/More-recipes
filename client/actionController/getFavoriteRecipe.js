import instance from '../Helpers/helper';
import { getFavoriteRecipeRequest, getFavoriteRecipeSuccessful, getFavoriteRecipeError } from '../actions/getFavoriteRecipeAction';

/**
 * @description action creator for adding recipe
 *
 * @param {userId} userId
 *
 * @param {page} page
 *
 * @returns {undefined} redux action to be dispatch to the store
 */
export default function getFavoriteRecipe(userId, page) {
  return (dispatch) => {
    dispatch(getFavoriteRecipeRequest());
    instance.get(`/users/${userId}/favorites?page=${page}`)
      .then((favoriteRecipe) => {
        const { data } = favoriteRecipe;
        const { pages } = favoriteRecipe.data;
        dispatch(getFavoriteRecipeSuccessful(data, pages));
      })
      .catch((errors) => {
        dispatch(getFavoriteRecipeError(errors[0].message));
      });
  };
}
