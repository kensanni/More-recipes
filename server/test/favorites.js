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
  it('Should create a new User', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        firstname: 'kehinde',
        lastname: 'sanni',
        username: 'sannikay',
        email: 'testfavorites@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        value = res.body.token;
        expect(res.body.message).equal('User created');
        expect(res).to.have.status(201);
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
        indegrient: 'Rice, water, pepper',
        image: 'dummy'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Recipe successfully created');
        expect(res).to.have.status(201);
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
        expect(res).to.have.status(404);
        expect(res.body.message).equal('Recipe does not exist in this catalog');
        done();
      });
  });
  it('Should add a recipe to favorite list with authentication', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/favorites')
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
      .get('/api/v1/users/:userId/recipes')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).equal('Not Authorized');
        done();
      });
  });
  it('Should get recipe from favorite list', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/recipes')
      .set('x-access-token', value)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).equal(true);
        done();
      });
  });
});
