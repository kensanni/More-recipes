import User from '../controller/user';
import Recipe from '../controller/recipe';
import authentication from '../middlewares/authentication';
import Review from '../controller/review';
import Favorite from '../controller/favorite';
import Validation from '../middlewares/validation';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to the world of great recipes',
  }));

  /**
   * @description user signup route
   * @param {} User.signUp
   * @param {} Validation.checkUserInput
   * @param {} Validation.validateUserInput
   * @param {} Validation.invalidUserInput
   * @param {} Validation.validateUsers,
   */
  app.post(
    '/api/v1/users/signup',
    Validation.checkUserInput,
    Validation.validateUserInput,
    Validation.invalidUserInput,
    Validation.validateUsers,
    User.signUp
  );

  /**
   * @description user signin route
   * @param {} Validation.validateUserSignin
   * @param {} Users.signIn
   */
  app.post(
    '/api/v1/users/signin',
    Validation.validateUserSignin,
    User.signIn
  );

  /**
   * @description add new recipe
   * @param {} authentication.verifyUser
   * @param {} Recipe.addRecipes
   * @param {} Validation.checkRecipeInput
   * @param {} Validation.checkRecipeInvalidInput
   */
  app.post(
    '/api/v1/recipes',
    authentication.verifyUser,
    Validation.checkRecipeInput,
    Validation.checkRecipeInvalidInput,
    Recipe.addRecipes
  );

  /**
   * @description get all recipe
   * @param {} Recipe.getRecipes
   */
  app.get(
    '/api/v1/recipes',
    Recipe.getRecipes
  );

  /**
   * @description get one recipe
   * @param {} authentication.verifyUser
   * @param {} Recipe.getRecipes
   * @param {} Validation.checkRecipeId
   */
  app.get(
    '/api/v1/recipes/:recipeId',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Recipe.getARecipe
  );

  /**
   * @description modify a recipe
   * @param {} authentication.verifyUser
   * @param {} Recipe.modifyRecipe
   * @param {} Validation.checkRecipeId
   */
  app.put(
    '/api/v1/recipes/:recipeId',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Recipe.modifyRecipe
  );

  /**
   * @description post review for recipe
   * @param {} authentication.verifyUser
   * @param {} Review.addReview
   * @param {} Validation.checkRecipeId
   * @param {} Validation.checkReviewInput
   */
  app.post(
    '/api/v1/recipes/:recipeId/reviews',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Validation.checkReviewInput,
    Review.addReview
  );

  /**
   * @description delete a recipe
   * @param {} authentication.verifyUser
   * @param {} Recipe.deleteRecipes
   * @param {} Validation.checkRecipeId
   */
  app.delete(
    '/api/v1/recipes/:recipeId',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Recipe.deleteRecipes
  );

  /**
   * @description Add a recipe to favorite
   * @param {} authentication.verifyUser
   * @param {} FavoritesRecipes.addFavorite
   * @param {} Validation.checkRecipeId
   * @param {} Validation.checkFavRecipe
   */
  app.post(
    '/api/v1/recipes/:recipeId/favorites',
    authentication.verifyUser,
    Validation.checkRecipeId,
    Validation.checkFavRecipe,
    Favorite.addFavorite
  );

  /**
   * @description get all favorite recipe
   * @param {} authentication.verifyUser
   * @param {} FavoritesRecipes.addFavorite
   * @param {} Validation.checkUserId
   */
  app.get(
    '/api/v1/users/:userId/recipes',
    authentication.verifyUser,
    Validation.checkUserId,
    Favorite.getFavorite
  );
};
