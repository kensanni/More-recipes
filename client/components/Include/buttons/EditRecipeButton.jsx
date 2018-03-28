import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description function component to render edit recipe button
 *
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
const EditRecipeButton = props => ((
  <div>
    <button
      type="button"
      className="btn edit-button"
      data-toggle="modal"
      data-target="#editModal"
      data-whatever="@getbootstrap"
      onClick={props.onEditClicked}
    >
      <i className="fa fa-pencil-square-o" aria-hidden="true" />
    </button>
  </div>
));

EditRecipeButton.propTypes = {
  onEditClicked: PropTypes.func.isRequired
};

export default EditRecipeButton;
