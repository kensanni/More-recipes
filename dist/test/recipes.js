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

_models.Recipes.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

var value = void 0;

describe('Testing recipe endpoints', function () {
  it('should login a user', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signin').send({
      username: 'sannikays',
      password: 'developer'
    }).end(function (err, res) {
      expect(res.body.message).equal('Signin successful');
      expect(res.body).to.have.property('message').that.is.a('string');
      expect(res.body.message).to.be.a('string');
      value = res.body.token;
      done();
    });
  });
  it('should add not recipe without authorization', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').end(function (err, res) {
      expect(res).to.have.status(403);
      expect(res.body.message).equal('Not Authorized');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.an('object');
      expect(res.body).to.have.property('message').that.is.a('string');
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
      expect(res.body.data).to.have.all.keys('id', 'name', 'description', 'ingredient', 'image', 'updatedAt', 'userId', 'createdAt', 'views');
      expect(res.body).to.have.property('data').that.is.an('object');
      expect(res).to.have.status(201);
      done();
    });
  });
  it('should not add recipe without name', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set('x-access-token', value).send({
      name: '',
      description: 'Boil for three mins',
      ingredient: 'Rice, water, pepper',
      image: 'dummy'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).to.be.a('string');
        expect(errors).to.be.an('array');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0].message).equal('Name field cannot be empty');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should not add recipe without description', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set('x-access-token', value).send({
      name: 'Rice',
      description: '',
      ingredient: 'Rice, water, pepper',
      image: 'dummy'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0].message).equal('Description field cannot be empty');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should not add recipe without ingredient', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set('x-access-token', value).send({
      name: 'Rice',
      description: 'simpe dish',
      ingredient: '',
      image: 'dummy'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0].message).equal('ingredient field cannot be empty');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should not add recipe without image', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set('x-access-token', value).send({
      name: 'Rice',
      description: 'simpe dish',
      ingredient: 'Rice water maggi',
      image: ''
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0].message).equal('Please upload an image for your recipes');
      }
      expect(res).to.have.status(400);
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
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0].message).equal('you already have a recipe with the name Rice');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should not add recipe with invalid name', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set('x-access-token', value).send({
      name: '  Rice',
      description: 'simpe dish',
      ingredient: 'Rice water maggi',
      image: 'dummy.com'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0].message).equal('Invalid recipe name');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should not add recipe with invalid description', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set('x-access-token', value).send({
      name: 'Rice',
      description: '  simpe dish',
      ingredient: 'Rice water maggi',
      image: 'dummy.com'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0].message).equal('Invalid description format');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should not add recipe with invalid ingredient', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/recipes').set('x-access-token', value).send({
      name: 'Rice',
      description: 'simpe dish',
      ingredient: '  Rice water maggi',
      image: 'dummy.com'
    }).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0].message).equal('Invalid ingredient format');
      }
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should not modify recipe without authorization', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/recipes/1').end(function (err, res) {
      expect(res).to.have.status(403);
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      expect(res.body.message).equal('Not Authorized');
      done();
    });
  });
  it('should modify recipe with authorization', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/recipes/1').set('x-access-token', value).send({
      name: 'Yam',
      description: 'Boil for three mins',
      ingredient: 'Rice, water, pepper',
      image: 'dummy'
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      expect(res.body.data).to.have.all.keys('id', 'name', 'description', 'ingredient', 'image', 'updatedAt', 'userId', 'createdAt', 'views');
      expect(res.body.message).equal('Recipe updated successfully');
      done();
    });
  });
  it('should not modify recipe with invalid recipeId', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/recipes/nan').set('x-access-token', value).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message').that.is.a('string');
      expect(res.body.message).equal('RecipeId parameter should be a number');
      done();
    });
  });
  it('should send an error message for recipe that doesn\'t exist', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/recipes/10').set('x-access-token', value).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0].message).equal('Recipe does not exist in this catalog');
      }
      expect(res).to.have.status(404);
      done();
    });
  });
  it('should get all paginated recipes from catalog with authorization', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/recipes?page=0').set('x-access-token', value).end(function (err, res) {
      expect(res.body.recipesData).to.be.an('array');
      expect(res.body.recipesData[0]).to.be.an('object');
      expect(res.body.pages).to.be.a('number');
      expect(res.body.recipesData[0]).to.have.all.keys('id', 'name', 'description', 'ingredient', 'image', 'upvotes', 'downvotes', 'favorites', 'updatedAt', 'userId', 'createdAt', 'views');
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should get all recipes from catalog without authorization', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/recipes?page=0').end(function (err, res) {
      expect(res.body.recipesData).to.be.an('array');
      expect(res.body.recipesData[0]).to.be.an('object');
      expect(res.body.pages).to.be.a('number');
      expect(res.body.recipesData[0]).to.have.all.keys('id', 'name', 'description', 'ingredient', 'image', 'upvotes', 'downvotes', 'favorites', 'updatedAt', 'userId', 'createdAt', 'views');
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should get a recipe from catalog with authorization', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/recipes/1').set('x-access-token', value).end(function (err, res) {
      expect(res.body.recipeData).to.be.an('object');
      expect(res.body.recipeData).to.have.all.keys('id', 'name', 'description', 'ingredient', 'image', 'upvotes', 'downvotes', 'favorites', 'updatedAt', 'userId', 'createdAt', 'views');
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should not get a recipe from catalog without authorization', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/recipes/1').end(function (err, res) {
      expect(res).to.have.status(403);
      expect(res.body.message).equal('Not Authorized');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').that.is.a('string');
      done();
    });
  });
  it('should give error when trying to delete a recipes with invalid recipeId datatype', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/recipes/nan').set('x-access-token', value).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body.message).equal('RecipeId parameter should be a number');
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').that.is.a('string');
      done();
    });
  });
  it('should send an error message for deleting recipe that doesn\'t exist', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/recipes/10').set('x-access-token', value).end(function (err, res) {
      var errors = res.body.errors;

      if (errors.length >= 1) {
        expect(errors).to.be.an('array');
        expect(errors[0]).to.be.an('object');
        expect(errors[0].message).to.be.a('string');
        expect(errors[0]).to.have.property('message').that.is.a('string');
        expect(errors[0].message).equal('Recipe does not exist in this catalog');
      }
      expect(res).to.have.status(404);
      done();
    });
  });
  it('should not delete a recipe from catalog without authentication', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/recipes/1').end(function (err, res) {
      expect(res).to.have.status(403);
      expect(res.body.message).equal('Not Authorized');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').that.is.a('string');
      expect(res.body.message).to.be.a('string');
      done();
    });
  });
  it('should delete a recipes from catalog with authorization', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/recipes/1').set('x-access-token', value).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').that.is.a('string');
      expect(res.body.message).to.be.a('string');
      expect(res.body.message).equal('Recipe successfully deleted');
      done();
    });
  });
});