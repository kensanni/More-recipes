import model from '../models';

const { Reviews, Recipes } = model;

/**
 * @class Review
*/
export default class Review {
  /**
   * @description Add  a review for recipes
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} object
   */
  static async addReview(req, res) {
    const { review } = req.body;
    const findRecipe = await Recipes.findById(req.params.recipeId);
    const addReview = await Reviews.create({
      recipeId: req.params.recipeId,
      username: req.decoded.username,
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

  /**
   * @description get all paginated reviews
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {void}
   */
  static async getReviews(req, res) {
    const limit = parseInt((req.query.limit || 30), 10);
    const page = parseInt(req.query.page, 10);
    const { recipeId } = req.params;
    let offset;
    let pages;
    let pageNo;


    if (Number.isNaN(limit) || Number.isNaN(page)) {
      return res.status(400).send({
        error: 'Parameters should be a number'
      });
    }

    const findAndCount = await Reviews.findAndCountAll({
      where: {
        recipeId
      }
    });

    if (findAndCount) {
      pages = Math.ceil(findAndCount.count / limit);
      pageNo = page;
      pageNo = Number.isInteger(pageNo) && pageNo > 0 ? pageNo : 0;
      offset = pageNo * limit;
    }

    const getAllReviews = await Reviews.findAll({
      where: { recipeId },
      limit,
      offset
    });

    if (getAllReviews.length < 1) {
      return res.status(404).send({
        message: 'Reviews not found'
      });
    }

    return res.status(200).send({
      getAllReviews,
      pages
    });
  }
}
