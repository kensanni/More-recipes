import model from '../models';

const { Downvotes, Upvotes, Recipes } = model;
/**
 * @class Upvote
 */
class Upvote {
  /**
   * @description Upvote a recipe
   * @param {object} req HTTP request object
   * @param {object} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static async upvoteRecipe(req, res) {
    const id = req.params.recipeId;
    const checkRecipeExist = await Recipes.find({
      where: {
        id,
      }
    });
    if (!checkRecipeExist) {
      return res.status(404).send({ message: 'Recipe does not exist in this catalog' });
    }
    const downvotedRecipe = await Downvotes.find({
      where: {
        recipeId: id,
        userId: req.decoded.id
      }
    });

    if (downvotedRecipe) {
      await downvotedRecipe.destroy();
    }

    const upvote = await Upvotes.find({
      where: {
        recipeId: id,
        userId: req.decoded.id
      }
    });

    if (upvote) {
      await upvote.destroy();
      return res.status(200).send({
        success: true,
        message: 'Recipe upvote successfully removed'
      });
    }

    const newUpvote = await Upvotes.create({
      recipeId: id,
      userId: req.decoded.id
    });
    return res.status(201).send({
      success: true,
      message: 'Recipe successfully upvoted',
      data: newUpvote
    });
  }
}
export default Upvote;
