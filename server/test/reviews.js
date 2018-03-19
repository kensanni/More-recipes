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
  it('should login a user', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'sannikays',
        password: 'developer'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Signin successful');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.have.property('message').that.is.a('string');
        expect(res.body).to.have.all.keys('message', 'token');
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
        ingredient: 'Rice, water, pepper',
        image: 'dummy'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Recipe successfully created');
        expect(res.body.data).to.be.an('object');
        expect(res.body).to.have.all.keys('message', 'data');
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res).to.have.status(201);
        done();
      });
  });
  it('Should validate review input', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/2/reviews')
      .set('x-access-token', value)
      .send({
        userId: 1,
        recipeId: 2,
        review: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { errors } = res.body;
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
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.have.property('message').that.is.a('string');
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
        const { errors } = res.body;
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
  it('Should not post a review without authentication', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/reviews')
      .send({
        recipeId: 1,
        userId: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).equal('Not Authorized');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.have.property('message').that.is.a('string');
        done();
      });
  });
  it('Should add a new review for recipe with authentication', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/2/reviews')
      .set('x-access-token', value)
      .send({
        userId: 1,
        recipeId: 1,
        username: 'sannikays',
        review: 'awesome recipe',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).equal('Review posted succesfully');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.have.property('message').that.is.a('string');
        done();
      });
  });
});
