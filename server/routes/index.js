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

  /**
   * @description user signup route
   */
  app.post(
    '/api/v1/users/signup',
    Validation.validateUserInput,
    Validation.validateUsers,
    User.signUp
  );

  /**
   * @description get user most popular recipes
   */
  app.get(
    '/api/v1/recipes/most-popular-recipe',
    Recipe.popularRecipes
  );

  /**
   * @description user signin route
   */
  app.post(
    '/api/v1/users/signin',
    Validation.validateUserSignin,
    User.signIn
  );

  /**
   * @description add recipe route
   */
  app.post(
    '/api/v1/recipes',
    authentication.verifyUser,
    Validation.validateRecipeInput,
    Validation.checkRecipeName,
    Recipe.addRecipes
  );

  /**
   * @description route to get all recipes
   */
  app.get(
    '/api/v1/recipes',
    Recipe.getRecipes
  );

  /**
   * @description  route to get a single recipe
   */
  app.get(
    '/api/v1/recipes/:recipeId',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Recipe.getARecipe
  );

  /**
   * @description route to get a specific user recipes
   */
  app.get(
    '/api/v1/users/:userId/recipes',
    Validation.checkUserId,
    authentication.verifyUser,
    Recipe.getUserRecipes
  );

  /**
   * @description route to update a recipe
   */
  app.put(
    '/api/v1/recipes/:recipeId',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Validation.validateRecipeInput,
    Recipe.modifyRecipe
  );

  /**
   * @description route to add a review
   */
  app.post(
    '/api/v1/recipes/:recipeId/reviews',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Validation.checkReviewInput,
    Review.addReview
  );

  /**
   * @description route to delete a recipe
   */
  app.delete(
    '/api/v1/recipes/:recipeId',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Recipe.deleteRecipes
  );

  /**
   * @description route to favorite and unfavorite a recipe
   */
  app.post(
    '/api/v1/recipes/:recipeId/favorites',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Favorite.addFavorite
  );

  /**
   * @description route to get user favorited recipe
   */
  app.get(
    '/api/v1/users/:userId/favorites',
    authentication.verifyUser,
    Validation.checkUserId,
    Favorite.getFavorite
  );

  /**
   * @description route to upvote and remove upvote from a recipe
   */
  app.post(
    '/api/v1/recipes/:recipeId/upvote',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Upvote.upvoteRecipe
  );

  /**
   * @description route to downvote and remove downvote from a recipe
   */
  app.post(
    '/api/v1/recipes/:recipeId/downvote',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Downvote.downvoteRecipe
  );

  /**
   * @description route to search for recipes on the application
   */
  app.get(
    '/api/v1/search',
    Recipe.recipeSearch
  );
};
