import model from '../models';

const { Reviews, Recipes } = model;

/**
 * @class Review
*/
export default class Review {
  /**
   * @description Add  a review for recipes
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static async addReview(req, res) {
    const { review } = req.body;
    const findRecipe = await Recipes.findById(req.params.recipeId);
    const addReview = await Reviews.create({
      recipeId: req.params.recipeId,
      review,
      userId: req.decoded.id,
    });
    if (!findRecipe) {
      return res.status(404)
        .send({
          success: false,
          message: 'Recipe not found'
        });
    }
    return res.status(201).send({
      success: true,
      message: 'Review posted succesfully',
      data: addReview
    });
  }
}
