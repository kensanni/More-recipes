import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import model from '../models';

dotenv.config();

const {
  Recipes, Users
} = model;

/**
 * @class Validation
 */
class Validation {
  /**
   * @description ensure user input matches the correct pattern
   *
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {function} next - next
   *
   * @returns {object} Returns a JSON object
   */
  static validateUserInput(req, res, next) {
    req.checkBody({
      name: {
        notEmpty: {
          options: true,
          errorMessage: 'name field cannot be empty'
        },
        isLength: {
          options: [{ min: 3 }],
          errorMessage: 'Name should be atleast 3 character'
        },
        matches: {
          options: [(/^[A-Za-z][^ ]+( [^]+)*$/g)],
          errorMessage: 'Invalid name, ensure you name contain only alphabets'
        }
      },
      username: {
        notEmpty: {
          options: true,
          errorMessage: 'Username field cannot be empty'
        },
        isLength: {
          options: [{ min: 6 }],
          errorMessage: 'Username should be atleast 6 characters'
        },
        matches: {
          options: [(/^[A-Za-z0-9]+$/g)],
          errorMessage: 'Invalid Username, kindly ensure your username is alphanumeric'
        }
      },
      email: {
        notEmpty: {
          options: true,
          errorMessage: 'Email field cannot be empty'
        },
        isEmail: {
          errorMessage: 'Please input a valid Email Adrress'
        }
      },
      password: {
        notEmpty: {
          options: true,
          errorMessage: 'Password field cannot be empty'
        },
        isLength: {
          options: [{ min: 8 }],
          errorMessage: 'Please input a valid password with atleast 8 characters'
        },
        matches: {
          options: [(/^([^ ]+)*$/g)],
          errorMessage: 'Invalid password, ensure your password contain only uppercase, lowercase or any special character'
        }
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          message: error.msg,
          field: error.param
        });
      });
      return res.status(400).send({ errors: allErrors });
    }
    next();
  }
  /**
   * @description check if username and email exist
   *
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {function} next - next
   *
   * @returns {object} returns a JSON object
   */
  static async validateUsers(req, res, next) {
    const findUser = await Users.findOne({
      where: {
        username: req.body.username
      }
    });
    if (findUser) {
      return res.status(409).send({
        errors: [{
          message: 'Username has already been chosen'
        }]
      });
    }
    const findEmail = await Users.findOne({
      where: {
        email: req.body.email
      }
    });
    if (findEmail) {
      return res.status(409).send({
        errors: [{
          message: 'Email already exist'
        }]
      });
    }
    next();
  }
  /**
   * @description validate user login
   *
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {function} next - next
   *
   * @returns {object} Returns a JSON object
   */
  static async validateUserSignin(req, res, next) {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).send({
        errors: [{
          message: 'Username field cannot be empty'
        }]
      });
    }
    if (!password) {
      return res.status(400).send({
        errors: [{
          message: 'Password field cannot be empty'
        }]
      });
    }
    const findUser = await Users.findOne({
      where: {
        username
      },
    });
    if (!findUser) {
      return res.status(400).send({
        errors: [{
          message: 'Incorrect login details'
        }]
      });
    }
    if (bcrypt.compareSync(req.body.password, findUser.password)) {
      next();
    } else {
      res.status(400).send({
        errors: [{
          message: 'Incorrect login details'
        }]
      });
    }
  }
  /**
   * @description check if userId in params is valid
   *
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {function} next - next
   *
   * @returns {object} Returns a JSON object
   */
  static async checkUserId(req, res, next) {
    const id = req.params.userId;
    if (Number.isNaN(parseInt(id, 10))) {
      return res.status(400).send({
        message: 'UserId parameter should be a number'
      });
    }
    const findUserById = await Users.findById(id);
    if (!findUserById) {
      return res.status(404).send({
        errors: [{
          message: 'User doesn\'t exist'
        }]
      });
    }
    next();
  }
  /**
   * @description check if recipe input is invalid
   *
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {function} next - next
   *
   * @returns {object} Returns a JSON object
   */
  static validateRecipeInput(req, res, next) {
    req.checkBody({
      name: {
        notEmpty: {
          options: true,
          errorMessage: 'Name field cannot be empty'
        },
        matches: {
          options: [(/^[A-Za-z0-9][^ ]+( [^]+)*$/g)],
          errorMessage: 'Invalid recipe name'
        }
      },
      description: {
        notEmpty: {
          options: true,
          errorMessage: 'Description field cannot be empty'
        },
        matches: {
          options: [(/^[A-Za-z0-9][^ ]+( [^]+)*$/g)],
          errorMessage: 'Invalid description format'
        }
      },
      ingredient: {
        notEmpty: {
          options: true,
          errorMessage: 'ingredient field cannot be empty'
        },
        matches: {
          options: [(/^[A-Za-z0-9][^ ]+( [^]+)*$/g)],
          errorMessage: 'Invalid ingredient format'
        }
      },
      image: {
        notEmpty: {
          options: true,
          errorMessage: 'Please upload an image for your recipes'
        }
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          message: error.msg,
          field: error.param
        });
      });
      return res.status(400).send({ errors: allErrors });
    }
    next();
  }
  /**
   * @description check if recipeId exist and is valid
   *
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {function} next - next
   *
   * @returns {object} Returns a JSON object
   */
  static async checkRecipeId(req, res, next) {
    const id = req.params.recipeId;
    if (Number.isNaN(parseInt(id, 10))) {
      return res.status(400).send({
        message: 'RecipeId parameter should be a number'
      });
    }
    const findRecipeId = await Recipes.findById(id);
    if (!findRecipeId) {
      return res.status(404).send({
        errors: [{
          message: 'Recipe does not exist in this catalog'
        }]
      });
    }
    next();
  }

  /**
   * @description check if reveiw input is valid
   *
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {function} next - next
   *
   * @returns {object} Returns a JSON object
   */
  static checkReviewInput(req, res, next) {
    req.checkBody({
      review: {
        notEmpty: {
          options: true,
          errorMessage: 'Please input a review'
        },
        matches: {
          options: [(/^[A-Za-z0-9][^ ]+( [^]+)*$/g)],
          errorMessage: 'You can\'t start a review with a space'
        }
      },
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          message: error.msg,
          field: error.param
        });
      });
      return res.status(400).send({ errors: allErrors });
    }
    next();
  }
  /**
   * @description check if user already have recipe with the same name
   *
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {function} next - next
   *
   * @returns {object} Returns a JSON object
   */
  static async checkRecipeName(req, res, next) {
    const recipeName = await Recipes.find({
      where: {
        name: {
          $ilike: req.body.name,
        },
        userId: req.decoded.id
      }
    });
    if (recipeName) {
      return res.status(400).send({
        errors: [{
          message: `you already have a recipe with the name ${req.body.name}`
        }]
      });
    }
    next();
  }

  /**
   * @description ensure the user doesn't submit the same content back to the database
   *
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {function} next - next
   *
   * @returns {object} Returns a JSON object
   */
  static async validateEditRecipe(req, res, next) {
    const {
      name, description, ingredient, image
    } = req.body;
    if (!name && !description && !ingredient && !image) {
      return res.status(400).send({
        errors: [{
          message: 'You haven\'t make any changes'
        }]
      });
    }
    next();
  }
}

export default Validation;
