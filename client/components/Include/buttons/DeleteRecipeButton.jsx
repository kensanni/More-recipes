import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description functional component to render delete button for recipe
 *
 * @param {props} props
 *
 * @returns {JSX} return JSX
 */
const DeleteRecipeButton = (props) => {
  const { recipeId } = props;
  return (
    <div>
      <button
        type="button"
        className="btn btn-danger ml-3"
        data-toggle="modal"
        data-target={`#deleteModal-${recipeId}`}
        data-whatever="@getbootstrap"
      >
        <i className="fa fa-times" aria-hidden="true" />
      </button>
    </div>
  );
};

DeleteRecipeButton.propTypes = {
  recipeId: PropTypes.number.isRequired
};

export default DeleteRecipeButton;
