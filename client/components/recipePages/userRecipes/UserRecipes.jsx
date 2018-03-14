import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import { Lines } from 'react-preloading-component';
import ReactPaginate from 'react-paginate';
import RecipeNotFound from '../../Error/RecipeNotFound';
import getUserRecipe from '../../../actionController/getUserRecipe';
import addRecipeAction from '../../../actionController/addRecipe';
import saveImageToCloudAction from '../../../actionController/saveImageToCloud';
import AddRecipeButton from '../../Include/buttons/AddRecipeButton';
import deleteRecipeAction from '../../../actionController/deleteRecipe';
import editRecipeAction, { setEditRecipeIdAction } from '../../../actionController/editRecipe';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import RecipeGrid from '../RecipeGrid';

/**
 * @class UserRecipes
 *
 * @description UserRecipes
 */
class UserRecipes extends Component {
  /**
   * @description create an instance of UserRecipes
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      ingredient: '',
      recipeData: [],
      isFetched: false,
      isChanged: false,
      responseMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.saveImageToCloud = this.saveImageToCloud.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.renderRecipeGrid = this.renderRecipeGrid.bind(this);
    this.setEditRecipeId = this.setEditRecipeId.bind(this);
  }
  /**
   * @description check the state of isFetched and call the get recipe action
   *
   * @param {props} props
   *
   * @returns {void} return all recipes
   */
  componentDidMount() {
    const { userId } = this.props;
    const page = 0;
    this.props.getUserRecipe(userId, page);
  }

  /**
   * @description update the state of user recipes
   *
   * @param {object} nextProps
   *
   * @return {void} updated user recipe
   */
  componentWillReceiveProps(nextProps) {
    const { recipeImageUrl, recipes, addRecipeResponse } = nextProps;
    const { recipeData, isFetched } = recipes;
    if (!isEmpty(addRecipeResponse)) {
      this.setState({
        responseMessage: nextProps.addRecipeResponse
      });
    }
    if (recipeData !== this.props.recipes.recipeData) {
      this.setState({
        recipeData,
        isFetched
      });
    }

    if (recipeImageUrl !== this.props.recipeImageUrl) {
      this.setState({
        image: recipeImageUrl
      });
    }
  }

  /**
   * @description get the id of recipe to be edited
   *
   * @param {number} recipeId
   *
   * @returns {void} call setEditRecipeId action
   *
   */
  setEditRecipeId(recipeId) {
    this.props.setEditRecipeIdAction(recipeId);
  }

  /**
   * @description function to edit a recipe
   *
   * @param {number} id id of recipe to be edited
   *
   * @returns {void} calls editRecipeAction
   */
  editRecipe(id) {
    const { name, description, ingredient } = this.state;
    this.props.editRecipeAction(id, { name, description, ingredient });
  }

  /**
   * @description function to delete a recipe
   *
   * @param {number} id id of recipe to be deleted
   *
   * @returns {void} calls the delete recipe action
   */
  deleteRecipe(id) {
    this.props.deleteRecipeAction(id);
  }

  /**
   * @description set the state of value inputs on form
   *
   * @param {object} event
   *
   * @returns {void} set the state of value inputs on form
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isChanged: true
    });
  }

  /**
   * @description function to add a recipe
   *
   * @param {object} event
   *
   * @returns {void} calls add recipe action
   */
  addRecipe(event) {
    event.preventDefault();
    const {
      name, image, description, ingredient
    } = this.state;
    const newRecipe = {
      name, image, description, ingredient
    };
    this.props.addRecipeAction(newRecipe);
    this.setState({
      name: '', image: '', description: '', ingredient: ''
    });
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
   * @description get user recipes to be displayed on the new page
   *
   * @param {object} recipes
   *
   * @return {void} calls getUserRecipe action
   */
  handlePaginationChange(recipes) {
    const { userId } = this.props;
    this.props.getUserRecipe(userId, recipes.selected);
  }

  /**
   * @description get user recipes to be displayed on the new page
   *
   * @param {object} recipes
   *
   * @return {void} calls getUserRecipe action
   */
  renderRecipeGrid() {
    return (
      <div className="row">
        { this.props.recipes.length === 0 ? <RecipeNotFound /> :
        <RecipeGrid
          recipes={this.props.recipes}
          setEditRecipeId={this.setEditRecipeId}
          showActionButton
          recipeData={this.state.recipeData}
          deleteRecipe={this.deleteRecipe}
          editRecipe={this.editRecipe}
          addRecipe={this.addRecipe}
          value={this.state}
          handleCloseModal={this.handleCloseModal}
          onChange={this.handleChange}
          saveImageToCloud={this.saveImageToCloud}
          {...this.state}
        />
      }
      </div>
    );
  }
  /**
   * @description render user recipes
   *
   * @returns {JSX} JSX
   */
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="top-nav-bar">
            <AddRecipeButton
              value={this.state}
              onChange={this.handleChange}
              addRecipe={this.addRecipe}
              saveImageToCloud={this.saveImageToCloud}
              recipeImage={this.props.recipeImageUrl}
            />

          </div>
          <div>
            {
              this.props.recipes.isFetching ? <Lines /> :
              this.renderRecipeGrid()

            }
          </div>
          <div className="pt-3 pb-5">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel={<a href="">...</a>}
              breakClassName="page-link"
              onPageChange={this.handlePaginationChange}
              pageCount={this.props.page}
              containerClassName="pagination justify-content-center"
              pageLinkClassName="page-link"
              nextLinkClassName="page-link"
              previousLinkClassName="page-link"
              disabledClassName="disabled"
              pageClassName="page-item"
              previousClassName="page-item"
              nextClassName="page-item"
              activeClassName="active"
              subContainerClassName="pages pagination"
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
UserRecipes.propTypes = {
  getUserRecipe: PropTypes.func.isRequired,
  addRecipeAction: PropTypes.func.isRequired,
  deleteRecipeAction: PropTypes.func.isRequired,
  editRecipeAction: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(any).isRequired,
  recipeImageUrl: PropTypes.string.isRequired,
  saveImageToCloudAction: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  addRecipeResponse: PropTypes.string.isRequired,
  setEditRecipeIdAction: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};

/**
 * @description allow state to be available to UserRecipes class as props
 *
 * @param {state} state
 *
 * @returns {object} object
 */
const mapStateToProps = state => ({
  recipes: state.getUserRecipeReducer.recipeData,
  userId: state.authReducer.userData.id,
  page: state.getUserRecipeReducer.page,
  recipeImageUrl: state.saveImageToCloud.image,
  addRecipeResponse: state.addRecipeReducer.errorMessage
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUserRecipe,
    addRecipeAction,
    deleteRecipeAction,
    editRecipeAction,
    saveImageToCloudAction,
    setEditRecipeIdAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
