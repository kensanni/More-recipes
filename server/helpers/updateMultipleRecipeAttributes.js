import updateRecipeAttributes from '../helpers/updateRecipeAttributes';


const updateMultipleRecipeAttributes = async (sequelizeRecipe) => {
  const newlyUpdated = sequelizeRecipe.map((updateRecipeAttributes));
  console.log(newlyUpdated);
  return newlyUpdated;
};


export default updateMultipleRecipeAttributes;
