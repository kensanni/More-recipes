import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Users, Recipes, Reviews, Favorites } from '../models';


const { expect } = chai;

chai.use(chaiHttp);

Users.destroy({
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
          expect(res.body.message).equal('Signin successful');
          value = res.body.token;
          done();
        });
    });
    it('should not login a user without password', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          username: 'sannikay',
        })
        .end((err, res) => {
          // if (err) {
          //   return done(err);
          // }
          expect(res.body.message).equal('Please input your password to signin');
          done();
        });
    });
    it('should not login a user without username', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          password: 'develop',
        })
        .end((err, res) => {
          // if (err) {
          //   return done(err);
          // }
          expect(res.body.message).equal('Please input your username');
          done();
        });
    });
    it('should not login a user with invalid password', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          username: 'sannikay',
          password: 'develo',
        })
        .end((err, res) => {
          // if (err) {
          //   return done(err);
          // }
          expect(res.body.message).equal('Incorrect Login details');
          done();
        });
    });
    it('should not login a user with invalid username', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          username: 'sannika',
          password: 'develop',
        })
        .end((err, res) => {
          // if (err) {
          //   return done(err);
          // }
          expect(res.body.message).equal('Incorrect Login details');
          done();
        });
    });
  });
  describe('Validate user signup input', () => {
    it('check valid input for firstname', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          firstname: '',
          lastname: 'sanni',
          username: 'sannikay',
          email: 'kensani@gmail.com',
          password: 'sannikay',
          profileImage: 'kensani@gmail.com'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).equal('Please input your first name');
          done();
        });
    });
    it('check valid input for lastname', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          firstname: 'sanni',
          lastname: '',
          username: 'sannikay',
          email: 'kensani@gmail.com',
          password: 'sannikay',
          profileImage: 'kensani@gmail.com'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).equal('Please input your last name');
          done();
        });
    });
    it('check valid input for username', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          firstname: 'kehinde',
          lastname: 'sanni',
          username: '',
          email: 'kensani@gmail.com',
          password: 'sannikay',
          profileImage: 'kensani@gmail.com'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).equal('Please input your username');
          done();
        });
    });
    it('check valid input for email address', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          firstname: 'kehinde',
          lastname: 'sanni',
          username: 'sannikay',
          email: '',
          password: 'sannikay',
          profileImage: 'kensani@gmail.com'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).equal('Please input  a valid email address');
          done();
        });
    });
  });
  describe('API endpoint to test recipes', () => {
    it('should not add recipe without authorization', (done) => {
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
          indegrient: 'Rice, water, pepper',
          image: 'dummy'
        })
        .end((err, res) => {
          expect(res.body.message).equal('Recipe successfully created');
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
          done();
        });
    });
    it('should not modify recipe with authorization', (done) => {
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
          indegrient: 'Rice, water, pepper',
          image: 'dummy'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).equal('Recipe updated successfully');
          done();
        });
    });
    it('should give error for invalid recipeId data type', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/na')
        .set('x-access-token', value)
        .send({
          name: 'Rice',
          description: 'Boil for three mins',
          indegrient: 'Rice, water, pepper',
          image: 'dummy'
        })
        .end((err, res) => {
          expect(res.body.message).equal('RecipeId parameter should be a number');
          done();
        });
    });
    it('should give error when trying to update recipe that does not exist', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/4')
        .set('x-access-token', value)
        .send({
          name: 'Rice',
          description: 'Boil for three mins',
          indegrient: 'Rice, water, pepper',
          image: 'dummy'
        })
        .end((err, res) => {
          expect(res.body.message).equal('Recipe does not exist in this catalog');
          done();
        });
    });
    it('should get all recipes from catalog', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .set('x-access-token', value)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should get one recipes from catalog with authorization', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1')
        .set('x-access-token', value)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should give error when trying to get a recipes from catalog with invalid recipeId datatype', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/nan')
        .set('x-access-token', value)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).equal('RecipeId parameter should be a number');
          done();
        });
    });
    it('should delete a recipes from catalog with authorization', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/2')
        .set('x-access-token', value)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).equal('Recipe successfully deleted');
          done();
        });
    });
    it('should delete a recipes from catalog without authentication', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/2')
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
  it('check valid input for image', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        userId: 2,
        name: 'Beans',
        indegrient: 'maggi',
        image: '',
        description: 'test',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal('Please upload an image for your recipes');
        done();
      });
  });
  it('check valid input for indegrient', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', value)
      .send({
        userId: 2,
        name: 'Beans',
        indegrient: '',
        image: 'dummy',
        description: 'test',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).equal('Please input the indegrient for your recipe');
        done();
      });
  });
});
describe('API endpoint to test review', () => {
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
        done();
      });
  });
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
        expect(res).to.have.status(201);
        expect(res.body.message).equal('Review posted succesfully');
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
        expect(res.body.message).equal('Recipe not found');
        done();
      });
  });
  it('Should validate review input', (done) => {
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
describe('API endpoint to test favorite recipe', () => {
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
  it('Should add a recipe to favorite list', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/favorites')
      .set('x-access-token', value)
      .send({
        recipeId: 1,
        userId: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).equal('recipe sucessfully added to favorite');
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
        expect(res.body.message).equal('Recipe not found');
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
