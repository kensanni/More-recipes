'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('./../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @description count the length of favorite upvotes and downvotes and append it to a single recipe
 *
 * @param {object} sequelizeRecipe
 *
 * @returns {object} object
 */

var Upvotes = _models2.default.Upvotes,
    Downvotes = _models2.default.Downvotes,
    Favorites = _models2.default.Favorites;


var updateRecipeAttributes = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sequelizeRecipe) {
    var recipe, upvotes, downvotes, favorites;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            recipe = sequelizeRecipe.get();
            _context.next = 3;
            return Upvotes.findAll({
              where: {
                recipeId: sequelizeRecipe.id
              }
            });

          case 3:
            upvotes = _context.sent;
            _context.next = 6;
            return Downvotes.findAll({
              where: {
                recipeId: sequelizeRecipe.id
              }
            });

          case 6:
            downvotes = _context.sent;
            _context.next = 9;
            return Favorites.findAll({
              where: {
                recipeId: sequelizeRecipe.id
              }
            });

          case 9:
            favorites = _context.sent;


            recipe.upvotes = upvotes.length;
            recipe.downvotes = downvotes.length;
            recipe.favorites = favorites.length;
            return _context.abrupt('return', sequelizeRecipe);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function updateRecipeAttributes(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = updateRecipeAttributes;