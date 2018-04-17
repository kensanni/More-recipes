'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var secret = process.env.JWT_SECRET;

var Users = _models2.default.Users;
/**
 * @class User
*/

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'signUp',

    /**
     * @description User signup method
     *
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     *
     * @returns {object} object
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, name, username, email, profileImage, password, createUser, payload, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, name = _req$body.name, username = _req$body.username, email = _req$body.email, profileImage = _req$body.profileImage;
                password = req.body.password;

                password = _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(10));
                _context.next = 5;
                return Users.create({
                  name: name,
                  username: username,
                  email: email,
                  password: password,
                  profileImage: profileImage
                });

              case 5:
                createUser = _context.sent;

                if (createUser) {
                  payload = { id: createUser.id, username: createUser.username, email: createUser.email };
                  token = _jsonwebtoken2.default.sign(payload, secret, {
                    expiresIn: '3h'
                  });

                  res.status(201).send({
                    message: 'User created',
                    token: token
                  });
                }

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function signUp(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return signUp;
    }()
    /**
     * @description User signin method
     *
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     *
     * @returns  {object} object
     */

  }, {
    key: 'signIn',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var findUserdetails, payload, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Users.findOne({
                  where: {
                    username: req.body.username
                  }
                });

              case 2:
                findUserdetails = _context2.sent;

                if (findUserdetails) {
                  payload = {
                    id: findUserdetails.id, username: findUserdetails.username, email: findUserdetails.email
                  };
                  token = _jsonwebtoken2.default.sign(payload, secret, {
                    expiresIn: '3h'
                  });

                  res.status(200).send({
                    message: 'Signin successful',
                    token: token
                  });
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function signIn(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return signIn;
    }()
  }]);

  return User;
}();

exports.default = User;