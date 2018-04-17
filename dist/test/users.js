'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;


_chai2.default.use(_chaiHttp2.default);

var doBeforeAll = function doBeforeAll() {
  before(function (done) {
    _models.Users.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
};

describe('Testing User endpoints', function () {
  doBeforeAll();
  it('Should create a new User', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: 'kehinde',
      username: 'sannikays',
      email: 'kennikay@example.com',
      password: 'developer',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      expect(res.body.message).equal('User created');
      expect(res).to.have.status(201);
      expect(res).to.be.an('object');
      expect(res.body).to.have.property('message').that.is.a('string');
      expect(res.body).to.have.property('token').that.is.a('string');
      expect(res.body.message).to.be.a('string');
      done();
    });
  });
  it('Should not create a new User without name', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: '',
      username: 'kennikay',
      email: 'kennikay@example.com',
      password: 'developer',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('name field cannot be empty');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.be.an('object');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors).to.be.an('array');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('Should not create a new User without username', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: 'kehinde',
      username: '',
      email: 'kennikay@example.com',
      password: 'developer',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Username field cannot be empty');
        expect(errors[0].message).to.be.a('string');
        expect(errors).to.be.an('array');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0]).to.be.an('object');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('Should not create a new User without email', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: 'kehinde',
      username: 'sannikay',
      email: '',
      password: 'developer',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Email field cannot be empty');
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0]).to.have.property('message').that.is.a('string');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('Should not create a new User without password', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: 'kehinde',
      username: 'sannikay',
      email: 'kennikay@example.com',
      password: '',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Password field cannot be empty');
        expect(errors[0]).to.be.an('object');
        expect(errors).to.be.an('array');
        expect(errors[0]).to.have.property('message').that.is.a('string');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('Should not create a new User without the required username length', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: 'kehinde',
      username: 'sanni',
      email: 'kennikay@example.com',
      password: 'developer',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Username should be atleast 6 characters');
        expect(errors[0]).to.be.an('object');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors).to.be.an('array');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('Should not create a new User without the required email format', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: 'kehinde',
      username: 'sannikay',
      email: 'kennikay.com',
      password: 'developer',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Please input a valid Email Adrress');
        expect(errors[0]).to.be.an('object');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors).to.be.an('array');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('Should not create a new User without the required password format', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: 'kehinde',
      username: 'sannikay',
      email: 'kennikay@example.com',
      password: 'deve',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0].message).equal('Please input a valid password with atleast 8 characters');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('Should not create a new User with invalid username', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: 'kehinde',
      username: '   sanni',
      email: 'kennikay@example.com',
      password: 'developer',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).equal('Invalid Username, kindly ensure your username is alphanumeric');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('Should not create a new User with invalid password', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: 'kehinde',
      username: 'sannikay',
      email: 'kennikay@example.com',
      password: '  deve  loper',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).equal('Invalid password, ensure your password contain only uppercase, lowercase or any special character');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('Should not create a new User with existing username', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: 'kehinde',
      username: 'sannikays',
      email: 'kennikay@example.com',
      password: 'developer',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Username has already been chosen');
        expect(errors).to.be.an('array');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0]).to.be.an('object');
      }
      expect(res).to.have.status(409);
      done();
    });
  });
  it('Should not create a new User with existing email', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      name: 'kehinde',
      username: 'sannikayz',
      email: 'kennikay@example.com',
      password: 'developer',
      profileImage: 'dummydata'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Email already exist');
        expect(errors).to.be.an('array');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0]).to.be.an('object');
      }
      expect(res).to.have.status(409);
      done();
    });
  });
  it('should login a user', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      username: 'sannikays',
      password: 'developer'
    }).end(function (err, res) {
      expect(res.body.message).equal('Signin successful');
      expect(res.body).to.have.property('message').that.is.a('string');
      expect(res.body).to.be.an('object');
      done();
    });
  });
  it('should not login a user without username', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      username: '',
      password: 'developer'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Username field cannot be empty');
        expect(errors[0]).to.be.an('object');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors).to.be.an('array');
      }
      done();
    });
  });
  it('should not login a user without password', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      username: 'sannikay',
      password: ''
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Password field cannot be empty');
        expect(errors[0]).to.be.an('object');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors).to.be.an('array');
      }
      done();
    });
  });
  it('should not login a user with invalid username', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      username: 'sannika',
      password: 'developer'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Incorrect login details');
        expect(errors).to.be.an('array');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0]).to.be.an('object');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should not login a user with invalid password', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      username: 'sannikay',
      password: 'develo'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Incorrect login details');
        expect(errors[0]).to.be.an('object');
        expect(errors).to.be.an('array');
        expect(errors[0]).to.have.property('message').that.is.a('string');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
});