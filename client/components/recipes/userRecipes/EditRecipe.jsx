import React from 'react';

const EditRecipe = (props) => {
  const {
    recipeId, showRecipeDetails, cardId, key 
  } = props;
  return (
    <div>
      <button
        type="button"
        className="btn"
        data-toggle="modal"
        data-target={`#${cardId}`}
        data-whatever="@getbootstrap"
        onClick={() => showRecipeDetails(recipeId)}
      >
        <i className="fa fa-pencil-square-o" aria-hidden="true" />
      </button>
    </div>
  );
};

export default EditRecipe;
