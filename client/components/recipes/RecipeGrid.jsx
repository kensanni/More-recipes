import React from 'react';
import RecipeCard from '../common/RecipeCard';

const RecipeGrid = props => (
  props.recipeData.map(recipe => (
    <RecipeCard
      key={recipe.id}
      recipeData={recipe}
      upvoteRecipe={props.upvoteRecipe}
      downvoteRecipe={props.downvoteRecipe}
      favoriteRecipe={props.favoriteRecipe}
      showActionButton={props.showActionButton}
      showRecipeDetails={props.handleShowRecipe}
      deleteRecipe={props.deleteRecipe}
      editRecipe={props.editRecipe}
      addRecipe={props.addRecipe}
      value={props.value}
      handleCloseModal={props.handleCloseModal}
      onChange={props.onChange}
      saveImageToCloud={props.saveImageToCloud}
    />
  ))
);

export default RecipeGrid;
