import Users from '../controller/users';
import Recipe from '../controller/recipe';
import authentication from '../middlewares/authentication';
import Review from '../controller/review';
import FavoritesRecipes from '../controller/favoritesRecipes';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to the world of great recipes',
  }));

  app.post('/api/v1/users/signup', Users.signUp);
  app.post('/api/v1/users/signin', Users.signIn);
  app.post('/api/v1/recipes', authentication.verifyUser, Recipe.addRecipes);
  app.get('/api/v1/recipes', Recipe.getRecipes);
  app.put('/api/v1/recipes/:recipeId', authentication.verifyUser, Recipe.modifyRecipe);
  app.post('/api/v1/recipes/:recipeId/reviews', authentication.verifyUser, Review.addReview);
  app.delete('/api/v1/recipes/:recipeId', authentication.verifyUser, Recipe.deleteRecipes);
  app.post('/api/v1/recipes/:recipeId/favorites', authentication.verifyUser, FavoritesRecipes.addFavorite);
  app.get('/api/v1/recipes/favorites', authentication.verifyUser, FavoritesRecipes.getFavorite);
};
