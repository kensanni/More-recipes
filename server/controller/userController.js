import model from '../models';

const { User } = model;
/**
 * @class recipeController
*/
class handleUserMethod {
  /**
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static userSignUp(req, res) {
    // Initialize the req.body attributes to a const
    const {
      firstname, lastname, username, email, image, password
    } = req.body;
    return User
      // Create the  user details
      .create({
        firstname,
        lastname,
        username,
        email,
        password,
        image,
      })
      .then(user => res.status(201).send({
        success: true,
        messge: 'Account successfully created',
        username: user.username,
        id: user.id,
      }))
      .catch(error => res.status(400).send(error));
  }
  /**
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static getAllRecipe(req, res) {
    const { recipes } = db;
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

export default handleUserMethod;
