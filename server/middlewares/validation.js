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
        success: false,
        message: 'Firstname field cannot be empty'
      });
    }
    if (!lastname) {
      return res.status(400).send({
        success: false,
        message: 'Lastname field cannot be empty'
      });
    }
    if (!username) {
      return res.status(400).send({
        success: false,
        message: 'Username field cannot be empty'
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: 'Email field cannot be empty'
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
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
          success: false,
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
  static async validateUsers(req, res, next) {
    const findUser = await Users.findOne({
      where: {
        username: req.body.username
      }
    });
    if (findUser) {
      return res.status(409).send({
        success: false,
        message: 'Username has already been chosen'
      });
    }
    const findEmail = await Users.findOne({
      where: {
        email: req.body.email
      }
    });
    if (findEmail) {
      return res.status(409).send({
        success: false,
        message: 'Email already exist'
      });
    }
    next();
  }
  /**
   * @description validate user login
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static async validateUserSignin(req, res, next) {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).send({
        success: false,
        message: 'Username field cannot be empty'
      });
    }
    if (!password) {
      return res.status(400).send({
        message: 'Password field cannot be empty'
      });
    }
    const findUser = await Users.findOne({
      where: {
        username
      },
    });
    if (!findUser) {
      return res.status(400).send({
        success: false,
        message: 'Incorrect Login details',
      });
    }
    if (bcrypt.compareSync(req.body.password, findUser.password)) {
      next();
    } else {
      res.status(400).send({
        success: false,
        message: 'Incorrect Login details',
      });
    }
  }
  /**
   * @description check if userId in params is valid
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static async checkUserId(req, res, next) {
    const id = req.params.userId;
    const findUserById = await Users.findById(id);
    if (Number.isNaN(parseInt(id, 10))) {
      return res.status(400).send({
        success: false,
        message: 'UserId parameter should be a number'
      });
    }
    if (!findUserById) {
      return res.status(404).send({
        success: false,
        message: 'User doesn\'t exist'
      });
    }
    next();
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
      name, description, ingredient, image
    } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: 'Name field cannot be empty'
      });
    }
    if (!description) {
      return res.status(400).send({
        success: false,
        message: 'Description field cannot be empty'
      });
    }
    if (!ingredient) {
      return res.status(400).send({
        success: false,
        message: 'ingredient field cannot be empty'
      });
    }
    if (!image) {
      return res.status(400).send({
        success: false,
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
      ingredient: {
        notEmpty: true,
        matches: {
          options: [(/^[A-Za-z0-9][^ ]+( [^]+)*$/g)],
          errorMessage: 'Invalid ingredient format'
        }
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          success: false,
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
  static async checkRecipeId(req, res, next) {
    const id = req.params.recipeId;
    if (Number.isNaN(parseInt(id, 10))) {
      return res.status(400).send({
        success: false,
        message: 'RecipeId parameter should be a number'
      });
    }
    const findRecipeId = await Recipes.findById(id);
    if (!findRecipeId) {
      return res.status(404).send({
        success: false,
        message: 'Recipe does not exist in this catalog'
      });
    }
    next();
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
        success: false,
        message: 'Please input a review'
      });
    }
    next();
  }
  /**
   * @description check if user already have recipe with the same name
   * @param  {object} req - request
   * @param  {object} res - response
   * @param  {object} next - next
   * @returns {JSON} Returns a JSON object
   */
  static async checkRecipeName(req, res, next) {
    const recipeName = await Recipes.find({
      where: {
        name: req.body.name,
        userId: req.decoded.id
      }
    });

    if (recipeName) {
      return res.status(400).send({
        success: false,
        message: `you already have a recipe with the name ${req.body.name}`,
      });
    }
    next();
  }
}

export default Validation;
