'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var secret = process.env.JWT_SECRET;

var authenticaton = {

  /**
   * @description verify user identity
   *
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - proceed to next function
   *
   * @returns {object} return an object
   */

  verifyUser: function verifyUser(req, res, next) {
    var token = req.headers['x-access-token'] || req.headers.token;
    if (!token) {
      return res.status(403).send({
        success: false,
        message: 'Not Authorized'
      });
    }
    _jsonwebtoken2.default.verify(token, secret, function (error, decoded) {
      if (error) {
        return res.status(401).send({
          success: false,
          message: 'Invalid token'
        });
      }
      req.decoded = decoded;
      next();
    });
  }
};
exports.default = authenticaton;