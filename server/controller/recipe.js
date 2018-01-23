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
   * @param {object} req HTTP request object
   * @param {object} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
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
   * @param {object} req HTTP request object
   * @param {object} res  HTTP response object
   * @returns  {JSON} Returns a JSON object
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
   * @param {object} req HTTP request object
   * @param {object} res  HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static async getRecipes(req, res) {
    const getAllRecipes = await Recipes.findAll({
      include: [{
        model: model.Reviews,
        attributes: ['review'],
        include: [{
          model: model.Users,
          attributes: ['username'],
        }]
      }]
    });

    if (getAllRecipes.length < 1) {
      return res.status(404).send({
        message: 'No Recipe found'
      });
    }

    const updatedRecipes = await updateMultipleRecipeAttributes(getAllRecipes);
    return res.status(200).send({
      recipesData: updatedRecipes
    });
  }
  /**
     * @description get one recipe
     * @param {object} req HTTP request object
     * @param {object} res  HTTP response object
     * @returns  {JSON} Returns a JSON object
     */
  static async getARecipe(req, res) {
    const id = req.params.recipeId;

    const recipe = await Recipes.findOne({
      where: { id },
      include: [{
        model: model.Reviews,
        attributes: ['review'],
        include: [{
          model: model.Users,
          attributes: ['username', 'updatedAt'],
        }]
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
      data: updatedRecipe
    });
  }
  /**
   * @description get user recipes
   * @param {*} req HTTP request object
   * @param {*} res HTTP responds object
   * @return {JSON} return a json object
   */
  static async getUserRecipes(req, res) {
    const userId = req.decoded.id;
    const id = parseInt(req.params.userId, 10);

    if (userId !== id) {
      return res.status(401).send({
        message: 'Access denied',
      });
    }

    const userRecipe = await Recipes.findAll({
      where: { userId },
      include: [{
        model: model.Reviews,
        attributes: ['review'],
        include: [{
          model: model.Users,
          attributes: ['username', 'updatedAt'],
        }]
      }],
    });

    if (userRecipe.length < 1) {
      return res.status(404).send({
        message: 'No Recipe found'
      });
    }

    return res.status(200).send({
      data: userRecipe
    });
  }
  /**
   * @description delete a recipe
   * @param {object} req HTTP request object
   * @param {object} res  HTTP response object
   * @returns  {JSON} Returns a JSON object
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
}
export default Recipe;
