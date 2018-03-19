import React from 'react';
import RecipeCard from '../Include/cards/RecipeCard';

/**
 * @description functional component to render Recipe Grid
 *
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
const RecipeGrid = props => (
  props.recipes.map(recipe => (
    <RecipeCard
      recipe={recipe}
      key={recipe.id}
      clearImageState={props.clearImageState}
      showActionButton={props.showActionButton}
      setEditRecipeId={props.setEditRecipeId}
      deleteRecipe={props.deleteRecipe}
    />
  ))
);

export default RecipeGrid;
