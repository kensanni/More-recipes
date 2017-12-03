import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Reviews } from '../models';


const { expect } = chai;

chai.use(chaiHttp);

Reviews.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

let value;

describe('Testing API endpoints associated with review', () => {
  it('Should create a new User', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'testreview',
        email: 'testreview@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res.body.message).equal('User created');
        expect(res).to.have.status(201);
        done();
      });
  });
  it('should login a user', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'testreview',
        password: 'developer'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Signin successful');
        value = res.body.token;
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
  it('Should validate review input', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/2/reviews')
      .set('x-access-token', value)
      .send({
        userId: 2,
        recipeId: 2,
        review: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal('Please input a review');
        done();
      });
  });
  it('should give error when trying to post a review with invalid recipeId datatype', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/nan/reviews')
      .set('x-access-token', value)
      .send({
        review: 'awesome'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal('RecipeId parameter should be a number');
        done();
      });
  });
  it('should give error when trying to post a review for recipe that doesn\'t exist', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/20/reviews')
      .set('x-access-token', value)
      .send({
        review: 'awesome'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).equal('Recipe does not exist in this catalog');
        done();
      });
  });
  it('Should not post a review without authentication', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/reviews')
      .send({
        recipeId: 2,
        userId: 2,
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).equal('Not Authorized');
        done();
      });
  });
  it('Should add a new review for recipe with authentication', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/2/reviews')
      .set('x-access-token', value)
      .send({
        userId: 2,
        recipeId: 2,
        review: 'awesome recipe',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).equal('Review posted succesfully');
        done();
      });
  });
});
