import React from 'react';

const EditModal = (props) => {
  const { value, onChange, editRecipe, recipeId, saveImageToCloud } = props;
  return (
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
                  Name
                </label>
                <input
                  name="name"
                  onChange={onChange}
                  value={value.name}
                  type="text"
                  className="form-control"
                  id="recipient-name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">
                  description
                </label>
                <textarea
                  name="description"
                  onChange={onChange}
                  value={value.description}
                  className="form-control"
                  id="message-text"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ingredient" className="col-form-label black">
                  Ingredient &#58;
                </label>
                <input
                  id="ingredient"
                  type="text"
                  name="ingredient"
                  onChange={onChange}
                  value={value.ingredient}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={saveImageToCloud}
                />
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
            <button
              type="button"
              className="btn btn-orange"
              onClick={() => editRecipe(recipeId)}
            >
              Update recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
