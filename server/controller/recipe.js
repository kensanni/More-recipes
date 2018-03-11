import Sequelize from 'sequelize';
import model from '../models';
import updateRecipeAttributes from '../helpers/updateRecipeAttributes';
import updateMultipleRecipeAttributes from '../helpers/updateMultipleRecipeAttributes';

const { Recipes } = model;


/**
 * @class Recipe
*/
class Recipe {
  /**
   * @description Adds a recipe
   *
   * @param {object} req HTTP request object
   *
   * @param {object} res   HTTP response object
   *
   * @returns {object} return a json object
   */
  static async addRecipes(req, res) {
    const {
      name, description, ingredient, image,
    } = req.body;

    const addRecipes = await Recipes.create({
      userId: req.decoded.id,
      name,
      description,
      ingredient,
      image,
    });

    return res.status(201).send({
      message: 'Recipe successfully created',
      data: addRecipes
    });
  }
  /**
   * @description modify a recipe
   *
   * @param {object} req HTTP request object
   *
   * @param {object} res  HTTP response object
   *
   * @returns {object} return a json object
   */
  static async modifyRecipe(req, res) {
    const {
      name, description, ingredient, image
    } = req.body;

    const findRecipe = await Recipes.findById(req.params.recipeId);

    await findRecipe.update({
      name: name || findRecipe.name,
      description: description || findRecipe.description,
      ingredient: ingredient || findRecipe.ingredient,
      image: image || findRecipe.image,
    });
    return res.status(200).send({
      message: 'Recipe updated successfully',
      data: findRecipe
    });
  }
  /**
   * @description get all recipe
   *
   * @param {object} req HTTP request object
   *
   * @param {object} res  HTTP response object
   *
   * @returns {object} return a json object
   */
  static async getRecipes(req, res) {
    const limit = req.query.limit || 6;
    let offset;
    let pages;
    let pageNo;

    const findAndCount = await Recipes.findAndCountAll();

    if (findAndCount) {
      pages = Math.ceil(findAndCount.count / limit);
      pageNo = parseInt(req.query.page, 10);
      pageNo = Number.isInteger(pageNo) && pageNo > 0 ? pageNo - 1 : 0;
      offset = pageNo * limit;
    }

    const getAllRecipes = await Recipes.findAll({
      limit,
      offset
    });

    if (getAllRecipes.length < 1) {
      return res.status(404).send({
        message: 'No Recipe found'
      });
    }

    if (getAllRecipes) {
      const updatedRecipes = await updateMultipleRecipeAttributes(getAllRecipes);
      return res.status(200).send({
        recipesData: updatedRecipes,
        pages
      });
    }
  }
  /**
     * @description get one recipe
     *
     * @param {object} req HTTP request object
     *
     * @param {object} res  HTTP response object
     *
     * @returns {object} Returns a JSON object
     */
  static async getARecipe(req, res) {
    const id = req.params.recipeId;

    const recipe = await Recipes.findOne({
      where: { id },
      include: [{
        model: model.Reviews,
        attributes: ['review', 'username']
      }],
    });

    if (recipe.length < 1) {
      return res.status(404).send({
        message: 'No Recipe found'
      });
    }

    await recipe.increment('views');
    const updatedRecipe = await updateRecipeAttributes(recipe);

    return res.status(200).send({
      recipeData: updatedRecipe,
    });
  }
  /**
   * @description get user recipes
   *
   * @param {object} req HTTP request object
   *
   * @param {object} res HTTP responds object
   *
   * @return {object} return a json object
   */
  static async getUserRecipes(req, res) {
    let offset;
    let pages;
    let pageNo;
    const limit = req.query.limit || 6;
    const userId = req.decoded.id;
    const id = parseInt(req.params.userId, 10);

    if (userId !== id) {
      return res.status(401).send({
        message: 'Access denied',
      });
    }

    const findAndCountUserRecipes = await Recipes.findAndCountAll({
      where: {
        userId: req.decoded.id
      }
    });

    const { count } = findAndCountUserRecipes;

    if (findAndCountUserRecipes) {
      pages = Math.ceil(findAndCountUserRecipes.count / limit);
      pageNo = parseInt(req.query.page, 10);
      pageNo = Number.isInteger(pageNo) && pageNo > 0 ? pageNo - 1 : 0;
      offset = pageNo * limit;
    }

    const userRecipe = await Recipes.findAll({
      where: { userId },
      limit,
      offset,
    });

    if (userRecipe.length < 1) {
      return res.status(404).send({
        message: 'No Recipe found'
      });
    }

    return res.status(200).send({
      recipesData: userRecipe,
      pages,
      count
    });
  }
  /**
   * @description delete a recipe
   *
   * @param {object} req HTTP request object
   *
   * @param {object} res  HTTP response object
   *
   * @returns  {object} Returns a JSON object
   */
  static async deleteRecipes(req, res) {
    const findRecipe = await Recipes.find({
      where: {
        id: req.params.recipeId,
        userId: req.decoded.id
      }
    });

    if (!findRecipe) {
      return res.status(403).send({
        message: 'Access denied, you are not allowed to delete this recipe'
      });
    }

    await findRecipe.destroy();
    return res.status(200).send({
      message: 'Recipe successfully deleted'
    });
  }
  /**
   * @description
   *
   * @param {object} req HTTP request object
   *
   * @param {object} res HTTP response object
   *
   * @returns {object} return a json object
   */
  static async popularRecipes(req, res) {
    const getRecipes = await Recipes.findAll({
      include: [{
        model: model.Reviews,
        attributes: ['review'],
        include: [{
          model: model.Users,
          attributes: ['username'],
        }]
      }],
      limit: req.query.limit || 3,
    });
    const updatedRecipes = await updateMultipleRecipeAttributes(getRecipes);
    return res.status(200).send({
      recipesData: updatedRecipes.sort((a, b) => a.dataValues.favorites + b.dataValues.favorites)
    });
  }

  /**
   * @description
   *
   * @param {object} req HTTP request object
   *
   * @param {object} res HTTP response object
   *
   * @returns {object} return a json object
   */
  static async recipeSearch(req, res) {
    const { Op } = Sequelize;

    const findRecipes = await Recipes.findAll({
      where: {
        [Op.or]: [
          {
            name: { [Op.iLike]: `%${req.query.recipe}%` }
          },
          {
            ingredient: { [Op.iLike]: `%${req.query.recipe}%` }
          }
        ]
      }
    });

    if (findRecipes.length === 0) {
      return res.status(404).send({
        message: 'recipe not found'
      });
    }

    return res.status(200).send({
      searchResult: findRecipes
    });
  }
}
export default Recipe;
