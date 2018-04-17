'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

var _recipe = require('../controller/recipe');

var _recipe2 = _interopRequireDefault(_recipe);

var _authentication = require('../middlewares/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _review = require('../controller/review');

var _review2 = _interopRequireDefault(_review);

var _favorite = require('../controller/favorite');

var _favorite2 = _interopRequireDefault(_favorite);

var _validation = require('../middlewares/validation');

var _validation2 = _interopRequireDefault(_validation);

var _upvotes = require('../controller/upvotes');

var _upvotes2 = _interopRequireDefault(_upvotes);

var _downvotes = require('../controller/downvotes');

var _downvotes2 = _interopRequireDefault(_downvotes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.get('/api', function (req, res) {
    return res.status(200).send({
      message: 'welcome to the world of great recipes'
    });
  });

  /**
   * @description user signup route
   */
  app.post('/api/v1/users/signup', _validation2.default.validateUserInput, _validation2.default.validateUsers, _user2.default.signUp);

  /**
   * @description get user most popular recipes
   */
  app.get('/api/v1/recipes/most-popular-recipe', _recipe2.default.popularRecipes);

  /**
   * @description user signin route
   */
  app.post('/api/v1/users/signin', _validation2.default.validateUserSignin, _user2.default.signIn);

  /**
   * @description add recipe route
   */
  app.post('/api/v1/recipes', _authentication2.default.verifyUser, _validation2.default.validateRecipeInput, _validation2.default.checkRecipeName, _recipe2.default.addRecipes);

  /**
   * @description route to get all recipes
   */
  app.get('/api/v1/recipes', _recipe2.default.getRecipes);

  /**
   * @description  route to get a single recipe
   */
  app.get('/api/v1/recipes/:recipeId', _authentication2.default.verifyUser, _validation2.default.checkRecipeId, _recipe2.default.getARecipe);

  /**
   * @description route to get a specific user recipes
   */
  app.get('/api/v1/users/:userId/recipes', _validation2.default.checkUserId, _authentication2.default.verifyUser, _recipe2.default.getUserRecipes);

  /**
   * @description route to update a recipe
   */
  app.put('/api/v1/recipes/:recipeId', _authentication2.default.verifyUser, _validation2.default.checkRecipeId, _validation2.default.validateEditRecipe, _recipe2.default.modifyRecipe);

  /**
   * @description route to add a review
   */
  app.post('/api/v1/recipes/:recipeId/reviews', _authentication2.default.verifyUser, _validation2.default.checkRecipeId, _validation2.default.checkReviewInput, _review2.default.addReview);

  /**
   * @description route to delete a recipe
   */
  app.delete('/api/v1/recipes/:recipeId', _authentication2.default.verifyUser, _validation2.default.checkRecipeId, _recipe2.default.deleteRecipes);

  /**
   * @description route to favorite and unfavorite a recipe
   */
  app.post('/api/v1/recipes/:recipeId/favorites', _authentication2.default.verifyUser, _validation2.default.checkRecipeId, _favorite2.default.addFavorite);

  /**
   * @description route to get user favorited recipe
   */
  app.get('/api/v1/users/:userId/favorites', _authentication2.default.verifyUser, _validation2.default.checkUserId, _favorite2.default.getFavorite);

  /**
   * @description route to upvote and remove upvote from a recipe
   */
  app.post('/api/v1/recipes/:recipeId/upvote', _authentication2.default.verifyUser, _validation2.default.checkRecipeId, _upvotes2.default.upvoteRecipe);

  /**
   * @description route to downvote and remove downvote from a recipe
   */
  app.post('/api/v1/recipes/:recipeId/downvote', _authentication2.default.verifyUser, _validation2.default.checkRecipeId, _downvotes2.default.downvoteRecipe);

  /**
   * @description route to search for recipes on the application
   */
  app.get('/api/v1/search', _recipe2.default.recipeSearch);

  app.get('/api/v1/reviews/:recipeId', _authentication2.default.verifyUser, _review2.default.getReviews);
};