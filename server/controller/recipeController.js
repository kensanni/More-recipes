import db from '../model/db';
/**
 * @class recipeController
*/

class handleRecipeMethod {
  /**
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static addRecipe(req, res) {
    const {
      name, userId, description, mealType,
    } = req.body;
    const len = db.recipes.length;
    const id = len + 1;
    db.recipes.push({
      id,
      userId,
      name,
      description,
      mealType,
      upvotes: 10,
      downvotes: 3,
    });
    return res.status(201).send(db.recipes[id - 1]);
  }
  /**
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static getAllRecipe(req, res) {
    return res.status(201).send(db.recipes);
  }
  /**
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static modifyRecipe(req, res) {
    const recipeUpdateId = req.params.id;
    const {
      name, description, mealType,
    } = req.body;

    db.recipes.forEach((recipe) => {
      if (recipe.id === parseInt(recipeUpdateId, 10)) {
        recipe.recipeName = name || recipe.recipeName;
        recipe.mealType = mealType || recipe.mealType;
        recipe.description = description || recipe.description;

        return res.status(200).send(recipe);
      }
    });
    res.status(404).send({
      message: 'Recipe Not found!',
    });
  }
}
export default handleRecipeMethod;
