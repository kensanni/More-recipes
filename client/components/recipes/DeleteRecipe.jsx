import React from 'react';

const DeleteRecipe = (props) => {
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
      <div
        className="modal fade"
        id="exampleModal10"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel1">
                Delete recipe
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              This action is irrevesible, pls process with caution
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-danger">
                Delete recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRecipe;
