import React from 'react';

const AddRecipe = (props) => {
  return (
    <div className="row header-nav ">
      <div className="col-sm-6 col-6">
        <p className="pt-3 font">Add New recipe</p>
      </div>
      <div className="col-sm-6 col-6 pt-2 pb-2">
        <button
          type="button"
          className="btn rfloat mt-2"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <i className="fa fa-plus-square-o" aria-hidden="true" />
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header black">
                <h5 className="modal-title black" id="exampleModalLabel">
                  Add new recipe
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
                    <label
                      htmlFor="recipient-name"
                      className="col-form-label black"
                    >
                      Title &#58;
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label black">
                      Description &#58;
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
                  Add recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
