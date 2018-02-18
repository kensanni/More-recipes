import React from 'react';
import PropTypes, { any } from 'prop-types';
import AddModal from '../../Include/AddModal';

/**
 * @description functional component to render the add recipe button
 *
 * @param {props} props
 *
 * @returns {JSX} return JSX
 */
const AddRecipe = (props) => {
  const {
    onChange, addRecipe, value, saveImageToCloud
  } = props;
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
        <AddModal
          onChange={onChange}
          addRecipe={addRecipe}
          value={value}
          saveImageToCloud={saveImageToCloud}
        />
      </div>
    </div>
  );
};

AddRecipe.propTypes = {
  onChange: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
  value: PropTypes.objectOf(any).isRequired,
  saveImageToCloud: PropTypes.func.isRequired,
};

export default AddRecipe;
