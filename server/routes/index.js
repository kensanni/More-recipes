import Users from '../controller/users';
import Recipe from '../controller/recipe';
import authentication from '../middlewares/authentication';
import Review from '../controller/review';
import FavoritesRecipes from '../controller/favoritesRecipes';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to the world of great recipes',
  }));

  /**
   * @description user signup route
   * @param {} Users.signUp
   */
  app.post(
    '/api/v1/users/signup',
    Users.signUp
  );

  /**
   * @description user signin route
   * @param {} Users.signIn
   */
  app.post(
    '/api/v1/users/signin',
    Users.signIn
  );

  /**
   * @description add new recipe
   * @param {} authentication.verifyUser
   * @param {} Recipe.addRecipes
   */
  app.post(
    '/api/v1/recipes',
    authentication.verifyUser,
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
   * @param {} Recipe.getRecipes
   */
  app.get(
    '/api/v1/recipes/:recipeId',
    Recipe.getARecipe
  );

  /**
   * @description modify a recipe
   * @param {} authentication.verifyUser
   * @param {} Recipe.modifyRecipe
   */
  app.put(
    '/api/v1/recipes/:recipeId',
    authentication.verifyUser,
    Recipe.modifyRecipe
  );

  /**
   * @description post review for recipe
   * @param {} authentication.verifyUser
   * @param {} Review.addReview
   */
  app.post(
    '/api/v1/recipes/:recipeId/reviews',
    authentication.verifyUser,
    Review.addReview
  );

  /**
   * @description delete a recipe
   * @param {} authentication.verifyUser
   * @param {} Recipe.deleteRecipes
   */
  app.delete(
    '/api/v1/recipes/:recipeId',
    authentication.verifyUser,
    Recipe.deleteRecipes
  );

  /**
   * @description Add a recipe to favorite
   * @param {} authentication.verifyUser
   * @param {}  FavoritesRecipes.addFavorite
   */
  app.post(
    '/api/v1/recipes/:recipeId/favorites',
    authentication.verifyUser,
    FavoritesRecipes.addFavorite
  );

  /**
   * @description get all favorite recipe
   * @param {} authentication.verifyUser
   * @param {} FavoritesRecipes.addFavorite
   */
  app.get(
    '/api/v1/users/:userId/recipes',
    authentication.verifyUser,
    FavoritesRecipes.getFavorite
  );
};
