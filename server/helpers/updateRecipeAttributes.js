import models from './../models';

/**
 * @description count the length of favorite upvotes and downvotes and append it to a single recipe
 *
 * @param {object} sequelizeRecipe
 *
 * @returns {object} object
 */

const { Upvotes, Downvotes, Favorites } = models;

const updateRecipeAttributes = async (sequelizeRecipe) => {
  const recipe = sequelizeRecipe.get();

  const upvotes = await Upvotes.findAll({
    where: {
      recipeId: sequelizeRecipe.id
    }
  });

  const downvotes = await Downvotes.findAll({
    where: {
      recipeId: sequelizeRecipe.id
    }
  });

  const favorites = await Favorites.findAll({
    where: {
      recipeId: sequelizeRecipe.id
    }
  });

  recipe.upvotes = upvotes.length;
  recipe.downvotes = downvotes.length;
  recipe.favorites = favorites.length;
  return sequelizeRecipe;
};

export default updateRecipeAttributes;
