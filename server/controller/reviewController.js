import model from '../models';

const { Reviews } = model;

/**
 * @class reviewController
*/
export default class reviewHandler {
  /**
   * @description get  all Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static addReview(req, res) {
    return Reviews
      .create({
        recipeId: req.params.recipeId,
        review: req.body.review,
        userId: req.decoded.id,
      })
      .then(review => res.status(200).send({
        success: true,
        message: 'Review posted succesfully',
        data: review
      }))
      .catch(error => res.status(400).send(error));
  }
}

