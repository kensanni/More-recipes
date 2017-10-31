import db from '../model/db';
/**
 * @class reviewController
*/
export default class reviewHandler {
  /**
   * get  all Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static addReview(req, res) {
    if (!req.body.review) {
      res.status(400).send({
        Message: 'Please enter Review'
      });
    } else {
      const len = db.review.length;
      const id = 1 + len;
      db.review.push({
        id,
        recipeId: req.params.recipeId,
        userId: req.body.userId,
        review: req.body.review
      });
      db.recipes.forEach((rev) => {       
        if (rev.id === parseInt(req.params.recipeId, 10)) {
          rev.reviews.push(db.review[id - 1]);
          console.log(rev.reviews);
        }
      });
      res.status(201).send({
        success: true,
        review: db.review[id - 1],
        message: 'Review Added'
      });
    }
  }
}