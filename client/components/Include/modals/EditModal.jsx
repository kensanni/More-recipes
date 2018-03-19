import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import editRecipeAction from '../../../actionController/editRecipe';
import saveImageToCloudAction from '../../../actionController/saveImageToCloud';

/**
 * @description component to render the edit recipe modal
 *
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
class EditModal extends Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.recipeEdited = null;
    this.state = {
      recipe: null,
    };
    this.editChangeHandler = this.editChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.saveImageToCloud = this.saveImageToCloud.bind(this);
  }

  /**
 * @description component to render the edit recipe modal
 *
 * @param {object} nextProps
 *
 * @returns {void}  update the state of image
 */
  componentWillReceiveProps(nextProps) {
    const { image } = this.props;
    if (image !== nextProps.image) {
      this.setState({
        recipe: {
          ...this.state.recipe,
          image: nextProps.image
        }
      });
    }
  }

  /**
   * @description function to submit recipe to edit
   *
   * @returns {void} call edit recipe action creator
   */
  onSubmit() {
    const { editRecipeId } = this.props;
    if (this.state.recipe !== null) {
      this.props.editRecipeAction(editRecipeId, this.state.recipe);
      this.setState({ recipe: null });
    }
  }

  /**
   * @description upload Image to cloud
   *
   * @param {object} event
   *
   * @returns {void} call saveImageToCloudAction to save images
   */
  saveImageToCloud(event) {
    const image = event.target.files[0];
    if (image) {
      this.props.saveImageToCloudAction(image);
    }
  }

  /**
   * @description change and save the data input by the user
   *
   * @param {object} event
   *
   * @returns {void} set state of recipe
   */
  editChangeHandler(event) {
    const { name, value } = event.target;
    if (this.state.recipe === null) {
      this.setState({
        recipe: {
          ...this.recipeEdited,
          [name]: value,
        }
      });
    } else {
      this.setState({
        recipe: {
          ...this.state.recipe,
          [name]: value
        }
      });
    }
  }

  /**
 * @description function to render jsx element
 *
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
  render() {
    const { editRecipeId, recipes, editRecipeStatus } = this.props;
    const { recipe: stateRecipe } = this.state;
    const editRecipeArray = (
      editRecipeId !== null
    ) ? recipes.filter(recipe => recipe.id === editRecipeId) : [];

    const editRecipe = editRecipeArray.length === 1
      ? editRecipeArray[0]
      : {
        name: '',
        description: '',
        ingredient: '',
        image: '',
      };
    this.recipeEdited = {
      name: editRecipe.name,
      description: editRecipe.description,
      ingredient: editRecipe.ingredient,
      image: editRecipe.image,
    };

    return (
      <div
        className="modal fade"
        id="editModal"
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
                  <div className="error-message">
                    {!editRecipeStatus.status ? editRecipeStatus.message : ''}
                  </div>
                  <label htmlFor="recipient-name" id="recipient-name" className="col-form-label">
                    Name
                  </label>
                  <input
                    name="name"
                    onChange={this.editChangeHandler}
                    value={stateRecipe === null ? editRecipe.name : stateRecipe.name}
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
                    onChange={this.editChangeHandler}
                    value={stateRecipe === null ? editRecipe.description : stateRecipe.description}
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
                    onChange={this.editChangeHandler}
                    value={stateRecipe === null ? editRecipe.ingredient : stateRecipe.ingredient}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={this.saveImageToCloud}
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
                onClick={this.onSubmit}
              >
                Update recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditModal.defaultProps = {
  saveImageToCloudAction: undefined,
  editRecipeId: null
};

EditModal.propTypes = {
  saveImageToCloudAction: PropTypes.func,
  editRecipeId: PropTypes.number,
  editRecipeAction: PropTypes.func.isRequired,
  editRecipeStatus: PropTypes.objectOf(any).isRequired,
  recipes: PropTypes.arrayOf(any).isRequired,
  image: PropTypes.string.isRequired
};

/**
 * @description allow state to be available to UserRecipes class as props
 *
 * @param {state} state
 *
 * @returns {object} object
 */
const mapStateToProps = state => ({
  editRecipeId: state.getUserRecipeReducer.editRecipeId,
  recipes: state.getUserRecipeReducer.recipeData,
  editRecipeStatus: state.editRecipeReducer.editRecipeStatus,
  image: state.saveImageToCloud.image
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    editRecipeAction,
    saveImageToCloudAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
