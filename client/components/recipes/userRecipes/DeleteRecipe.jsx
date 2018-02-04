import React from 'react';

const DeleteRecipe = () => {
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
    </div>
  );
};

export default DeleteRecipe;
