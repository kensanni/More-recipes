import instance from '../Helpers/helper';
import { getRecipeRequest, getRecipeSuccess, getRecipeError } from '../actions/getRecipeAction';

/**
 * @description action creator for getting all recipes
 *
 * @param {recipe} recipe
 *
 * @return {undefined} Redux action to be dispatch to the store
 */
export default function getRecipe() {
  return (dispatch) => {
    dispatch(getRecipeRequest());
    instance.get('/recipes')
      .then((recipes) => {
        const { recipesData } = recipes.data;
        dispatch(getRecipeSuccess(recipesData));
      })
      .catch((errors) => {
        dispatch(getRecipeError(errors[0].message));
      });
  };
}
