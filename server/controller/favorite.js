import model from '../models';

const { Favorites } = model;
/**
 * @class favoritesRecipes
*/
class Favorite {
  /**
   * @description Adds a recipe into favorite
   * @param {object} req HTTP request object
   * @param {object} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static addFavorite(req, res) {
    const id = req.params.recipeId;
    return Favorites
      .create({
        recipeId: id,
        userId: req.decoded.id,
      })
      .then((favoritedRecipe) => {
        res.status(201).send({
          success: true,
          message: 'recipe sucessfully added to favorite',
          data: favoritedRecipe
        });
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * @description get favorite recipe from database
   * @param {object} req HTTP request object
   * @param {object} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static getFavorite(req, res) {
    return Favorites
      .find({
        where: {
          userId: req.decoded.id
        }
      })
      .then(favorite => res.status(200).send({
        success: true,
        data: favorite
      }))
      .catch(error => res.status(400).send(error));
  }
}
export default Favorite;
