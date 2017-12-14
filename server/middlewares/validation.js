import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import model from '../models';

dotenv.config();

const {
  Recipes, Users, Favorites
} = model;

/**
 * @class Validation
 */
class Validation {
  /**
   * @description check user input
   * @param {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static checkUserInput(req, res, next) {
    const {
      firstname, lastname, username, email, password
    } = req.body;
    if (!firstname) {
      return res.status(400).send({
        message: 'Firstname field cannot be empty'
      });
    }
    if (!lastname) {
      return res.status(400).send({
        message: 'Lastname field cannot be empty'
      });
    }
    if (!username) {
      return res.status(400).send({
        message: 'Username field cannot be empty'
      });
    }
    if (!email) {
      return res.status(400).send({
        message: 'Email field cannot be empty'
      });
    }
    if (!password) {
      return res.status(400).send({
        message: 'Password field cannot be empty'
      });
    }
    next();
  }
  /**
   * @description ensure user input matches the correct pattern
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static validateUserInput(req, res, next) {
    req.checkBody({
      username: {
        notEmpty: true,
        isLength: {
          options: [{ min: 6 }],
          errMessage: 'User should be atleast 6 characters'
        },
        matches: {
          options: [(/^[A-Za-z0-9]+$/g)],
          errorMessage: 'Invalid Username, kindly ensure your username is alphanumeric'
        }
      },
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Please input a valid Email Adrress'
        }
      },
      password: {
        notEmpty: true,
        isLength: {
          options: [{ min: 8 }],
          errorMessage: 'Please input a valid password with atleast 8 characters'
        },
        matches: {
          options: [(/^([^ ]+)*$/g)],
          errorMessage: 'Invalid password,ensure your password contain only uppercase, lowercase and any special character'
        }
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          error: error.msg,
        });
      });
      return res.status(400).send(allErrors);
    }
    next();
  }
  /**
   * @description check if username and email exist
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static validateUsers(req, res, next) {
    Users
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        if (user) {
          return res.status(409).send({ message: 'Username has already been chosen' });
        }
        Users
          .findOne({
            where: {
              email: req.body.email
            }
          })
          .then((email) => {
            if (email) {
              return res.status(409).send({ message: 'Email already exist' });
            }
            next();
          });
      });
  }
  /**
   * @description validate user login
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static validateUserSignin(req, res, next) {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).send({
        message: 'Username field cannot be empty'
      });
    }
    if (!password) {
      return res.status(400).send({
        message: 'Password field cannot be empty'
      });
    }
    Users
      .findOne({
        where: {
          username
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'Incorrect Login details',
          });
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
          next();
        } else {
          res.status(400).send({
            message: 'Incorrect Login details',
          });
        }
      });
  }
  /**
   * @description check if userId in params is valid
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static checkUserId(req, res, next) {
    const id = req.params.userId;
    if (Number.isNaN(parseInt(id, 10))) {
      return res.status(400).send({
        message: 'UserId parameter should be a number'
      });
    }
    Users
      .findById(id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User doesn\'t exist'
          });
        }
        next();
      });
  }
  /**
   * @description check if recipe input is empty
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static checkRecipeInput(req, res, next) {
    const {
      name, description, indegrient, image
    } = req.body;
    if (!name) {
      return res.status(400).send({
        message: 'Name field cannot be empty'
      });
    }
    if (!description) {
      return res.status(400).send({
        message: 'Description field cannot be empty'
      });
    }
    if (!indegrient) {
      return res.status(400).send({
        message: 'Indegrient field cannot be empty'
      });
    }
    if (!image) {
      return res.status(400).send({
        message: 'Please upload an image for your recipes'
      });
    }
    next();
  }
  /**
   * @description check if recipe input is invalid
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static validateRecipeInput(req, res, next) {
    req.checkBody({
      name: {
        notEmpty: true,
        matches: {
          options: [(/^[A-Za-z0-9][^ ]+( [^]+)*$/g)],
          errorMessage: 'Invalid recipe name'
        }
      },
      description: {
        notEmpty: true,
        matches: {
          options: [(/^[A-Za-z0-9][^ ]+( [^]+)*$/g)],
          errorMessage: 'Invalid description format'
        }
      },
      indegrient: {
        notEmpty: true,
        matches: {
          options: [(/^[A-Za-z0-9][^ ]+( [^]+)*$/g)],
          errorMessage: 'Invalid indegrient format'
        }
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          error: error.msg,
        });
      });
      return res.status(400).send(allErrors);
    }
    next();
  }
  /**
   * @description check if recipeId exist and is valid
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static checkRecipeId(req, res, next) {
    const id = req.params.recipeId;
    if (Number.isNaN(parseInt(id, 10))) {
      return res.status(400).send({
        message: 'RecipeId parameter should be a number'
      });
    }
    Recipes
      .findById(id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe does not exist in this catalog' });
        }
        next();
      });
  }
  /**
   * @description check if reveiw input is valid
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static checkReviewInput(req, res, next) {
    const { review } = req.body;
    if (!review) {
      return res.status(400).send({
        message: 'Please input a review'
      });
    }
    next();
  }
  /**
   * @description check if recipe has been previously added to favorite
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static checkFavRecipe(req, res, next) {
    const id = req.params.recipeId;
    return Favorites
      .find({
        where: {
          id,
          userId: req.decoded.id
        }
      })
      .then((favrecipe) => {
        if (favrecipe) {
          return res.status(400).send({ message: 'This Recipe has already been favorited' });
        }
        next();
      });
  }
}

export default Validation;
