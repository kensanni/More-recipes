import model from '../models';

const { Downvotes, Upvotes } = model;
/**
 * @class Upvote
 */
class Upvote {
  /**
   * @description Upvote a recipe
   *
   * @param {object} req HTTP request object
   * @param {object} res   HTTP response object
   *
   * @returns {object} object
   */
  static async upvoteRecipe(req, res) {
    const id = req.params.recipeId;
    let downvoteStatus = 'notDownvoted';
    const downvotedRecipe = await Downvotes.find({
      where: {
        recipeId: id,
        userId: req.decoded.id
      }
    });

    if (downvotedRecipe) {
      downvoteStatus = 'downvoted';
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
        message: 'Recipe upvote successfully removed',
        downvoteStatus
      });
    }

    const newUpvote = await Upvotes.create({
      recipeId: id,
      userId: req.decoded.id
    });
    return res.status(201).send({
      message: 'Recipe successfully upvoted',
      data: newUpvote,
      downvoteStatus
    });
  }
}
export default Upvote;
