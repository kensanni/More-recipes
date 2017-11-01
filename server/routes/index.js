import handleUserMethod from '../controller/userController';
import handleRecipeMethod from '../controller/recipesController';
import reviewHandler from '../controller/reviewController';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to the world of great recipes',
  }));

  app.post('/api/v1/users/signup', handleUserMethod.userSignUp);
  app.post('/api/v1/users/signin', handleUserMethod.userSignIn);
  app.post('/api/v1/recipes', handleRecipeMethod.addRecipes);
  // app.get('/api/v1/recipes', handleRecipeMethod.getAllRecipe);
  // app.put('/api/v1/recipes/:recipeUpdateId', handleRecipeMethod.modifyRecipe);
  // app.delete('/api/v1/recipes/:recipeDeleteId', handleRecipeMethod.deleteRecipe);
  // app.post('/api/v1/recipes/:recipeId/reviews', reviewHandler.addReview);
};

