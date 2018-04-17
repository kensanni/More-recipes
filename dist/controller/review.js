'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reviews = _models2.default.Reviews,
    Recipes = _models2.default.Recipes;

/**
 * @class Review
*/

var Review = function () {
  function Review() {
    _classCallCheck(this, Review);
  }

  _createClass(Review, null, [{
    key: 'addReview',

    /**
     * @description Add  a review for recipes
     *
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     *
     * @returns {object} object
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var review, findRecipe, addReview;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                review = req.body.review;
                _context.next = 3;
                return Recipes.findById(req.params.recipeId);

              case 3:
                findRecipe = _context.sent;
                _context.next = 6;
                return Reviews.create({
                  recipeId: req.params.recipeId,
                  username: req.decoded.username,
                  review: review,
                  userId: req.decoded.id
                });

              case 6:
                addReview = _context.sent;

                if (findRecipe) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt('return', res.status(404).send({
                  success: false,
                  message: 'Recipe not found'
                }));

              case 9:
                return _context.abrupt('return', res.status(201).send({
                  success: true,
                  message: 'Review posted succesfully',
                  data: addReview
                }));

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addReview(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return addReview;
    }()

    /**
     * @description get all paginated reviews
     *
     * @param {object} req
     * @param {object} res
     *
     * @returns {void}
     */

  }, {
    key: 'getReviews',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var limit, page, recipeId, offset, pages, pageNo, findAndCount, getAllReviews;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                limit = parseInt(req.query.limit || 30, 10);
                page = parseInt(req.query.page, 10);
                recipeId = req.params.recipeId;
                offset = void 0;
                pages = void 0;
                pageNo = void 0;

                if (!(Number.isNaN(limit) || Number.isNaN(page))) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return', res.status(400).send({
                  error: 'Parameters should be a number'
                }));

              case 8:
                _context2.next = 10;
                return Reviews.findAndCountAll({
                  where: {
                    recipeId: recipeId
                  }
                });

              case 10:
                findAndCount = _context2.sent;


                if (findAndCount) {
                  pages = Math.ceil(findAndCount.count / limit);
                  pageNo = page;
                  pageNo = Number.isInteger(pageNo) && pageNo > 0 ? pageNo : 0;
                  offset = pageNo * limit;
                }

                _context2.next = 14;
                return Reviews.findAll({
                  where: { recipeId: recipeId },
                  limit: limit,
                  offset: offset
                });

              case 14:
                getAllReviews = _context2.sent;

                if (!(getAllReviews.length < 1)) {
                  _context2.next = 17;
                  break;
                }

                return _context2.abrupt('return', res.status(404).send({
                  message: 'Reviews not found'
                }));

              case 17:
                return _context2.abrupt('return', res.status(200).send({
                  getAllReviews: getAllReviews,
                  pages: pages
                }));

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getReviews(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getReviews;
    }()
  }]);

  return Review;
}();

exports.default = Review;