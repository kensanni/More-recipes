import model from '../models';

const { Recipes } = model;

/**
 * @class RecipesController
*/
class RecipesController {
  /**
   * @description Adds a recipe
   * @param {*} req HTTP request object
   * @param {*} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static addRecipes(req, res) {
    const {
      recipeName, description, indegrient, image, upvote, downvote,
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
        message: 'Please input a indegrient for your recipe'
      });
    }
    if (!image) {
      return res.status(400).send({
        message: 'Please upload an image for your recipes'
      });
    }
    return Recipes
      .create({
        userId: req.decoded.id,
        recipeName,
        description,
        indegrient,
        image,
        // upvote,
        // downvote
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
   * @param {*} req HTTP request object
   * @param {*} res  HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static modifyRecipe(req, res) {
    const {
      recipeName, description, indegrient, image
    } = req.body;
    if (!recipeName) {
      return res.status(400).send({
        message: 'Name cannnot be empty be an empty field'
      });
    }
    if (!description) {
      return res.status(400).send({
        message: 'Description cannot be empty cannot be an empty field'
      });
    }
    if (!indegrient) {
      return res.status(400).send({
        message: 'Indigrient cannot be an empty field'
      });
    }
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
            res.status(200).send(updatedRecipe);
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * @description get all recipe
   * @param {*} req HTTP request object
   * @param {*} res  HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static getRecipes(req, res) {
    return Recipes
      .findAll({
        
      })
      .then(getRecipe => res.status(200).send({
        success: true,
        data: getRecipe,
      }))
      .catch(error => res.status(400).send(error));
  }
  /**
   * @description delete a recipe
   * @param {*} req HTTP request object
   * @param {*} res  HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static deleteRecipes(req, res) {
    return Recipes
      .findById(req.params.recipeId)
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
export default RecipesController;
