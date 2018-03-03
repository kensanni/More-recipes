import instance from '../Helpers/helper';
import { getFavoriteRecipeRequest, getFavoriteRecipeSuccessful, getFavoriteRecipeError } from '../actions/getFavoriteRecipeAction';

/**
 * @description action creator for adding recipe
 *
 * @param {userId} userId
 *
 * @returns {undefined} redux action to be dispatch to the store
 */
export default function getFavoriteRecipe(userId) {
  console.log('favoriteRecipe', userId);  
  return (dispatch) => {
    dispatch(getFavoriteRecipeRequest());
    instance.get(`/users/${userId}/favorites`)
      .then((favoriteRecipe) => {
        const { data } = favoriteRecipe;
        console.log('favoriteRecipe', data);
        dispatch(getFavoriteRecipeSuccessful(data));
      })
      .catch((errors) => {
        dispatch(getFavoriteRecipeError(errors[0].message));
      });
  };
}
