import model from '../models';

const { Downvotes, Upvotes, Recipes } = model;
/**
 * @class Downvote
 */
class Downvote {
  /**
   * @description Downvote a recipe
   * @param {object} req HTTP request object
   * @param {object} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static async downvoteRecipe(req, res) {
    const id = req.params.recipeId;
    const checkRecipeExist = await Recipes.find({
      where: {
        id,
      }
    });
    if (!checkRecipeExist) {
      return res.status(404).send({ message: 'Recipe does not exist in this catalog' });
    }
    const upvotedRecipe = await Upvotes.find({
      where: {
        id,
        userId: req.decoded.id
      }
    });

    if (upvotedRecipe) {
      await upvotedRecipe.destroy();
      Recipes.update({
        upvotes: checkRecipeExist.upvotes - 1,
      }, {
        where: {
          id: checkRecipeExist.id,
        }
      });
    }

    const downvote = await Downvotes.find({
      where: {
        id,
        userId: req.decoded.id
      }
    });

    if (downvote) {
      await downvote.destroy();
      Recipes.update({
        downvotes: checkRecipeExist.downvotes - 1,
      }, {
        where: {
          id: checkRecipeExist.id,
        }
      });
      return res.status(200).send({
        success: true,
        message: 'Recipe downvote successfully removed'
      });
    }
    const newDownvote = await Downvotes.create({
      recipeId: id,
      userId: req.decoded.id
    });
    Recipes.update({
      downvotes: checkRecipeExist.downvotes + 1,
    }, {
      where: {
        id: checkRecipeExist.id,
      }
    });
    return res.status(201).send({
      success: true,
      message: 'Recipe successfully downvoted',
      data: newDownvote
    });
  }
}
export default Downvote;
