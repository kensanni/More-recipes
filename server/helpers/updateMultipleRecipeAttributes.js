import updateRecipeAttributes from '../helpers/updateRecipeAttributes';


const updateMultipleRecipeAttributes = async (sequelizeRecipe) => {
  const arrayOfPromises = sequelizeRecipe.map(recipe => updateRecipeAttributes(recipe));
  const results = await Promise.all(arrayOfPromises);
  return results;
};


export default updateMultipleRecipeAttributes;
