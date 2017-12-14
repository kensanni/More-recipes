import models from './../models';

const { Upvotes, Downvotes } = models;

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

  recipe.upvotes = upvotes.length;
  recipe.downvotes = downvotes.length;
  return sequelizeRecipe;
};

export default updateRecipeAttributes;
