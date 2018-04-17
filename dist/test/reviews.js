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

_models.Reviews.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

var value = void 0;

describe('Testing API endpoints associated with review', function () {
  it('should login a user', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      username: 'sannikays',
      password: 'developer'
    }).end(function (err, res) {
      expect(res.body.message).equal('Signin successful');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      expect(res.body).to.have.all.keys('message', 'token');
      value = res.body.token;
      done();
    });
  });
  it('should add recipe with authorization', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set('x-access-token', value).send({
      name: 'Rice',
      description: 'Boil for three mins',
      ingredient: 'Rice, water, pepper',
      image: 'dummy'
    }).end(function (err, res) {
      expect(res.body.message).equal('Recipe successfully created');
      expect(res.body.data).to.be.an('object');
      expect(res.body).to.have.all.keys('message', 'data');
      expect(res.body).to.have.property('data').that.is.an('object');
      expect(res).to.have.status(201);
      done();
    });
  });
  it('Should validate review input', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes/2/reviews').set('x-access-token', value).send({
      userId: 1,
      recipeId: 2,
      review: ''
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Please input a review');
        expect(errors[0].message).to.be.a('string');
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0]).to.have.property('message').that.is.a('string');
      }
      done();
    });
  });
  it('should give error when trying to post a review with invalid recipeId datatype', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes/nan/reviews').set('x-access-token', value).send({
      review: 'awesome'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body.message).equal('RecipeId parameter should be a number');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      done();
    });
  });
  it('should give error when trying to post a review for recipe that doesn\'t exist', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes/20/reviews').set('x-access-token', value).send({
      review: 'awesome'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0].message).equal('Recipe does not exist in this catalog');
        expect(errors[0]).to.be.an('object');
        expect(errors).to.be.an('array');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.have.property('message').that.is.a('string');
      }
      expect(res).to.have.status(404);
      done();
    });
  });
  it('Should not post a review without authentication', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes/1/reviews').send({
      recipeId: 1,
      userId: 1
    }).end(function (err, res) {
      expect(res).to.have.status(403);
      expect(res.body.message).equal('Not Authorized');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      done();
    });
  });
  it('Should add a new review for recipe with authentication', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes/2/reviews').set('x-access-token', value).send({
      userId: 1,
      recipeId: 1,
      username: 'sannikays',
      review: 'awesome recipe'
    }).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body.message).equal('Review posted succesfully');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      done();
    });
  });
});