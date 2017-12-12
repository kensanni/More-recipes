import model from '../models';

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
  static addRecipes(req, res) {
    const {
      name, description, indegrient, image,
    } = req.body;
    return Recipes
      .create({
        userId: req.decoded.id,
        name,
        description,
        indegrient,
        image,
      })
      .then(recipe => res.status(201).send({
        success: true,
        message: 'Recipe successfully created',
        data: recipe
      }))
      .catch(error => res.status(400).send(error));
  }
  /**
   * @description modify a recipe
   * @param {object} req HTTP request object
   * @param {object} res  HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static modifyRecipe(req, res) {
    const {
      name, description, indegrient, image
    } = req.body;
    Recipes.findById(req.params.recipeId)
      .then((recipe) => {
        recipe.update({
          name: name || recipe.name,
          description: description || recipe.description,
          indegrient: indegrient || recipe.indegrient,
          image: image || recipe.image,
        })
          .then((updatedRecipe) => {
            res.status(200).send({
              success: true,
              message: 'Recipe updated successfully',
              data: {
                name: updatedRecipe.name,
                description: updatedRecipe.description,
                indegrient: updatedRecipe.indegrient,
                image: updatedRecipe.image
              }
            });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * @description get all recipe
   * @param {object} req HTTP request object
   * @param {object} res  HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static getRecipes(req, res) {
    return Recipes
      .findAll({
        include: [{
          model: model.Reviews,
          attributes: ['review'],
          include: [{
            model: model.Users,
            attributes: ['username'],
          }]
        }],
      })
      .then((recipe) => {
        if (recipe.length < 1) {
          return res.status(404).send({
            message: 'No Recipe found'
          });
        }
        return res.status(200).send(recipe);
      })
      .catch(error => res.status(400).send(error));
  }
  /**
     * @description get one recipe
     * @param {object} req HTTP request object
     * @param {object} res  HTTP response object
     * @returns  {JSON} Returns a JSON object
     */
  static getRecipeById(req, res) {
    const id = req.params.recipeId;
    return Recipes
      .findOne({
        where: {
          id
        },
        include: [{
          model: model.Reviews,
          attributes: ['review'],
          include: [{
            model: model.Users,
            attributes: ['username', 'updatedAt'],
          }]
        }],
      })
      .then((recipe) => {
        if (recipe.length < 1) {
          return res.status(404).send({
            message: 'No Recipe found'
          });
        }
        recipe.increment('views').then(() => {
          recipe.reload()
            .then(() => res.status(200).send(recipe));
        });
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * @description delete a recipe
   * @param {object} req HTTP request object
   * @param {object} res  HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static deleteRecipes(req, res) {
    const id = req.params.recipeId;
    return Recipes
      .findById(id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(400).send({
            message: 'Recipe Not Found',
          });
        }
        return recipe
          .destroy()
          .then(() => res.status(200).send({
            message: 'Recipe successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      });
  }
}
export default Recipe;
