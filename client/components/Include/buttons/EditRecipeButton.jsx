import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description function component to render edit recipe button
 *
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
const EditRecipeButton = () => ((
  <div>
    <button
      type="button"
      className="btn"
      data-toggle="modal"
      data-target="#editModal"
      data-whatever="@getbootstrap"
    >
      <i className="fa fa-pencil-square-o" aria-hidden="true" />
    </button>
  </div>
));

export default EditRecipeButton;
