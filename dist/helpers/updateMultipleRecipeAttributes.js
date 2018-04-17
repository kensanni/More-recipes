'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _updateRecipeAttributes = require('../helpers/updateRecipeAttributes');

var _updateRecipeAttributes2 = _interopRequireDefault(_updateRecipeAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @description count the length of favorite upvotes and downvotes and append it to all recipes
 *
 * @param {object} sequelizeRecipe
 *
 * @returns {object} object
 */
var updateMultipleRecipeAttributes = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sequelizeRecipe) {
    var arrayOfPromises, results;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            arrayOfPromises = sequelizeRecipe.map(function (recipe) {
              return (0, _updateRecipeAttributes2.default)(recipe);
            });
            _context.next = 3;
            return Promise.all(arrayOfPromises);

          case 3:
            results = _context.sent;
            return _context.abrupt('return', results);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function updateMultipleRecipeAttributes(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = updateMultipleRecipeAttributes;