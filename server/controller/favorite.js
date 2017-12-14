import model from '../models';

const { Favorites } = model;
/**
 * @class Favorite
*/
class Favorite {
  /**
   * @description Adds a recipe into favorite
   * @param {object} req HTTP request object
   * @param {object} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static async addFavorite(req, res) {
    const addFavorite = await Favorites.create({
      recipeId: req.params.recipeId,
      userId: req.decoded.id,
    });
    return res.status(201).send({
      success: true,
      message: 'recipe sucessfully added to favorite',
      data: addFavorite
    });
  }
  /**
   * @description get favorite recipe from database
   * @param {object} req HTTP request object
   * @param {object} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static async getFavorite(req, res) {
    const getFavoriteRecipes = await Favorites.find({
      where: {
        userId: req.decoded.id
      }
    });

    return res.status(200).send({
      success: true,
      data: getFavoriteRecipes
    });
  }
}
export default Favorite;
