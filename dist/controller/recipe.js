'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _updateRecipeAttributes = require('../helpers/updateRecipeAttributes');

var _updateRecipeAttributes2 = _interopRequireDefault(_updateRecipeAttributes);

var _updateMultipleRecipeAttributes = require('../helpers/updateMultipleRecipeAttributes');

var _updateMultipleRecipeAttributes2 = _interopRequireDefault(_updateMultipleRecipeAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipes = _models2.default.Recipes;

/**
 * @class Recipe
*/

var Recipe = function () {
  function Recipe() {
    _classCallCheck(this, Recipe);
  }

  _createClass(Recipe, null, [{
    key: 'addRecipes',

    /**
     * @description Adds a recipe
     *
     * @param {object} req HTTP request object
     * @param {object} res   HTTP response object
     *
     * @returns {object} return a json object
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, name, description, ingredient, image, addRecipes;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, name = _req$body.name, description = _req$body.description, ingredient = _req$body.ingredient, image = _req$body.image;
                _context.next = 3;
                return Recipes.create({
                  userId: req.decoded.id,
                  name: name,
                  description: description,
                  ingredient: ingredient,
                  image: image
                });

              case 3:
                addRecipes = _context.sent;
                return _context.abrupt('return', res.status(201).send({
                  message: 'Recipe successfully created',
                  data: addRecipes
                }));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addRecipes(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return addRecipes;
    }()
    /**
     * @description modify a recipe
     *
     * @param {object} req HTTP request object
     * @param {object} res  HTTP response object
     *
     * @returns {object} return a json object
     */

  }, {
    key: 'modifyRecipe',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, name, description, ingredient, image, findRecipe;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, ingredient = _req$body2.ingredient, image = _req$body2.image;
                _context2.next = 3;
                return Recipes.findById(req.params.recipeId);

              case 3:
                findRecipe = _context2.sent;
                _context2.next = 6;
                return findRecipe.update({
                  name: name || findRecipe.name,
                  description: description || findRecipe.description,
                  ingredient: ingredient || findRecipe.ingredient,
                  image: image || findRecipe.image
                });

              case 6:
                return _context2.abrupt('return', res.status(200).send({
                  message: 'Recipe updated successfully',
                  data: findRecipe
                }));

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function modifyRecipe(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return modifyRecipe;
    }()
    /**
     * @description get all recipe
     *
     * @param {object} req HTTP request object
     * @param {object} res  HTTP response object
     *
     * @returns {object} return a json object
     */

  }, {
    key: 'getRecipes',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var limit, page, offset, pages, pageNo, findAndCount, getAllRecipes, updatedRecipes;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                limit = parseInt(req.query.limit || 6, 10);
                page = parseInt(req.query.page, 10);
                offset = void 0;
                pages = void 0;
                pageNo = void 0;

                if (!(Number.isNaN(limit) || Number.isNaN(page))) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', res.status(400).send({
                  error: 'Parameters should be a number'
                }));

              case 7:
                _context3.next = 9;
                return Recipes.findAndCountAll();

              case 9:
                findAndCount = _context3.sent;


                if (findAndCount) {
                  pages = Math.ceil(findAndCount.count / limit);
                  pageNo = page;
                  pageNo = Number.isInteger(pageNo) && pageNo > 0 ? pageNo : 0;
                  offset = pageNo * limit;
                }

                _context3.next = 13;
                return Recipes.findAll({
                  limit: limit,
                  offset: offset
                });

              case 13:
                getAllRecipes = _context3.sent;

                if (!(getAllRecipes.length < 1)) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt('return', res.status(404).send({
                  message: 'No Recipe found'
                }));

              case 16:
                if (!getAllRecipes) {
                  _context3.next = 21;
                  break;
                }

                _context3.next = 19;
                return (0, _updateMultipleRecipeAttributes2.default)(getAllRecipes);

              case 19:
                updatedRecipes = _context3.sent;
                return _context3.abrupt('return', res.status(200).send({
                  recipesData: updatedRecipes,
                  pages: pages
                }));

              case 21:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRecipes(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return getRecipes;
    }()
    /**
       * @description get one recipe
       *
       * @param {object} req HTTP request object
       * @param {object} res  HTTP response object
       *
       * @returns {object} Returns a JSON object
       */

  }, {
    key: 'getARecipe',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, recipe, updatedRecipe;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.recipeId;
                _context4.next = 3;
                return Recipes.findOne({
                  where: { id: id }
                });

              case 3:
                recipe = _context4.sent;

                if (!(recipe.length < 1)) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt('return', res.status(404).send({
                  message: 'No Recipe found'
                }));

              case 6:
                _context4.next = 8;
                return recipe.increment('views');

              case 8:
                _context4.next = 10;
                return (0, _updateRecipeAttributes2.default)(recipe);

              case 10:
                updatedRecipe = _context4.sent;
                return _context4.abrupt('return', res.status(200).send({
                  recipeData: updatedRecipe
                }));

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getARecipe(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return getARecipe;
    }()
    /**
     * @description get user recipes
     *
     * @param {object} req HTTP request object
     * @param {object} res HTTP responds object
     *
     * @return {object} return a json object
     */

  }, {
    key: 'getUserRecipes',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var offset, pages, pageNo, limit, userId, id, page, findAndCountUserRecipes, count, userRecipe;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                offset = void 0;
                pages = void 0;
                pageNo = void 0;
                limit = req.query.limit || 6;
                userId = req.decoded.id;
                id = parseInt(req.params.userId, 10);
                page = parseInt(req.query.page, 10);

                if (!(userId !== id)) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt('return', res.status(401).send({
                  message: 'Access denied'
                }));

              case 9:
                if (!(Number.isNaN(limit) || Number.isNaN(page))) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt('return', res.status(400).send({
                  error: 'Parameters should be a number'
                }));

              case 11:
                _context5.next = 13;
                return Recipes.findAndCountAll({
                  where: {
                    userId: req.decoded.id
                  }
                });

              case 13:
                findAndCountUserRecipes = _context5.sent;
                count = findAndCountUserRecipes.count;


                if (findAndCountUserRecipes) {
                  pages = Math.ceil(findAndCountUserRecipes.count / limit);
                  pageNo = page;
                  pageNo = Number.isInteger(pageNo) && pageNo > 0 ? pageNo : 0;
                  offset = pageNo * limit;
                }

                _context5.next = 18;
                return Recipes.findAll({
                  where: { userId: userId },
                  limit: limit,
                  offset: offset
                });

              case 18:
                userRecipe = _context5.sent;

                if (!(userRecipe.length < 1)) {
                  _context5.next = 21;
                  break;
                }

                return _context5.abrupt('return', res.status(404).send({
                  message: 'No Recipe found'
                }));

              case 21:
                return _context5.abrupt('return', res.status(200).send({
                  recipesData: userRecipe,
                  pages: pages,
                  count: count
                }));

              case 22:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getUserRecipes(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return getUserRecipes;
    }()
    /**
     * @description delete a recipe
     *
     * @param {object} req HTTP request object
     * @param {object} res  HTTP response object
     *
     * @returns  {object} Returns a JSON object
     */

  }, {
    key: 'deleteRecipes',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var findRecipe;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Recipes.find({
                  where: {
                    id: req.params.recipeId,
                    userId: req.decoded.id
                  }
                });

              case 2:
                findRecipe = _context6.sent;

                if (findRecipe) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt('return', res.status(403).send({
                  message: 'Access denied, you are not allowed to delete this recipe'
                }));

              case 5:
                _context6.next = 7;
                return findRecipe.destroy();

              case 7:
                return _context6.abrupt('return', res.status(200).send({
                  message: 'Recipe successfully deleted'
                }));

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function deleteRecipes(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return deleteRecipes;
    }()
    /**
     * @description
     *
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     *
     * @returns {object} return a json object
     */

  }, {
    key: 'popularRecipes',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var getRecipes, updatedRecipes, recipes;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return Recipes.findAll();

              case 2:
                getRecipes = _context7.sent;
                _context7.next = 5;
                return (0, _updateMultipleRecipeAttributes2.default)(getRecipes);

              case 5:
                updatedRecipes = _context7.sent;
                recipes = updatedRecipes.sort(function (a, b) {
                  return b.dataValues.favorites - a.dataValues.favorites;
                });
                return _context7.abrupt('return', res.status(200).send({
                  recipesData: recipes.splice(0, 3)
                }));

              case 8:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function popularRecipes(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return popularRecipes;
    }()

    /**
     * @description
     *
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     *
     * @returns {object} return a json object
     */

  }, {
    key: 'recipeSearch',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var Op, findRecipes;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                Op = _sequelize2.default.Op;
                _context8.next = 3;
                return Recipes.findAll({
                  where: _defineProperty({}, Op.or, [{
                    name: _defineProperty({}, Op.iLike, '%' + req.query.recipe + '%')
                  }, {
                    ingredient: _defineProperty({}, Op.iLike, '%' + req.query.recipe + '%')
                  }])
                });

              case 3:
                findRecipes = _context8.sent;

                if (!(findRecipes.length === 0)) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt('return', res.status(404).send({
                  message: 'recipe not found'
                }));

              case 6:
                return _context8.abrupt('return', res.status(200).send({
                  searchResult: findRecipes
                }));

              case 7:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function recipeSearch(_x15, _x16) {
        return _ref8.apply(this, arguments);
      }

      return recipeSearch;
    }()
  }]);

  return Recipe;
}();

exports.default = Recipe;