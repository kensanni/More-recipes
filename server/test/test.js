import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { User, Recipes, Reviews, Favorites } from '../models';


const { expect } = chai;

chai.use(chaiHttp);

User.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

Recipes.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

Reviews.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

Favorites.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

let value;

describe('Testing API endpoints', () => {
  describe('Test user api route', () => {
    it('should create a new User', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          username: 'sannikay',
          firstname: 'Kenny',
          lastname: 'sanni',
          email: 'kennikay@example.com',
          password: 'develop',
          profileImage: 'dummydata'
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).equal('User created');
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should login a user', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          username: 'sannikay',
          password: 'develop'
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).equal('Signin successful');
          value = res.body.token;
          done();
        });
    });
  });
  describe('API endpoint to test recipes', () => {
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
          if (err) {
            return done(err);
          }
          expect(res.body.message).equal('Recipe successfully created');
          done();
        });
    });
  });
});
describe('Validating recipe input', () => {
  it('check valid input for name', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        userId: 2,
        name: '',
        description: 'Boil water for five minutes',
        indegrient: 'sugar, yam',
        image: 'dummypics'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal('Please input the name of your recipe');
        done();
      });
  });
  it('check valid input for description', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        userId: 2,
        name: 'Beans',
        indegrient: 'bean',
        image: 'dummcy',
        description: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal('Please input a description for your recipe');
        done();
      });
  });
  it('validate review input', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/reviews')
      .set('x-access-token', value)
      .send({
        userId: 2,
        recipeId: 1,
        review: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal('Please input a review');
        done();
      });
  });
});
describe('API endpoint to test review', () => {
  it('Should add a new review for recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/reviews')
      .set('x-access-token', value)
      .send({
        userId: 2,
        recipeId: 1,
        review: 'awesome recipe',
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(201);
        expect(res.body.message).equal('Review posted succesfully');
        done();
      });
  });
  // it('Should give error message for invalid recipeId parameter', (done) => {
  //   chai.request(app)
  //     .post('/api/v1/recipes/ken/reviews')
  //     .set('x-access-token', value)
  //     .send({
  //       userId: 2,
  //       recipeId: 8,
  //       review: 'awesome recipe',
  //     })
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       expect(res).to.have.status(404);
  //       expect(res.body.message).equal('Recipe not found');
  //       done();
  //     });
  // });
});

