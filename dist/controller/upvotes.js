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

var Downvotes = _models2.default.Downvotes,
    Upvotes = _models2.default.Upvotes;
/**
 * @class Upvote
 */

var Upvote = function () {
  function Upvote() {
    _classCallCheck(this, Upvote);
  }

  _createClass(Upvote, null, [{
    key: 'upvoteRecipe',

    /**
     * @description Upvote a recipe
     *
     * @param {object} req HTTP request object
     * @param {object} res   HTTP response object
     *
     * @returns {object} object
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var id, downvoteStatus, downvotedRecipe, upvote, newUpvote;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = req.params.recipeId;
                downvoteStatus = 'notDownvoted';
                _context.next = 4;
                return Downvotes.find({
                  where: {
                    recipeId: id,
                    userId: req.decoded.id
                  }
                });

              case 4:
                downvotedRecipe = _context.sent;

                if (!downvotedRecipe) {
                  _context.next = 9;
                  break;
                }

                downvoteStatus = 'downvoted';
                _context.next = 9;
                return downvotedRecipe.destroy();

              case 9:
                _context.next = 11;
                return Upvotes.find({
                  where: {
                    recipeId: id,
                    userId: req.decoded.id
                  }
                });

              case 11:
                upvote = _context.sent;

                if (!upvote) {
                  _context.next = 16;
                  break;
                }

                _context.next = 15;
                return upvote.destroy();

              case 15:
                return _context.abrupt('return', res.status(200).send({
                  message: 'Recipe upvote successfully removed',
                  downvoteStatus: downvoteStatus
                }));

              case 16:
                _context.next = 18;
                return Upvotes.create({
                  recipeId: id,
                  userId: req.decoded.id
                });

              case 18:
                newUpvote = _context.sent;
                return _context.abrupt('return', res.status(201).send({
                  message: 'Recipe successfully upvoted',
                  data: newUpvote,
                  downvoteStatus: downvoteStatus
                }));

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function upvoteRecipe(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return upvoteRecipe;
    }()
  }]);

  return Upvote;
}();

exports.default = Upvote;