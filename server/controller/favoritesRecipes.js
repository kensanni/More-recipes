import model from '../models';

const { Favorites, Recipes } = model;
/**
 * @class favoritesRecipes
*/
class FavoritesRecipes {
  /**
   * @description Adds a recipe into favorite
   * @param {*} req HTTP request object
   * @param {*} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static addFavorite(req, res) {
    const id = req.params.recipeId;
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
        Favorites
          .create({
            recipeId: id,
            userId: req.decoded.id,
          })
          .then(fav => res.status(200).send({
            success: true,
            message: 'recipe sucessfully added to favorite',
            data: fav
          }))
          .catch(error => res.status(400).send(error));
      });
  }
  /**
   * @description get favorite recipe from database
   * @param {*} req HTTP request object
   * @param {*} res   HTTP response object
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
export default FavoritesRecipes;
