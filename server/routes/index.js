import User from '../controller/user';
import Recipe from '../controller/recipe';
import authentication from '../middlewares/authentication';
import Review from '../controller/review';
import Favorite from '../controller/favorite';
import Validation from '../middlewares/validation';
import Upvote from '../controller/upvotes';
import Downvote from '../controller/downvotes';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to the world of great recipes',
  }));

  app.post(
    '/api/v1/users/signup',
    Validation.checkUserInput,
    Validation.validateUserInput,
    Validation.validateUsers,
    User.signUp
  );

  app.post(
    '/api/v1/users/signin',
    Validation.validateUserSignin,
    User.signIn
  );

  app.post(
    '/api/v1/recipes',
    authentication.verifyUser,
    Validation.checkRecipeInput,
    Validation.checkRecipeInvalidInput,
    Recipe.addRecipes
  );

  app.get(
    '/api/v1/recipes',
    Recipe.getRecipes
  );

  app.get(
    '/api/v1/recipes/:recipeId',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Recipe.getARecipe
  );

  app.put(
    '/api/v1/recipes/:recipeId',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Recipe.modifyRecipe
  );

  app.post(
    '/api/v1/recipes/:recipeId/reviews',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Validation.checkReviewInput,
    Review.addReview
  );

  app.delete(
    '/api/v1/recipes/:recipeId',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Recipe.deleteRecipes
  );

  app.post(
    '/api/v1/recipes/:recipeId/favorites',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Validation.checkFavRecipe,
    Favorite.addFavorite
  );

  app.get(
    '/api/v1/users/:userId/recipes',
    authentication.verifyUser,
    Validation.checkUserId,
    Favorite.getFavorite
  );

  app.post(
    '/api/v1/recipes/:recipeId/upvote',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Upvote.upvoteRecipe
  );

  app.post(
    '/api/v1/recipes/:recipeId/downvote',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Downvote.downvoteRecipe
  );
};
