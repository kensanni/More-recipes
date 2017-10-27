import handleRecipeMethod from '../controller/recipeController';
import reviewHandler from '../controller/reviewController';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome',
  }));
  app.post('/api/v1/recipes', handleRecipeMethod.addRecipe);
  app.get('/api/v1/recipes', handleRecipeMethod.getAllRecipe);
  app.delete('/api/v1/recipes/:recipeDeleteId', handleRecipeMethod.deleteRecipe);
  app.post('/api/v1/recipes/:recipeId/reviews', reviewHandler.addReview);
};

