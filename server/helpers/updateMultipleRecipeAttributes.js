import updateRecipeAttributes from '../helpers/updateRecipeAttributes';

/**
 * @description count the length of favorite upvotes and downvotes and append it to all recipes
 *
 * @param {object} sequelizeRecipe
 *
 * @returns {object} object
 */
const updateMultipleRecipeAttributes = async (sequelizeRecipe) => {
  const arrayOfPromises = sequelizeRecipe.map(recipe => updateRecipeAttributes(recipe));
  const results = await Promise.all(arrayOfPromises);
  return results;
};


export default updateMultipleRecipeAttributes;
