import instance from '../Helpers/helper';
import { getRecipeRequest, getRecipeSuccess, getRecipeError } from '../actions/getRecipeAction';

/**
 * @description action creator for getting all recipes
 *
 * @param {number} page
 *
 * @return {undefined} Redux action to be dispatch to the store
 */
export default function getRecipe(page) {
  return (dispatch) => {
    dispatch(getRecipeRequest());
    instance.get(`/recipes?page=${page}`)
      .then((recipes) => {
        const { recipesData, pages } = recipes.data;
        dispatch(getRecipeSuccess(recipesData, pages));
      })
      .catch((errors) => {
        dispatch(getRecipeError(errors[0].message));
      });
  };
}
