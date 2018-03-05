import model from '../models';
import updateMultipleRecipeAttributes from '../helpers/updateMultipleRecipeAttributes';

const { Favorites, Recipes } = model;
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
    const findFavRecipe = await Favorites.find({
      where: {
        recipeId: req.params.recipeId,
        userId: req.decoded.id
      }
    });
    if (findFavRecipe) {
      findFavRecipe.destroy();
      return res.status(200).send({
        success: true,
        message: 'Recipe successfully unfavorited'
      });
    }
    const addFavorite = await Favorites.create({
      recipeId: req.params.recipeId,
      userId: req.decoded.id
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
    const limit = 6;
    let offset;
    let pages;
    let singlePage;

    const findAndCountFavorites = await Favorites.findAndCountAll();

    if (findAndCountFavorites) {
      pages = Math.ceil(findAndCountFavorites.count / limit);
      singlePage = parseInt(req.query.page, 10);
      offset = singlePage * limit;
    }
    const getFavoritesRecipes = await Favorites.findAll({
      where: {
        userId: req.decoded.id
      },
      limit,
      offset,
      pages
    });

    const recipeIds = getFavoritesRecipes.map(favorite => favorite.recipeId);
    const recipes = await Recipes.findAll({
      where: {
        id: {
          [model.Sequelize.Op.in]: recipeIds
        }
      }
    });

    return res.status(200).send({
      success: true,
      data: await updateMultipleRecipeAttributes(recipes),
      pages
    });
  }
}
export default Favorite;
