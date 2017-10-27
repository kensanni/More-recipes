import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Testing API endpoints', () => {
  describe('API endpoint to get all recipes', () => {
    it('should return 200 with /api/v1/recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return return 201 with /api/v1/recipes', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send({
          userId: 2,
          name: 'kenny',
          description: 'A simple delicaly',
          mealType: 'lunch',
          upvotes: 10,
          downvotes: 3,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });
});
describe('Validating input', () => {
  it('POST /api/v1/recipes valid input for recipeName', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/')
      .send({
        userId: 5,
        name: '',
        mealType: 'lunch',
        description: 'Boil water for five minutes',
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.message).equal('Please Enter a Recipe Name');
        done();
      });
  });
  it('POST /api/v1/recipes valid input for mealType', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/')
      .send({
        userId: 5,
        name: 'Beans',
        mealType: '',
        description: 'Boil water for five minutes',
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.message).equal('Please Enter a mealType');
        done();
      });
  });
  it('POST /api/v1/recipes valid input for description', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/')
      .send({
        userId: 5,
        name: 'Beans',
        mealType: 'lunch',
        description: '',
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.message).equal('Please Enter the recipe description');
        done();
      });
  });
  it('POST /api/v1/recipes/:recipeId/reviews validate review input', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/3/reviews')
      .send({
        userId: 5,
        review: ''
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.Message).equal('Please enter Review');
        done();
      });
  });
});

