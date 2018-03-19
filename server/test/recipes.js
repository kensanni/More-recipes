import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Recipes } from '../models';


const { expect } = chai;

chai.use(chaiHttp);

Recipes.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

let value;

describe('Testing recipe endpoints', () => {
  it('should login a user', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'sannikays',
        password: 'developer'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Signin successful');
        expect(res.body).to.have.property('message').that.is.a('string');
        expect(res.body.message).to.be.a('string');
        value = res.body.token;
        done();
      });
  });
  it('should add not recipe without authorization', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).equal('Not Authorized');
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.an('object');
        expect(res.body).to.have.property('message').that.is.a('string');
        done();
      });
  });
  it('should add recipe with authorization', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        name: 'Rice',
        description: 'Boil for three mins',
        ingredient: 'Rice, water, pepper',
        image: 'dummy'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Recipe successfully created');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.all.keys('id', 'name', 'description', 'ingredient', 'image', 'updatedAt', 'userId', 'createdAt', 'views');
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res).to.have.status(201);
        done();
      });
  });
  it('should not add recipe without name', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        name: '',
        description: 'Boil for three mins',
        ingredient: 'Rice, water, pepper',
        image: 'dummy'
      })
      .end((err, res) => {
        const { errors } = res.body;
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
  it('should not add recipe without description', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        name: 'Rice',
        description: '',
        ingredient: 'Rice, water, pepper',
        image: 'dummy'
      })
      .end((err, res) => {
        const { errors } = res.body;
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
  it('should not add recipe without ingredient', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        name: 'Rice',
        description: 'simpe dish',
        ingredient: '',
        image: 'dummy'
      })
      .end((err, res) => {
        const { errors } = res.body;
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
  it('should not add recipe without image', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        name: 'Rice',
        description: 'simpe dish',
        ingredient: 'Rice water maggi',
        image: ''
      })
      .end((err, res) => {
        const { errors } = res.body;
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
  it('should add recipe with authorization', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        name: 'Rice',
        description: 'Boil for three mins',
        ingredient: 'Rice, water, pepper',
        image: 'dummy'
      })
      .end((err, res) => {
        const { errors } = res.body;
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
  it('should not add recipe with invalid name', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        name: '  Rice',
        description: 'simpe dish',
        ingredient: 'Rice water maggi',
        image: 'dummy.com'
      })
      .end((err, res) => {
        const { errors } = res.body;
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
  it('should not add recipe with invalid description', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        name: 'Rice',
        description: '  simpe dish',
        ingredient: 'Rice water maggi',
        image: 'dummy.com'
      })
      .end((err, res) => {
        const { errors } = res.body;
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
  it('should not add recipe with invalid ingredient', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        name: 'Rice',
        description: 'simpe dish',
        ingredient: '  Rice water maggi',
        image: 'dummy.com'
      })
      .end((err, res) => {
        const { errors } = res.body;
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
  it('should not modify recipe without authorization', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/1')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.have.property('message').that.is.a('string');
        expect(res.body.message).equal('Not Authorized');
        done();
      });
  });
  it('should modify recipe with authorization', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/1')
      .set('x-access-token', value)
      .send({
        name: 'Yam',
        description: 'Boil for three mins',
        ingredient: 'Rice, water, pepper',
        image: 'dummy'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.have.property('message').that.is.a('string');
        expect(res.body.data).to.have
          .all
          .keys(
            'id',
            'name',
            'description',
            'ingredient',
            'image',
            'updatedAt', 'userId',
            'createdAt', 'views'
          );
        expect(res.body.message).equal('Recipe updated successfully');
        done();
      });
  });
  it('should not modify recipe with invalid recipeId', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/nan')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.have.property('message').that.is.a('string');
        expect(res.body.message).equal('RecipeId parameter should be a number');
        done();
      });
  });
  it('should send an error message for recipe that doesn\'t exist', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/10')
      .set('x-access-token', value)
      .end((err, res) => {
        const { errors } = res.body;
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
  it('should get all paginated recipes from catalog with authorization', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?page=0')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res.body.recipesData).to.be.an('array');
        expect(res.body.recipesData[0]).to.be.an('object');
        expect(res.body.pages).to.be.a('number');
        expect(res.body.recipesData[0]).to.have
          .all
          .keys(
            'id',
            'name',
            'description',
            'ingredient',
            'image', 'upvotes',
            'downvotes', 'favorites',
            'updatedAt', 'userId',
            'createdAt', 'views'
          );
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should get all recipes from catalog without authorization', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        expect(res.body.recipesData).to.be.an('array');
        expect(res.body.recipesData[0]).to.be.an('object');
        expect(res.body.pages).to.be.a('number');
        expect(res.body.recipesData[0]).to.have
          .all
          .keys(
            'id',
            'name',
            'description',
            'ingredient',
            'image', 'upvotes',
            'downvotes', 'favorites',
            'updatedAt', 'userId',
            'createdAt', 'views'
          );
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should get a recipe from catalog with authorization', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/1')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res.body.recipeData).to.be.an('object');
        expect(res.body.recipeData).to.have
          .all
          .keys(
            'id',
            'name',
            'description',
            'ingredient',
            'image', 'upvotes',
            'downvotes', 'favorites',
            'Reviews', 'updatedAt',
            'userId', 'createdAt', 'views'
          );
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should not get a recipe from catalog without authorization', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/1')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).equal('Not Authorized');
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').that.is.a('string');
        done();
      });
  });
  it('should give error when trying to delete a recipes with invalid recipeId datatype', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/nan')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal('RecipeId parameter should be a number');
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').that.is.a('string');
        done();
      });
  });
  it('should send an error message for deleting recipe that doesn\'t exist', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/10')
      .set('x-access-token', value)
      .end((err, res) => {
        const { errors } = res.body;
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
  it('should not delete a recipe from catalog without authentication', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/1')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).equal('Not Authorized');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').that.is.a('string');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('should delete a recipes from catalog with authorization', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/1')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').that.is.a('string');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).equal('Recipe successfully deleted');
        done();
      });
  });
});
