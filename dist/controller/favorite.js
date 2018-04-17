'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _updateMultipleRecipeAttributes = require('../helpers/updateMultipleRecipeAttributes');

var _updateMultipleRecipeAttributes2 = _interopRequireDefault(_updateMultipleRecipeAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Favorites = _models2.default.Favorites,
    Recipes = _models2.default.Recipes;
/**
 * @class Favorite
*/

var Favorite = function () {
  function Favorite() {
    _classCallCheck(this, Favorite);
  }

  _createClass(Favorite, null, [{
    key: 'addFavorite',

    /**
     * @description Adds a recipe into favorite
     *
     * @param {object} req HTTP request object
     * @param {object} res   HTTP response object
     *
     * @returns {object} return a json object
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var findFavRecipe, addFavorite;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Favorites.find({
                  where: {
                    recipeId: req.params.recipeId,
                    userId: req.decoded.id
                  }
                });

              case 2:
                findFavRecipe = _context.sent;

                if (!findFavRecipe) {
                  _context.next = 6;
                  break;
                }

                findFavRecipe.destroy();
                return _context.abrupt('return', res.status(200).send({
                  success: true,
                  message: 'Recipe successfully unfavorited',
                  type: 0
                }));

              case 6:
                _context.next = 8;
                return Favorites.create({
                  recipeId: req.params.recipeId,
                  userId: req.decoded.id
                });

              case 8:
                addFavorite = _context.sent;
                return _context.abrupt('return', res.status(201).send({
                  success: true,
                  message: 'recipe sucessfully added to favorite',
                  type: 1,
                  data: addFavorite
                }));

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addFavorite(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return addFavorite;
    }()
    /**
     * @description get favorite recipe from database
     *
     * @param {object} req HTTP request object
     * @param {object} res   HTTP response object
     *
     * @returns {object} return a json object
     */

  }, {
    key: 'getFavorite',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var limit, offset, pages, pageNo, findAndCountFavorites, getFavoritesRecipes, count, recipeIds, recipes;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                limit = req.query.limit || 6;
                offset = void 0;
                pages = void 0;
                pageNo = void 0;
                _context2.next = 6;
                return Favorites.findAndCountAll({
                  where: {
                    userId: req.decoded.id
                  }
                });

              case 6:
                findAndCountFavorites = _context2.sent;


                if (findAndCountFavorites) {
                  pages = Math.ceil(findAndCountFavorites.count / limit);
                  pageNo = parseInt(req.query.page, 10);
                  pageNo = Number.isInteger(pageNo) && pageNo > 0 ? pageNo : 0;
                  offset = pageNo * limit;
                }
                _context2.next = 10;
                return Favorites.findAll({
                  where: {
                    userId: req.decoded.id
                  },
                  limit: limit,
                  offset: offset
                });

              case 10:
                getFavoritesRecipes = _context2.sent;
                count = findAndCountFavorites.count;
                recipeIds = getFavoritesRecipes.map(function (favorite) {
                  return favorite.recipeId;
                });
                _context2.next = 15;
                return Recipes.findAll({
                  where: {
                    id: _defineProperty({}, _models2.default.Sequelize.Op.in, recipeIds)
                  }
                });

              case 15:
                recipes = _context2.sent;
                _context2.t0 = res.status(200);
                _context2.next = 19;
                return (0, _updateMultipleRecipeAttributes2.default)(recipes);

              case 19:
                _context2.t1 = _context2.sent;
                _context2.t2 = pages;
                _context2.t3 = count;
                _context2.t4 = {
                  success: true,
                  data: _context2.t1,
                  pages: _context2.t2,
                  count: _context2.t3
                };
                return _context2.abrupt('return', _context2.t0.send.call(_context2.t0, _context2.t4));

              case 24:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getFavorite(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getFavorite;
    }()
  }]);

  return Favorite;
}();

exports.default = Favorite;