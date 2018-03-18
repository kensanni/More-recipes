import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Users } from '../models';

const { expect } = chai;

chai.use(chaiHttp);

const doBeforeAll = () => {
  before((done) => {
    Users.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
};


describe('Testing User endpoints', () => {
  doBeforeAll();
  it('Should create a new User', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'kehinde',
        username: 'sannikays',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res.body.message).equal('User created');
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect((res.body)).to.have.property('message').that.is.a('string');
        expect((res.body)).to.have.property('token').that.is.a('string');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('Should not create a new User without name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: '',
        username: 'kennikay',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('name field cannot be empty');
          expect(errors[0].message).to.be.a('string');
          expect((errors[0])).to.be.an('object');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect(errors).to.be.an('array');
        }
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User without username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'kehinde',
        username: '',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Username field cannot be empty');
          expect(errors[0].message).to.be.a('string');
          expect(errors).to.be.an('array');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect((errors[0])).to.be.an('object');
        }
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User without email', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'kehinde',
        username: 'sannikay',
        email: '',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Email field cannot be empty');
          expect(errors).to.be.an('array');
          expect((errors[0])).to.be.an('object');
          expect((errors[0])).to.have.property('message').that.is.a('string');
        }
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User without password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'kehinde',
        username: 'sannikay',
        email: 'kennikay@example.com',
        password: '',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Password field cannot be empty');
          expect((errors[0])).to.be.an('object');
          expect(errors).to.be.an('array');
          expect((errors[0])).to.have.property('message').that.is.a('string');
        }
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User without the required username length', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'kehinde',
        username: 'sanni',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Username should be atleast 6 characters');
          expect((errors[0])).to.be.an('object');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect(errors).to.be.an('array');
        }
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User without the required email format', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'kehinde',
        username: 'sannikay',
        email: 'kennikay.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Please input a valid Email Adrress');
          expect((errors[0])).to.be.an('object');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect(errors).to.be.an('array');
        }
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User without the required password format', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'kehinde',
        username: 'sannikay',
        email: 'kennikay@example.com',
        password: 'deve',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors).to.be.an('array');
          expect((errors[0])).to.be.an('object');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect(errors[0].message).equal('Please input a valid password with atleast 8 characters');
        }
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User with invalid username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'kehinde',
        username: '   sanni',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors).to.be.an('array');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect((errors[0])).to.be.an('object');
          expect(errors[0].message).equal('Invalid Username, kindly ensure your username is alphanumeric');
        }
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User with invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'kehinde',
        username: 'sannikay',
        email: 'kennikay@example.com',
        password: '  deve  loper',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors).to.be.an('array');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect((errors[0])).to.be.an('object');
          expect(errors[0].message).equal('Invalid password, ensure your password contain only uppercase, lowercase or any special character');
        }
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User with existing username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'kehinde',
        username: 'sannikays',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Username has already been chosen');
          expect(errors).to.be.an('array');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect((errors[0])).to.be.an('object');
        }
        expect(res).to.have.status(409);
        done();
      });
  });
  it('Should not create a new User with existing email', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'kehinde',
        username: 'sannikayz',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Email already exist');
          expect(errors).to.be.an('array');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect((errors[0])).to.be.an('object');
        }
        expect(res).to.have.status(409);
        done();
      });
  });
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
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should not login a user without username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: '',
        password: 'developer'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Username field cannot be empty');
          expect((errors[0])).to.be.an('object');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect(errors).to.be.an('array');
        }
        done();
      });
  });
  it('should not login a user without password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'sannikay',
        password: ''
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Password field cannot be empty');
          expect((errors[0])).to.be.an('object');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect(errors).to.be.an('array');
        }
        done();
      });
  });
  it('should not login a user with invalid username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'sannika',
        password: 'developer'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Incorrect login details');
          expect(errors).to.be.an('array');
          expect((errors[0])).to.have.property('message').that.is.a('string');
          expect((errors[0])).to.be.an('object');
        }
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should not login a user with invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'sannikay',
        password: 'develo'
      })
      .end((err, res) => {
        const { errors } = res.body;
        if (errors.length >= 1) {
          expect(errors[0].message).equal('Incorrect login details');
          expect((errors[0])).to.be.an('object');
          expect(errors).to.be.an('array');
          expect((errors[0])).to.have.property('message').that.is.a('string');
        }
        expect(res).to.have.status(400);
        done();
      });
  });
});
