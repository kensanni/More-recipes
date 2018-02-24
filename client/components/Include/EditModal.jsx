import React from 'react';
import PropTypes, { any } from 'prop-types';

/**
 * @description function component to render the edit recipe modal
 *
 * @param {props} props
 *
 * @returns {JSX} return JSX
 */
const EditModal = (props) => {
  const {
    cardId
  } = props;
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
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
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
  cardId: PropTypes.number.isRequired
};

export default EditModal;
