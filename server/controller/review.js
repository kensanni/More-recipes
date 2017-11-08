import model from '../models';

const { Reviews } = model;

/**
 * @class Reviews
*/
export default class Review {
  /**
   * @description Add  a review for recipes
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static addReview(req, res) {
    const { review } = req.body;
    if (!review) {
      return res.status(400).send({
        message: 'Please input a review'
      });
    }
    return Reviews
      .create({
        recipeId: req.params.recipeId,
        review,
        userId: req.decoded.id,
      })
      .then(reviews => res.status(200).send({
        success: true,
        message: 'Review posted succesfully',
        data: reviews
      }))
      .catch(error => res.status(400).send(error));
  }
}

