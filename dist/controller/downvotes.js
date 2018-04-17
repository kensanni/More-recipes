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
 * @class Downvote
 */

var Downvote = function () {
  function Downvote() {
    _classCallCheck(this, Downvote);
  }

  _createClass(Downvote, null, [{
    key: 'downvoteRecipe',

    /**
     * @description Downvote a recipe
     *
     * @param {object} req HTTP request object
     * @param {object} res   HTTP response object
     *
     * @returns {object} returns a JSON object
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var id, upvoteStatus, upvotedRecipe, downvote, newDownvote;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = req.params.recipeId;
                upvoteStatus = 'notUpvoted';
                _context.next = 4;
                return Upvotes.find({
                  where: {
                    recipeId: id,
                    userId: req.decoded.id
                  }
                });

              case 4:
                upvotedRecipe = _context.sent;

                if (!upvotedRecipe) {
                  _context.next = 9;
                  break;
                }

                upvoteStatus = 'upvoted';
                _context.next = 9;
                return upvotedRecipe.destroy();

              case 9:
                _context.next = 11;
                return Downvotes.find({
                  where: {
                    recipeId: id,
                    userId: req.decoded.id
                  }
                });

              case 11:
                downvote = _context.sent;

                if (!downvote) {
                  _context.next = 16;
                  break;
                }

                _context.next = 15;
                return downvote.destroy();

              case 15:
                return _context.abrupt('return', res.status(200).send({
                  message: 'Recipe downvote successfully removed',
                  upvoteStatus: upvoteStatus
                }));

              case 16:
                _context.next = 18;
                return Downvotes.create({
                  recipeId: id,
                  userId: req.decoded.id
                });

              case 18:
                newDownvote = _context.sent;
                return _context.abrupt('return', res.status(200).send({
                  message: 'Recipe successfully downvoted',
                  data: newDownvote,
                  upvoteStatus: upvoteStatus
                }));

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function downvoteRecipe(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return downvoteRecipe;
    }()
  }]);

  return Downvote;
}();

exports.default = Downvote;