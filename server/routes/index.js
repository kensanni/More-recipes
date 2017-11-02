import UserController from '../controller/userController';
import RecipesController from '../controller/recipesController';
import authentication from '../middlewares/authentication';
import ReviewController from '../controller/reviewController';
import FavoriteController from '../controller/favoritesController';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to the world of great recipes',
  }));

  app.post('/api/v1/users/signup', UserController.signUp);
  app.post('/api/v1/users/signin', UserController.signIn);
  app.post('/api/v1/recipes', authentication.verifyUser, RecipesController.addRecipes);
  app.get('/api/v1/recipes', RecipesController.getRecipes);
  app.put('/api/v1/recipes/:recipeId', authentication.verifyUser, RecipesController.modifyRecipe);
  app.post('/api/v1/recipes/:recipeId/reviews', authentication.verifyUser, ReviewController.addReview);
  app.delete('/api/v1/recipes/:recipeId', RecipesController.deleteRecipes);
  app.post('/api/v1/recipes/:recipeId/favorites', authentication.verifyUser, FavoriteController.addFavorite);
  app.get('/api/v1/recipes/favorite', authentication.verifyUser, FavoriteController.getFavorite);
};
