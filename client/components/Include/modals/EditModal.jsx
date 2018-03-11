import React from 'react';
import PropTypes, { any } from 'prop-types';

/**
 * @description function component to render the edit recipe modal
 *
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
const EditModal = (props) => {
  const {
    recipeData, handleCloseModal, onChange, cardId, value, editRecipe, saveImageToCloud,
  } = props;
  const {
    id, name, description, ingredient
  } = recipeData;
  return (
    <div
      className="modal fade"
      id={cardId}
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
              onClick={handleCloseModal}
            >
              <span
                aria-hidden="true"
              >&times;
              </span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="recipient-name" id="recipient-name" className="col-form-label">
                  Name
                </label>
                <input
                  name="name"
                  onChange={onChange}
                  value={value.isChanged ? value.name : name}
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
                  value={value.isChanged ? value.description : description}
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
                  value={value.isChanged ? value.ingredient : ingredient}
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
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-orange"
              onClick={() => editRecipe(id, recipeData)}
            >
              Update recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  value: PropTypes.objectOf(any).isRequired,
  onChange: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
  saveImageToCloud: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  recipeData: PropTypes.objectOf(any).isRequired,
  cardId: PropTypes.number.isRequired
};

export default EditModal;
