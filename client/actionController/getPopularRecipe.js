import axios from 'axios';
import { getPopularRecipeRequest, getPopularRecipeSuccess, getPopularRecipeError } from '../actions/getPopularRecipeAction';

const URL = '/api/v1';

/**
 * @description action creator for getting all recipes
 *
 * @param {recipe} recipe
 *
 * @return {undefined} Redux action to be dispatch to the store
 */
export default function getPopularRecipe() {
  return (dispatch) => {
    dispatch(getPopularRecipeRequest());
    axios.get(`${URL}/recipes/most-popular-recipe`)
      .then((recipes) => {
        const { recipesData } = recipes.data;
        dispatch(getPopularRecipeSuccess(recipesData));
      })
      .catch((errors) => {
        dispatch(getPopularRecipeError(errors[0].message));
      });
  };
}
