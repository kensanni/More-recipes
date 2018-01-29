import React from 'react';
import DeleteModal from '../Include/DeleteModal';

const DeleteRecipe = (props) => {
  const { deleteRecipe, recipeData } = props;
  return (
    <div>
      <button
        type="button"
        className="btn btn-danger ml-3"
        data-toggle="modal"
        data-target="#exampleModal10"
        data-whatever="@getbootstrap"
      >
        <i className="fa fa-times" aria-hidden="true" />
      </button>
      <DeleteModal />
    </div>
  );
};

export default DeleteRecipe;
