import model from '../models';

const { Recipes } = model;

/**
 * @class recipesController
*/
class handleRecipesMethod {
  /**
   * @description Adds a recipe
   * @param {*} req HTTP request object
   * @param {*} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static addRecipes(req, res) {
    const {
      recipeName, description, indegrient, image
    } = req.body;
    if (!recipeName) {
      return res.status(400).send({
        message: 'Please input the name of your recipe'
      });
    }
    if (!description) {
      return res.status(400).send({
        message: 'Please input a description for your recipe'
      });
    }
    if (!indegrient) {
      return res.status(400).send({
        message: 'Please input a description for your recipe'
      });
    }
    if (!image) {
      return res.status(400).send({
        message: 'Please upload an image of your recipes'
      });
    }
    return Recipes
      .create({
        recipeName,
        description,
        indegrient,
        image
      })
      .then(recipe => res.status(201).send({
        success: true,
        messge: 'Recipe successfully created',
        data: {
          recipeId: recipe.id,
          recipeName: recipe.recipeName,
          indegrient: recipe.indegrient,
          image: recipe.image
        }
      }))
      .catch(error => res.status(400).send(error));
  }
  /**
   * @description modify a recipe
   * @param {*} req HTTP request object
   * @param {*} res  HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static modifyRecipe(req, res) {
    const {
      recipeName, description, indegrient, image
    } = req.body;
    Recipes.findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404)
            .send({ message: 'Recipe does not exist in this catalog' });
        }
        recipe.update({
          recipeName,
          description,
          indegrient,
          image,
        })
          .then((updatedRecipe) => {
            res.status(200).send({ updatedRecipe });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}
export default handleRecipesMethod;
