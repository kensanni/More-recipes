import React from 'react';
import PropTypes, { any } from 'prop-types';

/**
 * @description functional component to render modal for adding recipes
 *
 * @param {props} props
 *
 * @returns {JSX} return JSX
 */
const AddModal = (props) => {
  const {
    onChange, value, saveImageToCloud, addRecipe, recipeImage
  } = props;
  const {
    name, description, ingredient, responseMessage
  } = value;
  return (
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
                <div className="error-message">
                  { responseMessage }
                </div>
                <label
                  htmlFor="recipient-name"
                  className="col-form-label black"
                >
                  Name &#58;
                </label>
                <input
                  name="name"
                  onChange={onChange}
                  value={name}
                  type="text"
                  className="form-control"
                  id="recipient-name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label black">
                  Description &#58;
                </label>
                <textarea
                  name="description"
                  onChange={onChange}
                  value={description}
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
                  placeholder="separate each ingredient with a comma"
                  type="text"
                  name="ingredient"
                  onChange={onChange}
                  value={ingredient}
                  className="form-control"
                />
              </div>
              <div className="form-group img-text">
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
              disabled={!recipeImage ? 'disabled' : null}
              className="btn btn-orange"
              onClick={addRecipe}
            >
              Add recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AddModal.propTypes = {
  addRecipe: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saveImageToCloud: PropTypes.func.isRequired,
  value: PropTypes.objectOf(any).isRequired
};


export default AddModal;
