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
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });
});
