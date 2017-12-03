import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Users } from '../models';

const { expect } = chai;

chai.use(chaiHttp);

Users.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

describe('Testing User endpoints', () => {
  it('Should create a new User', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'sannikay',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res.body.message).equal('User created');
        expect(res).to.have.status(201);
        done();
      });
  });
  it('Should not create a new User without username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: '',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Username field cannot be empty');
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User without email', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'sannikay',
        email: '',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Email field cannot be empty');
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User without password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'sannikay',
        email: 'kennikay@example.com',
        password: '',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Password field cannot be empty');
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User without the required username length', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'sanni',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
  it('Should not create a new User without the required email format', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'sannikay',
        email: 'kennikay.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
  it('Should not create a new User without the required password format', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'sannikay',
        email: 'kennikay@example.com',
        password: 'deve',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
  it('Should not create a new User with invalid username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: '   sanni',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Invalid Username, kindly ensure your username is alphanumeric');
        expect(res).to.have.status(409);
        done();
      });
  });
  it('Should not create a new User with invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'sannikay',
        email: 'kennikay@example.com',
        password: '  deve  loper',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Invalid password,ensure your password contain only uppercase,lowercase and any special character');
        expect(res).to.have.status(409);
        done();
      });
  });
  it('Should not create a new User with existing username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'sannikay',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Username has already been chosen');
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should not create a new User with existing email', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'sannikayz',
        email: 'kennikay@example.com',
        password: 'developer',
        profileImage: 'dummydata'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Email already exist');
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should login a user', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'sannikay',
        password: 'developer'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Signin successful');
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
        expect(res.body.message).equal('Username field cannot be empty');
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
        expect(res.body.message).equal('Password field cannot be empty');
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
        expect(res.body.message).equal('Incorrect Login details');
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
        expect(res.body.message).equal('Incorrect Login details');
        expect(res).to.have.status(400);
        done();
      });
  });
});
