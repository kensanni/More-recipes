import React from 'react';

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
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update recipe
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
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">
                    description
                  </label>
                  <textarea className="form-control" id="message-text" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-orange">
                Update recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
