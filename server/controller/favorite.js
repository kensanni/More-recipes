import model from '../models';
import updateMultipleRecipeAttributes from '../helpers/updateMultipleRecipeAttributes';

const { Favorites, Recipes } = model;
/**
 * @class Favorite
*/
class Favorite {
  /**
   * @description Adds a recipe into favorite
   *
   * @param {object} req HTTP request object
   * @param {object} res   HTTP response object
   *
   * @returns {object} return a json object
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
        message: 'Recipe successfully unfavorited',
        type: 0
      });
    }
    const addFavorite = await Favorites.create({
      recipeId: req.params.recipeId,
      userId: req.decoded.id
    });
    return res.status(201).send({
      success: true,
      message: 'recipe sucessfully added to favorite',
      type: 1,
      data: addFavorite
    });
  }
  /**
   * @description get favorite recipe from database
   *
   * @param {object} req HTTP request object
   * @param {object} res   HTTP response object
   *
   * @returns {object} return a json object
   */
  static async getFavorite(req, res) {
    const limit = req.query.limit || 6;
    let offset;
    let pages;
    let pageNo;

    const findAndCountFavorites = await Favorites.findAndCountAll({
      where: {
        userId: req.decoded.id
      }
    });

    if (findAndCountFavorites) {
      pages = Math.ceil(findAndCountFavorites.count / limit);
      pageNo = parseInt(req.query.page, 10);
      pageNo = Number.isInteger(pageNo) && pageNo > 0 ? pageNo : 0;
      offset = pageNo * limit;
    }
    const getFavoritesRecipes = await Favorites.findAll({
      where: {
        userId: req.decoded.id
      },
      limit,
      offset,
    });

    const { count } = findAndCountFavorites;

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
      pages,
      count
    });
  }
}
export default Favorite;
