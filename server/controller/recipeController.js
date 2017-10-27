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
      name, userId, description, mealType, reviews,
    } = req.body;
    if (!name) {
      return res.status(400).send({
        message: 'Please Enter a Recipe Name'
      });
    }
    if (!mealType) {
      return res.status(400).send({
        message: 'Please Enter a mealType'
      });
    }
    if (!description) {
      return res.status(400).send({
        message: 'Please Enter the recipe description'
      });
    }
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
      reviews: []
    });
    return res.status(201).send(db.recipes[id - 1]);
  }
  /**
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static getAllRecipe(req, res) {
    const { recipes } = db;

    recipes.forEach((recipe) => {
      db.review.forEach((rev) => {
        if (recipe.id === rev.recipeId) {
          recipe.reviews.push(rev);
        }
      });
    });

    return res.status(200).send(recipes);
  }
  /**
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static modifyRecipe(req, res) {
    const id = req.params.recipeUpdateId;
    const {
      name, description, mealType,
    } = req.body;
    db.recipes.forEach((recipe) => {
      if (recipe.id === parseInt(id, 10)) {
        recipe.name = name || recipe.Name;
        recipe.mealType = mealType || recipe.mealType;
        recipe.description = description || recipe.description;

        return res.status(200).send(recipe);
      }
    });
    res.status(404).send({
      message: 'Recipe Not found!',
    });
  }
  /**
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static deleteRecipe(req, res) {
    const id = req.params.recipeDeleteId;
    console.log(db.recipes)
    const indexOfrecipe = db.recipes.findIndex(r => r.id === parseInt(id, 10));
    console.log(indexOfrecipe)
    console.log(id)
    if (indexOfrecipe === -1) {
      res.status(404).send({
        message: 'Recipe Not found!',
      });
    }

    db.recipes.splice(indexOfrecipe, 1);

    return res.status(200).send({
      message: 'Recipe successfully deleted'
    });
  }
}

export default handleRecipeMethod;
