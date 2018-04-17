'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var Recipes = _models2.default.Recipes,
    Users = _models2.default.Users;

/**
 * @class Validation
 */

var Validation = function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: 'validateUserInput',

    /**
     * @description ensure user input matches the correct pattern
     *
     * @param  {object} req - request
     * @param  {object} res - response
     * @param  {function} next - next
     *
     * @returns {object} Returns a JSON object
     */
    value: function validateUserInput(req, res, next) {
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
            options: [/^[A-Za-z][^ ]+( [^]+)*$/g],
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
            options: [/^[A-Za-z0-9]+$/g],
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
            options: [/^([^ ]+)*$/g],
            errorMessage: 'Invalid password, ensure your password contain only uppercase, lowercase or any special character'
          }
        }
      });
      var errors = req.validationErrors();
      if (errors) {
        var allErrors = [];
        errors.forEach(function (error) {
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

  }, {
    key: 'validateUsers',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var findUser, findEmail;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Users.findOne({
                  where: {
                    username: req.body.username
                  }
                });

              case 2:
                findUser = _context.sent;

                if (!findUser) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', res.status(409).send({
                  errors: [{
                    message: 'Username has already been chosen'
                  }]
                }));

              case 5:
                _context.next = 7;
                return Users.findOne({
                  where: {
                    email: req.body.email
                  }
                });

              case 7:
                findEmail = _context.sent;

                if (!findEmail) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', res.status(409).send({
                  errors: [{
                    message: 'Email already exist'
                  }]
                }));

              case 10:
                next();

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validateUsers(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return validateUsers;
    }()
    /**
     * @description validate user login
     *
     * @param  {object} req - request
     * @param  {object} res - response
     * @param  {function} next - next
     *
     * @returns {object} Returns a JSON object
     */

  }, {
    key: 'validateUserSignin',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var _req$body, username, password, findUser;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, username = _req$body.username, password = _req$body.password;

                if (username) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return', res.status(400).send({
                  errors: [{
                    message: 'Username field cannot be empty'
                  }]
                }));

              case 3:
                if (password) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', res.status(400).send({
                  errors: [{
                    message: 'Password field cannot be empty'
                  }]
                }));

              case 5:
                _context2.next = 7;
                return Users.findOne({
                  where: {
                    username: username
                  }
                });

              case 7:
                findUser = _context2.sent;

                if (findUser) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt('return', res.status(400).send({
                  errors: [{
                    message: 'Incorrect login details'
                  }]
                }));

              case 10:
                if (_bcrypt2.default.compareSync(req.body.password, findUser.password)) {
                  next();
                } else {
                  res.status(400).send({
                    errors: [{
                      message: 'Incorrect login details'
                    }]
                  });
                }

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function validateUserSignin(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return validateUserSignin;
    }()
    /**
     * @description check if userId in params is valid
     *
     * @param  {object} req - request
     * @param  {object} res - response
     * @param  {function} next - next
     *
     * @returns {object} Returns a JSON object
     */

  }, {
    key: 'checkUserId',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
        var id, findUserById;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.userId;

                if (!Number.isNaN(parseInt(id, 10))) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt('return', res.status(400).send({
                  message: 'UserId parameter should be a number'
                }));

              case 3:
                _context3.next = 5;
                return Users.findById(id);

              case 5:
                findUserById = _context3.sent;

                if (findUserById) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt('return', res.status(404).send({
                  errors: [{
                    message: 'User doesn\'t exist'
                  }]
                }));

              case 8:
                next();

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function checkUserId(_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      }

      return checkUserId;
    }()
    /**
     * @description check if recipe input is invalid
     *
     * @param  {object} req - request
     * @param  {object} res - response
     * @param  {function} next - next
     *
     * @returns {object} Returns a JSON object
     */

  }, {
    key: 'validateRecipeInput',
    value: function validateRecipeInput(req, res, next) {
      req.checkBody({
        name: {
          notEmpty: {
            options: true,
            errorMessage: 'Name field cannot be empty'
          },
          matches: {
            options: [/^[A-Za-z0-9][^ ]+( [^]+)*$/g],
            errorMessage: 'Invalid recipe name'
          }
        },
        description: {
          notEmpty: {
            options: true,
            errorMessage: 'Description field cannot be empty'
          },
          matches: {
            options: [/^[A-Za-z0-9][^ ]+( [^]+)*$/g],
            errorMessage: 'Invalid description format'
          }
        },
        ingredient: {
          notEmpty: {
            options: true,
            errorMessage: 'ingredient field cannot be empty'
          },
          matches: {
            options: [/^[A-Za-z0-9][^ ]+( [^]+)*$/g],
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
      var errors = req.validationErrors();
      if (errors) {
        var allErrors = [];
        errors.forEach(function (error) {
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

  }, {
    key: 'checkRecipeId',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
        var id, findRecipeId;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.recipeId;

                if (!Number.isNaN(parseInt(id, 10))) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt('return', res.status(400).send({
                  message: 'RecipeId parameter should be a number'
                }));

              case 3:
                _context4.next = 5;
                return Recipes.findById(id);

              case 5:
                findRecipeId = _context4.sent;

                if (findRecipeId) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt('return', res.status(404).send({
                  errors: [{
                    message: 'Recipe does not exist in this catalog'
                  }]
                }));

              case 8:
                next();

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function checkRecipeId(_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
      }

      return checkRecipeId;
    }()

    /**
     * @description check if reveiw input is valid
     *
     * @param  {object} req - request
     * @param  {object} res - response
     * @param  {function} next - next
     *
     * @returns {object} Returns a JSON object
     */

  }, {
    key: 'checkReviewInput',
    value: function checkReviewInput(req, res, next) {
      req.checkBody({
        review: {
          notEmpty: {
            options: true,
            errorMessage: 'Please input a review'
          },
          matches: {
            options: [/^[A-Za-z0-9][^ ]+( [^]+)*$/g],
            errorMessage: 'You can\'t start a review with a space'
          }
        }
      });
      var errors = req.validationErrors();
      if (errors) {
        var allErrors = [];
        errors.forEach(function (error) {
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

  }, {
    key: 'checkRecipeName',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
        var recipeName;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Recipes.find({
                  where: {
                    name: {
                      $ilike: req.body.name
                    },
                    userId: req.decoded.id
                  }
                });

              case 2:
                recipeName = _context5.sent;

                if (!recipeName) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt('return', res.status(400).send({
                  errors: [{
                    message: 'you already have a recipe with the name ' + req.body.name
                  }]
                }));

              case 5:
                next();

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function checkRecipeName(_x13, _x14, _x15) {
        return _ref5.apply(this, arguments);
      }

      return checkRecipeName;
    }()

    /**
     * @description ensure the user doesn't submit the same content back to the database
     *
     * @param  {object} req - request
     * @param  {object} res - response
     * @param  {function} next - next
     *
     * @returns {object} Returns a JSON object
     */

  }, {
    key: 'validateEditRecipe',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
        var _req$body2, name, description, ingredient, image;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, ingredient = _req$body2.ingredient, image = _req$body2.image;

                if (!(!name && !description && !ingredient && !image)) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt('return', res.status(400).send({
                  errors: [{
                    message: 'You haven\'t make any changes'
                  }]
                }));

              case 3:
                next();

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function validateEditRecipe(_x16, _x17, _x18) {
        return _ref6.apply(this, arguments);
      }

      return validateEditRecipe;
    }()
  }]);

  return Validation;
}();

exports.default = Validation;