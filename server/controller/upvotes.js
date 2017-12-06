import model from '../models';

const { Upvotes } = model;
/**
 * @class upvoteRecipe
 */
class Upvote {
  /**
   * @description Upvote a recipe
   * @param {*} req HTTP request object
   * @param {*} res   HTTP response object
   * @returns  {JSON} Returns a aJSON object
   */
  static upvoteRecipe(req, res) {
    const id = req.params.recipeId;

    return Upvotes
      .create({
        recipeId: id,
        userId: req.decoded.id,
      })
      .then((upvotedRecipes) => {
        res.status(200).send({
          success: true,
          message: 'Recipe successfully upvoted',
          data: upvotedRecipes
        });
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * @description Upvote a recipe
   * @param {*} req HTTP request object
   * @param {*} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static removeUpvotedRecipe(req, res) {
    return Upvotes
      .find({
        where: {
          userId: req.decoded.userId,
          recipeId: req.params.recipeId
        },
      })
      .then((removeUpvote) => {
        if (!removeUpvote) {
          return res.status(400).send({
            message: 'Recipe not found'
          });
        }
        return removeUpvote
          .destroy()
          .then(() => res.status(204).send({
            message: 'Upvote remove successfully'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}
export default Upvote;
