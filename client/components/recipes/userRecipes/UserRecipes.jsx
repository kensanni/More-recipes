import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import { bindActionCreators } from 'redux';
import { filter } from 'lodash';
import getUserRecipe from '../../../actionController/getUserRecipe';
import addRecipeAction from '../../../actionController/addRecipe';
import saveImageToCloudAction from '../../../actionController/saveImageToCloud';
import AddRecipe from './AddRecipe';
import deleteRecipeAction from '../../../actionController/deleteRecipe';
import editRecipeAction from '../../../actionController/editRecipe';
import UserRecipesCard from './UserRecipesCard';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

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
      recipeData: [],
      isFetched: false,
      name: '',
      isChanged: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.saveImageToCloud = this.saveImageToCloud.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.handleShowRecipe = this.handleShowRecipe.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  /**
   * @description check the state of isFetched and call the get recipe action
   *
   * @param {props} props
   *
   * @returns {undefined} return all recipes
   */
  componentDidMount() {
    if (this.props.recipes.isFetched === false) {
      this.props.getUserRecipe(this.props.userId);
    }
  }

  /**
   * @description update the state of user recipes
   *
   * @param {nextProps} nextProps
   *
   * @return {undefined} updated user recipe
   */
  componentWillReceiveProps(nextProps) {
    const { recipeImageUrl, recipes } = nextProps;
    const { recipeData, isFetched } = recipes;
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
   * @description function to edit a recipe
   *
   * @param {id} id id of recipe to be edited
   *
   * @param {recipeData} recipeData recipe data to be sent to the database
   *
   * @returns {undefined} calls editRecipeAction
   */
  editRecipe(id, recipeData) {
    console.log('I got here', id, recipeData);
    this.props.editRecipeAction(id, recipeData);
  }

  /**
   * @description function to delete a recipe
   *
   * @param {id} id id of recipe to be deleted
   *
   * @returns {undefined} calls the delete recipe action
   */
  deleteRecipe(id) {
    this.props.deleteRecipeAction(id);
  }

  /**
   * @description set the state of value inputs on form
   *
   * @param {event} event
   *
   * @returns {undefined} set the state of value inputs on form
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isChanged: true
    });
  }

  /**
   * @description get the state of recipe to be edited and display it on the edit form
   *
   * @param {recipeId} recipeId
   *
   * @returns {object} object
   */
  handleShowRecipe(recipeId) {
    const recipe = filter(this.state.recipeData, filterRecipe => filterRecipe.id === recipeId);
    this.setState({
      recipe
    });
  }

  /**
   * @description function to add a recipe
   *
   * @param {event} event
   *
   * @returns {undefined} calls add recipe action
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
   * @param {event} event
   *
   * @returns {undefined} call saveImageToCloudAction to save images
   */
  saveImageToCloud(event) {
    const image = event.target.files[0];
    if (image) {
      this.props.saveImageToCloudAction(image);
    }
  }

  /**
   * @description set the state of recipe data whwn form is closed
   * @returns {undefined} set state of isChanged
   */
  handleCloseModal() {
    this.setState({
      isChanged: false
    });
  }

  /**
   * @description render user recipes
   *
   * @returns {JSX} JSX
   */
  render() {
    let renderUserRecipes = <h1>No recipes in your catalog</h1>;
    if (this.state.isFetched) {
      renderUserRecipes = this.state.recipeData.map((recipeData, key) => (
        <UserRecipesCard
          key={recipeData.id}
          cardId={key}
          recipeData={recipeData}
          showRecipeDetails={this.handleShowRecipe}
          deleteRecipe={this.deleteRecipe}
          editRecipe={this.editRecipe}
          addRecipe={this.addRecipe}
          value={this.state}
          handleCloseModal={this.handleCloseModal}
          onChange={this.handleChange}
          saveImageToCloud={this.saveImageToCloud}
        />
      ));
    }
    return (
      <div>
        <Header />
        <div className="container">
          <div className="top-nav-bar">
            <AddRecipe
              value={this.state}
              onChange={this.handleChange}
              addRecipe={this.addRecipe}
              saveImageToCloud={this.saveImageToCloud}
            />

          </div>
          <div className="row">
            {this.state.isFetched && renderUserRecipes}
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
  recipes: PropTypes.objectOf(any).isRequired,
  recipeImageUrl: PropTypes.string.isRequired,
  saveImageToCloudAction: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

/**
 * @description allow state to be available to UserRecipes class as props
 * @param {state} state
 * @returns {object} object
 */
const mapStateToProps = state => ({
  recipes: state.getUserRecipeReducer[0],
  userId: state.signinReducer[0].userData.id,
  recipeImageUrl: state.saveImageToCloud[0].image
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUserRecipe,
    addRecipeAction,
    deleteRecipeAction,
    editRecipeAction,
    saveImageToCloudAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
