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
        username: 'sannikay',
        password: 'developer'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Signin successful');
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
        expect(res).to.have.status(201);
        done();
      });
  });
  it('should not add recipe when recipe name already exixt', (done) => {
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
        expect(res.body.message).equal('you already have a recipe with the name Rice');
        expect(res).to.have.status(400);
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
        expect(res.body.message).equal('Name field cannot be empty');
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
        expect(res.body.message).equal('Description field cannot be empty');
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
        expect(res.body.message).equal('ingredient field cannot be empty');
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
        expect(res.body.message).equal('Please upload an image for your recipes');
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
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should not modify recipe without authorization', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/1')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).equal('Not Authorized');
        done();
      });
  });
  it('should modify recipe with authorization', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/1')
      .set('x-access-token', value)
      .send({
        name: 'Rice',
        description: 'Boil for three mins',
        ingredient: 'Rice, water, pepper',
        image: 'dummy'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
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
        expect(res.body.message).equal('RecipeId parameter should be a number');
        done();
      });
  });
  it('should send an error message for recipe that doesn\'t exist', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/10')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).equal('Recipe does not exist in this catalog');
        done();
      });
  });
  it('should get all recipes from catalog with authorization', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should get all recipes from catalog without authorization', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should get a recipe from catalog with authorization', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/1')
      .set('x-access-token', value)
      .end((err, res) => {
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
        done();
      });
  });
  it('should send an error message for deleting recipe that doesn\'t exist', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/10')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).equal('Recipe does not exist in this catalog');
        done();
      });
  });
  it('should not delete a recipe from catalog without authentication', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/1')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).equal('Not Authorized');
        done();
      });
  });
  it('should delete a recipes from catalog with authorization', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/1')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).equal('Recipe successfully deleted');
        done();
      });
  });
});
