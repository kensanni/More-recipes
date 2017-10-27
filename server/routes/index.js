import handleRecipeMethod from '../controller/recipeController';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome',
  }));
  app.post('/api/v1/recipes', handleRecipeMethod.addRecipe);
  app.get('/api/v1/recipes', handleRecipeMethod.getAllRecipe);
  app.delete('/api/v1/recipes/:recipeDeleteId', handleRecipeMethod.deleteRecipe);
};

