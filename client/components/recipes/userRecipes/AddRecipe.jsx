import React from 'react';
import AddModal from '../../Include/AddModal';

const AddRecipe = (props) => {
  const { onChange, addRecipe, value } = props;
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
          onChange={props.onChange}
          addRecipe={props.addRecipe}
          value={props.value}
        />
      </div>
    </div>
  );
};

export default AddRecipe;
