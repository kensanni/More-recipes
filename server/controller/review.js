import model from '../models';

const { Reviews, Recipes } = model;

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
    const id = req.params.recipeId;
    if (!review) {
      return res.status(400).send({
        message: 'Please input a review'
      });
    }
    if (isNaN(id)) {
      return res.status(400).send({
        message: 'RecipeId parameter should be a number'
      });
    }
    return Recipes.findById(id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404)
            .send({ message: 'Recipe not found' });
        }
        Reviews
          .create({
            recipeId: id,
            review,
            userId: req.decoded.id,
          })
          .then(reviews => res.status(201).send({
            success: true,
            message: 'Review posted succesfully',
            data: reviews
          }))
          .catch(error => res.status(400).send(error));
      });
  }
}

