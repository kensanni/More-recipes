import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Favorites } from '../models';


const { expect } = chai;

chai.use(chaiHttp);

const doBeforeAll = () => {
  before((done) => {
    Favorites.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
};

let value;

describe('Testing API endpoints associated with favorites', () => {
  doBeforeAll();
  it('should login a user', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'sannikays',
        password: 'developer'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Signin successful');
        value = res.body.token;
        done();
      });
  });
  it('Should not add a recipe to favorite list without authentication', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/favorites')
      .send({
        recipeId: 1,
        userId: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).equal('Not Authorized');
        done();
      });
  });
  it('should give error when trying to favorite a recipe with invalid recipeId datatype', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/:recipeId/favorites')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal('RecipeId parameter should be a number');
        done();
      });
  });
  it('should give error when trying to favorite a recipe that doesn\'t exist', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/20/favorites')
      .set('x-access-token', value)
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Recipe does not exist in this catalog');
        }
        expect(res).to.have.status(404);
        done();
      });
  });
  it('Should add a recipe to favorite list with authentication', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/2/favorites')
      .set('x-access-token', value)
      .send({
        recipeId: 1,
        userId: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).equal('recipe sucessfully added to favorite');
        done();
      });
  });
  it('Should not get a recipe from favorite list without authentication', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/favorites?page=0')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).equal('Not Authorized');
        done();
      });
  });
  it('Should get recipe from favorite list', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/favorites?page=0')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).equal(true);
        done();
      });
  });
});
