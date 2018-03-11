import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description function component to render edit recipe button
 *
 * @param {props} props
 *
 * @returns {JSX} return JSX
 */
const EditRecipeButton = (props) => {
  const {
    cardId,
  } = props;
  return (
    <div>
      <button
        type="button"
        className="btn"
        data-toggle="modal"
        data-target={`#${cardId}`}
        data-whatever="@getbootstrap"
      >
        <i className="fa fa-pencil-square-o" aria-hidden="true" />
      </button>
    </div>
  );
};

EditRecipeButton.propTypes = {
  cardId: PropTypes.number.isRequired
};

export default EditRecipeButton;
