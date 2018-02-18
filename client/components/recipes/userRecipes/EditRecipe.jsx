import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description function component to render edit recipe button
 *
 * @param {props} props
 *
 * @returns {JSX} return JSX
 */
const EditRecipe = (props) => {
  const {
    recipeId, showRecipeDetails, cardId,
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

EditRecipe.propTypes = {
  recipeId: PropTypes.number.isRequired,
  showRecipeDetails: PropTypes.func.isRequired,
  cardId: PropTypes.number.isRequired
};

export default EditRecipe;
