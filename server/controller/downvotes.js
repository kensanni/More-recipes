import model from '../models';

const { Downvotes, Upvotes } = model;
/**
 * @class downvoteRecipe
 */
class Downvote {
  /**
   * @description Downvote a recipe
   * @param {*} req HTTP request object
   * @param {*} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static downvoteRecipe(req, res) {
    const id = req.params.recipeId;
    return Upvotes
      .find({
        where: {
          recipeId: id,
          userId: req.decoded.id
        }
      })
      .then((alreadyUpvoted) => {
        if (alreadyUpvoted) {
          return alreadyUpvoted
            .destroy();
        }
        return Downvotes
          .create({
            recipeId: id,
            userId: req.decoded.id
          })
          .then((downvotedRecipe) => {
            res.status(200).send({
              success: true,
              message: 'Recipe succesfully downvoted',
              data: downvotedRecipe
            });
          });
      })
      .catch(error => res.status(400).send(error));
  }
}
export default Downvote;
