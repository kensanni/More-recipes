import React from 'react';
import EditModal from '../Include/EditModal';

const EditRecipe = (props) => {
  return (
    <div>
      <button
        type="button"
        className="btn"
        data-toggle="modal"
        data-target="#exampleModal1"
        data-whatever="@getbootstrap"
      >
        <i className="fa fa-pencil-square-o" aria-hidden="true" />
      </button>
      <EditModal />
    </div>
  );
};

export default EditRecipe;
